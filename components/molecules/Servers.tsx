import React, { useState } from 'react';
import ExpandCollapse from '../interactive/ExpandCollapse';

interface ServerVariableProps {
  name: string;
  description?: string;
  default: string;
  enum?: string[];
}

interface ServerProps {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableProps>;
}

const Server: React.FC<ServerProps> = ({ url, description, variables }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasVariables = variables && Object.keys(variables).length > 0;

  // URL解析与插值逻辑
  const interpolateUrl = (url: string, variables: Record<string, ServerVariableProps> = {}) => {
    let interpolatedUrl = url;
    Object.entries(variables).forEach(([name, variable]) => {
      const pattern = new RegExp(`\\{${name}\\}`, 'g');
      interpolatedUrl = interpolatedUrl.replace(pattern, variable.default);
    });
    return interpolatedUrl;
  };

  // 提取URL模板变量，用于高亮显示
  const extractUrlParts = (url: string) => {
    const regex = /(\{[^}]+\})/g;
    const parts = url.split(regex);
    return parts.map((part, index) => {
      const isVariable = part.startsWith('{') && part.endsWith('}');
      return { text: part, isVariable, key: `part-${index}` };
    });
  };

  const urlParts = extractUrlParts(url);
  const interpolatedUrl = hasVariables ? interpolateUrl(url, variables) : url;

  return (
    <div className="border rounded mb-4 overflow-hidden">
      <div className="p-3 bg-gray-50 flex items-center justify-between">
        <div className="flex-grow overflow-auto">
          <div className="font-mono text-sm break-all">
            {urlParts.map(part => (
              <span
                key={part.key}
                className={part.isVariable ? 'bg-blue-100 text-blue-800 rounded px-1' : ''}
              >
                {part.text}
              </span>
            ))}
          </div>
          {hasVariables && (
            <div className="text-xs text-gray-600 mt-1">
              插值后: {interpolatedUrl}
            </div>
          )}
        </div>
        {(description || hasVariables) && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? "收起" : "展开"}
            className="ml-3 flex-shrink-0"
          />
        )}
      </div>

      {isExpanded && (description || hasVariables) && (
        <div className="p-4 border-t">
          {description && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">说明</h4>
              <p className="text-sm text-gray-700">{description}</p>
            </div>
          )}

          {hasVariables && (
            <div>
              <h4 className="text-sm font-semibold mb-2">服务器变量:</h4>
              <div className="space-y-3">
                {Object.entries(variables).map(([name, variable]) => (
                  <div key={name} className="border rounded p-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium">{name}</span>
                      <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                        默认值: {variable.default}
                      </span>
                    </div>

                    {variable.description && (
                      <p className="text-sm text-gray-600 mb-2">{variable.description}</p>
                    )}

                    {variable.enum && variable.enum.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium mb-1">可选值:</h5>
                        <div className="flex flex-wrap gap-1">
                          {variable.enum.map((value) => (
                            <span key={value} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              {value}
                            </span>
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
      )}
    </div>
  );
};

interface ServersProps {
  servers: ServerProps[];
  className?: string;
}

const Servers: React.FC<ServersProps> = ({ servers, className }) => {
  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3">服务器</h3>
      {servers.map((server, index) => (
        <Server key={index} {...server} />
      ))}
    </div>
  );
};

export default Servers;
