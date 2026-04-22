import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stethoscope, User, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { email, password, name };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Lỗi hệ thống');
      }

      login(data.token, data.user);
      toast.success(isLogin ? 'Đăng nhập thành công' : 'Đăng ký thành công');
      navigate('/home');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 animate-fade-in relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="w-full max-w-sm glass p-8 rounded-3xl shadow-xl z-10 border border-white/60">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
             <Stethoscope size={32} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-title-md font-bold text-center mb-2 text-foreground">
          {isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
        </h1>
        <p className="text-body-sm text-center text-muted-foreground mb-8">
          Hệ thống Y tế Gia đình thông minh
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User size={18} className="absolute left-3 top-3.5 text-muted-foreground" />
              <Input
                required
                className="pl-10 h-12 rounded-xl bg-white/60 focus-visible:ring-primary"
                placeholder="Họ và Tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              required
              type="email"
              className="pl-10 h-12 rounded-xl bg-white/60 focus-visible:ring-primary"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              required
              type="password"
              className="pl-10 h-12 rounded-xl bg-white/60 focus-visible:ring-primary"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-xl text-body-md font-bold mt-2"
          >
            {loading ? 'Đang xử lý...' : isLogin ? 'Đăng Nhập' : 'Đăng Ký Khám'}
          </Button>
        </form>

        <div className="mt-6 text-center text-body-sm">
          <span className="text-muted-foreground">
            {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          </span>
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
}
