import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import ValueDisplay from './value-display';

interface EnumValuesProps {
  values: any[];
  className?: string;
}

const EnumValues: React.FC<EnumValuesProps> = ({ values, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (values.length === 0) {
    return null;
  }

  return (
    <div className={cn(className)}>
      {values.map((value, index) => (
        <ValueDisplay key={index} value={value} />
      ))}
    </div>
  );
};

export default EnumValues;
