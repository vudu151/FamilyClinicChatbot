import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { conversations, messages } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { authenticateToken, AuthRequest } from "../middleware/auth.js";

const router = Router();

// Giới hạn history gửi kèm mỗi request để tiết kiệm token
const MAX_HISTORY_MESSAGES = 6; // 3 cặp user-bot gần nhất

const GEMINI_MODEL = 'gemini-2.0-flash'; // 2.0-flash: quota 1500 RPD vs 2.5-flash: 25 RPD
const GROQ_MODEL = 'llama-3.3-70b-versatile'; // Groq free: 30 RPM, 14400 RPD
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

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

// ==================== GEMINI PROVIDER ====================

function getApiKeys(): string[] {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;
  if (!keysStr || keysStr === "YOUR_GEMINI_API_KEY_HERE") return [];
  return keysStr.split(',').map(k => k.trim()).filter(k => k.length > 0);
}

let currentKeyIndex = 0;

async function generateWithGemini(aiMethod: (ai: GoogleGenAI) => Promise<any>): Promise<any> {
  const keys = getApiKeys();
  if (keys.length === 0) throw new Error("GEMINI_KEYS_MISSING");

  // Chỉ thử 1 vòng qua tất cả key (không retry dài để chuyển nhanh sang Groq)
  let attempts = 0;
  while (attempts < keys.length) {
    const key = keys[currentKeyIndex];
    const ai = new GoogleGenAI({ apiKey: key });
    
    try {
      const result = await aiMethod(ai);
      console.log(`[Gemini] ✅ Thành công với key #${currentKeyIndex}`);
      return result;
    } catch (err: any) {
      const errMsg = err.message?.toLowerCase() || "";
      if (errMsg.includes('quota') || errMsg.includes('429') || err.status === 429 || errMsg.includes('resource_exhausted')) {
         console.warn(`[Gemini] Key #${currentKeyIndex} rate-limited. Thử key tiếp...`);
         currentKeyIndex = (currentKeyIndex + 1) % keys.length;
         attempts++;
         if (attempts < keys.length) {
           await new Promise(resolve => setTimeout(resolve, 1000));
         }
      } else {
         throw err;
      }
    }
  }

  throw new Error("GEMINI_ALL_EXHAUSTED");
}

// ==================== GROQ PROVIDER (Fallback) ====================

async function callGroq(groqMessages: Array<{role: string, content: string}>, temperature = 0.4): Promise<string> {
  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) throw new Error("GROQ_KEY_MISSING");

  console.log(`[Groq] 🔄 Đang gọi Groq (${GROQ_MODEL})...`);

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: groqMessages,
      temperature,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error(`[Groq] ❌ Lỗi ${response.status}:`, errBody);
    throw new Error(`GROQ_ERROR_${response.status}`);
  }

  const data = await response.json() as any;
  const text = data.choices?.[0]?.message?.content || "";
  console.log(`[Groq] ✅ Thành công!`);
  return text;
}

// ==================== SMART FALLBACK: Gemini → Groq ====================

/**
 * Thử Gemini trước, nếu hết quota thì tự động chuyển sang Groq
 * @param geminiCall - Hàm gọi Gemini
 * @param groqMessages - Messages dạng OpenAI format cho Groq fallback
 */
async function generateWithSmartFallback(
  geminiCall: () => Promise<any>,
  groqMessages: Array<{role: string, content: string}>,
  temperature = 0.4
): Promise<string> {
  // 1. Thử Gemini trước
  try {
    const result = await geminiCall();
    return result.text || "";
  } catch (geminiErr: any) {
    const msg = geminiErr.message || "";
    if (msg === "GEMINI_ALL_EXHAUSTED" || msg === "GEMINI_KEYS_MISSING") {
      console.log(`[Fallback] Gemini không khả dụng (${msg}). Chuyển sang Groq...`);
    } else {
      // Lỗi khác (không phải quota) → vẫn thử Groq
      console.warn(`[Fallback] Gemini lỗi: ${msg}. Thử Groq...`);
    }
  }

  // 2. Fallback sang Groq
  try {
    return await callGroq(groqMessages, temperature);
  } catch (groqErr: any) {
    console.error(`[Fallback] Groq cũng thất bại:`, groqErr.message);
    throw new Error("ALL_PROVIDERS_EXHAUSTED");
  }
}

