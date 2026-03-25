import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, LogOut, Settings, Bell, Shield, Edit2 } from 'lucide-react';

export default function Profile() {
  const [, navigate] = useLocation();

  const currentUser = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123 456 789',
    avatar: '👤',
    bloodType: 'O+',
    allergies: 'Không',
    medicalHistory: 'Không có bệnh lý',
  };

  const menuItems = [
    { icon: <Bell size={20} />, label: 'Thông báo', action: () => {} },
    { icon: <Settings size={20} />, label: 'Cài đặt', action: () => {} },
    { icon: <Shield size={20} />, label: 'Bảo mật', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-white animate-slide-in-down">
        <button
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Hồ Sơ
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Card */}
        <div className="p-6 bg-gradient-to-r from-primary to-primary/90 text-white animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">{currentUser.avatar}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {currentUser.name}
              </h2>
              <p className="text-primary-foreground/90 mb-3">Bệnh nhân</p>
              <Button
                variant="outline"
                className="border border-white text-white hover:bg-white/10 font-medium rounded-lg h-8 text-body-sm flex items-center gap-2"
              >
                <Edit2 size={16} />
                Chỉnh sửa
              </Button>
            </div>
          </div>

          {/* Medical Info */}
          <div className="space-y-2 text-primary-foreground/90">
            <p className="text-body-md">📧 {currentUser.email}</p>
            <p className="text-body-md">📱 {currentUser.phone}</p>
            <p className="text-body-md">🩸 Nhóm máu: {currentUser.bloodType}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-3 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center gap-3 p-4 bg-white border border-border rounded-lg hover:shadow-card transition-all duration-300 active:scale-95"
            >
              <div className="text-primary">{item.icon}</div>
              <span className="flex-1 text-left text-body-md text-foreground font-medium">
                {item.label}
              </span>
              <span className="text-muted-foreground">›</span>
            </button>
          ))}
        </div>

        {/* Medical Info Section */}
        <div className="px-6 py-4 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-title-sm text-foreground mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            📋 Thông tin y tế
          </h3>

          <div className="space-y-3">
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-body-sm text-muted-foreground mb-1">Dị ứng</p>
              <p className="text-body-md font-medium text-foreground">{currentUser.allergies}</p>
            </div>
            <div className="bg-white border border-border rounded-lg p-4">
              <p className="text-body-sm text-muted-foreground mb-1">Tiền sử bệnh lý</p>
              <p className="text-body-md font-medium text-foreground">{currentUser.medicalHistory}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="px-6 py-4 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-title-sm text-foreground mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            🚨 Liên hệ khẩn cấp
          </h3>

          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
            <p className="text-body-sm text-muted-foreground mb-2">Người liên hệ</p>
            <p className="text-body-md font-medium text-foreground mb-2">Nguyễn Thị B (Vợ)</p>
            <p className="text-body-sm text-muted-foreground">0987 654 321</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-6 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold rounded-lg h-12 flex items-center justify-center gap-2 transition-smooth active:scale-95"
          >
            <LogOut size={18} />
            Đăng Xuất
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
