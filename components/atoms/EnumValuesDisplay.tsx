'use client';

import React from 'react';
import EnumValues from './EnumValues';

interface EnumValuesDisplayProps {
  values: any[];
  className?: string;
}

const EnumValuesDisplay: React.FC<EnumValuesDisplayProps> = ({ values, className }) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h4 className="text-xs font-semibold mb-1 text-gray-500">Allowed Values</h4>
      <EnumValues values={values} className="flex flex-wrap gap-1" />
    </div>
  );
};

export default EnumValuesDisplay;
