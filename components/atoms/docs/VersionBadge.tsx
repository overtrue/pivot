import clsx from 'clsx';
import React from 'react';

interface VersionBadgeProps {
  version: string;
  className?: string;
}

const VersionBadge: React.FC<VersionBadgeProps> = ({ version, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        'bg-green-100 text-green-800',
        className
      )}
    >
      v{version}
    </span>
  );
};

export default VersionBadge;
