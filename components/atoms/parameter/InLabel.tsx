import React from 'react';

type InLabelType = 'query' | 'path' | 'header' | 'cookie';

interface InLabelProps {
  type: InLabelType;
  className?: string;
}

const getColorForType = (type: InLabelType): string => {
  switch (type) {
    case 'query':
      return 'bg-blue-100 text-blue-800';
    case 'path':
      return 'bg-green-100 text-green-800';
    case 'header':
      return 'bg-purple-100 text-purple-800';
    case 'cookie':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const InLabel: React.FC<InLabelProps> = ({ type, className }) => {
  const colorClass = getColorForType(type);

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${colorClass} ${className || ''}`}
    >
      in: {type}
    </span>
  );
};

export default InLabel;
