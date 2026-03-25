import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Send, Lightbulb, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'doctor';
  text: string;
  timestamp: string;
  senderName?: string;
}

const suggestions = [
  'Tôi bị sốt cao',
  'Hỏi về cảm lạnh',
  'Tư vấn về dị ứng',
  'Hỏi về chế độ ăn uống',
];

export default function Consultation() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Xin chào! Tôi là HealthCare AI, trợ lý sức khỏe thông minh. Tôi có thể giúp bạn tư vấn về các vấn đề sức khỏe, triệu chứng, và hướng dẫn khi cần gặp bác sĩ. Bạn cảm thấy thế nào hôm nay?',
      timestamp: '10:00',
      senderName: 'HealthCare AI',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [consultationType, setConsultationType] = useState<'ai' | 'doctor'>('ai');

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: String(messages.length + 1),
        sender: 'user',
        text: inputText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, userMessage]);

      // Simulate response
      setTimeout(() => {
        const responseMessage: Message = {
          id: String(messages.length + 2),
          sender: consultationType === 'ai' ? 'ai' : 'doctor',
          text: consultationType === 'ai'
            ? 'Tôi hiểu rồi. Dựa trên triệu chứng bạn mô tả, tôi khuyên bạn nên uống nước ấm, nghỉ ngơi đầy đủ, và theo dõi tình trạng. Nếu triệu chứng không cải thiện trong 3 ngày, hãy gặp bác sĩ.'
            : 'Xin chào, tôi là Dr. Nguyễn Văn A, chuyên khoa Nội tổng quát. Tôi sẽ giúp bạn. Bạn có thể mô tả chi tiết hơn về triệu chứng không?',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          senderName: consultationType === 'ai' ? 'HealthCare AI' : 'Dr. Nguyễn Văn A',
        };
        setMessages((prev) => [...prev, responseMessage]);
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
      <div className="flex items-center justify-between p-4 border-b border-border bg-white animate-slide-in-down">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tư vấn sức khỏe
            </h1>
            <p className="text-body-sm text-muted-foreground">
              {consultationType === 'ai' ? 'HealthCare AI' : 'Bác sĩ'}
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Type Selector */}
      <div className="flex gap-2 p-4 border-b border-border bg-white">
        <button
          onClick={() => setConsultationType('ai')}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-smooth ${
            consultationType === 'ai'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          🤖 AI
        </button>
        <button
          onClick={() => setConsultationType('doctor')}
          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-smooth ${
            consultationType === 'doctor'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          👨‍⚕️ Bác sĩ
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className="text-2xl">
              {msg.sender === 'user' ? '👤' : msg.sender === 'ai' ? '🤖' : '👨‍⚕️'}
            </div>
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.senderName && (
                <p className="text-body-sm text-muted-foreground mb-1">{msg.senderName}</p>
              )}
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

      {/* Suggestions */}
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
                className="px-3 py-2 bg-primary/10 border border-primary/30 rounded-full text-body-sm text-foreground hover:bg-primary/20 transition-colors"
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
          placeholder="Mô tả triệu chứng của bạn..."
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
