import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ChevronLeft, Phone, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function Emergency() {
  const [, navigate] = useLocation();
  const [callActive, setCallActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const emergencyContacts = [
    { name: 'Cấp cứu 115', phone: '115', type: 'Quốc gia' },
    { name: 'Bệnh viện Đại học Y Hà Nội', phone: '02438 25 3531', type: 'Gần nhất' },
    { name: 'Bệnh viện Trung ương', phone: '02438 23 4848', type: 'Chuyên sâu' },
  ];

  const handleEmergencyCall = () => {
    setCallActive(true);
    // Simulate timer
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (callActive) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/80 flex flex-col items-center justify-center p-6 animate-fade-in">
        {/* Alert Animation */}
        <div className="mb-8 animate-pulse">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
            <AlertTriangle size={80} className="text-secondary" />
          </div>
        </div>

        {/* Status */}
        <h1 className="text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Đang gọi cấp cứu
        </h1>
        <p className="text-white/90 text-lg mb-8">Cấp cứu 115</p>

        {/* Timer */}
        <div className="text-6xl font-bold text-white mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {formatTime(timer)}
        </div>

        {/* Location Info */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-8 w-full max-w-sm text-white">
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={20} />
            <span>Vị trí của bạn đang được chia sẻ</span>
          </div>
          <p className="text-body-sm text-white/80">Địa chỉ: 123 Đường Lê Lợi, Hà Nội</p>
        </div>

        {/* Cancel Button */}
        <Button
          onClick={() => {
            setCallActive(false);
            setTimer(0);
            navigate('/home');
          }}
          className="w-full max-w-sm bg-white text-secondary hover:bg-white/90 font-bold text-lg rounded-full h-14 transition-smooth active:scale-95"
        >
          Hủy
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-white animate-slide-in-down">
        <button
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Gọi Cấp Cứu
        </h1>
      </div>

      {/* Warning Banner */}
      <div className="p-4 bg-secondary/10 border-b border-secondary/30">
        <div className="flex items-start gap-3">
          <AlertTriangle size={24} className="text-secondary flex-shrink-0 mt-1" />
          <div>
            <p className="text-body-md font-medium text-foreground">Tình huống khẩn cấp?</p>
            <p className="text-body-sm text-muted-foreground mt-1">
              Nhấn nút dưới để gọi ngay cấp cứu. Vị trí của bạn sẽ được chia sẻ tự động.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Emergency Button */}
        <div className="mb-8 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={handleEmergencyCall}
            className="w-full aspect-square max-w-xs mx-auto bg-gradient-to-br from-secondary to-secondary/80 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 flex items-center justify-center"
          >
            <div className="text-center">
              <Phone size={64} className="mx-auto mb-4" />
              <p className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                SOS
              </p>
              <p className="text-sm mt-2">Nhấn để gọi</p>
            </div>
          </button>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-title-sm text-foreground mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Liên hệ cấp cứu
          </h2>

          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-card transition-smooth"
            >
              <div>
                <p className="text-body-md font-medium text-foreground">{contact.name}</p>
                <p className="text-body-sm text-muted-foreground">{contact.type}</p>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-accent/10 border border-accent/30 rounded-lg animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            💡 Mẹo khi gọi cấp cứu
          </h3>
          <ul className="space-y-2">
            <li className="text-body-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span>Nói rõ tên, địa chỉ và triệu chứng</span>
            </li>
            <li className="text-body-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span>Giữ bình tĩnh và nghe theo hướng dẫn</span>
            </li>
            <li className="text-body-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span>Không cúp máy cho đến khi được phép</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
