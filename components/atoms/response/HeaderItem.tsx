import React, { useState } from 'react';
import ExpandCollapse from '../../interactive/ExpandCollapse';
import FormatBadge from '../schema/FormatBadge';
import TypeIndicator from '../schema/TypeIndicator';

interface HeaderItemProps {
  name: string;
  required: boolean;
  schema: {
    type: string;
    format?: string;
    enum?: any[];
    minimum?: number;
    maximum?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    default?: any;
  };
  description?: string;
  deprecated?: boolean;
  style?: 'simple' | 'matrix' | 'label' | 'form';
  explode?: boolean;
  example?: any;
  examples?: Record<string, { value: any; summary?: string; description?: string }>;
  className?: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({
  name,
  required,
  schema,
  description,
  deprecated,
  style,
  explode,
  example,
  examples,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = description ||
    schema.enum ||
    schema.default !== undefined ||
    example ||
    (examples && Object.keys(examples).length > 0) ||
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern;

  return (
    <div className={`mb-2 p-2 border rounded ${deprecated ? 'border-red-300 bg-red-50' : 'border-gray-200'} ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center flex-wrap gap-2">
          <span className={`font-mono font-medium ${deprecated ? 'line-through text-red-500' : ''}`}>{name}</span>
          {required && <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded">必需</span>}
          {deprecated && <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded">已弃用</span>}
          <TypeIndicator type={schema.type as any} />
          {schema.format && <FormatBadge format={schema.format as any} />}
          {style && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded">style: {style}</span>}
          {explode && <span className="bg-purple-100 text-purple-800 px-2 py-0.5 text-xs rounded">explode</span>}
        </div>

        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? "隐藏详情" : "显示详情"}
          />
        )}
      </div>

      {description && !isExpanded && (
        <p className="text-sm text-gray-600 truncate">{description}</p>
      )}

      {isExpanded && hasDetails && (
        <div className="mt-3 pl-2 border-l-2 border-gray-200 space-y-3">
          {description && (
            <div>
              <h4 className="text-xs font-semibold mb-1">描述</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          )}

          {schema.default !== undefined && (
            <div>
              <h4 className="text-xs font-semibold mb-1">默认值</h4>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{JSON.stringify(schema.default)}</code>
            </div>
          )}

          {schema.enum && schema.enum.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">枚举值</h4>
              <div className="flex flex-wrap gap-1">
                {schema.enum.map((value, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {JSON.stringify(value)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 约束条件 */}
          {(schema.minimum !== undefined ||
            schema.maximum !== undefined ||
            schema.minLength !== undefined ||
            schema.maxLength !== undefined ||
            schema.pattern) && (
              <div>
                <h4 className="text-xs font-semibold mb-1">约束条件</h4>
                <ul className="text-xs text-gray-600 pl-5 list-disc">
                  {schema.minimum !== undefined && (
                    <li>最小值: {schema.minimum}</li>
                  )}
                  {schema.maximum !== undefined && (
                    <li>最大值: {schema.maximum}</li>
                  )}
                  {schema.minLength !== undefined && (
                    <li>最小长度: {schema.minLength}</li>
                  )}
                  {schema.maxLength !== undefined && (
                    <li>最大长度: {schema.maxLength}</li>
                  )}
                  {schema.pattern && (
                    <li>模式: <code>{schema.pattern}</code></li>
                  )}
                </ul>
              </div>
            )}

          {/* 单个示例 */}
          {example !== undefined && (
            <div>
              <h4 className="text-xs font-semibold mb-1">示例</h4>
              <div className="text-xs bg-gray-100 p-2 rounded">
                <code>{JSON.stringify(example)}</code>
              </div>
            </div>
          )}

          {/* 多个示例 */}
          {examples && Object.keys(examples).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">示例</h4>
              <div className="space-y-2">
                {Object.entries(examples).map(([key, ex]) => (
                  <div key={key} className="border border-gray-200 rounded p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs">{key}</span>
                      {ex.summary && <span className="text-xs text-gray-500">{ex.summary}</span>}
                    </div>
                    {ex.description && (
                      <p className="text-xs text-gray-600 mb-1">{ex.description}</p>
                    )}
                    <div className="text-xs bg-gray-100 p-2 rounded">
                      <code>{JSON.stringify(ex.value)}</code>
                    </div>
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

export default HeaderItem;
