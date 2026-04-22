import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import * as fs from "fs";

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                text: "CHƯƠNG 5: KẾ HOẠCH PHÁT TRIỂN AGILE (AGILE PLAN)",
                heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
                text: "Dự án: Hệ thống Chatbot Tư vấn Y tế Gia đình",
                heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({ text: "" }),
            
            new Paragraph({
                text: "5.1. Tổ chức nhóm và Phân vai trò",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({ text: "Theo phương pháp luận Agile/Scrum, nhóm phát triển được tổ chức như sau:", bold: true }),
                ]
            }),
            new Paragraph({ text: "- Product Owner (PO): Chịu trách nhiệm định nghĩa các tính năng (User Stories), sắp xếp mức độ ưu tiên trong Product Backlog và đảm bảo sản phẩm đáp ứng đúng nhu cầu chăm sóc sức khỏe của người dùng." }),
            new Paragraph({ text: "- Scrum Master: Đảm bảo quy trình làm việc trơn tru, điều phối các buổi họp (Daily, Planning, Review) và giải quyết các trở ngại kỹ thuật (ví dụ: lỗi kết nối Database, xung đột cổng mạng)." }),
            new Paragraph({ text: "- Development Team: Đội ngũ lập trình viên đảm nhiệm phát triển Frontend (React, Vite, TailwindCSS), Backend (Express, Node.js), tích hợp cơ sở dữ liệu (SQLite, Drizzle ORM) và tích hợp Trí tuệ nhân tạo (Google Gemini AI)." }),
            new Paragraph({ text: "" }),

            new Paragraph({
                text: "5.2. Product Backlog (Danh sách yêu cầu tính năng)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({ text: "1. Đăng ký & Đăng nhập: Người dùng có thể tạo tài khoản và đăng nhập an toàn bằng JWT và Bcrypt." }),
            new Paragraph({ text: "2. Chatbot Y tế AI: Người bệnh có thể nhắn tin hỏi đáp triệu chứng sức khỏe, hệ thống dùng prompt chuyên khoa để phản hồi." }),
            new Paragraph({ text: "3. Lưu trữ Lịch sử Hội thoại: Tự động lưu trữ đoạn chat vào SQLite theo từng User ID và hiển thị ở Trang chủ." }),
            new Paragraph({ text: "4. Khôi phục Session: Người dùng có thể bấm vào lịch sử cũ để tiếp tục cuộc trò chuyện đã qua." }),
            new Paragraph({ text: "5. Bảo mật Route (Protected Routes): Chặn truy cập trái phép nếu người dùng chưa có Token đăng nhập hợp lệ." }),
            new Paragraph({ text: "" }),

            new Paragraph({
                text: "5.3. Kế hoạch Sprint (Sprint Planning)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [new TextRun({ text: "Sprint 1: Xây dựng nền tảng & UI (1 Tuần)", bold: true })]
            }),
            new Paragraph({ text: "- Khởi tạo kiến trúc dự án với Vite và cấu trúc thư mục tiêu chuẩn." }),
            new Paragraph({ text: "- Thiết kế giao diện (UI) glassmorphism cho các trang: Login/Register, Home, Consultation." }),
            new Paragraph({
                children: [new TextRun({ text: "Sprint 2: Tích hợp Database & Authentication (1 Tuần)", bold: true })]
            }),
            new Paragraph({ text: "- Triển khai SQLite với Drizzle ORM (schema: users, conversations, messages)." }),
            new Paragraph({ text: "- Xây dựng Middleware xác thực JWT, bảo mật mật khẩu, và hoàn thiện API Đăng nhập/Đăng ký." }),
            new Paragraph({
                children: [new TextRun({ text: "Sprint 3: Tích hợp AI và Quản lý Hội thoại (1 Tuần)", bold: true })]
            }),
            new Paragraph({ text: "- Tích hợp Google Gemini AI 2.5 Flash, viết System Prompt đóng vai trò Trợ lý Y tế." }),
            new Paragraph({ text: "- Kết nối API từ Frontend lên Backend, thiết lập luồng lưu tin nhắn 2 chiều (User/AI) vào Database." }),
            new Paragraph({ text: "- Đổ dữ liệu từ DB lên UI để hiện danh sách Lịch sử tư vấn." }),
            new Paragraph({
                children: [new TextRun({ text: "Sprint 4: Kiểm thử tự động (Auto-Testing) và Bàn giao (1 Tuần)", bold: true })]
            }),
            new Paragraph({ text: "- Triển khai công cụ kiểm thử tự động (Bot Automation/Subagent) để mô phỏng hành vi của người bệnh (tạo tài khoản, hỏi bệnh, xem lịch sử)." }),
            new Paragraph({ text: "- Xử lý dứt điểm các lỗi bất đồng bộ và xung đột cổng mạng (Network Port Conflict) giữa máy chủ Frontend và Backend." }),
            new Paragraph({ text: "- Hoàn thiện tài liệu đồ án (Walkthrough, API Specs) và đóng gói mã nguồn để bàn giao." }),
            new Paragraph({ text: "" }),

            new Paragraph({
                text: "5.4. Theo dõi & Đánh giá (Review & Retrospective)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({ text: "- Dự án đã áp dụng triệt để vòng lặp phát triển linh hoạt (Agile), liên tục nhận phản hồi và cải tiến qua từng Sprint." }),
            new Paragraph({ text: "- Nhờ việc phân chia công việc nhỏ giọt, nhóm đã giải quyết được nút thắt kỹ thuật quan trọng nhất ở Sprint 4: Hệ thống Vite và ExpressJS xung đột cổng mạng, dẫn đến lỗi 500. Giải pháp cô lập cổng (3301 và 3300) kết hợp cấu hình HTTP Proxy đã giúp ứng dụng vận hành trơn tru." }),
            new Paragraph({ text: "- Việc thiết kế Database bằng SQLite gọn nhẹ thay vì các hệ quản trị CSDL cồng kềnh cũng là một quyết định kịp thời, giúp dự án bám sát tiến độ bàn giao của môn học mà vẫn đảm bảo được tính năng lưu trữ dữ liệu người dùng một cách bền vững." }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Kết luận chương 5:",
                heading: HeadingLevel.HEADING_3,
            }),
            new Paragraph({ text: "Việc ứng dụng Agile Plan đã giúp dự án kiểm soát rủi ro cực tốt. Quá trình kiểm thử tự động toàn trình (Full E2E Automation Test) ở giai đoạn cuối đã chứng minh sản phẩm đạt độ hoàn thiện 100% theo các User Story cốt lõi đề ra từ ban đầu." }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("d:/Documents/FamilyClinicChatbot/docs/Chuong5_Agile_Plan.docx", buffer);
    console.log("Document generated successfully!");
});
