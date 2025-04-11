import clsx from 'clsx';
import React from 'react';

interface ExpandCollapseProps {
  isExpanded: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}

const ExpandCollapse: React.FC<ExpandCollapseProps> = ({
  isExpanded,
  onToggle,
  label,
  className,
}) => {
  return (
    <button
      onClick={onToggle}
      className={clsx(
        'flex items-center space-x-2 text-sm font-medium',
        'text-blue-600 hover:underline',
        className
      )}
    >
      <span>{isExpanded ? '-' : '+'}</span>
      <span>{label}</span>
    </button>
  );
};

export default ExpandCollapse;
