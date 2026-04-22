import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { Bell, Settings, Search, Camera, Calendar, Clock, Stethoscope, MessageSquare, Heart, Clock3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load lịch sử hội thoại
    fetch('/api/chat', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.conversations) setHistory(data.conversations);
    })
    .catch(console.error);
  }, []);

  const quickPrompts = [
    { icon: <Stethoscope size={20} className="text-primary" />, label: 'Kiểm tra triệu chứng', query: 'Tôi có một vài triệu chứng cần kiểm tra.' },
    { icon: <Camera size={20} className="text-primary" />, label: 'Chẩn đoán hình ảnh', action: '/consultation?tab=image' },
    { icon: <Calendar size={20} className="text-primary" />, label: 'Đặt lịch khám', action: '/consultation?q=Tôi+muốn+đặt+lịch+khám' },
    { icon: <Clock size={20} className="text-primary" />, label: 'Hỏi về đơn thuốc', query: 'Hướng dẫn cho tôi cách sử dụng đơn thuốc này.' },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      navigate(`/consultation?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/consultation');
    }
  };

  const handlePromptClick = (prompt: any) => {
    if (prompt.action) {
      navigate(prompt.action);
    } else if (prompt.query) {
      navigate(`/consultation?q=${encodeURIComponent(prompt.query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute top-40 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -ml-20"></div>

      <div className="px-4 pt-8 pb-4 relative z-10 animate-slide-in-down">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white shadow-sm border border-border rounded-full flex items-center justify-center text-2xl overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground font-medium">Chào buổi sáng,</p>
              <p className="text-title-sm font-bold text-foreground">{user?.name || 'Bạn'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 bg-white rounded-full shadow-sm border border-border hover:bg-muted transition-colors">
              <Bell size={20} className="text-foreground" />
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="p-2 bg-white rounded-full shadow-sm border border-border hover:bg-muted transition-colors"
            >
              <Settings size={20} className="text-foreground" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            Trợ lý Y tế <br/> <span className="text-primary">Gia đình</span>
          </h1>
          <p className="text-body-md text-muted-foreground">
            Hôm nay bạn thấy trong người thế nào? Hãy nói cho tôi biết triệu chứng của bạn.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative glass rounded-2xl shadow-sm p-1 flex items-center">
          <div className="pl-3 py-3">
             <Search size={20} className="text-muted-foreground" />
          </div>
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mô tả triệu chứng của bạn..." 
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-body-md h-12"
          />
          <Button 
            type="submit"
            className="rounded-xl h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium mr-1"
          >
            Hỏi AI
          </Button>
        </form>
      </div>

      <div className="flex-1 px-4 py-2 relative z-10 space-y-6">
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
           <h2 className="text-title-sm font-bold mb-3 flex items-center gap-2">
              <MessageSquare size={18} className="text-primary"/> Gợi ý nhanh
           </h2>
           <div className="grid grid-cols-2 gap-3">
             {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="bg-white border border-border rounded-2xl p-4 flex flex-col gap-3 hover:border-primary/50 hover:shadow-card transition-all text-left active:scale-95 group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                     {prompt.icon}
                  </div>
                  <span className="text-body-sm font-medium text-foreground leading-tight">
                    {prompt.label}
                  </span>
                </button>
             ))}
           </div>
        </div>

        {history.length > 0 && (
          <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
             <h2 className="text-title-sm font-bold mb-3 flex items-center gap-2">
                <Clock3 size={18} className="text-primary"/> Lịch sử tư vấn gần đây
             </h2>
             <div className="space-y-3">
               {history.slice(0, 3).map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => navigate(`/consultation?cid=${conv.id}`)}
                    className="w-full glass border border-white/60 rounded-2xl p-4 flex items-center justify-between active:scale-95 transition-smooth"
                  >
                     <div className="text-left">
                        <p className="font-medium text-foreground truncate max-w-[200px]">{conv.title}</p>
                        <p className="text-body-xs text-muted-foreground mt-1">
                           {new Date(conv.updatedAt).toLocaleDateString()}
                        </p>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-primary" />
                     </div>
                  </button>
               ))}
             </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
