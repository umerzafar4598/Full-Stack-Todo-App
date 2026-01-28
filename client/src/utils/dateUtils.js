// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Format options
  const options = {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  };
  
  const formatted = date.toLocaleDateString('en-US', options);
  const time = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  return {
    full: `${formatted} at ${time}`,
    short: formatted,
    time,
    diffDays,
  };
};

// Get deadline status and color
export const getDeadlineStatus = (deadline, completed) => {
  if (!deadline) {
    return {
      status: 'none',
      color: 'gray',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
      textColor: 'text-gray-600 dark:text-gray-400',
      borderColor: 'border-gray-300 dark:border-gray-600',
    };
  }
  
  if (completed) {
    return {
      status: 'completed',
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-300 dark:border-green-700',
    };
  }
  
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - now;
  const diffHours = diffTime / (1000 * 60 * 60);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  if (diffTime < 0) {
    return {
      status: 'overdue',
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-300 dark:border-red-700',
    };
  }
  
  if (diffHours < 24) {
    return {
      status: 'urgent',
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-300 dark:border-orange-700',
    };
  }
  
  if (diffDays < 7) {
    return {
      status: 'soon',
      color: 'yellow',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      borderColor: 'border-yellow-300 dark:border-yellow-700',
    };
  }
  
  return {
    status: 'upcoming',
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-300 dark:border-blue-700',
  };
};

// Format deadline input for datetime-local input
export const formatDateTimeLocal = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Get relative time string
export const getRelativeTime = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  
  if (diffTime < 0) {
    const absDays = Math.abs(diffDays);
    const absHours = Math.abs(diffHours);
    
    if (absDays > 1) return `${absDays} days overdue`;
    if (absHours > 1) return `${absHours} hours overdue`;
    return 'Overdue';
  }
  
  if (diffDays === 0) {
    if (diffHours < 1) {
      return diffMinutes <= 1 ? 'Due now' : `Due in ${diffMinutes} minutes`;
    }
    return diffHours === 1 ? 'Due in 1 hour' : `Due in ${diffHours} hours`;
  }
  
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays < 7) return `Due in ${diffDays} days`;
  
  const weeks = Math.ceil(diffDays / 7);
  return weeks === 1 ? 'Due in 1 week' : `Due in ${weeks} weeks`;
};