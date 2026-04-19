# CHƯƠNG 5: TRIỂN KHAI PHÁT TRIỂN LINH HOẠT VÀ TÍCH HỢP KHÁM PHÁ – TRIỂN KHAI

*Chương này trình bày chi tiết về phương pháp luật Phát triển phần mềm linh hoạt (Agile) được áp dụng cho dự án "Chatbot Phòng Khám Gia Đình". Dựa trên kết quả Phân tích thiết kế (Design Thinking) của các chương trước, chúng tôi sử dụng khung làm việc Scrum để lập kế hoạch, phân rã chức năng và tổ chức phát triển lặp vòng (Iterative Development) nhằm xây dựng hệ thống AI có tính ứng dụng cao nhất.*

---

## 5.1 Xây Dựng Tầm Nhìn Sản Phẩm (Product Vision & Themes)

Tầm nhìn của dự án là tạo ra một "Bác sĩ ảo/Trợ lý y khoa số" có khả năng trực 24/7, giúp các gia đình có thể tự chẩn đoán sơ bộ, theo dõi sức khỏe và kết nối với các dịch vụ y tế một cách nhanh chóng, chính xác nhờ công nghệ AI tạo sinh (Google Gemini).

Dựa trên tầm nhìn đó, hệ thống được cấu trúc thành các Nhóm tính năng chính (Product Themes) sau:

- **Theme 1: AI Chatbot & Trợ lý Chăm sóc Sức khỏe (Core):** Tập trung vào trải nghiệm cốt lõi, khả năng AI đọc hiểu ngôn ngữ tự nhiên, phân tích hình ảnh bệnh án/tổn thương để đưa ra các tư vấn y khoa cấp thiết theo chuẩn mực đạo đức y tế.
- **Theme 2: Quản lý Khám bệnh (Booking & Emergency):** Tích hợp luồng đặt lịch hẹn với bác sĩ thật và quy trình gọi cấp cứu nhanh.
- **Theme 3: Quản lý Hồ sơ Sức khỏe Cục bộ (Records & Analytics):** Lưu trữ lịch sử khám, đơn thuốc, nhắc hẹn uống thuốc và các chỉ số sức khỏe cơ bản của cá nhân.

---

## 5.2 Phân Rã Chức Năng Cốt Lõi (Epics & User Stories)

Để cụ thể hóa các Themes, chúng tôi tiến hành phân rã thành các Epics lớn và từ đó chia nhỏ thành các User Stories (Câu chuyện người dùng). Mỗi User Story đi kèm với Tiêu chí nghiệm thu (Acceptance Criteria) sử dụng văn phong BDD (Given-When-Then).

### Epic 1.1: Trợ lý Tra cứu Y tế Thông minh (Medical AI Assistant)
Mô tả: Hệ thống Chatbot có khả năng tương tác văn bản với người bệnh như một chuyên gia y tế.

| ID | User Story | Acceptance Criteria (Tiêu chí nghiệm thu) | Story Points |
|:---|:---|:---|:---:|
| **US-01** | Là **người bệnh / người dùng**, tôi muốn **nhắn tin mô tả triệu chứng của mình cho Chatbot**, để **nhận được lời khuyên, dự đoán nguyên nhân và hướng xử lý sơ bộ**. | **Given** người dùng đang ở giao diện Tư vấn (Consultation).<br>**When** người dùng gõ tin nhắn mô tả triệu chứng bệnh và bấm "Gửi".<br>**Then** hệ thống hiển thị trạng thái "đang xử lý" và phản hồi kết quả tư vấn y tế chuẩn xác, kèm theo từ khóa cảnh báo: "Đây chỉ là tư vấn từ AI, cần đến cơ sở y tế". | 5 |
| **US-02** | Là **người cao tuổi**, tôi muốn **gửi tin nhắn bằng hình ảnh / giọng nói trực tiếp**, để **rút ngắn thời gian gõ phím trên điện thoại**. | **Given** giao diện khung chat đang mở.<br>**When** người dùng tải lên hình bức ảnh vết thương / toa thuốc.<br>**Then** hệ thống AI tự động trích xuất thông tin (Image to Text) và đưa ra chẩn đoán dựa vào hình ảnh cung cấp. | 8 |

### Epic 2.1: Đặt Lịch Khám Điện Tử (Online Appointment)
Mô tả: Số hóa quy trình đặt lịch gặp bác sĩ chuyên khoa hoặc tái khám.

