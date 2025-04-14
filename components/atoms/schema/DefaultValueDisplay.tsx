'use client';

import React from 'react';

interface DefaultValueDisplayProps {
  value: any;
  className?: string;
}

const DefaultValueDisplay: React.FC<DefaultValueDisplayProps> = ({ value, className }) => {
  if (value === undefined) {
    return null;
  }

  return (
    <div className={className}>
      <h4 className="text-xs font-semibold mb-1">Default Value</h4>
      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all">
        {JSON.stringify(value)}
      </code>
    </div>
  );
};

export default DefaultValueDisplay;
