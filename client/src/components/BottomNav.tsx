import { Home, MessageCircle, Heart, Pill, User } from 'lucide-react';
import { useLocation } from 'wouter';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

export default function BottomNav() {
  const [location, navigate] = useLocation();

  const navItems: NavItem[] = [
    { id: 'home', icon: <Home size={24} />, label: 'Trang chủ', path: '/home' },
    { id: 'consultation', icon: <MessageCircle size={24} />, label: 'Tư vấn', path: '/consultation' },
    { id: 'health', icon: <Heart size={24} />, label: 'Sức khỏe', path: '/health' },
    { id: 'medicine', icon: <Pill size={24} />, label: 'Thuốc', path: '/medicine' },
    { id: 'profile', icon: <User size={24} />, label: 'Hồ sơ', path: '/profile' },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
              isActive(item.path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="mb-1">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