| ID | User Story | Acceptance Criteria (Tiêu chí nghiệm thu) | Story Points |
|:---|:---|:---|:---:|
| **US-03** | Là **người dùng**, tôi muốn **đặt lịch khám bằng cách giao tiếp trực tiếp với Chatbot**, để **không phải tự tay điền các form đăng ký phức tạp**. | **Given** hệ thống đã hiểu ý định đặt lịch khám.<br>**When** người dùng nói "Tôi muốn đặt lịch tới phòng khám".<br>**Then** Chatbot gợi ý lấy thông tin ngày giờ, xác nhận lại và ghi vào Database lịch khám hệ thống. | 5 |
| **US-04** | Là **người dùng**, tôi muốn **xem lại lịch sử các buổi chat / tư vấn cũ**, để **tra cứu lại đơn thuốc đã được nhắc**. | - Lưu trữ tin nhắn cục bộ (Local Storage).<br>- Giao diện hiển thị danh sách buổi trò chuyện theo thời gian. | 3 |

---

## 5.3 Danh Sách Công Việc Và Đánh Giá Mức Độ Ưu Tiên (Prioritized Product Backlog)

Việc đánh giá ưu tiên cho Product Backlog được thực hiện dựa trên ma trận **Giá trị (Value)** mang lại cho người dùng và **Công sức (Effort)** phát triển (ước lượng trên thang 1-10).

*Sử dụng công thức tính điểm ưu tiên (Priority Score) = Value / Effort.*

| ID | Chức Năng (Features List) | Giá trị (Value) | Công sức (Effort) | Priority Score | Mức độ ưu tiên |
|:---|:---|:---:|:---:|:---:|:---|
| **E1-US01** | Xây dựng API và giao diện nhắn tin (Text-based) tích hợp Gemini AI cho Chatbot. | 10 | 5 | 2.0 | **P1 (Core/Sprint 1)** |
| **E1-US02** | Khả năng Upload và phân tích hình ảnh đa phương thức (Vision AI). | 9 | 6 | 1.5 | **P1 (Core/Sprint 1)** |
| **E2-US03** | Đặt lịch khám và xử lý dữ liệu qua Form. | 8 | 5 | 1.6 | **P2 (Trung bình)** |
| **E3-US05** | UI Dashboard cá nhân (Hồ sơ sức khỏe, Lịch khám, Nhắc thuốc). | 7 | 6 | 1.16 | **P2 (Trung bình)** |
| **E1-US06** | Nhập liệu bằng Giọng Nói (Voice-to-text) qua Web Speech API. | 7 | 8 | 0.87 | **P3 (Triển khai sau)** |
| **E2-US07** | Live Chat với Bác sĩ thật mặt đối mặt (Socket.IO realtime). | 6 | 10 | 0.6 | **P4 (Dài hạn)** |

---

## 5.4 Lộ Trình Phát Hành Sản Phẩm (Product Roadmap)

Lộ trình dự kiến kéo dài trong 3 Sprints (tương đương 1 tháng, độ dài mỗi Sprint là 1.5 tuần), bám sát để tạo ra Minimum Viable Product (MVP) đầy đủ chứng năng cho bài báo cáo đồ án môn học:

### 🚀 Release 1.0 (MVP) - Ra mắt vào cuối Tuần 2
**Mục tiêu:** Định hình kiến trúc phần mềm, kết nối API và đưa ra bản thử nghiệm Chat thông minh.
- Triển khai kiến trúc React (Vite) cho Frontend, Node.js/Express cho Backend.
- Hoàn thiện UI/UX chuẩn phong cách Medical (Glassmorphism, Teal Theme).
- Phát hành tính năng Nhắn tin văn bản thông minh tích hợp Google Gemini AI.
- Phát hành khả năng Nhận diện Hình ảnh bằng AI (Multimodal AI).

### 🚀 Release 1.1 (Alpha) - Ra mắt vào cuối Tuần 3
**Mục tiêu:** Mở rộng tương tác của người dùng.
- Hoàn thiện các giao diện Dashboard người dùng `Profile`, `Home`.
- Tích hợp tính năng lưu trữ lịch sử tin nhắn.
- Tích hợp xử lý Micro/Góp ý bằng âm thanh (Voice input UI).

### 🚀 Release 2.0 (Beta / Báo Cáo) - Ra mắt vào cuối Tuần 4
**Mục tiêu:** Đóng gói ứng dụng, tối ưu hóa hệ thống để chạy Demo trực tiếp trên thiết bị lúc báo cáo.
- Vận hành mượt mà quá trình tải dữ liệu.
- Viết Test Cases và Fix bugs tồn đọng.

