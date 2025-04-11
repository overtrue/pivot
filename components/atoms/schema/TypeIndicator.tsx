import React from 'react';

type DataType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';

interface TypeIndicatorProps {
  type: DataType;
  className?: string;
}

const getColorForType = (type: DataType): string => {
  switch (type) {
    case 'string':
      return 'bg-green-100 text-green-800';
    case 'number':
    case 'integer':
      return 'bg-blue-100 text-blue-800';
    case 'boolean':
      return 'bg-yellow-100 text-yellow-800';
    case 'array':
      return 'bg-purple-100 text-purple-800';
    case 'object':
      return 'bg-indigo-100 text-indigo-800';
    case 'null':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TypeIndicator: React.FC<TypeIndicatorProps> = ({ type, className }) => {
  const colorClass = getColorForType(type);

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${colorClass} ${className || ''}`}
    >
      {type}
    </span>
  );
};

export default TypeIndicator;
