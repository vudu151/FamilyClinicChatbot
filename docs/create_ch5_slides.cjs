const pptxgen = require("pptxgenjs");
const pptx = new pptxgen();
pptx.layout = "LAYOUT_4x3";
pptx.author = "Nhóm 10";

const RED = "8B0000", WHITE = "FFFFFF", BLACK = "1a1a1a", LIGHT = "F5F5F5";

function hdr(sl, t) {
  sl.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: 0.9, fill: { color: RED } });
  sl.addText(t, { x: 0.5, y: 0.15, w: 9, h: 0.6, fontSize: 20, bold: true, color: WHITE, fontFace: "Arial" });
  sl.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 7.1, w: "100%", h: 0.4, fill: { color: RED } });
  sl.addText("ĐHBK Hà Nội | Chương 5 – Triển khai Agile | Nhóm 10", { x: 0.3, y: 7.1, w: 9, h: 0.4, fontSize: 8, color: WHITE, fontFace: "Arial" });
}

function bul(sl, items, o = {}) {
  const t = items.map(i => ({ text: i, options: { fontSize: o.fs || 13, color: BLACK, bullet: { code: "2022" }, paraSpaceAfter: 5, fontFace: "Arial" } }));
  sl.addText(t, { x: o.x || 0.5, y: o.y || 1.1, w: o.w || 9, h: o.h || 5.7, valign: "top" });
}

// ===== SLIDE 1: Product Vision & Themes + Epics =====
let s = pptx.addSlide();
hdr(s, "5.1 Product Vision & Themes → Epics");
s.addText("Vision: Tạo ra \"Trợ lý Y khoa số\" trực 24/7, giúp gia đình tự chẩn đoán sơ bộ và kết nối dịch vụ y tế nhờ AI tạo sinh (Google Gemini).", { x: 0.5, y: 1.1, w: 9, h: 0.9, fontSize: 12, color: BLACK, fontFace: "Arial", italic: true, fill: { color: LIGHT }, shape: pptx.shapes.ROUNDED_RECTANGLE });

bul(s, [
  "Theme 1 – AI Chatbot & Trợ lý CSSK: Tư vấn triệu chứng, phân tích ảnh y khoa",
  "Theme 2 – Quản lý Khám bệnh: Đặt lịch bác sĩ, quy trình cấp cứu",
  "Theme 3 – Hồ sơ Sức khỏe: Lịch sử khám, nhắc thuốc, chỉ số cá nhân",
  "",
  "Phân rã Epics:",
  "  Epic 1.1: Trợ lý Tra cứu Y tế Thông minh (US-01, US-02)",
  "  Epic 2.1: Đặt Lịch Khám Điện Tử (US-03, US-04)",
  "  Epic 3.1: Dashboard Hồ sơ Sức khỏe (US-05, US-06, US-07)",
], { y: 2.2 });

// ===== SLIDE 2: User Stories + Acceptance Criteria =====
s = pptx.addSlide();
hdr(s, "5.2 User Stories & Acceptance Criteria");

const usData = [
  [{ text: "ID", options: { bold: true, fontSize: 10, color: WHITE, fill: { color: RED } } },
   { text: "User Story", options: { bold: true, fontSize: 10, color: WHITE, fill: { color: RED } } },
   { text: "AC (Given-When-Then)", options: { bold: true, fontSize: 10, color: WHITE, fill: { color: RED } } },
   { text: "SP", options: { bold: true, fontSize: 10, color: WHITE, fill: { color: RED } } }],
  ["US-01", "Người bệnh nhắn tin mô tả triệu chứng → nhận tư vấn AI", "When gửi tin → Then AI phản hồi kèm cảnh báo y tế", "5"],
  ["US-02", "Người cao tuổi gửi hình ảnh vết thương/toa thuốc", "When upload ảnh → Then AI trích xuất + chẩn đoán", "8"],
  ["US-03", "Đặt lịch khám qua hội thoại (không điền form)", "When nói \"đặt lịch\" → Then Bot hỏi ngày/BS + lưu DB", "5"],
  ["US-04", "Xem lại lịch sử chat / tư vấn cũ", "Then hiển thị danh sách buổi trò chuyện theo thời gian", "3"],
];
s.addTable(usData, { x: 0.3, y: 1.2, w: 9.4, fontSize: 10, fontFace: "Arial", border: { pt: 0.5, color: "cccccc" }, colW: [0.7, 3.2, 4, 0.6], autoPage: false });

s.addText("Tổng Story Points Sprint 1: 21 SP  |  Velocity kỳ vọng: 20 SP", { x: 0.5, y: 4.8, w: 8, h: 0.4, fontSize: 11, bold: true, color: RED, fontFace: "Arial" });

// ===== SLIDE 3: Prioritized Backlog + Roadmap =====
s = pptx.addSlide();
hdr(s, "5.3 Prioritized Backlog & Product Roadmap");

