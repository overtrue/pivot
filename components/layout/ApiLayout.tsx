import React from 'react';
import TryIt from '../interactive/TryIt';

interface ApiLayoutProps {
  operations: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
    path: string;
    parameters: { inType: 'query' | 'path' | 'header' | 'cookie'; name: string; required: boolean; type: string }[];
    schemas: { name: string; properties: { name: string; type: string; description?: string }[] }[];
  }[];
}

const ApiLayout: React.FC<ApiLayoutProps> = ({ operations }) => {
  return (
    <div className="space-y-8">
      {operations.map((operation, index) => (
        <div key={index} className="border-b pb-8">
          <TryIt
            method={operation.method}
            path={operation.path}
            parameters={operation.parameters}
            schemas={operation.schemas}
          />
        </div>
      ))}
    </div>
  );
};

export default ApiLayout;
