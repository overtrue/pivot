import clsx from 'clsx';
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
      case '1': return 'bg-blue-100 text-blue-800'; // Informational
      case '2': return 'bg-green-100 text-green-800'; // Success
      case '3': return 'bg-yellow-100 text-yellow-800'; // Redirection
      case '4': return 'bg-orange-100 text-orange-800'; // Client Error
      case '5': return 'bg-red-100 text-red-800'; // Server Error
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={clsx(
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
