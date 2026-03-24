import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, LogOut, Settings, Bell, Shield, Plus } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export default function Profile() {
  const [, navigate] = useLocation();

  const currentUser = {
    name: 'Mai Nguyễn',
    role: 'Admin',
    avatar: '👩',
    email: 'mai@example.com',
    phone: '0123 456 789',
  };

  const familyMembers: FamilyMember[] = [
    { id: '1', name: 'Tuấn (Bố)', role: 'Admin', avatar: '👨' },
    { id: '2', name: 'Lan (Con)', role: 'Member', avatar: '👧' },
  ];

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
      <div className="flex-1 overflow-y-auto animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Profile Card */}
        <div className="p-6 bg-gradient-to-r from-primary to-primary/90 text-white animate-slide-in-down" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">{currentUser.avatar}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {currentUser.name}
              </h2>
              <p className="text-primary-foreground/90 mb-3">Vai trò: {currentUser.role}</p>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-body-sm">
                Quản trị viên
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-primary-foreground/90">
            <p className="text-body-md">📧 {currentUser.email}</p>
            <p className="text-body-md">📱 {currentUser.phone}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-3 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center gap-3 p-4 bg-white border border-border rounded-lg hover:shadow-card transition-smooth active:scale-95"
            >
              <div className="text-primary">{item.icon}</div>
              <span className="flex-1 text-left text-body-md text-foreground font-medium">
                {item.label}
              </span>
              <span className="text-muted-foreground">›</span>
            </button>
          ))}
        </div>

        {/* Family Members Section */}
        <div className="px-6 py-4 animate-slide-in-up" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-title-sm text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Quản lý Thành Viên
            </h3>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Plus size={20} className="text-primary" />
            </button>
          </div>

          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-4 bg-white border border-border rounded-lg hover:shadow-card transition-smooth"
              >
                <div className="text-3xl">{member.avatar}</div>
                <div className="flex-1">
                  <p className="text-body-md font-medium text-foreground">{member.name}</p>
                  <p className="text-body-sm text-muted-foreground">{member.role}</p>
                </div>
                <span className="text-primary">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
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
