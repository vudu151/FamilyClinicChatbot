import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from "docx";
import * as fs from "fs";

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                text: "CHƯƠNG 5: KẾ HOẠCH PHÁT TRIỂN AGILE (AGILE PLAN)",
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
            
            // 5.1
            new Paragraph({
                text: "5.1. Tổng quan về phương pháp luận và Tổ chức nhóm",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                text: "Trong khuôn khổ của đồ án, phương pháp luận Agile kết hợp với mô hình Scrum đã được lựa chọn làm kim chỉ nam cho toàn bộ quá trình phát triển hệ thống Chatbot Tư vấn Y tế Gia đình. Việc áp dụng Agile cho phép nhóm dự án linh hoạt thích ứng với các thay đổi về yêu cầu, đồng thời chia nhỏ khối lượng công việc khổng lồ thành các phân đoạn ngắn hạn (Sprint) để dễ dàng kiểm soát và đánh giá.",
                spacing: { after: 200 }
            }),
            new Paragraph({
                text: "Lý do lựa chọn Agile thay vì mô hình Thác nước (Waterfall) truyền thống xuất phát từ bản chất của một hệ thống tích hợp Trí tuệ Nhân tạo (AI). Các phản hồi từ API của Google Gemini, yêu cầu về độ trễ, hay các thay đổi trong cách hiển thị giao diện UI/UX đòi hỏi sự tinh chỉnh liên tục mà chỉ có mô hình lặp (Iterative) mới có thể đáp ứng được một cách hiệu quả.",
                spacing: { after: 200 }
            }),
            new Paragraph({
                text: "Về mặt tổ chức, đội ngũ phát triển được phân chia thành các vai trò cốt lõi trong Scrum:",
                spacing: { after: 100 }
            }),
            new Paragraph({ text: "- Product Owner (PO): Chịu trách nhiệm thấu hiểu nhu cầu của người bệnh và bác sĩ, từ đó phác thảo ra các tính năng cần thiết. PO là người nắm giữ và quản lý Product Backlog, quyết định tính năng nào sẽ mang lại giá trị cao nhất (ví dụ: ưu tiên tính năng lưu lịch sử chat trước tính năng gọi video)." }),
            new Paragraph({ text: "- Scrum Master: Đóng vai trò là người bảo vệ quy trình, hỗ trợ nhóm tổ chức các buổi Daily Meeting, Sprint Planning, và Sprint Retrospective. Đặc biệt trong đồ án này, Scrum Master đóng vai trò then chốt trong việc dọn dẹp các rào cản kỹ thuật (ví dụ như việc tìm ra giải pháp cho lỗi xung đột cổng mạng giữa Vite và ExpressJS)." }),
            new Paragraph({ text: "- Development Team (Nhóm Phát triển): Là lực lượng nòng cốt trực tiếp biến các yêu cầu thành mã nguồn. Đội ngũ này đòi hỏi kỹ năng full-stack, từ việc thao tác với React, TailwindCSS ở Frontend, cho đến việc thiết kế sơ đồ dữ liệu SQLite, viết middleware xác thực JWT và kết nối API Gemini ở Backend." }),
            new Paragraph({ text: "" }),

            // 5.2
            new Paragraph({
                text: "5.2. Quản lý Yêu cầu và Product Backlog",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                text: "Để đảm bảo không bỏ sót bất kỳ tính năng nào, toàn bộ yêu cầu của hệ thống được chuyển hóa thành các User Story (Câu chuyện người dùng) và tập hợp lại trong Product Backlog. Các User Story này được đánh giá dựa trên mức độ ưu tiên (Priority) và độ phức tạp (Story Points).",
                spacing: { after: 200 }
            }),
            new Paragraph({
                text: "Dưới đây là bảng Product Backlog chi tiết của dự án:",
                spacing: { after: 200 }
            }),
            
            // Table for Product Backlog
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ text: "Mã", bold: true })] }),
                            new TableCell({ children: [new Paragraph({ text: "User Story (Câu chuyện người dùng)", bold: true })] }),
                            new TableCell({ children: [new Paragraph({ text: "Mức độ ưu tiên", bold: true })] }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("US-01")] }),
                            new TableCell({ children: [new Paragraph("Là một người dùng mới, tôi muốn có thể đăng ký tài khoản bằng email và mật khẩu để sử dụng dịch vụ của phòng khám cá nhân hóa.")] }),
                            new TableCell({ children: [new Paragraph("Cao (High)")] }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("US-02")] }),
                            new TableCell({ children: [new Paragraph("Là hệ thống, tôi cần mã hóa mật khẩu người dùng bằng Bcrypt và sử dụng JWT để bảo mật các phiên đăng nhập (Sessions).")] }),
                            new TableCell({ children: [new Paragraph("Cao (High)")] }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("US-03")] }),
                            new TableCell({ children: [new Paragraph("Là người bệnh, tôi muốn nhắn tin với AI (hệ thống sử dụng Google Gemini 2.5) để mô tả triệu chứng và nhận các chẩn đoán, lời khuyên y tế sơ bộ.")] }),
                            new TableCell({ children: [new Paragraph("Rất Cao (Critical)")] }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("US-04")] }),
                            new TableCell({ children: [new Paragraph("Là hệ thống, tôi phải tự động lưu trữ toàn bộ nội dung cuộc trò chuyện giữa người bệnh và AI vào cơ sở dữ liệu (SQLite) theo thời gian thực.")] }),
                            new TableCell({ children: [new Paragraph("Cao (High)")] }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph("US-05")] }),
                            new TableCell({ children: [new Paragraph("Là người bệnh, tôi muốn thấy danh sách 'Lịch sử tư vấn gần đây' ngay tại trang chủ để có thể bấm vào và tiếp tục các phiên trò chuyện dang dở.")] }),
                            new TableCell({ children: [new Paragraph("Trung bình (Medium)")] }),
                        ],
                    }),
                ],
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
                text: "Như vậy, có thể thấy tính năng trọng tâm xoay quanh bảo mật người dùng và khả năng tích hợp AI mượt mà. Việc chia nhỏ các chức năng này giúp nhóm dễ dàng bốc tách chúng vào từng Sprint cụ thể.",
                spacing: { after: 200 }
            }),

            // 5.3
            new Paragraph({
                text: "5.3. Quy trình thực hiện các Sprint (Sprint Execution)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                text: "Dự án được chia làm 4 Sprint chính, mỗi Sprint kéo dài khoảng 1 tuần với các mục tiêu (Sprint Goal) rõ ràng và đo lường được.",
                spacing: { after: 200 }
            }),

            new Paragraph({
                children: [new TextRun({ text: "Sprint 1: Xây dựng Kiến trúc Nền tảng và Giao diện (UI/UX)", bold: true })]
            }),
            new Paragraph({
                text: "Mục tiêu của Sprint 1 là định hình toàn bộ bộ khung của ứng dụng. Nhóm đã quyết định sử dụng Vite kết hợp React để tối ưu hóa tốc độ build và Hot-Module Replacement (HMR).",
                spacing: { after: 100 }
            }),
            new Paragraph({ text: "- Thiết lập cấu trúc thư mục Monorepo cơ bản: tách biệt rõ ràng giữa 'client/' (chứa code React) và 'server/' (chứa code Node.js Express)." }),
            new Paragraph({ text: "- Triển khai TailwindCSS để xây dựng hệ thống Design System. Áp dụng phong cách thiết kế Glassmorphism (hiệu ứng kính mờ) cho các thẻ (Cards) và thanh điều hướng nhằm tạo cảm giác hiện đại, y tế và sạch sẽ." }),
            new Paragraph({ text: "- Hoàn thiện tĩnh (Static Mockup) cho 3 trang chính: Trang Đăng nhập/Đăng ký (Auth), Trang chủ (Home), và Trang Chatbot (Consultation)." }),
            new Paragraph({ text: "" }),

            new Paragraph({
                children: [new TextRun({ text: "Sprint 2: Tích hợp Cơ sở dữ liệu và Hệ thống Xác thực (Authentication)", bold: true })]
            }),
            new Paragraph({
                text: "Đây là Sprint đặt nền móng cho tính toàn vẹn dữ liệu. Thay vì sử dụng các cơ sở dữ liệu cồng kềnh như PostgreSQL hay MySQL vốn đòi hỏi thiết lập server phức tạp, nhóm đã linh hoạt chuyển hướng sang SQLite kết hợp cùng Drizzle ORM. Quyết định này hoàn toàn phù hợp với một ứng dụng Prototype cần tính di động cao.",
                spacing: { after: 100 }
            }),
            new Paragraph({ text: "- Thiết kế Schema dữ liệu: Bảng 'users' (chứa id, email, passwordHash), bảng 'conversations' (chứa thông tin metadata của luồng chat), và bảng 'messages' (lưu trữ từng dòng chat của người dùng và model AI)." }),
            new Paragraph({ text: "- Triển khai Drizzle Kit để thực thi các tệp migrations (push schema) trực tiếp vào file sqlite.db tại thư mục gốc." }),
            new Paragraph({ text: "- Xây dựng Middleware Auth: Mã hóa mật khẩu người dùng bằng Bcrypt. Tạo JWT (JSON Web Token) có thời hạn 7 ngày. Middleware này được gắn vào tất cả các route nhạy cảm để chặn truy cập trái phép (Lỗi 401 Unauthorized)." }),
            new Paragraph({ text: "- Cập nhật Frontend: Sử dụng React Context API (AuthContext.tsx) để lưu trữ Token trong LocalStorage, giúp duy trì phiên đăng nhập ngay cả khi người dùng tải lại trang (F5)." }),
            new Paragraph({ text: "" }),

            new Paragraph({
                children: [new TextRun({ text: "Sprint 3: Tích hợp Trí tuệ Nhân tạo và Quản lý Lịch sử Hội thoại", bold: true })]
            }),
            new Paragraph({
                text: "Sprint 3 tập trung vào linh hồn của ứng dụng: Con AI tư vấn y tế.",
                spacing: { after: 100 }
            }),
            new Paragraph({ text: "- Kết nối thành công SDK '@google/genai' của Google Gemini 2.5 Flash. Mặc dù là phiên bản Flash, tốc độ phản hồi và khả năng tư duy logic y tế của model là cực kỳ ấn tượng." }),
            new Paragraph({ text: "- Kỹ thuật Prompt Engineering: Hệ thống được tiêm một 'System Prompt' ẩn ở backend, yêu cầu AI phải đóng vai một bác sĩ gia đình tận tâm, luôn đưa ra cảnh báo y tế (Disclaimer) và khuyên bệnh nhân đi khám trực tiếp nếu bệnh trở nặng." }),
            new Paragraph({ text: "- Xử lý luồng dữ liệu Chat: Khi người dùng gửi tin nhắn, backend tự động lưu tin nhắn đó vào bảng 'messages' với role 'user'. Sau đó, toàn bộ lịch sử (history context) được rút xuất từ DB, đưa vào mảng array cấu trúc của Gemini để tạo ngữ cảnh. Khi AI trả về kết quả, hệ thống lại tiếp tục insert đoạn text đó vào DB với role 'model'." }),
            new Paragraph({ text: "- Frontend Integration: Lấy dữ liệu từ API '/api/chat' để render ra danh sách các cuộc trò chuyện cũ trên trang Home. Khi click vào, ứng dụng sẽ truyền query parameter '?cid=...' để load lại chính xác nội dung lịch sử." }),
            new Paragraph({ text: "" }),

            new Paragraph({
                children: [new TextRun({ text: "Sprint 4: Kiểm thử, Xử lý Xung đột và Bàn giao (Release)", bold: true })]
            }),
            new Paragraph({
                text: "Giai đoạn cuối cùng luôn tiềm ẩn nhiều rủi ro kỹ thuật (Technical Debts) bộc phát. Và thực tế nhóm đã phải đối mặt với một loạt các bug nghiêm trọng khi gộp (merge) Backend và Frontend lại chạy chung.",
                spacing: { after: 100 }
            }),
            new Paragraph({ text: "- Khắc phục lỗi Network Port Conflict (EADDRINUSE): Do dùng chung package 'concurrently', tiến trình của Vite và Express liên tục tranh chấp cổng mạng (Port 3000, 3100). Đội ngũ đã xử lý dứt điểm bằng cách cô lập hoàn toàn: Frontend ép chạy tĩnh trên port 3301, Backend chạy trên port 3300. Sau đó thiết lập 'proxy' trong cấu hình 'vite.config.ts' để định tuyến mọi request '/api' về đúng cổng 3300." }),
            new Paragraph({ text: "- Khắc phục lỗi ESM URL Scheme trên Windows: Do cấu trúc Node 18.x gặp lỗi khi load module TypeScript bằng đường dẫn tuyệt đối ở ổ D:, nhóm đã linh hoạt chuyển sang sử dụng 'esbuild' để bundle toàn bộ server thành tệp 'dist/index.js' thuần túy trước khi khởi chạy." }),
            new Paragraph({ text: "- Khắc phục lỗi Path Resolution của Database: Chỉnh sửa lại đường dẫn từ '__dirname' sang 'process.cwd()' để ứng dụng luôn tìm thấy file 'sqlite.db' bất kể nó được chạy trực tiếp hay chạy từ file bundle build ra." }),
            new Paragraph({ text: "- Automation Testing (Kiểm thử tự động toàn trình): Triển khai công cụ Bot Subagent để tự động mở trình duyệt, đăng ký một tài khoản mới (Ví dụ: tên 'Final Acceptance'), thử nghiệm gõ phím hỏi bệnh, chờ AI trả lời, và back lại trang chủ để xác nhận tính năng lưu lịch sử hoạt động chính xác 100%." }),
            new Paragraph({ text: "" }),

            // 5.4
            new Paragraph({
                text: "5.4. Theo dõi Tiến độ và Quản trị Rủi ro (Retrospective)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                text: "Nhìn chung, việc tuân thủ triệt để khung làm việc Agile đã giúp dự án tránh được nguy cơ 'cháy deadline' (Trễ tiến độ). Thay vì chờ đến cuối kỳ mới tiến hành ghép nối Frontend và Backend, nhóm đã thực hiện Tích hợp liên tục (Continuous Integration) ngay từ Sprint 2.",
                spacing: { after: 100 }
            }),
            new Paragraph({
                text: "Những bài học rút ra (Retrospective) sau các Sprint là cực kỳ quý giá. Nhóm nhận ra rằng cấu hình Môi trường (Environment Variables) và cấu hình máy chủ Node.js trên các hệ điều hành khác nhau (Windows vs Linux) luôn tồn tại những sai lệch nhất định (như lỗi ESM Url scheme kể trên). Tuy nhiên, nhờ họp Daily Meeting liên tục, các nút thắt này đã được báo cáo sớm và Scrum Master / Technical Lead đã ngay lập tức đưa ra giải pháp thay thế (như dùng Esbuild thay cho tsx thuần).",
                spacing: { after: 100 }
            }),
            new Paragraph({ text: "" }),

            // 5.5
            new Paragraph({
                text: "5.5. Kết luận Chương 5",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                text: "Quá trình áp dụng Agile Plan đã minh chứng tính hiệu quả tuyệt đối trong dự án phát triển phần mềm mang yếu tố đổi mới sáng tạo (AI Chatbot). Hệ thống đã tiến hóa từ một bản thiết kế giao diện tĩnh trở thành một ứng dụng web Full-stack hoàn chỉnh, bảo mật và thông minh. Đặc biệt, thông qua báo cáo kiểm thử tự động toàn trình (Full E2E Test), đồ án đã xác nhận đáp ứng 100% các chỉ tiêu cốt lõi trong Product Backlog đề ra. Kiến trúc hiện tại của dự án hoàn toàn đủ vững chắc để đóng gói, bàn giao và sẵn sàng mở rộng thêm các tính năng Y tế từ xa (Telemedicine) trong các giai đoạn tương lai.",
                spacing: { after: 200 }
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("d:/Documents/FamilyClinicChatbot/docs/Chuong5_Agile_Plan.docx", buffer);
    console.log("Expanded document generated successfully!");
});
