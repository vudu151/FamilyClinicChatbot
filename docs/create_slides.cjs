const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();

pptx.layout = "LAYOUT_4x3";
pptx.author = "Nhóm 10";

const RED = "8B0000";
const WHITE = "FFFFFF";
const BLACK = "1a1a1a";
const GRAY = "666666";
const LIGHT = "F5F5F5";

function addHeader(slide, title) {
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.9, fill: { color: RED } });
  slide.addText(title, { x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 22, bold: true, color: WHITE, fontFace: "Arial" });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 7.1, w: "100%", h: 0.4, fill: { color: RED } });
  slide.addText("Đại học Bách khoa Hà Nội | Nhóm 10", { x: 0.3, y: 7.1, w: 9, h: 0.4, fontSize: 9, color: WHITE, fontFace: "Arial" });
}

function addBullets(slide, items, opts = {}) {
  const textItems = items.map(item => ({
    text: item, options: { fontSize: opts.fontSize || 14, color: BLACK, bullet: { code: "2022" }, paraSpaceAfter: 6, fontFace: "Arial" }
  }));
  slide.addText(textItems, { x: opts.x || 0.6, y: opts.y || 1.2, w: opts.w || 8.8, h: opts.h || 5.5, valign: "top" });
}

// ===== SLIDE 1: TITLE =====
let s = pptx.addSlide();
s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: RED } });
s.addText("ĐẠI HỌC BÁCH KHOA HÀ NỘI\nViện Công nghệ Thông tin và Truyền thông", { x: 0.5, y: 0.3, w: 9, h: 1, fontSize: 14, color: WHITE, fontFace: "Arial", align: "center" });
s.addText("CHATBOT PHÒNG KHÁM GIA ĐÌNH", { x: 0.5, y: 1.8, w: 9, h: 1, fontSize: 28, bold: true, color: WHITE, fontFace: "Arial", align: "center" });
s.addText("Môn: Phương pháp Agile và Tư duy Thiết kế", { x: 0.5, y: 3, w: 9, h: 0.5, fontSize: 16, color: WHITE, fontFace: "Arial", align: "center" });
s.addText("GVHD: TS. Vũ Thị Hương Giang, TS. Trần Nhật Hóa", { x: 0.5, y: 4, w: 9, h: 0.5, fontSize: 13, color: WHITE, fontFace: "Arial", align: "center" });
s.addText("Sinh viên:\nNguyễn Đồng Hoàng - 20252737M\nPhạm Nhật Linh - 20252732M\nVũ Xuân Dự - 20252731M\nKiều Thái Tịnh - 20252605M", { x: 1, y: 4.8, w: 8, h: 1.8, fontSize: 13, color: WHITE, fontFace: "Arial", align: "center", lineSpacingMultiple: 1.3 });

// ===== SLIDE 2: MỤC LỤC =====
s = pptx.addSlide();
addHeader(s, "MỤC LỤC");
addBullets(s, [
  "Chương 1: Tổng quan Agile & Design Thinking",
  "Chương 2: Nguyên lý phát triển linh hoạt",
  "Chương 3: Thấu cảm và xác định vấn đề",
  "Chương 4: Hình thành ý tưởng, Prototype & Kiểm thử",
  "Chương 5: Triển khai phát triển & Tích hợp",
  "Chương 6: Vận hành và cải tiến liên tục",
  "Demo sản phẩm"
], { fontSize: 16 });

// ===== SLIDE 3: STAKEHOLDER =====
s = pptx.addSlide();
addHeader(s, "Chương 1: Stakeholder Map");
addBullets(s, [
  "Bệnh nhân người lớn: Người dùng trực tiếp chatbot",
  "Cha mẹ / người giám hộ: Đặt lịch khám cho trẻ",
  "Người cao tuổi: Cần giao diện đơn giản, chữ to",
  "Bác sĩ gia đình: Giám sát chuyên môn, duyệt nội dung y khoa",
  "CSKH / Nhân viên đăng ký: Giảm tải front desk",
  "Đội IT / Dev: Xây dựng, vận hành chatbot",
  "Quản lý phòng khám: Sponsor dự án, quyết định KPI"
]);

