import clsx from 'clsx';
import React from 'react';

interface MethodLabelProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  className?: string;
}

const methodColors: Record<MethodLabelProps['method'], string> = {
  GET: 'text-green-600 bg-green-100',
  POST: 'text-blue-600 bg-blue-100',
  PUT: 'text-yellow-600 bg-yellow-100',
  DELETE: 'text-red-600 bg-red-100',
  PATCH: 'text-purple-600 bg-purple-100',
  OPTIONS: 'text-gray-600 bg-gray-100',
  HEAD: 'text-gray-600 bg-gray-100',
};

const MethodLabel: React.FC<MethodLabelProps> = ({ method, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        methodColors[method],
        className
      )}
    >
      {method}
    </span>
  );
};

export default MethodLabel;
