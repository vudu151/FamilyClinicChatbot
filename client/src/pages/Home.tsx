import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronRight, AlertCircle, MessageSquare, Pill, Users, Activity } from 'lucide-react';

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Emergency Button */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 rounded-b-3xl shadow-md animate-slide-in-down">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-title-lg mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Sức Khỏe Của Bạn</h1>
            <p className="text-primary-foreground/90">Hôm nay bạn khỏe không?</p>
          </div>
          <button
            onClick={() => navigate('/emergency')}
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm hover:bg-secondary/90 transition-smooth active:scale-95 flex items-center gap-2"
          >
            <AlertCircle size={18} />
            SOS
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Health Status Card */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                📊 Tình trạng sức khỏe
              </h3>
              <p className="text-body-sm text-muted-foreground">Bình thường - Tiếp tục theo dõi</p>
            </div>
            <Activity className="text-accent" size={20} />
          </div>
        </div>

        {/* Consultation Card */}
        <div
          onClick={() => navigate('/consultation')}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-card p-4 cursor-pointer hover:shadow-card transition-all duration-300 active:scale-95"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                💬 Tư vấn sức khỏe
              </h3>
              <p className="text-body-sm text-muted-foreground">Chat với AI hoặc bác sĩ</p>
            </div>
            <ChevronRight className="text-primary" size={20} />
          </div>
        </div>

        {/* Doctor Connection Card */}
        <div
          onClick={() => navigate('/doctors')}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-card p-4 cursor-pointer hover:shadow-card transition-all duration-300 active:scale-95"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                👨‍⚕️ Kết nối bác sĩ
              </h3>
              <p className="text-body-sm text-muted-foreground">Đặt lịch tư vấn trực tuyến</p>
            </div>
            <Users className="text-primary" size={20} />
          </div>
        </div>

        {/* Medicine Consultation Card */}
        <div
          onClick={() => navigate('/medicine')}
          className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-card p-4 cursor-pointer hover:shadow-card transition-all duration-300 active:scale-95"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                💊 Tư vấn thuốc
              </h3>
              <p className="text-body-sm text-muted-foreground">Hỏi về tác dụng và liều dùng</p>
            </div>
            <Pill className="text-secondary" size={20} />
          </div>
        </div>

        {/* Health History Card */}
        <div className="bg-white border border-border rounded-card p-4 overflow-hidden shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-title-sm text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              📋 Lịch sử sức khỏe
            </h3>
            <ChevronRight className="text-muted-foreground" size={20} />
          </div>
          <div className="space-y-2">
            <p className="text-body-sm text-muted-foreground">Lần khám cuối: 15/03/2026</p>
            <p className="text-body-sm text-muted-foreground">Chẩn đoán: Cảm lạnh thông thường</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <Button
            onClick={() => navigate('/consultation')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg h-12 transition-smooth active:scale-95"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <MessageSquare size={18} className="mr-2" />
            Tư vấn
          </Button>
          <Button
            onClick={() => navigate('/doctors')}
            variant="outline"
            className="border border-border rounded-lg h-12 font-bold transition-smooth active:scale-95"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            👨‍⚕️ Bác sĩ
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
