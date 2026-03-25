import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, TrendingUp, Heart, Droplet, Wind } from 'lucide-react';

interface HealthRecord {
  id: string;
  date: string;
  type: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  icon: React.ReactNode;
}

export default function Health() {
  const [, navigate] = useLocation();

  const healthRecords: HealthRecord[] = [
    {
      id: '1',
      date: '24/03/2026',
      type: 'Huyết áp',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      icon: <Heart size={24} />,
    },
    {
      id: '2',
      date: '24/03/2026',
      type: 'Nhịp tim',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      icon: <TrendingUp size={24} />,
    },
    {
      id: '3',
      date: '23/03/2026',
      type: 'Đường huyết',
      value: '95',
      unit: 'mg/dL',
      status: 'normal',
      icon: <Droplet size={24} />,
    },
    {
      id: '4',
      date: '22/03/2026',
      type: 'SpO2',
      value: '98',
      unit: '%',
      status: 'normal',
      icon: <Wind size={24} />,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-500 bg-green-50';
      case 'warning':
        return 'text-yellow-500 bg-yellow-50';
      case 'danger':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal':
        return 'Bình thường';
      case 'warning':
        return 'Cần chú ý';
      case 'danger':
        return 'Cảnh báo';
      default:
        return 'Không xác định';
    }
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
        <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Lịch sử Sức khỏe
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-body-sm text-muted-foreground mb-2">Lần khám cuối</p>
            <p className="text-title-sm text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
              15/03/2026
            </p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4">
            <p className="text-body-sm text-muted-foreground mb-2">Trạng thái</p>
            <p className="text-title-sm text-accent" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Bình thường
            </p>
          </div>
        </div>

        {/* Health Records */}
        <div className="space-y-3">
          <h2 className="text-title-sm text-foreground mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Chỉ số gần đây
          </h2>

          {healthRecords.map((record) => (
            <div
              key={record.id}
              className={`border rounded-lg p-4 ${getStatusColor(record.status)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="opacity-70">{record.icon}</div>
                  <div>
                    <p className="text-body-md font-medium text-foreground">{record.type}</p>
                    <p className="text-body-sm text-muted-foreground">{record.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {record.value}
                  </p>
                  <p className="text-body-sm text-muted-foreground">{record.unit}</p>
                </div>
                <span className="text-body-sm font-medium">{getStatusLabel(record.status)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Record Button */}
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg h-12 transition-smooth active:scale-95 mt-6">
          + Thêm chỉ số sức khỏe
        </Button>

        {/* Tips */}
        <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg mt-6">
          <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            💡 Lời khuyên
          </h3>
          <ul className="space-y-2">
            <li className="text-body-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span>Đo huyết áp hàng ngày vào cùng một thời điểm</span>
            </li>
            <li className="text-body-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span>Ghi chép đầy đủ để theo dõi xu hướng</span>
            </li>
            <li className="text-body-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">✓</span>
              <span>Tư vấn bác sĩ nếu có chỉ số bất thường</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
