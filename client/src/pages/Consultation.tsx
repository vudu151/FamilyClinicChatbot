import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Send, Lightbulb, MessageCircle, Mic, Image as ImageIcon, Square } from 'lucide-react';
import { useState, useRef } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'doctor';
  text?: string;
  image?: string;
  audio?: string;
  timestamp: string;
  senderName?: string;
  type: 'text' | 'image' | 'audio';
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
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [consultationType, setConsultationType] = useState<'ai' | 'doctor'>('ai');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: String(messages.length + 1),
        sender: 'user',
        text: inputText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
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
          type: 'text',
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, 500);

      setInputText('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        const userMessage: Message = {
          id: String(messages.length + 1),
          sender: 'user',
          image: imageData,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          type: 'image',
        };
        setMessages([...messages, userMessage]);

        // Simulate response
        setTimeout(() => {
          const responseMessage: Message = {
            id: String(messages.length + 2),
            sender: consultationType === 'ai' ? 'ai' : 'doctor',
            text: 'Tôi đã nhận được hình ảnh của bạn. Dựa trên hình ảnh này, tôi có thể thấy... Bạn có thể mô tả thêm về triệu chứng không?',
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            senderName: consultationType === 'ai' ? 'HealthCare AI' : 'Dr. Nguyễn Văn A',
            type: 'text',
          };
          setMessages((prev) => [...prev, responseMessage]);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const userMessage: Message = {
          id: String(messages.length + 1),
          sender: 'user',
          audio: audioUrl,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          type: 'audio',
        };
        setMessages([...messages, userMessage]);

        // Simulate response
        setTimeout(() => {
          const responseMessage: Message = {
            id: String(messages.length + 2),
            sender: consultationType === 'ai' ? 'ai' : 'doctor',
            text: 'Tôi đã nghe tin nhắn giọng nói của bạn. Dựa trên những gì bạn nói, tôi có thể giúp bạn... Bạn cần tư vấn gì thêm?',
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            senderName: consultationType === 'ai' ? 'HealthCare AI' : 'Dr. Nguyễn Văn A',
            type: 'text',
          };
          setMessages((prev) => [...prev, responseMessage]);
        }, 500);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 120) {
            // Max 2 minutes
            mediaRecorder.stop();
            setIsRecording(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                {msg.type === 'text' && <p className="text-body-md">{msg.text}</p>}
                {msg.type === 'image' && (
                  <div className="rounded-lg overflow-hidden">
                    <img src={msg.image} alt="Uploaded" className="max-w-xs h-auto" />
                  </div>
                )}
                {msg.type === 'audio' && (
                  <div className="flex items-center gap-2">
                    <Mic size={18} />
                    <audio controls className="h-8 max-w-xs">
                      <source src={msg.audio} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
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
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-border p-4 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
        {isRecording ? (
          // Recording UI
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 flex items-center gap-3">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-body-sm font-medium text-foreground">
                Đang ghi âm: {formatTime(recordingTime)}
              </span>
            </div>
            <button
              onClick={stopRecording}
              className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth active:scale-95"
            >
              <Square size={20} />
            </button>
          </div>
        ) : (
          // Normal Input UI
          <div className="flex items-center gap-2">
            {/* Image Upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-muted rounded-lg transition-smooth active:scale-95"
              title="Upload ảnh"
            >
              <ImageIcon size={20} className="text-primary" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Voice Recording */}
            <button
              onClick={startRecording}
              className="p-2 hover:bg-muted rounded-lg transition-smooth active:scale-95"
              title="Ghi âm"
            >
              <Mic size={20} className="text-primary" />
            </button>

            {/* Text Input */}
            <Input
              type="text"
              placeholder="Mô tả triệu chứng của bạn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-muted border-0 rounded-full h-10"
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="p-2 hover:bg-primary/10 rounded-lg transition-smooth active:scale-95"
            >
              <Send size={20} className="text-primary" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
