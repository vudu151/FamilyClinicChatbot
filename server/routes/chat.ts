import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { conversations, messages } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

const SYSTEM_PROMPT = `
Bạn là "Trợ lý Chatbot" của Phòng Khám Gia Đình.
Vai trò của bạn là:
1. Hỏi han, phân tích triệu chứng của bệnh nhân một cách ân cần, chuyên nghiệp.
2. Đưa ra lời khuyên chăm sóc sức khỏe ban đầu, các biện pháp sơ cứu hoặc chăm sóc tại nhà.
3. Luôn luôn nhắc nhở người bệnh rằng bạn chỉ là một AI và khuyên họ nên đến phòng khám gặp bác sĩ nếu triệu chứng nghiêm trọng hoặc kéo dài.
4. Ưu tiên những câu trả lời ngắn gọn, súc tích (dưới 150 chữ unless cần thiết).
5. Nếu người bệnh gửi hình ảnh, hãy phân tích hình ảnh (ví dụ: vết thương, đơn thuốc) và đưa ra đánh giá sơ bộ nhưng luôn kèm cảnh báo y khoa.
6. Khi người bệnh có nhu cầu "ĐẶT LỊCH KHÁM", bạn BẮT BUỘC phải hỏi họ 2 thông tin: "Bạn muốn khám với Bác sĩ nào?" và "Bạn muốn đến Phòng khám nào của chúng tôi?". Sau khi có đủ thông tin, hãy gửi lời xác nhận đặt lịch thành công.
`;

function getApiKeys(): string[] {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;
  if (!keysStr || keysStr === "YOUR_GEMINI_API_KEY_HERE") return [];
  return keysStr.split(',').map(k => k.trim()).filter(k => k.length > 0);
}

let currentKeyIndex = 0;

async function generateWithFallback(aiMethod: (ai: GoogleGenAI) => Promise<any>): Promise<any> {
  const keys = getApiKeys();
  if (keys.length === 0) throw new Error("API_KEY_MISSING");

  let attempts = 0;
  let lastError = null;

  while (attempts < keys.length) {
    const key = keys[currentKeyIndex];
    const ai = new GoogleGenAI({ apiKey: key });
    
    try {
      const result = await aiMethod(ai);
      return result;
    } catch (err: any) {
      lastError = err;
      const errMsg = err.message?.toLowerCase() || "";
      if (errMsg.includes('quota') || errMsg.includes('429') || err.status === 429) {
         console.warn(`[API Key] Key at index ${currentKeyIndex} is exhausted. Switching to next key...`);
         currentKeyIndex = (currentKeyIndex + 1) % keys.length;
         attempts++;
      } else {
         throw err;
      }
    }
  }

  throw new Error("ALL_KEYS_EXHAUSTED");
}

// Lấy danh sách các cuộc hội thoại của user
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const userConversations = await db.select().from(conversations).where(eq(conversations.userId, userId)).orderBy(desc(conversations.createdAt));
    return res.json({ conversations: userConversations });
  } catch (err: any) {
    return res.status(500).json({ error: "Lỗi lấy danh sách hội thoại" });
  }
});

// Lấy chi tiết lịch sử tin nhắn của một hội thoại
router.get("/:id/messages", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user!.userId;

    // Check ownership
    const conv = await db.select().from(conversations).where(eq(conversations.id, conversationId));
    if (conv.length === 0 || conv[0].userId !== userId) {
      return res.status(404).json({ error: "Hội thoại không tồn tại" });
    }

    const msgs = await db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(messages.createdAt);
    return res.json({ messages: msgs });
  } catch (err: any) {
    return res.status(500).json({ error: "Lỗi lấy chi tiết tin nhắn" });
  }
});

