import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Calendar, Star, MapPin, MessageCircle } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  available: boolean;
}

export default function Doctors() {
  const [, navigate] = useLocation();

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Nguyễn Văn A',
      specialty: 'Nội tổng quát',
      avatar: '👨‍⚕️',
      rating: 4.8,
      reviews: 245,
      location: 'Bệnh viện Đại học Y Hà Nội',
      price: '150.000 VNĐ',
      available: true,
    },
    {
      id: '2',
      name: 'Dr. Trần Thị B',
      specialty: 'Nhi khoa',
      avatar: '👩‍⚕️',
      rating: 4.9,
      reviews: 312,
      location: 'Phòng khám Quốc tế',
      price: '200.000 VNĐ',
      available: true,
    },
    {
      id: '3',
      name: 'Dr. Lê Văn C',
      specialty: 'Tim mạch',
      avatar: '👨‍⚕️',
      rating: 4.7,
      reviews: 189,
      location: 'Bệnh viện Trung ương',
      price: '250.000 VNĐ',
      available: false,
    },
  ];

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
        <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Kết nối Bác sĩ
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Filter/Search */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Tìm bác sĩ..."
            className="flex-1 px-4 py-2 bg-white border border-border rounded-lg text-body-md"
          />
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
            🔍
          </button>
        </div>

        {/* Doctors List */}
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white border border-border rounded-lg p-4 hover:shadow-card transition-smooth"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="text-5xl flex-shrink-0">{doctor.avatar}</div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {doctor.name}
                </h3>
                <p className="text-body-sm text-primary font-medium mb-2">{doctor.specialty}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="text-body-sm font-medium text-foreground">{doctor.rating}</span>
                  </div>
                  <span className="text-body-sm text-muted-foreground">({doctor.reviews} đánh giá)</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 mb-2 text-body-sm text-muted-foreground">
                  <MapPin size={14} />
                  {doctor.location}
                </div>

                {/* Price */}
                <p className="text-body-sm font-medium text-foreground mb-3">{doctor.price}/buổi</p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    disabled={!doctor.available}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg h-10 text-body-sm transition-smooth active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} />
                    {doctor.available ? 'Đặt lịch' : 'Hết lịch'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border border-border rounded-lg h-10 text-body-sm transition-smooth active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
