'use client';

import React from 'react';

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
      <h4 className="text-xs font-semibold mb-1">Allowed Values</h4>
      <div className="flex flex-wrap gap-1">
        {values.map((value, index) => (
          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
            {JSON.stringify(value)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EnumValuesDisplay;
