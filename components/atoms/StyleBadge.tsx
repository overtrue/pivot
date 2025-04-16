import { StyleType } from '@/types/openapi';
import React from 'react';

interface StyleBadgeProps {
  style: StyleType;
  className?: string;
}

const StyleBadge: React.FC<StyleBadgeProps> = ({ style, className }) => {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 ${className || ''}`}
    >
      {style}
    </span>
  );
};

export default StyleBadge;
