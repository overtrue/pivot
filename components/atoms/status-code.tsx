import { cn } from '@/utils/cn';
import React from 'react';

interface StatusCodeProps {
  code: string | number;
  size?: 'small' | 'medium';
  className?: string;
}

const StatusCode: React.FC<StatusCodeProps> = ({ code, size = 'small', className }) => {
  const codeStr = String(code);
  const firstDigit = codeStr.charAt(0);

  const getColorClass = () => {
    switch (firstDigit) {
      case '1': return 'bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200'; // Informational
      case '2': return 'bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-200'; // Success
      case '3': return 'bg-yellow-100 dark:bg-yellow-900/70 text-yellow-800 dark:text-yellow-200'; // Redirection
      case '4': return 'bg-orange-100 dark:bg-orange-900/70 text-orange-800 dark:text-orange-200'; // Client Error
      case '5': return 'bg-red-100 dark:bg-red-900/70 text-red-800 dark:text-red-200'; // Server Error
      default: return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200';
    }
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'font-semibold rounded',
        sizeClasses[size],
        getColorClass(),
        className
      )}
    >
      {code}
    </span>
  );
};

export default StatusCode;
