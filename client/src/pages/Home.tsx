import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronRight, Zap, MessageSquare, Sparkles, Image } from 'lucide-react';

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-6 rounded-b-3xl shadow-md animate-slide-in-down">
        <h1 className="text-title-lg mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Gia đình hôm nay</h1>
        <p className="text-primary-foreground/90">Chào buổi sáng, Tuấn!</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Tasks Card */}
        <div
          onClick={() => navigate('/tasks')}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-card p-4 cursor-pointer hover:shadow-card transition-all duration-300 active:scale-95"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                ✅ Công việc hôm nay
              </h3>
              <p className="text-body-sm text-muted-foreground">3 việc cần làm</p>
            </div>
            <ChevronRight className="text-primary" size={20} />
          </div>
        </div>

        {/* Reminder Card */}
        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                🔔 Nhắc việc
              </h3>
              <p className="text-body-sm text-muted-foreground">Lên thực đơn cho bữa tối</p>
            </div>
            <Zap className="text-secondary" size={20} />
          </div>
        </div>

        {/* AI Suggestion Card */}
        <div
          onClick={() => navigate('/chat-ai')}
          className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-card p-4 cursor-pointer hover:shadow-card transition-all duration-300 active:scale-95"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                💡 Gợi ý từ AI
              </h3>
              <p className="text-body-sm text-muted-foreground">Hôm nay nên ăn gì?</p>
            </div>
            <Sparkles className="text-accent" size={20} />
          </div>
        </div>

        {/* Memory Card */}
        <div className="bg-white border border-border rounded-card p-4 overflow-hidden shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-title-sm text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              📸 Kỷ niệm gần đây
            </h3>
            <Image className="text-muted-foreground" size={20} />
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg h-32 flex items-center justify-center">
            <span className="text-4xl">🏡</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <Button
            onClick={() => navigate('/chat-family')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg h-12 transition-smooth active:scale-95"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <MessageSquare size={18} className="mr-2" />
            Chat
          </Button>
          <Button
            onClick={() => navigate('/calendar')}
            variant="outline"
            className="border border-border rounded-lg h-12 font-bold transition-smooth active:scale-95"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            📅 Lịch
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