// Phân tích lịch sử chat để trích xuất triệu chứng bệnh lý (Hồ sơ sức khỏe)
router.get("/symptoms-summary", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;

    // Lấy tất cả hội thoại của user
    const userConvs = await db.select().from(conversations).where(eq(conversations.userId, userId));
    const convIds = userConvs.map(c => c.id);

    if (convIds.length === 0) {
      return res.json({ summary: "Chưa có dữ liệu hội thoại để phân tích." });
    }

    // Lấy tất cả tin nhắn của user
    const allUserMsgs: string[] = [];
    for (const cid of convIds) {
      const msgs = await db.select().from(messages).where(eq(messages.conversationId, cid));
      msgs.forEach(m => {
        if (m.role === 'user' && !m.content.includes("Hình ảnh đính kèm")) {
          allUserMsgs.push(m.content);
        }
      });
    }

    if (allUserMsgs.length === 0) {
      return res.json({ summary: "Chưa có dữ liệu triệu chứng." });
    }

    const keys = getApiKeys();
    if (keys.length === 0) {
       return res.json({ summary: "Chức năng phân tích AI đang chờ cấu hình API Key." });
    }

    const prompt = `Đây là lịch sử các câu hỏi và lời than phiền về sức khỏe của một bệnh nhân:
    "${allUserMsgs.join("\n")}"
    
    Hãy đóng vai một bác sĩ phân tích hồ sơ. Hãy trích xuất và tóm tắt ngắn gọn các "Triệu chứng y khoa" và "Tiền sử bệnh lý" mà bệnh nhân này từng gặp phải.
    Yêu cầu:
    - Viết dưới dạng 2-3 gạch đầu dòng ngắn gọn.
    - Không dài dòng, không đưa ra lời khuyên chữa bệnh ở đây.
    - Trả lời bằng tiếng Việt.`;

    try {
      const response = await generateWithFallback(ai => 
        ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        })
      );
      
      const summary = response.text || "Không có dữ liệu bệnh lý rõ ràng.";
      return res.json({ summary });
    } catch (e: any) {
      if (e.message === "ALL_KEYS_EXHAUSTED") {
        return res.json({ summary: "Hệ thống AI đang quá tải (Tất cả API Key đều hết hạn mức)." });
      }
      throw e;
    }
  } catch (err: any) {
    console.error("Symptoms summary error:", err);
    return res.status(500).json({ error: "Lỗi phân tích triệu chứng" });
  }
});

router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    let { text, imageBase64, conversationId } = req.body;

    if (!text && !imageBase64) {
      return res.status(400).json({ error: "Yêu cầu phải có text hoặc imageBase64" });
    }

    // Nếu chưa có conversationId, tạo mới
    if (!conversationId) {
      conversationId = nanoid();
      await db.insert(conversations).values({
        id: conversationId,
        userId: userId,
        title: text ? text.substring(0, 30) + "..." : "Image Analysis",
      });
    }

    // Lưu tin nhắn của User
    await db.insert(messages).values({
      id: nanoid(),
      conversationId,
      role: 'user',
      content: text ? text : "[Hình ảnh đính kèm]",
    });

    // Lấy history quá khứ từ DB
    const historyMsgs = await db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(messages.createdAt);
    
    // Convert cho Gemini: Gộp các tin nhắn có cùng role liền kề để tránh lỗi 400 Bad Request của Gemini
    const rawHistory = historyMsgs.slice(0, historyMsgs.length - 1);
    const history: any[] = [];
    
    for (const msg of rawHistory) {
      const mappedRole = msg.role === 'model' ? 'model' : 'user';
      if (history.length > 0 && history[history.length - 1].role === mappedRole) {
        history[history.length - 1].parts[0].text += `\n${msg.content}`;
      } else {
        history.push({
          role: mappedRole,
          parts: [{ text: msg.content }]
        });
      }
    }

    const keys = getApiKeys();
    if (keys.length === 0) {
       const mockResp = "[Chế độ Dùng Thử - Cần API Key] Lời khuyên mock.";
       await db.insert(messages).values({
          id: nanoid(),
          conversationId,
          role: 'model',
          content: mockResp,
       });
       return res.json({ response: mockResp, conversationId });
    }

    const currentMessageParts: any[] = [];
    
    if (text) currentMessageParts.push({ text });

    if (imageBase64) {
      const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        currentMessageParts.push({ inlineData: { mimeType: matches[1], data: matches[2] } });
      }
    }

    const currentContent = { role: 'user', parts: currentMessageParts };

    let response;
    try {
      response = await generateWithFallback(ai => 
        ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [...history, currentContent],
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.4,
          }
        })
      );
    } catch (e: any) {
      if (e.message === "ALL_KEYS_EXHAUSTED") {
        throw new Error("ALL_KEYS_EXHAUSTED");
      }
      throw e;
    }

    const aiText = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
    
    // Lưu tin nhắn của AI
    await db.insert(messages).values({
      id: nanoid(),
      conversationId,
      role: 'model',
      content: aiText,
    });

    // Cập nhật updatedAt của config
    await db.update(conversations)
      .set({ updatedAt: new Date().toISOString() })
      .where(eq(conversations.id, conversationId));

    return res.json({ response: aiText, conversationId });
  } catch (error: any) {
    console.error("AI Error:", error);
    let errMsg = error.message || "Lỗi xử lý từ AI";
    if (errMsg === "ALL_KEYS_EXHAUSTED") {
      errMsg = "Hệ thống AI đang quá tải hoặc tất cả các API Key đã dùng hết hạn mức miễn phí (Quota Exceeded). Vui lòng cấu hình thêm key mới hoặc thử lại vào ngày mai!";
    }
    return res.status(500).json({ error: errMsg });
  }
});

export default router;
