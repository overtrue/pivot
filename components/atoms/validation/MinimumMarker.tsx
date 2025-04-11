import clsx from 'clsx';
import React from 'react';

interface MinimumMarkerProps {
  minimum: number;
  exclusive?: boolean;
  className?: string;
}

const MinimumMarker: React.FC<MinimumMarkerProps> = ({ minimum, exclusive = false, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        'bg-blue-100 text-blue-800',
        className
      )}
    >
      {exclusive ? '>' : '≥'} {minimum}
    </span>
  );
};

export default MinimumMarker;
