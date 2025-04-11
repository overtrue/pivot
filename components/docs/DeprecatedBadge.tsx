import React from 'react';

const DeprecatedBadge: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <span
      className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded"
      title={message || 'This feature is deprecated'}
    >
      Deprecated
    </span>
  );
};

export default DeprecatedBadge;
