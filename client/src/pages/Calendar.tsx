import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

interface Event {
  date: number;
  title: string;
  color: string;
  time: string;
}

export default function Calendar() {
  const [, navigate] = useLocation();
  const [currentMonth, setCurrentMonth] = useState(3); // March
  const [currentYear, setCurrentYear] = useState(2026);

  const events: Record<number, Event[]> = {
    8: [
      { date: 8, title: 'Lớp học thêm của Bé', color: 'bg-orange-400', time: '08:00' },
    ],
    14: [
      { date: 14, title: 'Họp phụ huynh', color: 'bg-blue-400', time: '14:00' },
    ],
    19: [
      { date: 19, title: 'Sinh nhật của Mẹ', color: 'bg-pink-400', time: '19:00' },
    ],
    24: [
      { date: 24, title: 'Lên thực đơn cho bữa tối', color: 'bg-green-400', time: '17:00' },
    ],
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = [];

  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-white animate-slide-in-down">
        <button
          onClick={() => navigate('/home')}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Lịch Gia Đình
        </h1>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Plus size={24} className="text-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6 animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <h2 className="text-title-md text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {monthNames[currentMonth - 1]} {currentYear}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
            <div key={day} className="text-center text-body-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-lg border ${
                day === null
                  ? 'bg-transparent'
                  : 'bg-white border-border hover:border-primary cursor-pointer transition-colors'
              } p-2 flex flex-col items-start justify-start`}
            >
              {day && (
                <>
                  <span className="text-body-md font-medium text-foreground">{day}</span>
                  {events[day] && (
                    <div className="mt-1 space-y-1 w-full">
                      {events[day].map((event, i) => (
                        <div
                          key={i}
                          className={`text-xs px-2 py-1 rounded text-white truncate ${event.color}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-3">
          <h3 className="text-title-sm text-foreground" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Sự kiện sắp tới
          </h3>
          {Object.values(events)
            .flat()
            .map((event, idx) => (
              <div
                key={idx}
                className={`${event.color} bg-opacity-10 border border-opacity-30 rounded-lg p-4 flex items-start justify-between`}
              >
                <div>
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="text-body-sm text-muted-foreground">{event.time}</p>
                </div>
                <span className="text-2xl">📅</span>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
