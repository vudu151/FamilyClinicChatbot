import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Heart } from 'lucide-react';

export default function Splash() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary/80 flex flex-col items-center justify-center p-6 animate-fade-in">
      {/* Logo & Branding */}
      <div className="flex flex-col items-center gap-6 mb-12 animate-slide-in-up">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Heart size={56} className="text-secondary" fill="currentColor" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            HealthCare AI
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Tư vấn sức khỏe thông minh, kết nối bác sĩ
          </p>
        </div>
      </div>

      {/* Features Preview */}
      <div className="w-full max-w-sm mb-12 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">💬</span>
          </div>
          <span>Tư vấn sức khỏe 24/7</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">👨‍⚕️</span>
          </div>
          <span>Kết nối bác sĩ chuyên môn</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">💊</span>
          </div>
          <span>Tư vấn thuốc an toàn</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">🚨</span>
          </div>
          <span>Gọi cấp cứu ngay lập tức</span>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => navigate('/login')}
        className="w-full max-w-sm h-14 bg-white text-primary hover:bg-white/90 font-bold text-lg rounded-full shadow-lg transition-smooth animate-slide-in-up active:scale-95"
        style={{ fontFamily: "'Poppins', sans-serif", animationDelay: '0.2s' }}
      >
        Bắt Đầu Ngay
      </Button>

      {/* Footer */}
      <p className="text-white/70 text-sm mt-8 text-center">
        Ứng dụng được phê duyệt bởi các chuyên gia y tế
      </p>
    </div>
  );
}
