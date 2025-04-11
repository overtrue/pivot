import React from 'react';
import MethodLabel from '../atoms/http/MethodLabel';
import PathSegment from '../atoms/path/PathSegment';
import ParameterGroup from '../molecules/ParameterGroup';
import AllOfContainer from '../molecules/SchemaViewer/AllOfContainer';

interface TryItProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  path: string;
  parameters: { inType: 'query' | 'path' | 'header' | 'cookie'; name: string; required: boolean; type: string }[];
  schemas: { name: string; properties: { name: string; type: string; description?: string }[] }[];
}

const TryIt: React.FC<TryItProps> = ({ method, path, parameters, schemas }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <MethodLabel method={method} />
        <PathSegment path={path} />
      </div>
      <div className="space-y-4">
        {parameters.map((group, index) => (
          <ParameterGroup
            key={index}
            inType={group.inType}
            parameters={parameters.filter((param) => param.inType === group.inType)}
          />
        ))}
      </div>
      <AllOfContainer schemas={schemas} />
    </div>
  );
};

export default TryIt;
