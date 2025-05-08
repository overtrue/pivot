
import React from 'react';

interface ParameterNameProps {
  name: string;
  required?: boolean;
  deprecated?: boolean;
}

const ParameterName: React.FC<ParameterNameProps> = ({ name, required, deprecated }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-mono text-sm font-medium ${deprecated ? 'line-through text-red-500' : ''}`}>
        {name}
      </span>
      {required && (
        <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded font-semibold">
          required
        </span>
      )}
    </div>
  );
};

export default ParameterName;
