# 🏥 Family Clinic Chatbot — Hướng dẫn Cài đặt & Sử dụng

> **Phiên bản:** 1.0.0 · **Cập nhật:** 25/04/2026  
> Ứng dụng Chatbot AI hỗ trợ tư vấn sức khỏe cho Phòng Khám Gia Đình, tích hợp Google Gemini 2.5 Flash.

---

## 📑 Mục lục

1. [Giới thiệu tổng quan](#1-giới-thiệu-tổng-quan)
2. [Yêu cầu hệ thống](#2-yêu-cầu-hệ-thống)
3. [Cài đặt & Khởi chạy](#3-cài-đặt--khởi-chạy)
4. [Cấu hình biến môi trường](#4-cấu-hình-biến-môi-trường)
5. [Kiến trúc dự án](#5-kiến-trúc-dự-án)
6. [Hướng dẫn sử dụng các tính năng](#6-hướng-dẫn-sử-dụng-các-tính-năng)
7. [API Endpoints](#7-api-endpoints)
8. [Triển khai Production với Docker](#8-triển-khai-production-với-docker)
9. [Xử lý sự cố thường gặp](#9-xử-lý-sự-cố-thường-gặp)
10. [Đóng góp & Phát triển](#10-đóng-góp--phát-triển)

---

## 1. Giới thiệu tổng quan

**Family Clinic Chatbot** là ứng dụng web dạng Mobile-first, cung cấp dịch vụ tư vấn sức khỏe thông minh bằng AI cho bệnh nhân của Phòng Khám Gia Đình.

### Tính năng chính

| # | Tính năng | Mô tả |
|---|-----------|-------|
| 1 | 🤖 **Tư vấn AI** | Chat trực tiếp với AI (Google Gemini 2.5 Flash) để phân tích triệu chứng |
| 2 | 📸 **Chẩn đoán hình ảnh** | Gửi ảnh (vết thương, đơn thuốc…) để AI phân tích |
| 3 | 🎙️ **Tin nhắn thoại** | Ghi âm giọng nói gửi cho chatbot |
| 4 | 👨‍⚕️ **Kết nối Bác sĩ** | Danh sách bác sĩ chuyên khoa, đặt lịch & chat |
| 5 | 💊 **Tra cứu & nhắc thuốc** | Tra cứu thông tin thuốc, đặt lịch nhắc uống thuốc |
| 6 | 📊 **Hồ sơ sức khỏe** | Theo dõi chỉ số sức khỏe (huyết áp, nhịp tim, SpO2…) |
| 7 | 🧠 **AI phân tích bệnh lý** | Trích xuất tiền sử bệnh từ lịch sử chat bằng AI |
| 8 | 🚨 **Gọi cấp cứu SOS** | Nút cấp cứu nhanh, chia sẻ vị trí tự động |
| 9 | 🔐 **Xác thực JWT** | Đăng ký / Đăng nhập bảo mật bằng JWT |
| 10 | 🔄 **Multi-API Key Fallback** | Tự động xoay vòng API Key khi hết quota |

### Công nghệ sử dụng

| Tầng | Công nghệ |
|------|-----------|
| **Frontend** | React 19, TypeScript, TailwindCSS 4, Radix UI, Framer Motion, Wouter |
| **Backend** | Node.js 18+, Express, ESBuild |
| **Database** | SQLite (libsql) + Drizzle ORM |
| **AI Engine** | Google Gemini 2.5 Flash (`@google/genai`) |
| **Auth** | JWT + bcryptjs |
| **Build** | Vite 5, pnpm |

---

## 2. Yêu cầu hệ thống

### Bắt buộc

- **Node.js** ≥ 18.0 (khuyến nghị v20 LTS)
- **pnpm** ≥ 10.x (hoặc npm ≥ 9)
- **Google Gemini API Key** — Lấy miễn phí tại [Google AI Studio](https://aistudio.google.com/apikey)

### Tùy chọn (cho Production)

- **Docker** ≥ 20 + Docker Compose ≥ 2
- **Git** ≥ 2.30

### Kiểm tra phiên bản

```bash
node -v      # >= v18.0.0
pnpm -v      # >= 10.0.0
docker -v    # (tùy chọn)
```

---

## 3. Cài đặt & Khởi chạy

### 3.1. Clone dự án

```bash
git clone https://github.com/vudu151/FamilyClinicChatbot.git
cd FamilyClinicChatbot
```

### 3.2. Cài đặt dependencies

```bash
# Cài pnpm nếu chưa có
npm install -g pnpm

# Cài đặt tất cả dependencies
pnpm install
```

### 3.3. Cấu hình API Key

```bash
# Tạo file .env từ template
cp .env.example .env

# Mở file .env và điền API Key
# Windows: notepad .env
# Linux/Mac: nano .env
```

Nội dung file `.env`:

```env
GEMINI_API_KEY=AIzaSy_YOUR_ACTUAL_API_KEY_HERE
```

> 💡 **Mẹo:** Bạn có thể cấu hình nhiều API Key cách nhau bằng dấu phẩy để kích hoạt cơ chế **Multi-Key Fallback** — khi một key hết quota, hệ thống tự chuyển sang key tiếp theo:
> ```env
> GEMINI_API_KEY=key1,key2,key3
> ```

### 3.4. Khởi chạy (Development)

```bash
pnpm dev
```

Lệnh này sẽ khởi chạy **đồng thời**:
- 🌐 **Vite Dev Server** (Frontend) → `http://localhost:3301`
- ⚙️ **Express Server** (Backend API) → `http://localhost:3300`

Vite tự động proxy các request `/api/*` từ port 3301 → 3300.

> ✅ Mở trình duyệt tại **http://localhost:3301** để bắt đầu sử dụng.

### 3.5. Build Production

```bash
pnpm build
pnpm start
```

Ứng dụng production chạy tại `http://localhost:3300`.

---

## 4. Cấu hình biến môi trường

| Biến | Bắt buộc | Mô tả | Ví dụ |
|------|----------|-------|-------|
| `GEMINI_API_KEY` | ✅ | API Key Google Gemini (1 hoặc nhiều, phân cách bằng dấu `,`) | `AIzaSy...` |
| `JWT_SECRET` | ❌ | Secret key mã hóa JWT (mặc định: `fallback_secret_for_dev_only`) | `my_super_secret` |
| `PORT` | ❌ | Cổng chạy server (mặc định: `3300`) | `3300` |
| `NODE_ENV` | ❌ | Môi trường chạy (mặc định: `development`) | `production` |

### Lấy Gemini API Key

1. Truy cập [Google AI Studio](https://aistudio.google.com/apikey)
2. Đăng nhập bằng tài khoản Google
3. Nhấn **"Create API Key"**
4. Copy key và dán vào file `.env`

> ⚠️ **Lưu ý:** API Key miễn phí có giới hạn **15 request/phút** và **1500 request/ngày**. Nên tạo nhiều key để dùng chế độ fallback.

---

## 5. Kiến trúc dự án

```
FamilyClinicChatbot/
├── client/                     # 🌐 Frontend (React + Vite)
│   ├── index.html              #   Entry point HTML
│   ├── public/                 #   Static assets
│   └── src/
│       ├── App.tsx             #   Router chính (wouter)
│       ├── main.tsx            #   Bootstrap React
│       ├── index.css           #   Global styles (TailwindCSS)
│       ├── const.ts            #   Hằng số client
│       ├── components/         #   UI Components
│       │   ├── ui/             #     shadcn/ui components
│       │   ├── BottomNav.tsx   #     Navigation bar dưới
│       │   ├── ErrorBoundary.tsx
│       │   └── Map.tsx         #     Google Maps component
│       ├── contexts/           #   React Context
│       │   ├── AuthContext.tsx  #     Quản lý xác thực
│       │   └── ThemeContext.tsx #     Dark/Light mode
│       ├── hooks/              #   Custom hooks
│       └── pages/              #   Các trang chính
│           ├── Splash.tsx      #     Màn hình chào
│           ├── Auth.tsx        #     Đăng ký / Đăng nhập
│           ├── Home.tsx        #     Trang chủ
│           ├── Consultation.tsx#     Chat AI / Bác sĩ
│           ├── Doctors.tsx     #     Danh sách Bác sĩ
│           ├── Medicine.tsx    #     Tra cứu & Nhắc thuốc
│           ├── Emergency.tsx   #     Gọi cấp cứu SOS
│           ├── Health.tsx      #     Chỉ số sức khỏe
│           └── Profile.tsx     #     Hồ sơ cá nhân
│
├── server/                     # ⚙️ Backend (Express)
│   ├── index.ts                #   Entry point server
│   ├── db/
│   │   ├── index.ts            #   Kết nối SQLite (libsql)
│   │   └── schema.ts           #   Drizzle ORM schema
│   ├── middleware/
│   │   └── auth.ts             #   JWT middleware
│   └── routes/
│       ├── auth.ts             #   API đăng ký / đăng nhập
│       └── chat.ts             #   API chat AI + lịch sử
│
├── shared/                     # 📦 Code dùng chung
│   └── const.ts                #   Hằng số chung
│
├── .env.example                # Template biến môi trường
├── Dockerfile                  # Docker multi-stage build
├── docker-compose.yml          # Docker Compose config
├── drizzle.config.ts           # Drizzle ORM config
├── package.json                # Dependencies & scripts
├── vite.config.ts              # Vite build config
├── tsconfig.json               # TypeScript config
└── sqlite.db                   # SQLite database file
```

### Sơ đồ kiến trúc

```
┌─────────────────────────────────────────────────┐
│                   Client (React)                │
│  Splash → Auth → Home → Consultation/Doctors/…  │
│         ↕ fetch("/api/*")                       │
├─────────────────────────────────────────────────┤
│              Express Server (Node.js)           │
│   /api/auth/*  ──→  JWT + bcrypt                │
│   /api/chat/*  ──→  Google Gemini AI            │
│         ↕ Drizzle ORM                           │
├─────────────────────────────────────────────────┤
│              SQLite Database                    │
│   users │ conversations │ messages              │
└─────────────────────────────────────────────────┘
```

### Cơ sở dữ liệu (3 bảng)

| Bảng | Mô tả | Trường chính |
|------|--------|-------------|
| `users` | Thông tin người dùng | `id`, `email`, `password_hash`, `name`, `created_at` |
| `conversations` | Cuộc hội thoại | `id`, `user_id` (FK), `title`, `created_at`, `updated_at` |
| `messages` | Tin nhắn trong hội thoại | `id`, `conversation_id` (FK), `role` (user/model), `content`, `created_at` |

---

## 6. Hướng dẫn sử dụng các tính năng

### 6.1. Đăng ký / Đăng nhập

1. Mở ứng dụng → Màn hình **Splash** hiển thị
2. Nhấn **"Bắt đầu"** để vào trang đăng nhập
3. **Đăng ký:** Điền Họ tên, Email, Mật khẩu → Nhấn "Đăng ký"
4. **Đăng nhập:** Nhập Email + Mật khẩu → Nhấn "Đăng nhập"
5. Sau khi đăng nhập thành công → Chuyển đến **Trang chủ**

> Token JWT được lưu vào `localStorage`, có hiệu lực **7 ngày**.

### 6.2. Trang chủ (Home)

- Hiển thị lời chào cá nhân hóa (tên người dùng + avatar tự động sinh)
- **Ô tìm kiếm:** Nhập mô tả triệu chứng → Nhấn "Hỏi AI" → Chuyển sang trang Tư vấn
- **Gợi ý nhanh** (4 nút):
  - 🩺 Kiểm tra triệu chứng
  - 📸 Chẩn đoán hình ảnh
  - 📅 Đặt lịch khám
  - ⏰ Hỏi về đơn thuốc
- **Lịch sử tư vấn gần đây** — 3 cuộc hội thoại mới nhất

### 6.3. Tư vấn Sức khỏe (Consultation)

Đây là tính năng cốt lõi của ứng dụng, gồm 2 chế độ:

#### Chế độ 🤖 AI
- Chat với AI Trợ lý Y tế (Google Gemini)
- AI sẽ hỏi han, phân tích triệu chứng và đưa lời khuyên chăm sóc ban đầu
- **Luôn nhắc nhở** bệnh nhân đến gặp bác sĩ nếu triệu chứng nghiêm trọng
- Hỗ trợ **Đặt lịch khám** — AI sẽ hỏi thông tin bác sĩ và phòng khám

#### Chế độ 👨‍⚕️ Bác sĩ
- Chat trực tiếp với bác sĩ chuyên khoa (demo)

#### Các phương thức giao tiếp

| Phương thức | Cách sử dụng |
|-------------|-------------|
| 💬 **Văn bản** | Nhập tin nhắn → Nhấn nút gửi (hoặc Enter) |
| 📸 **Hình ảnh** | Nhấn icon ảnh → Chọn file → AI tự động phân tích |
| 🎙️ **Giọng nói** | Nhấn icon mic → Thu âm → Nhấn Stop |

### 6.4. Kết nối Bác sĩ (Doctors)

- Danh sách bác sĩ với thông tin: chuyên khoa, đánh giá, địa chỉ, giá khám
- Nút **"Đặt lịch"** và **"Chat"** cho mỗi bác sĩ
- Tìm kiếm bác sĩ theo tên

### 6.5. Tư vấn Thuốc & Nhắc nhở (Medicine)

- **Tra cứu thuốc:** Tìm kiếm theo tên hoặc loại thuốc
- **Chi tiết thuốc:** Liều dùng, cách sử dụng, tác dụng phụ, chống chỉ định, lưu ý
- **Nhắc nhở uống thuốc:**
  - Nhấn "Đặt lịch" trong trang chi tiết thuốc
  - Tự động tạo lịch nhắc 08:00 và 20:00
  - Đánh dấu đã uống / Xóa lịch nhắc
  - Dữ liệu lưu trong `localStorage`

### 6.6. Lịch sử Sức khỏe (Health)

- Hiển thị các chỉ số: Huyết áp, Nhịp tim, Đường huyết, SpO2
- Trạng thái: Bình thường / Cần chú ý / Cảnh báo (mã màu)
- Thêm chỉ số sức khỏe mới

### 6.7. Gọi Cấp cứu SOS (Emergency)

- **Nút SOS lớn** — Nhấn để mô phỏng gọi cấp cứu 115
- Danh sách liên hệ cấp cứu nhanh (gọi trực tiếp qua `tel:`)
- Chia sẻ vị trí tự động
- Mẹo khi gọi cấp cứu

### 6.8. Hồ sơ cá nhân (Profile)

- Thông tin cá nhân: tên, email, nhóm máu, dị ứng
- **Tiền sử bệnh lý (AI Phân tích)** — Tự động trích xuất triệu chứng từ toàn bộ lịch sử chat bằng AI
- Liên hệ khẩn cấp
- Đăng xuất

---

## 7. API Endpoints

**Base URL:** `http://localhost:3300/api`

Tất cả endpoint (trừ Auth) yêu cầu header:
```
Authorization: Bearer <JWT_TOKEN>
```

### 7.1. Authentication

| Method | Endpoint | Mô tả | Body |
|--------|----------|-------|------|
| `POST` | `/api/auth/register` | Đăng ký tài khoản | `{ email, password, name }` |
| `POST` | `/api/auth/login` | Đăng nhập | `{ email, password }` |
| `GET` | `/api/auth/me` | Lấy thông tin user hiện tại | — |

**Response đăng nhập/đăng ký thành công:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": { "id": "abc123", "email": "user@example.com", "name": "Nguyễn Văn A" }
}
```

### 7.2. Chat AI

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/api/chat` | Lấy danh sách hội thoại của user |
| `GET` | `/api/chat/:id/messages` | Lấy tin nhắn của một hội thoại |
| `GET` | `/api/chat/symptoms-summary` | AI phân tích tiền sử bệnh lý |
| `POST` | `/api/chat` | Gửi tin nhắn cho AI |

**POST `/api/chat` — Request:**
```json
{
  "text": "Tôi bị đau đầu và sốt nhẹ",
  "imageBase64": "data:image/jpeg;base64,...",
  "conversationId": "abc123"
}
```

**Response:**
```json
{
  "response": "Bạn có kèm theo triệu chứng khác không...",
  "conversationId": "abc123"
}
```

> Nếu `conversationId` không truyền, server sẽ tự tạo cuộc hội thoại mới.

### 7.3. Cơ chế Multi-API Key Fallback

Khi một API Key bị lỗi quota (HTTP 429), hệ thống tự động:
1. Ghi log cảnh báo
2. Chuyển sang API Key tiếp theo trong danh sách
3. Thử lại request
4. Nếu **tất cả** key đều hết quota → Trả lỗi `ALL_KEYS_EXHAUSTED`

---

## 8. Triển khai Production với Docker

### 8.1. Build & chạy nhanh

```bash
# Build và chạy container
docker compose up -d --build

# Kiểm tra trạng thái
docker ps
```

Ứng dụng chạy tại `http://localhost:3300`.

### 8.2. Chi tiết Dockerfile

Sử dụng **multi-stage build** để tối ưu kích thước image:
- **Stage 1 (Builder):** Cài dependencies + Build frontend (Vite) & backend (ESBuild)
- **Stage 2 (Production):** Chỉ chứa production dependencies + build output

### 8.3. Docker Compose

```yaml
services:
  family-chatbot:
    build: .
    container_name: family_clinic_chatbot
    ports:
      - "3300:3300"
    volumes:
      - ./sqlite.db:/app/sqlite.db    # Persist database
    env_file:
      - .env
    restart: always
```

> ⚠️ **Quan trọng:** Volume `sqlite.db` đảm bảo database không bị mất khi xóa container.

### 8.4. Dừng & xóa container

```bash
docker compose down
```

---

## 9. Xử lý sự cố thường gặp

### ❌ Lỗi "API_KEY_MISSING"

**Nguyên nhân:** Chưa cấu hình biến `GEMINI_API_KEY` trong file `.env`.

**Giải pháp:**
```bash
# Tạo / chỉnh sửa file .env
echo "GEMINI_API_KEY=YOUR_KEY_HERE" > .env
# Khởi động lại server
pnpm dev
```

### ❌ Lỗi "ALL_KEYS_EXHAUSTED" (429 Quota Exceeded)

**Nguyên nhân:** Tất cả API Key đã hết hạn mức miễn phí.

**Giải pháp:**
1. Tạo thêm API Key tại [Google AI Studio](https://aistudio.google.com/apikey)
2. Thêm vào `.env` (phân cách bằng dấu `,`)
3. Hoặc chờ đến ngày hôm sau (quota reset hàng ngày)

### ❌ Port 3300/3301 đã bị chiếm

```bash
# Windows
netstat -aon | findstr :3300
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3300
kill -9 <PID>
```

### ❌ Lỗi pnpm install thất bại

```bash
# Xóa cache và cài lại
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### ❌ Database lỗi / cần reset

```bash
# Xóa database cũ (mất toàn bộ dữ liệu)
rm sqlite.db

# Khởi động lại — Drizzle sẽ tạo lại database tự động
pnpm dev
```

---

## 10. Đóng góp & Phát triển

### Scripts có sẵn

| Lệnh | Mô tả |
|-------|-------|
| `pnpm dev` | Chạy Development (Frontend + Backend đồng thời) |
| `pnpm build` | Build Production bundle |
| `pnpm start` | Chạy Production server |
| `pnpm check` | Kiểm tra TypeScript (không build) |
| `pnpm format` | Format code bằng Prettier |

### Quy trình phát triển

1. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
2. Code & test local: `pnpm dev`
3. Kiểm tra TypeScript: `pnpm check`
4. Format code: `pnpm format`
5. Commit & Push
6. Tạo Pull Request

### Thêm trang mới (Frontend)

1. Tạo file trong `client/src/pages/TenTrang.tsx`
2. Thêm route trong `client/src/App.tsx`:
   ```tsx
   <Route path={"/ten-trang"}>
     <ProtectedRoute component={TenTrang} />
   </Route>
   ```
3. (Tùy chọn) Thêm icon vào `BottomNav.tsx`

### Thêm API mới (Backend)

1. Tạo file route trong `server/routes/ten-route.ts`
2. Đăng ký trong `server/index.ts`:
   ```ts
   import tenRouter from "./routes/ten-route.js";
   app.use("/api/ten-route", tenRouter);
   ```

---

## 📄 Giấy phép

MIT License — Xem chi tiết tại [LICENSE](../LICENSE).

---

> 📧 **Liên hệ:** Nếu gặp vấn đề, vui lòng tạo Issue trên GitHub hoặc liên hệ nhóm phát triển.
