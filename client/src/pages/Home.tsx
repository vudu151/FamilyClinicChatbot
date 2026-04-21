import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { Bell, Settings, Search, Camera, Calendar, Clock, Stethoscope, MessageSquare, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState('');

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
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute top-40 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -ml-20"></div>

      {/* Header */}
      <div className="px-4 pt-8 pb-4 relative z-10 animate-slide-in-down">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white shadow-sm border border-border rounded-full flex items-center justify-center text-2xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-body-sm text-muted-foreground font-medium">Chào buổi sáng,</p>
              <p className="text-title-sm font-bold text-foreground">Nguyễn Văn A</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 bg-white rounded-full shadow-sm border border-border hover:bg-muted transition-colors">
              <Bell size={20} className="text-foreground" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="p-2 bg-white rounded-full shadow-sm border border-border hover:bg-muted transition-colors"
            >
              <Settings size={20} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* AI Greeting Message */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            Trợ lý Y tế <br/> <span className="text-primary">Gia đình</span>
          </h1>
          <p className="text-body-md text-muted-foreground">
            Hôm nay bạn thấy trong người thế nào? Hãy nói cho tôi biết triệu chứng của bạn.
          </p>
        </div>

        {/* Global Search / Chat Input Trigger */}
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

      {/* Content */}
      <div className="flex-1 px-4 py-2 relative z-10 space-y-6">
        
        {/* Quick Prompts */}
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

        {/* Summary Card */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass rounded-3xl p-5 border border-white/60 relative overflow-hidden">
             <div className="relative z-10 flex justify-between items-center">
                <div>
                   <p className="text-body-sm font-medium text-muted-foreground mb-1">Cập nhật sức khỏe</p>
                   <p className="text-title-md font-bold text-foreground">Bạn rất khỏe mạnh!</p>
                   <p className="text-body-xs text-muted-foreground mt-1">Lần khám cuối: 15/03/2026</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-primary rounded-full flex items-center justify-center text-white shadow-lg">
                   <Heart size={28} className="fill-white" />
                </div>
             </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