// ===== SLIDE 4: PROBLEM STATEMENT =====
s = pptx.addSlide();
addHeader(s, "Chương 1: Problem Statement");
s.addText("Việc chăm sóc sức khỏe gia đình hiện nay còn phân mảnh, thiếu công cụ số đáng tin cậy để tư vấn ban đầu, theo dõi chỉ số, quản lý thuốc và hỗ trợ khẩn cấp.", { x: 0.6, y: 1.2, w: 8.8, h: 1.5, fontSize: 15, color: BLACK, fontFace: "Arial", italic: true, fill: { color: LIGHT }, shape: pptx.shapes.ROUNDED_RECTANGLE });
addBullets(s, [
  "Thông tin y tế trên Internet phân tán, không đáng tin cậy",
  "Thiếu nơi tập trung lưu hồ sơ sức khỏe gia đình",
  "Người lớn tuổi gặp khó khăn với ứng dụng phức tạp",
  "Nhắc uống thuốc còn thủ công, dễ quên",
  "Khoảng cách lớn giữa nhu cầu tư vấn và khả năng kết nối bác sĩ"
], { y: 3.2 });

// ===== SLIDE 5: VISION & OKR =====
s = pptx.addSlide();
addHeader(s, "Chương 1: Product Vision & OKR");
s.addText("Vision: Xây dựng HealthCare AI trở thành trợ lý chăm sóc sức khỏe gia đình đáng tin cậy", { x: 0.6, y: 1.2, w: 8.8, h: 0.8, fontSize: 14, bold: true, color: RED, fontFace: "Arial" });
addBullets(s, [
  "O1: Cung cấp tư vấn triệu chứng ban đầu chính xác, an toàn",
  "  KR1: Phản hồi ≤ 5 giây, độ chính xác ≥ 85%",
  "O2: Tăng tỷ lệ đặt lịch khám qua chatbot",
  "  KR2: ≥ 50% bệnh nhân đặt lịch thành công qua bot",
  "O3: Giảm tải cho nhân viên tiếp nhận",
  "  KR3: Giảm 40% cuộc gọi trùng lặp đến front desk"
], { y: 2.3 });

// ===== SLIDE 6: SCRUM TEAM =====
s = pptx.addSlide();
addHeader(s, "Chương 2: Scrum Team Structure");
const teamData = [
  ["Vai trò", "Thành viên", "Trách nhiệm"],
  ["Product Owner", "Nguyễn Đồng Hoàng", "Quản lý Product Backlog, ưu tiên US"],
  ["Scrum Master", "Vũ Xuân Dự", "Điều phối Sprint, loại bỏ blocker"],
  ["Dev (Frontend)", "Phạm Nhật Linh", "React, UI/UX, responsive design"],
  ["Dev (Backend)", "Kiều Thái Tịnh", "Node.js, API, tích hợp Gemini AI"],
];
s.addTable(teamData, { x: 0.5, y: 1.3, w: 9, fontSize: 12, fontFace: "Arial", border: { pt: 1, color: "cccccc" }, colW: [1.8, 2.5, 4.7], autoPage: false,
  rowH: [0.4, 0.4, 0.4, 0.4, 0.4] });

// ===== SLIDE 7: WORKING AGREEMENT =====
s = pptx.addSlide();
addHeader(s, "Chương 2: Working Agreement & Sprint");
addBullets(s, [
  "Sprint length: 1 tuần (7 ngày)",
  "Daily Standup: 15 phút mỗi sáng qua Google Meet",
  "Công cụ: GitHub (code), Trello (board), Zalo (chat)",
  "Definition of Done: Code review + test + merge main",
  "Sprint 1: Setup project, Auth, UI cơ bản",
  "Sprint 2: Tích hợp Gemini AI, Chat realtime",
  "Sprint 3: Thuốc, Nhắc nhở, Hồ sơ sức khỏe, Testing"
]);

// ===== SLIDE 8: USER PERSONA =====
s = pptx.addSlide();
addHeader(s, "Chương 3: User Persona");
addBullets(s, [
  "Persona 1 - Chị Lan (32 tuổi, nhân viên văn phòng):",
  "  → Bận rộn, cần tư vấn nhanh triệu chứng cho con",
  "  → Pain: Không biết khi nào cần đưa con đi khám ngay",
  "",
  "Persona 2 - Chú Chiến (62 tuổi, hưu trí):",
  "  → Bệnh mãn tính, cần nhắc uống thuốc hàng ngày",
  "  → Pain: Khó dùng app phức tạp, chữ nhỏ, nhiều bước",
  "",
  "Persona 3 - Bác sĩ Hùng (45 tuổi, BS gia đình):",
  "  → Cần chatbot hỗ trợ sàng lọc, không lấn sân chẩn đoán"
]);

