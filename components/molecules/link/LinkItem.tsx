'use client';

import React, { useState } from 'react';
import { LinkObject } from '../../../types/openapi';
import ServerDisplay from '../../atoms/server/ServerDisplay';
import DescriptionDisplay from '../../atoms/typography/DescriptionDisplay';
import ExpandCollapse from '../../interactive/ExpandCollapse';

interface LinkItemProps extends LinkObject {
  name: string;
  className?: string;
}

const LinkItem: React.FC<LinkItemProps> = ({
  name,
  operationId,
  operationRef,
  parameters,
  requestBody,
  description,
  server,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = description ||
    parameters ||
    requestBody ||
    server;

  const primaryIdentifier = operationId
    ? { type: 'operationId', value: operationId }
    : operationRef
      ? { type: 'operationRef', value: operationRef }
      : null;

  return (
    <div className={`mb-2 p-3 border rounded ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-mono font-medium">{name}</span>
          {primaryIdentifier && (
            <span className={`px-2 py-1 text-xs rounded ${primaryIdentifier.type === 'operationId'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
              }`}>
              {primaryIdentifier.type}: {primaryIdentifier.value}
            </span>
          )}
        </div>

        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? "Hide Details" : "Show Details"}
          />
        )}
      </div>

      {description && !isExpanded && (
        <div className="text-sm text-gray-600 mt-1 truncate">
          <DescriptionDisplay description={description} />
        </div>
      )}

      {isExpanded && hasDetails && (
        <div className="mt-3 pl-2 border-l-2 border-gray-200 space-y-4">
          {description && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Description</h4>
              <DescriptionDisplay description={description} className="text-sm" />
            </div>
          )}

          {parameters && Object.keys(parameters).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Parameters</h4>
              <div className="bg-gray-50 p-2 rounded text-xs space-y-1">
                {Object.entries(parameters).map(([paramName, paramValue]) => (
                  <div key={paramName} className="grid grid-cols-[max-content_1fr] gap-x-2">
                    <span className="font-mono font-medium text-gray-700">{paramName}:</span>
                    <pre className="font-mono bg-gray-100 px-1.5 py-0.5 rounded overflow-x-auto break-all">
                      <code>{typeof paramValue === 'string' ? paramValue : JSON.stringify(paramValue)}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {requestBody && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Request Body</h4>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <pre className="font-mono bg-gray-100 px-1.5 py-0.5 rounded overflow-x-auto break-all">
                  <code>{typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody, null, 2)}</code>
                </pre>
              </div>
            </div>
          )}

          {server && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Server</h4>
              <ServerDisplay server={server} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkItem;
