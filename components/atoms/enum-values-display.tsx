import { cn } from '@/utils/cn';
import React from 'react';
import EnumValues from './enum-values';

interface EnumValuesDisplayProps {
  values: any[];
  className?: string;
}

const EnumValuesDisplay: React.FC<EnumValuesDisplayProps> = ({ values, className }) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <h4 className="text-xs font-semibold mb-1 text-neutral-500 dark:text-neutral-400">Allowed Values</h4>
      <EnumValues values={values} className="flex flex-wrap gap-1" />
    </div>
  );
};

export default EnumValuesDisplay;
