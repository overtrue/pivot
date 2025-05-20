import React from 'react';
import CopyButton from '../interactive/CopyButton';

interface ConstValueProps {
  value: any;
  className?: string;
}

const ConstValue: React.FC<ConstValueProps> = ({ value, className }) => {
  const stringValue = JSON.stringify(value);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="font-mono text-sm bg-neutral-100 px-2 py-1 rounded">
        const: {stringValue}
      </span>
      <CopyButton text={stringValue} />
    </div>
  );
};

export default ConstValue;
