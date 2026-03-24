import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { ChevronLeft, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border animate-slide-in-down">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Đăng Nhập</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 justify-center animate-slide-in-up">
        {/* Welcome Message */}
        <div className="mb-8 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Chào mừng trở lại
          </h2>
          <p className="text-body-md text-muted-foreground">
            Đăng nhập để tiếp tục quản lý gia đình của bạn
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6 animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
          {/* Email Input */}
          <div>
            <label className="block text-body-md font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-card border border-border rounded-lg"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-body-md font-medium text-foreground mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-card border border-border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg mb-4 transition-smooth active:scale-95 animate-slide-in-up"
          style={{ fontFamily: "'Poppins', sans-serif", animationDelay: '0.2s' }}
        >
          Đăng Nhập
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-body-sm text-muted-foreground">hoặc</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full h-12 border border-border rounded-lg font-sans font-medium flex items-center justify-center gap-2"
        >
          <span className="text-xl">🔍</span>
          Đăng nhập bằng Google
        </Button>

        {/* Forgot Password */}
        <button className="text-center mt-6 text-primary hover:text-primary/80 font-sans text-sm">
          Quên mật khẩu?
        </button>
      </div>

      {/* Footer */}
      <div className="p-6 text-center border-t border-border">
        <p className="text-body-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <button className="text-primary hover:text-primary/80 font-medium">
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
}