// ===== SLIDE 9: CUSTOMER JOURNEY MAP =====
s = pptx.addSlide();
addHeader(s, "Chương 3: Customer Journey Map");
const journeyData = [
  ["Giai đoạn", "Hành vi", "Cảm xúc", "Pain Point"],
  ["Nhận biết", "Tìm kiếm Google", "Lo lắng", "Thông tin nhiễu, không tin cậy"],
  ["Tương tác", "Chat với AI", "Hy vọng", "Bot trả lời chung chung"],
  ["Đặt lịch", "Chọn BS, phòng khám", "Hài lòng", "Quy trình phức tạp"],
  ["Theo dõi", "Nhắc thuốc, xem hồ sơ", "Yên tâm", "Quên uống thuốc"],
];
s.addTable(journeyData, { x: 0.3, y: 1.3, w: 9.4, fontSize: 11, fontFace: "Arial", border: { pt: 1, color: "cccccc" }, colW: [1.5, 2.3, 1.5, 4.1], autoPage: false });

// ===== SLIDE 10: HMW QUESTIONS =====
s = pptx.addSlide();
addHeader(s, "Chương 3: POV & How Might We");
s.addText("POV: Người chăm sóc gia đình cần một công cụ đáng tin cậy để tư vấn sức khỏe ban đầu vì họ không có chuyên môn y tế và lo sợ bỏ lỡ dấu hiệu nguy hiểm.", { x: 0.6, y: 1.2, w: 8.8, h: 1, fontSize: 13, color: BLACK, fontFace: "Arial", italic: true, fill: { color: LIGHT }, shape: pptx.shapes.ROUNDED_RECTANGLE });
addBullets(s, [
  "HMW1: Làm sao để chatbot tư vấn triệu chứng chính xác mà không thay thế bác sĩ?",
  "HMW2: Làm sao để người cao tuổi dễ dàng sử dụng chatbot?",
  "HMW3: Làm sao để tích hợp nhắc uống thuốc một cách tự nhiên?",
  "HMW4: Làm sao để đặt lịch khám nhanh chóng qua hội thoại?"
], { y: 2.8 });

// ===== SLIDE 11: BRAINSTORMING =====
s = pptx.addSlide();
addHeader(s, "Chương 4: Brainstorming & Impact-Feasibility");
addBullets(s, [
  "Ý tưởng đã brainstorm:",
  "  ✅ Chat AI tư vấn triệu chứng (Impact: Cao | Feasibility: Cao)",
  "  ✅ Đặt lịch khám qua hội thoại (Impact: Cao | Feasibility: Cao)",
  "  ✅ Nhắc uống thuốc hàng ngày (Impact: TB | Feasibility: Cao)",
  "  ✅ Phân tích hình ảnh y khoa (Impact: Cao | Feasibility: TB)",
  "  ⬜ Tư vấn qua giọng nói (Impact: Cao | Feasibility: Thấp)",
  "  ⬜ Kết nối Video Call bác sĩ (Impact: Cao | Feasibility: Thấp)",
  "",
  "→ Lựa chọn: 4 ý tưởng đánh dấu ✅ cho MVP"
]);

// ===== SLIDE 12: PROTOTYPE =====
s = pptx.addSlide();
addHeader(s, "Chương 4: Chatbot Prototype");
addBullets(s, [
  "Công nghệ sử dụng:",
  "  • Frontend: React + TypeScript + Vite + TailwindCSS",
  "  • Backend: Node.js + Express + Drizzle ORM",
  "  • Database: SQLite (file-based, nhẹ)",
  "  • AI Engine: Google Gemini 2.5 Flash API",
  "  • Auth: JWT (JSON Web Token)",
  "  • Deploy: Docker + Docker Compose",
  "",
  "Tính năng chính:",
  "  1. Đăng ký / Đăng nhập bảo mật",
  "  2. Chat AI tư vấn triệu chứng & đặt lịch khám",
  "  3. Gửi hình ảnh y khoa để AI phân tích",
  "  4. Danh mục thuốc & Nhắc nhở uống thuốc",
  "  5. Hồ sơ sức khỏe cá nhân hóa bằng AI"
]);

// ===== SLIDE 13: PRODUCT BACKLOG =====
s = pptx.addSlide();
addHeader(s, "Chương 5: Product Backlog (User Stories)");
const backlogData = [
  ["ID", "User Story", "Priority", "SP"],
  ["US-01", "Đăng ký / Đăng nhập an toàn", "Must", "3"],
  ["US-02", "Giao diện chat thân thiện mobile", "Must", "5"],
  ["US-03", "Tư vấn triệu chứng qua AI Gemini", "Must", "8"],
  ["US-04", "Lưu lịch sử hội thoại", "Must", "5"],
  ["US-05", "Gửi hình ảnh y khoa", "Should", "5"],
  ["US-06", "Đặt lịch khám (chọn BS, phòng khám)", "Must", "5"],
  ["US-07", "Danh mục thuốc & nhắc uống thuốc", "Should", "3"],
  ["US-08", "Hồ sơ sức khỏe cá nhân hóa", "Could", "3"],
];
s.addTable(backlogData, { x: 0.3, y: 1.3, w: 9.4, fontSize: 11, fontFace: "Arial", border: { pt: 1, color: "cccccc" }, colW: [0.8, 4.5, 1, 0.8], autoPage: false });

