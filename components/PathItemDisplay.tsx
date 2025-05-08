import { ComponentsObject, PathItemObject } from '@/types/openapi';
import React from 'react';
import OperationBox from './OperationBox';

export interface PathItemDisplayProps {
  path: string;
  pathItem: PathItemObject;
  components?: ComponentsObject;
  className?: string;
}

const PathItemDisplay: React.FC<PathItemDisplayProps> = ({
  path,
  pathItem,
  components,
  className,
}) => {
  const operations = [
    { method: 'get', operation: pathItem.get },
    { method: 'put', operation: pathItem.put },
    { method: 'post', operation: pathItem.post },
    { method: 'delete', operation: pathItem.delete },
    { method: 'options', operation: pathItem.options },
    { method: 'head', operation: pathItem.head },
    { method: 'patch', operation: pathItem.patch },
    { method: 'trace', operation: pathItem.trace },
  ].filter(({ operation }) => operation);

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <h2 className="text-xl font-semibold text-gray-900">{path}</h2>
      {pathItem.description && (
        <p className="text-gray-600">{pathItem.description}</p>
      )}

      <div className="space-y-6">
        {operations.map(({ method, operation }) => (
          <OperationBox
            key={method}
            path={path}
            method={method}
            operation={operation!}
            components={components}
          />
        ))}
      </div>
    </div>
  );
};

export default PathItemDisplay;
