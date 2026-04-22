import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Send, Lightbulb, MessageCircle, Mic, Image as ImageIcon, Square, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'doctor';
  text?: string;
  image?: string;
  audio?: string;
  timestamp: string;
  senderName?: string;
  type: 'text' | 'image' | 'audio';
  target: 'ai' | 'doctor';
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
      text: 'Xin chào! Tôi là Trợ lý AI của Phòng Khám Gia Đình. Tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      senderName: 'Trợ lý Y tế',
      type: 'text',
      target: 'ai',
    },
    {
      id: '2',
      sender: 'doctor',
      text: 'Xin chào! Tôi là Bác sĩ chuyên khoa. Cảm ơn bạn đã liên hệ, tôi có thể giúp gì cho bạn hôm nay?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      senderName: 'Bác sĩ',
      type: 'text',
      target: 'doctor',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [consultationType, setConsultationType] = useState<'ai' | 'doctor'>('ai');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const hasInitialized = useRef(false);
  const { token } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const tab = params.get('tab');
      const cid = params.get('cid');
      
      if (cid) {
        setConversationId(cid);
        fetch(`/api/chat/${cid}/messages`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => {
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages.map((m: any) => ({
              id: m.id,
              sender: m.role === 'user' ? 'user' : 'ai',
              text: m.content,
              timestamp: new Date(m.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              type: m.content.startsWith('[Hình') ? 'image' : 'text',
              target: 'ai'
            })));
          }
        });
      } else if (q) {
        // Điền sẵn câu hỏi vào ô input thay vì tự động gửi
        setInputText(q);
      } else if (tab === 'image') {
        // Just trigger the file input click after a short delay
        setTimeout(() => {
           fileInputRef.current?.click();
        }, 300);
      }
    } catch(e) {}
  }, []);

  const callAI = async (text?: string, imageBase64?: string) => {
    if (consultationType === 'doctor') {
      setTimeout(() => {
        const docMsg: Message = {
           id: String(Date.now()),
           sender: 'doctor',
           text: 'Xin chào, tôi là Dr. Nguyễn Văn A, chuyên khoa Nội tổng quát. Tôi sẽ giúp bạn. Bạn có thể mô tả chi tiết hơn về triệu chứng không?',
           timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
           senderName: 'Dr. Nguyễn Văn A',
           type: 'text',
           target: 'doctor',
        };
        setMessages((prev) => [...prev, docMsg]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const history = messages
        .filter((m) => m.sender === 'user' || m.sender === 'ai')
        .map((m) => {
          // Chỉ gửi qua history những đoạn text, bỏ qua hình ảnh để tối ưu payload của lịch sử
          const textPart = m.type === 'text' ? m.text : (m.type === 'image' ? '[Hình ảnh ngưởi bệnh gửi]' : '[Tin nhắn thoại]');
          return {
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: textPart || "" }]
          };
        });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text, imageBase64, history, conversationId }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Lỗi xử lý từ máy chủ.");
      }

      if (data.conversationId) setConversationId(data.conversationId);
      
      const aiMessage: Message = {
        id: String(Date.now()),
        sender: 'ai',
        text: data.response,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        senderName: 'Trợ lý Y tế',
        type: 'text',
        target: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: String(Date.now()),
        sender: 'ai',
        text: (error as any).message || "Xin lỗi, Hệ thống đang gặp sự cố kết nối tới máy chủ AI. Bạn vui lòng thử lại sau.",
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        senderName: 'Trợ lý Y tế',
        type: 'text',
        target: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const userText = inputText.trim();
      const userMessage: Message = {
        id: String(Date.now()),
        sender: 'user',
        text: userText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        target: consultationType,
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsLoading(true);
      await callAI(userText);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageData = event.target?.result as string;
        const userMessage: Message = {
          id: String(Date.now()),
          sender: 'user',
          image: imageData,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          type: 'image',
          target: consultationType,
        };
        setMessages(prev => [...prev, userMessage]);
        
        setIsLoading(true);
        // Prompt mặc định khi gửi ảnh
        await callAI("Hãy phân tích hình ảnh này và cho tôi biết triệu chứng hoặc lời khuyên.", imageData);
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

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const userMessage: Message = {
          id: String(Date.now()),
          sender: 'user',
          audio: audioUrl,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          type: 'audio',
          target: consultationType,
        };
        setMessages(prev => [...prev, userMessage]);

        setIsLoading(true);
        await callAI("Tôi vừa gửi tin nhắn bằng giọng nói (Demo). Hãy cho lời khuyên thông qua giả định.");

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 120) {
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

  const handleSuggestion = async (suggestion: string) => {
    if (isLoading) return;
    const userMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: suggestion,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      target: consultationType,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    await callAI(suggestion);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 glass animate-slide-in-down z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tư vấn Sức khỏe
            </h1>
            <p className="text-body-sm text-muted-foreground">
              {consultationType === 'ai' ? 'Trợ lý AI' : 'Bác sĩ chuyên khoa'}
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Type Selector */}
      <div className="flex gap-2 px-4 py-2 bg-white/50 backdrop-blur-md z-10 sticky top-[72px]">
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

      {/* Messages - Added pb-32 to fix scroll occlusion with overlay input */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.filter(msg => msg.target === consultationType).map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-slide-in-up`}
          >
            <div className="text-2xl">
              {msg.sender === 'user' ? '👤' : msg.sender === 'ai' ? '🤖' : '👨‍⚕️'}
            </div>
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.senderName && (
                <p className="text-body-sm text-muted-foreground mb-1">{msg.senderName}</p>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-sm overflow-hidden shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white border border-border text-foreground'
                }`}
              >
                {msg.type === 'text' && <p className="text-body-md whitespace-pre-wrap">{msg.text}</p>}
                {msg.type === 'image' && (
                  <div className="rounded-lg overflow-hidden bg-muted">
                    <img src={msg.image} alt="Uploaded" className="max-w-full h-auto object-contain" style={{ maxHeight: '200px' }} />
                  </div>
                )}
                {msg.type === 'audio' && (
                  <div className="flex items-center gap-2">
                    <Mic size={18} />
                    <audio controls className="h-8 max-w-xs">
                      <source src={msg.audio} type="audio/wav" />
                    </audio>
                  </div>
                )}
              </div>
              <p className="text-body-sm text-muted-foreground mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-slide-in-up">
            <div className="text-2xl">{consultationType === 'doctor' ? '👨‍⚕️' : '🤖'}</div>
            <div className="flex flex-col items-start">
               <p className="text-body-sm text-muted-foreground mb-1">
                 {consultationType === 'doctor' ? 'Dr. Nguyễn Văn A' : 'HealthCare AI'}
               </p>
               <div className="rounded-2xl px-4 py-3 bg-accent/10 border border-accent/30 flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-body-md text-muted-foreground">Đang xử lý...</span>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.filter(msg => msg.target === consultationType).length <= 1 && (
        <div className="px-4 py-4 border-t border-border bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-secondary" />
            <p className="text-body-sm font-medium text-foreground">Gợi ý:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSuggestion(suggestion)}
                className="px-3 py-2 bg-primary/10 border border-primary/30 rounded-full text-body-sm text-foreground hover:bg-primary/20 transition-colors disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-24 left-4 right-4 glass rounded-3xl p-2 z-20 mb-2 shadow-lg">
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
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-muted rounded-lg transition-smooth active:scale-95 disabled:opacity-50"
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
              disabled={isLoading}
              onClick={startRecording}
              className="p-2 hover:bg-muted rounded-lg transition-smooth active:scale-95 disabled:opacity-50"
              title="Ghi âm"
            >
              <Mic size={20} className="text-primary" />
            </button>

            {/* Text Input */}
            <Input
              type="text"
              disabled={isLoading}
              placeholder={isLoading ? "Đang xử lý..." : (consultationType === 'doctor' ? "Nhắn bác sĩ..." : "Hỏi trợ lý bệnh lý...")}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white/60 border-0 rounded-full h-10 px-4"
            />

            {/* Send Button */}
            <button
              disabled={isLoading || !inputText.trim()}
              onClick={handleSend}
              className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-smooth active:scale-95 disabled:opacity-50 shadow-md mr-1"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
