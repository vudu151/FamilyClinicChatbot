import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Mic, Image, Send } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isAI?: boolean;
}

export default function ChatFamily() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Mai',
      avatar: '👩',
      text: 'Mọi người ơi, chiều nay có ai rảnh không?',
      timestamp: '10:30',
    },
    {
      id: '2',
      sender: 'Tuấn',
      avatar: '👨',
      text: 'Mình rảnh từ 3h chiều',
      timestamp: '10:32',
    },
    {
      id: '3',
      sender: 'Lan',
      avatar: '👧',
      text: 'Mẹ ơi, chatbot này có thể giúp mình làm bài tập không?',
      timestamp: '10:35',
      isAI: false,
    },
    {
      id: '4',
      sender: 'Family AI',
      avatar: '🤖',
      text: 'Tôi có thể giúp bạn với bài tập! Hãy nói cho tôi biết bạn cần gì.',
      timestamp: '10:36',
      isAI: true,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        sender: 'Tuấn',
        avatar: '👨',
        text: inputText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-white animate-slide-in-down">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>Gia Đình</h1>
            <p className="text-body-sm text-muted-foreground">5 thành viên</p>
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <span className="text-xl">💬</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'Tuấn' ? 'flex-row-reverse' : ''}`}
          >
            <div className="text-2xl">{msg.avatar}</div>
            <div className={`flex flex-col ${msg.sender === 'Tuấn' ? 'items-end' : 'items-start'}`}>
              <p className="text-body-sm text-muted-foreground mb-1">{msg.sender}</p>
              <div
                className={`rounded-2xl px-4 py-3 max-w-xs ${
                  msg.sender === 'Tuấn'
                    ? 'bg-primary text-primary-foreground'
                    : msg.isAI
                      ? 'bg-accent/10 border border-accent/30 text-foreground'
                      : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-body-md">{msg.text}</p>
              </div>
              <p className="text-body-sm text-muted-foreground mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-border p-4 flex items-center gap-2 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Mic size={20} className="text-primary" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Image size={20} className="text-primary" />
        </button>
        <Input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-muted border-0 rounded-full h-10"
        />
        <button
          onClick={handleSend}
          className="p-2 hover:bg-primary/10 rounded-lg transition-smooth active:scale-95"
        >
          <Send size={20} className="text-primary" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
