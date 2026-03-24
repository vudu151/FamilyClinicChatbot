import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Send, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const suggestions = [
  'Hôm nay nên ăn gì?',
  'Gợi ý hoạt động gia đình',
  'Lên kế hoạch cuối tuần',
  'Mẹo quản lý thời gian',
];

export default function ChatAI() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Xin chào! Tôi là Family AI, trợ lý thông minh của gia đình bạn. Tôi có thể giúp bạn với nhiều việc như lên kế hoạch, gợi ý, và trả lời câu hỏi. Bạn cần gì hôm nay?',
      timestamp: '10:00',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: String(messages.length + 1),
        sender: 'user',
        text: inputText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: String(messages.length + 2),
          sender: 'ai',
          text: 'Đó là một câu hỏi hay! Tôi đang xử lý thông tin để đưa ra gợi ý tốt nhất cho gia đình bạn.',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 500);

      setInputText('');
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

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
        <div>
          <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Family AI
          </h1>
          <p className="text-body-sm text-muted-foreground">Trợ lý thông minh</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className="text-2xl">{msg.sender === 'user' ? '👤' : '🤖'}</div>
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`rounded-2xl px-4 py-3 max-w-xs ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent/10 border border-accent/30 text-foreground'
                }`}
              >
                <p className="text-body-md">{msg.text}</p>
              </div>
              <p className="text-body-sm text-muted-foreground mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions (if no messages yet or after initial message) */}
      {messages.length <= 1 && (
        <div className="px-4 py-4 border-t border-border bg-white animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-secondary" />
            <p className="text-body-sm font-medium text-foreground">Gợi ý:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion)}
                className="px-3 py-2 bg-secondary/10 border border-secondary/30 rounded-full text-body-sm text-foreground hover:bg-secondary/20 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-border p-4 flex items-center gap-2 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        <Input
          type="text"
          placeholder="Hỏi Family AI..."
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
