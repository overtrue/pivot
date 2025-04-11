import React, { useState } from 'react';
import ExpandCollapse from '../../interactive/ExpandCollapse';

interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, {
    default: string;
    enum?: string[];
    description?: string;
  }>;
}

interface LinkItemProps {
  name: string;
  operationId?: string;
  operationRef?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: ServerObject;
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

  // 决定主要标识符类型（operationId 或 operationRef）
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
            label={isExpanded ? "隐藏详情" : "显示详情"}
          />
        )}
      </div>

      {/* 非展开状态下简短描述 */}
      {description && !isExpanded && (
        <p className="text-sm text-gray-600 mt-1 truncate">{description}</p>
      )}

      {/* 展开状态下的详细信息 */}
      {isExpanded && hasDetails && (
        <div className="mt-3 pl-2 border-l-2 border-gray-200 space-y-4">
          {description && (
            <div>
              <h4 className="text-xs font-semibold mb-1">描述</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}

          {/* Parameters */}
          {parameters && Object.keys(parameters).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">参数</h4>
              <div className="bg-gray-50 p-2 rounded">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {Object.entries(parameters).map(([paramName, paramValue]) => (
                    <React.Fragment key={paramName}>
                      <div className="text-xs font-mono">{paramName}</div>
                      <div className="text-xs">{JSON.stringify(paramValue)}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Request Body */}
          {requestBody && (
            <div>
              <h4 className="text-xs font-semibold mb-1">请求体</h4>
              <div className="bg-gray-50 p-2 rounded">
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(requestBody, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Server */}
          {server && (
            <div>
              <h4 className="text-xs font-semibold mb-1">服务器</h4>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs font-semibold mb-1">{server.url}</div>
                {server.description && (
                  <p className="text-xs text-gray-600 mb-2">{server.description}</p>
                )}

                {server.variables && Object.keys(server.variables).length > 0 && (
                  <div className="mt-2">
                    <h5 className="text-xs font-medium mb-1">变量</h5>
                    <div className="space-y-2">
                      {Object.entries(server.variables).map(([varName, variable]) => (
                        <div key={varName} className="border border-gray-200 p-1 rounded">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs">{varName}</span>
                            <span className="text-xs bg-gray-200 px-1 rounded">默认值: {variable.default}</span>
                          </div>
                          {variable.description && (
                            <p className="text-xs text-gray-600 mt-1">{variable.description}</p>
                          )}
                          {variable.enum && variable.enum.length > 0 && (
                            <div className="mt-1">
                              <span className="text-xs">可选值: </span>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {variable.enum.map((value) => (
                                  <span key={value} className="text-xs bg-gray-100 px-1 rounded">{value}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkItem;
