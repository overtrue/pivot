import React from 'react';
import MethodLabel from '../atoms/http/MethodLabel';
import RequiredMarker from '../atoms/parameter/RequiredMarker';
import PathSegment from '../atoms/path/PathSegment';
import TypeIndicator from '../atoms/schema/TypeIndicator';

interface OperationBoxProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  path: string;
  parameters?: { name: string; required: boolean; type: string }[];
}

const OperationBox: React.FC<OperationBoxProps> = ({ method, path, parameters = [] }) => {
  return (
    <div className="border rounded p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <MethodLabel method={method} />
        <PathSegment path={path} />
      </div>
      {parameters.length > 0 && (
        <div className="space-y-2">
          {parameters.map((param) => (
            <div key={param.name} className="flex items-center space-x-2">
              <span className="font-mono text-sm">{param.name}</span>
              {param.required && <RequiredMarker />}
              <TypeIndicator type={param.type as any} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperationBox;
