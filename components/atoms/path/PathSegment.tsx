import clsx from 'clsx';
import React from 'react';

interface PathSegmentProps {
  path: string;
  isParameter?: boolean;
  className?: string;
}

const PathSegment: React.FC<PathSegmentProps> = ({ path, isParameter = false, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-sm font-mono',
        isParameter ? 'text-blue-600 bg-blue-100 rounded' : 'text-gray-800',
        className
      )}
    >
      {path}
    </span>
  );
};

export default PathSegment;
