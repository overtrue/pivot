import clsx from 'clsx';
import React from 'react';

interface MethodLabelProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  variant?: 'default' | 'compact';
  className?: string;
}

const methodColors: Record<MethodLabelProps['method'], { text: string; bg: string }> = {
  GET: { text: 'text-green-600', bg: 'bg-green-100' },
  POST: { text: 'text-blue-600', bg: 'bg-blue-100' },
  PUT: { text: 'text-yellow-600', bg: 'bg-yellow-100' },
  DELETE: { text: 'text-red-600', bg: 'bg-red-100' },
  PATCH: { text: 'text-purple-600', bg: 'bg-purple-100' },
  OPTIONS: { text: 'text-gray-600', bg: 'bg-gray-100' },
  HEAD: { text: 'text-gray-600', bg: 'bg-gray-100' },
};

const MethodLabel: React.FC<MethodLabelProps> = ({ method, variant = 'default', className }) => {
  const compactStyles = variant === 'compact'
    ? methodColors[method].text + ' font-semibold text-xs'
    : methodColors[method].text + ' ' + methodColors[method].bg + ' px-2 py-1 text-xs font-semibold rounded';

  return (
    <span
      className={clsx(
        compactStyles,
        className
      )}
    >
      {method}
    </span>
  );
};

export default MethodLabel;
