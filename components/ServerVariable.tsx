import DescriptionDisplay from '@/components/atoms/DescriptionDisplay';
import { ServerVariableObject } from '@/types/openapi';
import React from 'react';

interface ServerVariableProps {
  name: string;
  variable: ServerVariableObject;
}

const ServerVariable: React.FC<ServerVariableProps> = ({ name, variable }) => {
  const { description, default: defaultValue, enum: enumValues } = variable;

  return (
    <div className="border rounded p-3 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-medium">{name}</span>
        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
          默认值: {defaultValue}
        </span>
      </div>

      {description && (
        <DescriptionDisplay description={description} />
      )}

      {enumValues && enumValues.length > 0 && (
        <div>
          <h5 className="text-xs font-medium mb-1">可选值:</h5>
          <div className="flex flex-wrap gap-1">
            {enumValues.map((value) => (
              <span key={value} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerVariable;
