import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { Bell, Settings, MapPin, Clock, Heart, Pill, FileText, Shield, MessageSquare, AlertCircle } from 'lucide-react';

export default function Home() {
  const [, navigate] = useLocation();

  const mainFeatures = [
    { icon: '👨‍⚕️', label: 'Tìm bác sĩ', action: '/doctors' },
    { icon: '🍽️', label: 'Ăn gì hôm nay', action: '#' },
    { icon: '🏥', label: 'Phòng khám gần', action: '#' },
    { icon: '📅', label: 'Đặt lịch khám', action: '#' },
  ];

  const secondaryFeatures = [
    { icon: <Clock size={24} />, label: 'Lịch sử khám', action: '/health' },
    { icon: <MessageSquare size={24} />, label: 'Tư vấn', action: '/consultation' },
    { icon: <Shield size={24} />, label: 'Bảo hiểm', action: '#' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 pt-4 pb-6 animate-slide-in-down">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="text-body-sm opacity-90">Xin chào</p>
              <p className="text-title-sm font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Nguyễn Văn A
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <Bell size={20} />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-start gap-2">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-body-sm font-medium">Kết quả khám gần đây</p>
            <p className="text-body-sm opacity-90">Xem kết quả khám từ 15/03/2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Main Features Grid (4 items) */}
        <div className="grid grid-cols-4 gap-3">
          {mainFeatures.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => feature.action !== '#' && navigate(feature.action)}
              className="flex flex-col items-center gap-2 p-3 bg-white border border-border rounded-lg hover:shadow-card transition-all duration-300 active:scale-95"
            >
              <div className="text-3xl">{feature.icon}</div>
              <p className="text-body-xs text-foreground text-center font-medium leading-tight">
                {feature.label}
              </p>
            </button>
          ))}
        </div>

        {/* Hero Banner Image */}
        <div className="relative rounded-lg overflow-hidden shadow-card animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-2">🏥</p>
              <p className="text-title-sm font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Tìm bác sĩ gần nhất
              </p>
              <p className="text-body-sm text-muted-foreground mt-1">
                Kết nối với các chuyên gia y tế
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Features Grid (3 items) */}
        <div>
          <p className="text-title-sm text-foreground mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Dịch vụ khác
          </p>
          <div className="grid grid-cols-3 gap-3">
            {secondaryFeatures.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => feature.action !== '#' && navigate(feature.action)}
                className="flex flex-col items-center gap-2 p-3 bg-white border border-border rounded-lg hover:shadow-card transition-all duration-300 active:scale-95"
              >
                <div className="text-primary">{feature.icon}</div>
                <p className="text-body-xs text-foreground text-center font-medium leading-tight">
                  {feature.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-body-sm text-muted-foreground mb-2">Lần khám cuối</p>
            <p className="text-title-sm text-foreground font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              15/03/2026
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4">
            <p className="text-body-sm text-muted-foreground mb-2">Trạng thái sức khỏe</p>
            <p className="text-title-sm text-accent font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Bình thường
            </p>
          </div>
        </div>

        {/* Emergency Button */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.25s' }}>
          <Button
            onClick={() => navigate('/emergency')}
            className="w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:shadow-lg font-bold rounded-lg h-12 flex items-center justify-center gap-2 transition-smooth active:scale-95"
          >
            <AlertCircle size={20} />
            🚨 Gọi Cấp Cứu
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
