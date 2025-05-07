import { PathItemObject } from '@/types/openapi';
import React from 'react';
import OperationBox from './OperationBox';

export interface WebhookDisplayProps {
  name: string;
  pathItem: PathItemObject;
  components?: ComponentsObject;
  className?: string;
}

export const WebhookDisplay: React.FC<WebhookDisplayProps> = ({
  name,
  pathItem,
  components,
  className,
}) => {
  const operations = [
    { method: 'get', operation: pathItem.get },
    { method: 'post', operation: pathItem.post },
    { method: 'put', operation: pathItem.put },
    { method: 'delete', operation: pathItem.delete },
  ].filter(({ operation }) => operation);

  return (
    <div className={`border rounded-lg p-4 bg-gray-50 ${className || ''}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Webhook: <span className="text-blue-600">{name}</span>
      </h2>

      {pathItem.description && (
        <p className="text-gray-600 mb-4">{pathItem.description}</p>
      )}

      <div className="space-y-4">
        {operations.map(({ method, operation }) => (
          <OperationBox
            key={method}
            path={`webhook:${name}`}
            method={method}
            operation={operation!}
            components={components}
            className="border-none bg-white"
          />
        ))}
      </div>
    </div>
  );
};
