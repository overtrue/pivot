import { cn } from '@/utils/cn';
import React from 'react';

interface RequiredMarkerProps {
  className?: string;
}

const RequiredMarker: React.FC<RequiredMarkerProps> = ({ className }) => {
  return (
    <span className={cn('text-red-600 dark:text-red-400 font-bold', className)} title="Required">
      *
    </span>
  );
};

export default RequiredMarker;
