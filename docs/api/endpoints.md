# API Documentation

Ngày cập nhật: 2026-04-19
Base URL: `http://localhost:3000/api`

---

## 🤖 AI Core

### POST /api/chat
Giao tiếp với Trợ lý AI Phòng Khám Gia Đình (Google Gemini). Hỗ trợ Prompt đa phương thức (Văn bản + Hình ảnh Base64).

**Request (JSON):**
```json
{
  "prompt": "Tôi bị ho và đau họng 2 ngày nay.",
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSk...", // Không bắt buộc
  "history": [ // Lưu trữ context cuộc hội thoại cũ
    {
      "role": "user",
      "parts": [{ "text": "Chào bác sĩ" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "Chào bạn, tôi có thể giúp gì?" }]
    }
  ]
}
```

**Response (200):**
```json
{
  "response": "Bạn có kèm theo sốt hay khó thở không?..."
}
```

**Errors:**
- 500: Lỗi hệ thống hoặc API Key Gemini không hợp lệ.
- 400: Thiếu dữ liệu Prompt.