// ===== SLIDE 14: PRODUCT ROADMAP =====
s = pptx.addSlide();
addHeader(s, "Chương 5: Product Roadmap (3 Releases)");
addBullets(s, [
  "Release 1 (Sprint 1 - Tuần 1): Foundation",
  "  → US-01: Auth JWT, US-02: UI Chat cơ bản",
  "",
  "Release 2 (Sprint 2 - Tuần 2): Core AI",
  "  → US-03: Tích hợp Gemini, US-04: Lưu lịch sử",
  "  → US-05: Phân tích hình ảnh, US-06: Đặt lịch",
  "",
  "Release 3 (Sprint 3 - Tuần 3): Polish & Extend",
  "  → US-07: Thuốc & nhắc nhở, US-08: Hồ sơ AI",
  "  → Multi API Key fallback, E2E Testing"
]);

// ===== SLIDE 15: KIẾN TRÚC HỆ THỐNG =====
s = pptx.addSlide();
addHeader(s, "Chương 5: Kiến trúc hệ thống");
addBullets(s, [
  "Client (React SPA) ←→ API Server (Express.js) ←→ SQLite DB",
  "                                    ↕",
  "                        Google Gemini 2.5 Flash API",
  "",
  "Điểm nổi bật kiến trúc:",
  "  • Multi API Key với Auto-Switching khi quota hết",
  "  • JWT Authentication stateless, bảo mật cao",
  "  • Drizzle ORM type-safe, migration dễ dàng",
  "  • Docker Compose: 1 lệnh = chạy toàn bộ hệ thống",
  "  • Responsive Mobile-First (390x844 viewport)"
]);

// ===== SLIDE 16: USABILITY TESTING =====
s = pptx.addSlide();
addHeader(s, "Chương 4: Usability Testing Report");
addBullets(s, [
  "Phương pháp: Automated E2E Testing với Puppeteer",
  "Thiết bị giả lập: iPhone 14 Pro Max (390x844, 2x)",
  "",
  "Kịch bản đã test thành công:",
  "  ✅ Đăng ký tài khoản mới → Đăng nhập",
  "  ✅ Chat AI: Hỏi triệu chứng (đau đầu, sốt 38.5°C)",
  "  ✅ Chat AI: Đặt lịch khám (chọn BS Quang Hùng)",
  "  ✅ Chat AI: Hỏi liều lượng Paracetamol",
  "  ✅ Duyệt danh mục thuốc & đặt lịch nhắc nhở",
  "  ✅ Xem hồ sơ sức khỏe cá nhân hóa bằng AI",
  "",
  "→ 100% User Stories đạt Acceptance Criteria"
]);

// ===== SLIDE 17: KANBAN & WIP =====
s = pptx.addSlide();
addHeader(s, "Chương 6: Kanban Board & WIP Limits");
const kanbanData = [
  ["Trạng thái", "WIP", "Chính sách"],
  ["Backlog", "∞", "US tuân thủ User + Need + Insight"],
  ["Ready to Dev", "3", "Phải có AC + xác nhận Tech Lead"],
  ["In Development", "2", "Pull System, không nhận task mới khi chưa xong"],
  ["Testing", "1", "Kịch bản y tế phải có Disclaimer"],
  ["Done", "∞", "Không lỗi port conflict, đóng gói Esbuild"],
];
s.addTable(kanbanData, { x: 0.3, y: 1.3, w: 9.4, fontSize: 11, fontFace: "Arial", border: { pt: 1, color: "cccccc" }, colW: [2, 0.8, 6.6], autoPage: false });

