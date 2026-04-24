const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Khởi chạy trình duyệt...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  try {
    console.log('Chụp ảnh: Màn hình Splash');
    await page.goto('http://localhost:3300/', { waitUntil: 'networkidle0' });
    await delay(1000);
    await page.screenshot({ path: path.join(screenshotsDir, '01_Splash.png') });

    console.log('Chuyển sang màn hình Đăng nhập...');
    await page.goto('http://localhost:3300/login', { waitUntil: 'networkidle0' });
    await delay(1000);
    await page.screenshot({ path: path.join(screenshotsDir, '02_Login.png') });

    console.log('Đăng ký / Đăng nhập...');
    // We can just login directly using the backend API and set token, OR type in the form
    await page.type('input[type="email"]', 'final@example.com');
    await page.type('input[type="password"]', '123456');
    const loginBtn = await page.$('::-p-xpath(//button[contains(text(), "Đăng Nhập")])');
    if (loginBtn) {
      await loginBtn.click();
    }
    
    console.log('Chụp ảnh: Trang Chủ (Home)');
    await delay(3000); 
    await page.screenshot({ path: path.join(screenshotsDir, '03_Home.png') });

    console.log('Chụp ảnh: Tab Tư vấn AI (Chat)');
    await page.goto('http://localhost:3300/consultation', { waitUntil: 'networkidle0' });
    await delay(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '04_Chat.png') });
      
    const input = await page.$('input[placeholder="Nhập triệu chứng của bạn..."]');
    if (input) {
      await input.type('Tôi muốn đặt lịch khám');
      await page.keyboard.press('Enter');
      console.log('Đang chờ AI trả lời...');
      await delay(6000);
      await page.screenshot({ path: path.join(screenshotsDir, '05_Chat_AI_Response.png') });
    }

    console.log('Chụp ảnh: Tab Thuốc (Medicine)');
    await page.goto('http://localhost:3300/medicine', { waitUntil: 'networkidle0' });
    await delay(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '06_Medicine_List.png') });

    const para = await page.$('::-p-xpath(//h3[contains(text(), "Paracetamol")])');
    if (para) {
      await para.click();
      await delay(1500);
      await page.screenshot({ path: path.join(screenshotsDir, '07_Medicine_Detail.png') });
      
      const addBtn = await page.$('::-p-xpath(//button[contains(., "Đặt lịch")])');
      if (addBtn) {
        page.on('dialog', async dialog => {
          await delay(500);
          await dialog.accept();
        });
        await addBtn.click();
        await delay(1000);
      }
      
      const backBtn = await page.$('::-p-xpath(//button[contains(text(), "Quay lại")])');
      if (backBtn) {
        await backBtn.click();
        await delay(1500);
        await page.screenshot({ path: path.join(screenshotsDir, '08_Medicine_Reminder.png') });
      }
    }

    console.log('Chụp ảnh: Tab Hồ sơ (Profile)');
    await page.goto('http://localhost:3300/profile', { waitUntil: 'networkidle0' });
    console.log('Đang chờ phân tích AI ở Profile...');
    await delay(5000);
    await page.screenshot({ path: path.join(screenshotsDir, '09_Profile_AI_Analysis.png') });

    console.log('✅ Hoàn tất! Tất cả hình ảnh đã được lưu vào thư mục "screenshots"');
  } catch (err) {
    console.error('Lỗi trong quá trình chạy script:', err);
  } finally {
    await browser.close();
  }
})();
