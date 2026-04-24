const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

  console.log('Khởi chạy trình duyệt...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  try {
    console.log('Đang thực hiện đăng ký...');
    // Dùng DOM để click thay vì waitFor
    page.goto('http://localhost:3300/login').catch(() => {});
    await delay(3000);
    
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const toggle = btns.find(b => b.textContent.includes('Đăng ký ngay'));
      if(toggle) toggle.click();
    });
    await delay(1000);
    
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      if (inputs.length >= 3) {
        inputs[0].value = 'Test User';
        inputs[1].value = `test_${Date.now()}@test.com`;
        inputs[2].value = '123456';
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[2].dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const submit = btns.find(b => b.textContent.includes('Đăng Ký'));
      if(submit) submit.click();
    });
    await delay(3000);

    console.log('Vào tab Tư vấn...');
    page.goto('http://localhost:3300/consultation').catch(() => {});
    await delay(3000);

    const sendMessage = async (text, waitTime, screenshotName) => {
      await page.evaluate((msg) => {
        const input = document.querySelector('input[type="text"].flex-1');
        if (input) {
          input.value = msg;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', bubbles: true }));
        }
      }, text);
      
      // Bấm nút Send fallback
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sendBtn = btns.find(b => b.innerHTML.includes('lucide-send') || b.querySelector('svg.lucide-send'));
        if (sendBtn) sendBtn.click();
      });

      console.log(`Đã gửi: "${text}"`);
      await delay(waitTime);
      
      await page.evaluate(() => {
        const chatContainer = document.querySelector('.overflow-y-auto');
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
      });
      await delay(500);

      await page.screenshot({ path: path.join(screenshotsDir, screenshotName) });
      console.log(`📸 Đã lưu: ${screenshotName}`);
    };

    console.log('\n--- Bắt đầu Luồng 1: Đặt lịch khám ---');
    await sendMessage('Tôi muốn đặt lịch khám bệnh', 5000, 'Flow1_DatLich_1.png');
    await sendMessage('Tôi muốn khám với Bác sĩ Quang Hùng', 5000, 'Flow1_DatLich_2.png');
    await sendMessage('Tại phòng khám đa khoa trung tâm nhé', 5000, 'Flow1_DatLich_3.png');

    console.log('\n--- Bắt đầu Luồng 2: Tư vấn triệu chứng ---');
    // Reload to clear chat if possible? No, we will just continue the chat
    await sendMessage('Tôi đang bị đau đầu và sốt 38.5 độ từ hôm qua, không ho.', 6000, 'Flow2_TuVan_1.png');
    await sendMessage('Vậy tôi có thể tự uống Paracetamol ở nhà không? Liều lượng thế nào?', 6000, 'Flow2_TuVan_2.png');
    await sendMessage('Cảm ơn bác sĩ, tôi sẽ theo dõi thêm.', 3000, 'Flow2_TuVan_3.png');

    console.log('\n✅ Hoàn tất!');
  } catch (err) {
    console.error('Lỗi:', err);
  } finally {
    await browser.close();
  }
})();