// ===== SLIDE 18: FLOW METRICS =====
s = pptx.addSlide();
addHeader(s, "Chương 6: Flow Metrics & Bottleneck");
const metricsData = [
  ["Task", "Ngày nhận", "Ngày xong", "Lead Time"],
  ["Tích hợp Gemini 2.5 tư vấn cảm cúm", "01/04", "05/04", "4 ngày"],
  ["Sửa lỗi ESM URL Scheme trên Windows", "03/04", "04/04", "1 ngày"],
  ["Tích hợp lưu lịch sử chat SQLite", "05/04", "10/04", "5 ngày"],
];
s.addTable(metricsData, { x: 0.3, y: 1.3, w: 9.4, fontSize: 11, fontFace: "Arial", border: { pt: 1, color: "cccccc" }, colW: [4, 1.5, 1.5, 1.5], autoPage: false });
s.addText("Lead Time TB: 3.3 ngày  |  Throughput: 3 task/tuần", { x: 0.6, y: 3.5, w: 8, h: 0.5, fontSize: 13, bold: true, color: RED, fontFace: "Arial" });
addBullets(s, [
  "Bottleneck: Cột Testing - chờ bác sĩ duyệt kịch bản y khoa",
  "Giải pháp PDCA: Xây dựng 'Bộ quy tắc y tế chuẩn' để Dev tự kiểm tra 80%",
  "Improvement: Automation Testing, Daily Scrum 15 phút, phân loại rủi ro"
], { y: 4.3 });

// ===== SLIDE 19: DEMO =====
s = pptx.addSlide();
addHeader(s, "Demo sản phẩm");
addBullets(s, [
  "🏠 Trang chủ: Gợi ý nhanh, lịch sử tư vấn",
  "💬 Chat AI: Tư vấn triệu chứng, đặt lịch khám thông minh",
  "📷 Gửi ảnh: AI phân tích hình ảnh y khoa (vết thương, đơn thuốc)",
  "💊 Thuốc: Danh mục + Nhắc nhở uống thuốc hàng ngày",
  "👤 Hồ sơ: Triệu chứng y khoa cá nhân hóa từ lịch sử chat",
  "",
  "🔑 Tính năng kỹ thuật nổi bật:",
  "  • Multi API Key Auto-Switching (không sợ hết quota)",
  "  • JWT Authentication bảo mật",
  "  • Docker Compose 1-click deployment",
  "  • Automated E2E Screenshot Testing"
], { fontSize: 14 });

// ===== SLIDE 20: KẾT LUẬN & CẢM ƠN =====
s = pptx.addSlide();
s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: RED } });
s.addText("KẾT LUẬN & CẢM ƠN", { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 28, bold: true, color: WHITE, fontFace: "Arial", align: "center" });
const endItems = [
  { text: "✅ Áp dụng thành công Agile Scrum 3 Sprint", options: { fontSize: 13, color: WHITE, bullet: false, paraSpaceAfter: 4, fontFace: "Arial" } },
  { text: "✅ Design Thinking: Persona → Journey Map → Prototype", options: { fontSize: 13, color: WHITE, bullet: false, paraSpaceAfter: 4, fontFace: "Arial" } },
  { text: "✅ Chatbot Full-stack hoạt động hoàn chỉnh", options: { fontSize: 13, color: WHITE, bullet: false, paraSpaceAfter: 4, fontFace: "Arial" } },
  { text: "✅ 100% User Stories hoàn thành + E2E Testing", options: { fontSize: 13, color: WHITE, bullet: false, paraSpaceAfter: 4, fontFace: "Arial" } },
  { text: "", options: { fontSize: 6, color: WHITE, bullet: false, paraSpaceAfter: 2, fontFace: "Arial" } },
  { text: "Hướng phát triển: Voice AI, Telemedicine, HIS/EMR", options: { fontSize: 12, color: WHITE, bullet: false, paraSpaceAfter: 4, fontFace: "Arial", italic: true } },
];
s.addText(endItems, { x: 0.8, y: 1.3, w: 8.4, h: 2.8, valign: "top" });
s.addText("CẢM ƠN THẦY CÔ ĐÃ LẮNG NGHE!", { x: 0.5, y: 4.5, w: 9, h: 1, fontSize: 30, bold: true, color: WHITE, fontFace: "Arial", align: "center" });
s.addText("Nhóm 10 - Chatbot Phòng Khám Gia Đình\nGVHD: TS. Vũ Thị Hương Giang, TS. Trần Nhật Hóa", { x: 0.5, y: 5.6, w: 9, h: 1, fontSize: 13, color: WHITE, fontFace: "Arial", align: "center", lineSpacingMultiple: 1.4 });

pptx.writeFile({ fileName: "d:\\Documents\\FamilyClinicChatbot\\docs\\Slide_Chatbot_PhongKham.pptx" })
  .then(() => console.log("✅ Đã tạo xong file 20 slide: Slide_Chatbot_PhongKham.pptx"))
  .catch(err => console.error("Lỗi:", err));
