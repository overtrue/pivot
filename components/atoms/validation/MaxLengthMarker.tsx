import clsx from 'clsx';
import React from 'react';

interface MaxLengthMarkerProps {
  maxLength: number;
  className?: string;
}

const MaxLengthMarker: React.FC<MaxLengthMarkerProps> = ({ maxLength, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        'bg-red-100 text-red-800',
        className
      )}
    >
      max length: {maxLength}
    </span>
  );
};

export default MaxLengthMarker;
