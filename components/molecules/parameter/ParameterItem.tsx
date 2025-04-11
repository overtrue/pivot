import React, { useState } from 'react';
import InLabel from '../../atoms/parameter/InLabel';
import StyleBadge from '../../atoms/parameter/StyleBadge';
import FormatBadge from '../../atoms/schema/FormatBadge';
import TypeIndicator from '../../atoms/schema/TypeIndicator';
import ExpandCollapse from '../../interactive/ExpandCollapse';

interface ParameterItemProps {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  required: boolean;
  description?: string;
  deprecated?: boolean;
  schema: {
    type: string;
    format?: string;
    enum?: any[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    default?: any;
  };
  style?: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject' | 'matrix' | 'label';
  explode?: boolean;
  examples?: Record<string, { value: any; summary?: string; description?: string }>;
  className?: string;
}

const ParameterItem: React.FC<ParameterItemProps> = ({
  name,
  in: paramIn,
  required,
  description,
  deprecated,
  schema,
  style,
  explode,
  examples,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = description || schema.default !== undefined || schema.enum || examples;

  return (
    <div className={`border rounded-md overflow-hidden ${deprecated ? 'border-red-300' : 'border-gray-300'} ${className}`}>
      <div className="p-3 bg-gray-50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-mono font-medium ${deprecated ? 'line-through text-red-500' : ''}`}>
            {name}
          </span>

          {required && (
            <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded">
              required
            </span>
          )}

          {deprecated && (
            <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded">
              deprecated
            </span>
          )}

          <InLabel type={paramIn} />

          {schema.type && (
            <TypeIndicator type={schema.type as any} />
          )}

          {schema.format && (
            <FormatBadge format={schema.format as any} />
          )}

          {style && (
            <StyleBadge style={style} />
          )}

          {explode && (
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded">
              explode
            </span>
          )}
        </div>

        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? "Hide details" : "Show details"}
          />
        )}
      </div>

      {isExpanded && hasDetails && (
        <div className="p-4 border-t border-gray-200">
          {description && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Description</h4>
              <p className="text-sm text-gray-700">{description}</p>
            </div>
          )}

          {schema.default !== undefined && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Default Value</h4>
              <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                {JSON.stringify(schema.default)}
              </div>
            </div>
          )}

          {schema.enum && schema.enum.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Allowed Values</h4>
              <div className="flex flex-wrap gap-1">
                {schema.enum.map((value, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    {JSON.stringify(value)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Validation constraints */}
          {(schema.minimum !== undefined ||
            schema.maximum !== undefined ||
            schema.minLength !== undefined ||
            schema.maxLength !== undefined ||
            schema.pattern) && (
              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1">Constraints</h4>
                <ul className="list-disc pl-5 text-sm">
                  {schema.minimum !== undefined && (
                    <li>
                      Minimum: {schema.minimum}
                      {schema.exclusiveMinimum && ' (exclusive)'}
                    </li>
                  )}
                  {schema.maximum !== undefined && (
                    <li>
                      Maximum: {schema.maximum}
                      {schema.exclusiveMaximum && ' (exclusive)'}
                    </li>
                  )}
                  {schema.minLength !== undefined && (
                    <li>Minimum length: {schema.minLength}</li>
                  )}
                  {schema.maxLength !== undefined && (
                    <li>Maximum length: {schema.maxLength}</li>
                  )}
                  {schema.pattern && (
                    <li>
                      Pattern: <code>{schema.pattern}</code>
                    </li>
                  )}
                </ul>
              </div>
            )}

          {/* Examples */}
          {examples && Object.keys(examples).length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-1">Examples</h4>
              <div className="space-y-2">
                {Object.entries(examples).map(([key, example]) => (
                  <div key={key} className="border border-gray-200 rounded p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-xs">{key}</span>
                      {example.summary && (
                        <span className="text-xs text-gray-600">{example.summary}</span>
                      )}
                    </div>
                    {example.description && (
                      <p className="text-xs text-gray-700 mb-1">{example.description}</p>
                    )}
                    <div className="bg-gray-100 p-2 rounded font-mono text-xs">
                      {JSON.stringify(example.value, null, 2)}
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

export default ParameterItem;
