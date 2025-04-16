'use client';

import React from 'react';

interface ExpandCollapseProps {
  isExpanded: boolean;
  onToggle: () => void;
  label?: string;
  expandedLabel?: string;
  collapsedLabel?: string;
  className?: string;
}

const ExpandCollapse: React.FC<ExpandCollapseProps> = ({
  isExpanded,
  onToggle,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center text-xs font-medium text-gray-500 hover:text-gray-700 ${className || ''}`}
      aria-expanded={isExpanded}
    >
      {/* <span>{displayLabel}</span> */}
      <svg
        className={`ml-1 h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default ExpandCollapse;
