import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Search, AlertCircle, CheckCircle2, Clock, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Medicine {
  id: string;
  name: string;
  type: string;
  dosage: string;
  usage: string;
  sideEffects: string[];
  contraindications: string[];
  warnings: string[];
}

interface Reminder {
  id: string;
  medicineName: string;
  time: string;
  taken: boolean;
}

export default function Medicine() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Load reminders từ localStorage khi khởi động
  useEffect(() => {
    const saved = localStorage.getItem('medicine_reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  // Hàm lưu reminders
  const saveReminders = (newReminders: Reminder[]) => {
    setReminders(newReminders);
    localStorage.setItem('medicine_reminders', JSON.stringify(newReminders));
  };

  const addReminder = (medName: string) => {
    const newReminders = [
      ...reminders,
      { id: Date.now().toString() + '_1', medicineName: medName, time: '08:00', taken: false },
      { id: Date.now().toString() + '_2', medicineName: medName, time: '20:00', taken: false }
    ];
    saveReminders(newReminders);
    toast.success(`Đã thêm lịch nhắc uống ${medName} vào 08:00 và 20:00 hàng ngày.`);
  };

  const toggleReminder = (id: string) => {
    const newReminders = reminders.map(r => r.id === id ? { ...r, taken: !r.taken } : r);
    saveReminders(newReminders);
  };

  const removeReminder = (id: string) => {
    const newReminders = reminders.filter(r => r.id !== id);
    saveReminders(newReminders);
  };

  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol',
      type: 'Hạ sốt, giảm đau',
      dosage: '500mg',
      usage: 'Uống 1-2 viên, mỗi 4-6 giờ, tối đa 4g/ngày',
      sideEffects: ['Buồn nôn', 'Đau dạ dày', 'Phát ban da'],
      contraindications: ['Suy gan', 'Suy thận nặng'],
      warnings: ['Không dùng quá 4g/ngày', 'Cần theo dõi khi uống cùng rượu'],
    },
    {
      id: '2',
      name: 'Ibuprofen',
      type: 'Chống viêm, giảm đau',
      dosage: '400mg',
      usage: 'Uống 1 viên, mỗi 6-8 giờ, tối đa 1200mg/ngày',
      sideEffects: ['Khó tiêu', 'Đau dạ dày', 'Chóng mặt'],
      contraindications: ['Loét dạ dày', 'Suy thận'],
      warnings: ['Uống cùng thức ăn', 'Không dùng lâu dài'],
    },
    {
      id: '3',
      name: 'Amoxicillin',
      type: 'Kháng sinh',
      dosage: '500mg',
      usage: 'Uống 1 viên, 3 lần/ngày, trong 7-10 ngày',
      sideEffects: ['Tiêu chảy', 'Buồn nôn', 'Phát ban'],
      contraindications: ['Dị ứng Penicillin'],
      warnings: ['Phải hoàn thành liệu trình', 'Uống đầy đủ thời gian'],
    },
  ];

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Tư vấn Thuốc
        </h1>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Tìm tên thuốc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted border-0 rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
        {selectedMedicine ? (
          // Medicine Detail View
          <div className="space-y-4">
            <button
              onClick={() => setSelectedMedicine(null)}
              className="text-primary hover:text-primary/80 font-medium mb-4"
            >
              ← Quay lại
            </button>

            <div className="bg-white border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {selectedMedicine.name}
              </h2>
              <p className="text-primary font-medium mb-4">{selectedMedicine.type}</p>

              {/* Dosage */}
              <div className="mb-6">
                <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  💊 Liều dùng
                </h3>
                <p className="text-body-md text-muted-foreground">{selectedMedicine.dosage}</p>
              </div>

              {/* Usage */}
              <div className="mb-6">
                <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  📋 Cách sử dụng
                </h3>
                <p className="text-body-md text-muted-foreground">{selectedMedicine.usage}</p>
              </div>

              {/* Side Effects */}
              <div className="mb-6">
                <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  ⚠️ Tác dụng phụ
                </h3>
                <ul className="space-y-1">
                  {selectedMedicine.sideEffects.map((effect, idx) => (
                    <li key={idx} className="text-body-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-yellow-500">•</span> {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contraindications */}
              <div className="mb-6">
                <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  🚫 Chống chỉ định
                </h3>
                <ul className="space-y-1">
                  {selectedMedicine.contraindications.map((contra, idx) => (
                    <li key={idx} className="text-body-sm text-destructive flex items-center gap-2">
                      <AlertCircle size={16} /> {contra}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              <div className="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  ⚡ Lưu ý quan trọng
                </h3>
                <ul className="space-y-1">
                  {selectedMedicine.warnings.map((warning, idx) => (
                    <li key={idx} className="text-body-sm text-foreground flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-secondary" /> {warning}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thêm lịch nhắc uống thuốc */}
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      ⏰ Nhắc nhở uống thuốc
                    </h3>
                    <p className="text-body-sm text-muted-foreground">Tự động báo thức 08:00 và 20:00</p>
                  </div>
                  <Button 
                    onClick={() => addReminder(selectedMedicine.name)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full h-10 px-4 flex items-center gap-2"
                  >
                    <Plus size={16} /> Đặt lịch
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg h-12 transition-smooth active:scale-95">
                Tư vấn thêm với bác sĩ
              </Button>
            </div>
          </div>
        ) : (
          // Medicine List View
          <div className="space-y-6">
            {/* Lịch nhắc thuốc (Chỉ hiện khi có dữ liệu) */}
            {reminders.length > 0 && searchTerm === '' && (
              <div className="bg-white border border-border rounded-lg p-4 animate-fade-in">
                <h3 className="text-title-sm text-foreground mb-3 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <Clock size={20} className="text-primary" /> Lịch uống thuốc hôm nay
                </h3>
                <div className="space-y-3">
                  {reminders.map(reminder => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1" onClick={() => toggleReminder(reminder.id)}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${reminder.taken ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                          {reminder.taken && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <div>
                          <p className={`text-body-md font-medium ${reminder.taken ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {reminder.medicineName}
                          </p>
                          <p className="text-body-sm text-primary font-bold">{reminder.time}</p>
                        </div>
                      </div>
                      <button onClick={() => removeReminder(reminder.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-title-sm text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Danh mục thuốc
              </h3>
              {filteredMedicines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-5xl mb-4">💊</span>
                <p className="text-body-md text-muted-foreground">Không tìm thấy thuốc</p>
              </div>
            ) : (
              filteredMedicines.map((medicine) => (
                <div
                  key={medicine.id}
                  onClick={() => setSelectedMedicine(medicine)}
                  className="bg-white border border-border rounded-lg p-4 cursor-pointer hover:shadow-card transition-smooth active:scale-95"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-title-sm text-foreground mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {medicine.name}
                      </h3>
                      <p className="text-body-sm text-primary font-medium mb-2">{medicine.type}</p>
                      <p className="text-body-sm text-muted-foreground">{medicine.dosage}</p>
                    </div>
                    <span className="text-2xl">💊</span>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