---

## 5.5 Kế Hoạch Sprint 1 (Sprint Planning)

Dựa theo lộ trình, nhóm tập trung thực thi Sprint thứ Nhất với vai trò sống còn để tạo ra công nghệ Core cho dự án "Family Clinic Chatbot".

### A. Thông tin Sprint
- **Sprint Goal:** Hoàn thiện Hệ thống API giao tiếp AI (Backend) và Xây dựng Giao diện nhắn tin nổi (Frontend) tích hợp thành công Google Gemini 2.5 Flash xử lý văn bản và hình ảnh đa phương thức.
- **Sprint Duration:** 7 ngày làm việc (1 Tuần).
- **Vận tốc (Velocity) kỳ vọng:** 20 Story Points.

### B. Sprint Backlog

| Task ID | Mô tả chi tiết Công việc | Kỹ năng liên quan | Trạng thái |
|:---|:---|:---|:---:|
| **T-1.1** | Khởi tạo dự án bằng Vite (React + TS) và Express Server với cấu trúc Monorepo. | Frontend | Hoàn thành |
| **T-1.2** | Thiết lập Design System (mảng màu TailwindCSS Medical: #0d9488) và thư viện UI (Lucide React, Button, Input). | Frontend | Hoàn thành |
| **T-1.3** | Cài đặt package `@google/genai`, thiết lập API Key bảo mật qua `dotenv`. | Backend | Hoàn thành |
| **T-1.4** | Thiết kế API Server `/api/chat` chuyên xử lý Prompt System: *"Bạn là Trợ lý AI Phòng Khám Gia Đình..."*. | Backend | Hoàn thành |
| **T-1.5** | Lập trình logic trang `Consultation.tsx` giao tiếp với Backend: Gửi Json Body (Text + Base64 Image). | Full-stack | Cần Testing |
| **T-1.6** | Thiết kế thanh Input nổi (Floating Bar) chuẩn khuôn mẫu ứng dụng di động Glassmorphism. | Frontend | Cần Testing |

### C. Quản lý Quy trình Scrum
*   **Daily Scrum:** Gặp nhau trực tuyến 15 phút vào 9h00 sáng để trả lời ba câu hỏi: Đã làm gì hôm qua? Hôm nay làm gì? Có gặp rào cản (Blockers) nào không (VD: Chưa kết nối được API Key, lỗi thư viện).
*   **Sprint Review:** Phô diễn (Demo) giao diện Chat AI chạy thực tế trên Localhost 3000, kiểm chứng khả năng đọc và hiểu toa thuốc / hình ảnh từ AI với Giảng viên / Product Owner.
*   **Sprint Retrospective:** Tổng kết lại các điểm hạn chế (VD: thời gian chờ GenAI trả kết quả đôi khi bị chậm cần gắn Loading Indicator đẹp hơn).  

---

## 5.6 Tích Hợp Khám Phá - Triển Khai (Continuous Discovery & Delivery)

Dự án không dừng lại ở việc lập trình xong là kết thúc. Sự kết hợp giữa Khám phá (Tìm hiểu nhu cầu) và Triển khai (Xây dựng, test liên tục) được diễn ra theo nguyên lý Agile:

1. **Khám phá liên tục (Discovery phase):** Thông qua việc liên tục trò chuyện với các bệnh nhân (bạn học, thành viên gia đình) thử dùng Prototype, chúng tôi phát hiện ra việc phải có **Cảnh báo Y tế** ở cuối mọi câu chat của AI để tránh vi phạm rủi ro đạo đức y khoa.
2. **Triển khai linh hoạt (Delivery phase):** Nhờ việc viết Prompt "Roleplay" rất kỹ ngay tại `server/routes/chat.ts`, những thay đổi về yêu cầu chuyên môn được hệ thống AI áp dụng ngay lập tức mà không cần Build lại mã nguồn quá lâu. Sản phẩm sau khi Dev xong được Build ra file nén (`vite build`) để vận hành trên môi trường Node tĩnh, sẵn sàng demo mọi lúc trên bất kỳ thiết bị nào. 

*(Ghi chú: Toàn bộ quá trình code Prototype này đã được mã hóa, tự động hóa và quay video demo làm bằng chứng cho năng lực thực tế của nhóm phát triển.)*
