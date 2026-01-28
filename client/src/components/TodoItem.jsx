import { useState } from 'react';
import { Check, Clock, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { formatDate, getDeadlineStatus, getRelativeTime } from '../utils/dateUtils.js';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const deadlineInfo = formatDate(todo.deadline);
  const deadlineStatus = getDeadlineStatus(todo.deadline, todo.completed);
  const relativeTime = getRelativeTime(todo.deadline);

  return (
    <div
      className={`card p-4 mb-3 cursor-pointer hover:shadow-md border-l-4 ${deadlineStatus.borderColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="fade-right"
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
            }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium mb-1 ${todo.completed
              ? 'line-through text-gray-500 dark:text-gray-500'
              : 'text-gray-900 dark:text-white'
              }`}
          >
            {todo.title}
          </h3>

          {todo.description && (
            <p
              className={`text-sm mb-2 ${todo.completed
                ? 'line-through text-gray-400 dark:text-gray-600'
                : 'text-gray-600 dark:text-gray-400'
                }`}
            >
              {todo.description}
            </p>
          )}

          {/* Deadline Info */}
          {todo.deadline && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${deadlineStatus.bgColor} ${deadlineStatus.textColor}`}
              >
                {deadlineStatus.status === 'overdue' && !todo.completed ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span className="font-medium">{relativeTime}</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{deadlineInfo?.full}</span>
              </div>
            </div>
          )}

          {/* Created date */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Created {new Date(todo.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div
          className={`flex items-center gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'
            }`}
        >
          <button
            onClick={() => onEdit(todo)}
            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
            title="Edit todo"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
            title="Delete todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;