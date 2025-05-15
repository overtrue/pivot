import React from 'react';

const DeprecatedBadge: React.FC = () => {
  return (
    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 text-xs rounded font-semibold">
      deprecated
    </span>
  );
};

export default DeprecatedBadge;
