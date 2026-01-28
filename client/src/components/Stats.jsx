import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';
import { useTodo } from '../context/TodoContext.jsx';
import 'animate.css';

const Stats = () => {
  const { todos } = useTodo();

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    pending: todos.filter((todo) => !todo.completed).length,
    overdue: todos.filter(
      (todo) =>
        !todo.completed &&
        todo.deadline &&
        new Date(todo.deadline) < new Date()
    ).length,
  };

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: Circle,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`card p-4 ${stat.bgColor} border-none transition-all duration-200 hover:scale-105 animate__animated animate__bounceInDown`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.iconColor} bg-white dark:bg-gray-800`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className={`text-xs ${stat.iconColor} font-medium`}>
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;