// ==================== ROUTES ====================

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

    const prompt = `Đây là lịch sử các câu hỏi và lời than phiền về sức khỏe của một bệnh nhân:
    "${allUserMsgs.join("\n")}"
    
    Hãy đóng vai một bác sĩ phân tích hồ sơ. Hãy trích xuất và tóm tắt ngắn gọn các "Triệu chứng y khoa" và "Tiền sử bệnh lý" mà bệnh nhân này từng gặp phải.
    Yêu cầu:
    - Viết dưới dạng 2-3 gạch đầu dòng ngắn gọn.
    - Không dài dòng, không đưa ra lời khuyên chữa bệnh ở đây.
    - Trả lời bằng tiếng Việt.`;

    // Groq fallback messages
    const groqMessages = [
      { role: 'system', content: 'Bạn là bác sĩ phân tích hồ sơ bệnh án. Trả lời bằng tiếng Việt.' },
      { role: 'user', content: prompt }
    ];

    try {
      const summary = await generateWithSmartFallback(
        // Gemini call
        () => generateWithGemini(ai => 
          ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
          })
        ),
        // Groq fallback
        groqMessages
      );
      
      return res.json({ summary: summary || "Không có dữ liệu bệnh lý rõ ràng." });
    } catch (e: any) {
      if (e.message === "ALL_PROVIDERS_EXHAUSTED") {
        return res.json({ summary: "Hệ thống AI đang quá tải. Vui lòng thử lại sau." });
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
    
    // Giới hạn history: chỉ lấy N tin nhắn gần nhất để tiết kiệm token
    const allExceptCurrent = historyMsgs.slice(0, historyMsgs.length - 1);
    const rawHistory = allExceptCurrent.slice(-MAX_HISTORY_MESSAGES);
    
    // Convert cho Gemini: Gộp các tin nhắn có cùng role liền kề để tránh lỗi 400 Bad Request của Gemini
    const geminiHistory: any[] = [];
    
    for (const msg of rawHistory) {
      const mappedRole = msg.role === 'model' ? 'model' : 'user';
      if (geminiHistory.length > 0 && geminiHistory[geminiHistory.length - 1].role === mappedRole) {
        geminiHistory[geminiHistory.length - 1].parts[0].text += `\n${msg.content}`;
      } else {
        geminiHistory.push({
          role: mappedRole,
          parts: [{ text: msg.content }]
        });
      }
    }

    // Chuẩn bị Groq messages (OpenAI format) cho fallback
    const groqMessages: Array<{role: string, content: string}> = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];
    for (const msg of rawHistory) {
      const groqRole = msg.role === 'model' ? 'assistant' : 'user';
      groqMessages.push({ role: groqRole, content: msg.content });
    }
    groqMessages.push({ role: 'user', content: text || "[Người dùng gửi hình ảnh]" });

    const keys = getApiKeys();
    const hasGeminiKeys = keys.length > 0;
    const hasGroqKey = !!process.env.GROQ_API_KEY;

    if (!hasGeminiKeys && !hasGroqKey) {
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

    // Smart Fallback: Gemini → Groq
    const aiText = await generateWithSmartFallback(
      // Gemini call
      () => generateWithGemini(ai => 
        ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: [...geminiHistory, currentContent],
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.4,
          }
        })
      ),
      // Groq fallback
      groqMessages,
      0.4
    );

    const finalText = aiText || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
    
    // Lưu tin nhắn của AI
    await db.insert(messages).values({
      id: nanoid(),
      conversationId,
      role: 'model',
      content: finalText,
    });

    // Cập nhật updatedAt của config
    await db.update(conversations)
      .set({ updatedAt: new Date().toISOString() })
      .where(eq(conversations.id, conversationId));

    return res.json({ response: finalText, conversationId });
  } catch (error: any) {
    console.error("AI Error:", error);
    let errMsg = error.message || "Lỗi xử lý từ AI";
    if (errMsg === "ALL_PROVIDERS_EXHAUSTED") {
      errMsg = "Cả Gemini và Groq đều không khả dụng. Vui lòng thử lại sau!";
    }
    return res.status(500).json({ error: errMsg });
  }
});

export default router;
