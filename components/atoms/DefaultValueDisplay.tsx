
import { cn } from '@/utils/cn';
import React from 'react';
import ValueDisplay from './ValueDisplay';

interface DefaultValueDisplayProps {
  value: any;
  className?: string;
}

const DefaultValueDisplay: React.FC<DefaultValueDisplayProps> = ({ value, className }) => {
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <h4 className="text-xs font-semibold mb-1 text-gray-500 dark:text-gray-400">默认值</h4>
      <ValueDisplay value={value} />
    </div>
  );
};

export default DefaultValueDisplay;
