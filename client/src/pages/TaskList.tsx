import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { useLocation } from 'wouter';
import { ChevronLeft, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  assignee: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export default function TaskList() {
  const [, navigate] = useLocation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Đóng tiền học cho Bé',
      assignee: 'Mai',
      completed: true,
      dueDate: 'Hôm nay',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Làm bài tập cho Bí - Lan',
      assignee: 'Lan',
      completed: true,
      dueDate: 'Hôm nay',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Mua sắm cuối tuần - Tuấn',
      assignee: 'Tuấn',
      completed: false,
      dueDate: 'Cuối tuần',
      priority: 'medium',
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

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
          Danh Sách Việc
        </h1>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Plus size={24} className="text-primary" />
        </button>
      </div>

      {/* Progress */}
      <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border animate-slide-in-down" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-body-md text-foreground">Tiến độ hôm nay</p>
          <p className="text-title-sm text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {completedCount}/{tasks.length}
          </p>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 animate-slide-in-up" style={{ animationDelay: '0.15s' }}>
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-5xl mb-4">✨</span>
            <p className="text-body-md text-muted-foreground">Không có công việc nào!</p>
            <p className="text-body-sm text-muted-foreground mt-2">Hãy thêm công việc mới</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-border rounded-lg p-4 flex items-start gap-3 hover:shadow-card transition-smooth active:scale-95"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 flex-shrink-0 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-primary" />
                ) : (
                  <Circle size={24} className="text-muted-foreground hover:text-primary" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-body-md font-medium ${
                    task.completed
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-body-sm text-muted-foreground">👤 {task.assignee}</span>
                  <span className={`text-body-sm font-medium ${getPriorityColor(task.priority)}`}>
                    • {task.dueDate}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Trash2 size={18} className="text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 active:scale-95">
        <Plus size={28} />
      </button>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