const prioData = [
  [{ text: "ID", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Chức năng", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Value", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Effort", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Score", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Priority", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } }],
  ["US-01", "Chat AI tư vấn triệu chứng (Gemini)", "10", "5", "2.0", "P1 – Sprint 1"],
  ["US-02", "Upload + Phân tích ảnh (Vision AI)", "9", "6", "1.5", "P1 – Sprint 1"],
  ["US-03", "Đặt lịch khám qua hội thoại", "8", "5", "1.6", "P2 – Sprint 2"],
  ["US-05", "Dashboard Hồ sơ + Nhắc thuốc", "7", "6", "1.16", "P2 – Sprint 2"],
  ["US-06", "Voice Input (Speech-to-Text)", "7", "8", "0.87", "P3 – Sau MVP"],
];
s.addTable(prioData, { x: 0.2, y: 1.15, w: 9.6, fontSize: 9, fontFace: "Arial", border: { pt: 0.5, color: "cccccc" }, colW: [0.7, 3.5, 0.8, 0.8, 0.8, 1.8], autoPage: false });

s.addText("Product Roadmap (3 Releases / 1 tháng):", { x: 0.5, y: 4.0, w: 8, h: 0.4, fontSize: 12, bold: true, color: RED, fontFace: "Arial" });
bul(s, [
  "Release 1.0 (MVP – Tuần 2): Kiến trúc React+Express, Chat AI Text+Image",
  "Release 1.1 (Alpha – Tuần 3): Dashboard, Lịch sử chat, Voice UI",
  "Release 2.0 (Beta – Tuần 4): Đóng gói, Testing, Fix bugs, Demo",
], { y: 4.5, fs: 12 });

// ===== SLIDE 4: Sprint Planning & Sprint Backlog =====
s = pptx.addSlide();
hdr(s, "5.5 Sprint 1 Planning & Backlog");

s.addText("Sprint Goal: Hoàn thiện API AI + Giao diện Chat tích hợp Google Gemini 2.5 Flash xử lý văn bản & hình ảnh đa phương thức.", { x: 0.5, y: 1.1, w: 9, h: 0.7, fontSize: 11, color: BLACK, fontFace: "Arial", italic: true, fill: { color: LIGHT }, shape: pptx.shapes.ROUNDED_RECTANGLE });

const sprintData = [
  [{ text: "Task", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Mô tả", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Kỹ năng", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } },
   { text: "Status", options: { bold: true, fontSize: 9, color: WHITE, fill: { color: RED } } }],
  ["T-1.1", "Khởi tạo Monorepo: Vite (React+TS) + Express", "Frontend", "✅ Done"],
  ["T-1.2", "Design System TailwindCSS Medical (#0d9488)", "Frontend", "✅ Done"],
  ["T-1.3", "Cài @google/genai, bảo mật API Key (dotenv)", "Backend", "✅ Done"],
  ["T-1.4", "API /api/chat với System Prompt y khoa", "Backend", "✅ Done"],
  ["T-1.5", "Consultation.tsx: gửi Text + Base64 Image", "Full-stack", "✅ Done"],
  ["T-1.6", "Floating Input Bar (Glassmorphism mobile)", "Frontend", "✅ Done"],
];
s.addTable(sprintData, { x: 0.2, y: 2.0, w: 9.6, fontSize: 9, fontFace: "Arial", border: { pt: 0.5, color: "cccccc" }, colW: [0.7, 4.5, 1.5, 1.2], autoPage: false });

s.addText("Sprint Duration: 7 ngày  |  Velocity: 20 SP  |  6/6 Tasks Done ✅", { x: 0.5, y: 5.8, w: 8, h: 0.4, fontSize: 11, bold: true, color: RED, fontFace: "Arial" });

// ===== SLIDE 5: Scrum Events + Continuous Discovery =====
s = pptx.addSlide();
hdr(s, "5.5–5.6 Scrum Events & Tích hợp Khám phá–Triển khai");

bul(s, [
  "Daily Scrum: 15 phút/sáng – 3 câu hỏi (Đã làm? Sẽ làm? Blocker?)",
  "Sprint Review: Demo Chat AI chạy trên localhost, kiểm chứng phân tích ảnh y khoa",
  "Sprint Retrospective: Cần Loading Indicator, cải thiện thời gian phản hồi AI",
  "",
  "Continuous Discovery (Khám phá liên tục):",
  "  → Thử nghiệm với bạn học + gia đình → Phát hiện phải có Cảnh báo Y tế",
  "  → Mọi câu chat AI đều kèm: \"Đây chỉ là tư vấn, cần đến cơ sở y tế\"",
  "",
  "Continuous Delivery (Triển khai linh hoạt):",
  "  → Thay đổi yêu cầu y khoa → Sửa System Prompt → AI áp dụng ngay",
  "  → Build (vite build + esbuild) → Demo mọi lúc trên mọi thiết bị",
  "  → Multi API Key Auto-Switching: không sợ hết quota Gemini",
], { fs: 12 });

pptx.writeFile({ fileName: "d:\\Documents\\FamilyClinicChatbot\\docs\\Slide_Chuong5.pptx" })
  .then(() => console.log("✅ Đã tạo xong: Slide_Chuong5.pptx (5 trang)"))
  .catch(err => console.error("Lỗi:", err));
