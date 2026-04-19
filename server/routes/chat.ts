import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const SYSTEM_PROMPT = `
Bạn là "Trợ lý Chatbot" của Phòng Khám Gia Đình.
Vai trò của bạn là:
1. Hỏi han, phân tích triệu chứng của bệnh nhân một cách ân cần, chuyên nghiệp.
2. Đưa ra lời khuyên chăm sóc sức khỏe ban đầu, các biện pháp sơ cứu hoặc chăm sóc tại nhà.
3. Luôn luôn nhắc nhở người bệnh rằng bạn chỉ là một AI và khuyên họ nên đến phòng khám gặp bác sĩ nếu triệu chứng nghiêm trọng hoặc kéo dài.
4. Ưu tiên những câu trả lời ngắn gọn, súc tích (dưới 150 chữ unless cần thiết).
5. Nếu người bệnh gửi hình ảnh, hãy phân tích hình ảnh (ví dụ: vết thương, đơn thuốc) và đưa ra đánh giá sơ bộ nhưng luôn kèm cảnh báo y khoa.
`;

router.post("/", async (req, res) => {
  try {
    const { text, imageBase64, history = [] } = req.body;

    if (!text && !imageBase64) {
      return res.status(400).json({ error: "Yêu cầu phải có text hoặc imageBase64" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      // Fallback cho chế độ Mock nếu chưa có API Key
      console.log("No valid Gemini API key found, using mock response...");
      setTimeout(() => {
        return res.json({
          response: "[Chế độ Dùng Thử - Chưa cấu hình API Key]\nXin chào, hệ thống nhận thấy bạn có triệu chứng cần lưu ý. Vui lòng nghỉ ngơi và uống nhiều nước. Để AI hoạt động thật, vui lòng cấu hình GEMINI_API_KEY."
        });
      }, 1500);
      return;
    }

    // Khởi tạo SDK
    const ai = new GoogleGenAI({ apiKey });

    // Build current user message parts
    const currentMessageParts: any[] = [];
    
    if (text) {
      currentMessageParts.push({ text: text });
    }

    if (imageBase64) {
      // Tách mimetype và base64 data từ chuỗi DataURL (e.g. data:image/jpeg;base64,... )
      const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        currentMessageParts.push({
          inlineData: {
            mimeType: matches[1],
            data: matches[2]
          }
        });
      }
    }

    const currentContent = {
      role: 'user',
      parts: currentMessageParts
    };

    // Gọi Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...history, currentContent],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
      }
    });

    const aiText = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này.";
    
    return res.json({ response: aiText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message || "Lỗi xử lý từ AI" });
  }
});

export default router;
