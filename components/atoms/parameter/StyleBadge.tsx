import React from 'react';

type StyleType = 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject' | 'matrix' | 'label';

interface StyleBadgeProps {
  style: StyleType;
  className?: string;
}

const styleColors: Record<StyleType, string> = {
  form: 'bg-blue-100 text-blue-800',
  spaceDelimited: 'bg-green-100 text-green-800',
  pipeDelimited: 'bg-yellow-100 text-yellow-800',
  deepObject: 'bg-purple-100 text-purple-800',
  matrix: 'bg-pink-100 text-pink-800',
  label: 'bg-indigo-100 text-indigo-800',
};

const StyleBadge: React.FC<StyleBadgeProps> = ({ style, className }) => {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 ${className || ''}`}
    >
      style: {style}
    </span>
  );
};

export default StyleBadge;
