'use client';

import {
  ComponentsObject,
  HeaderObject,
  ReferenceObject,
  SchemaObject
} from '@/types/openapi';
import React, { useState } from 'react';
import DefaultValueDisplay from './atoms/DefaultValueDisplay';
import DeprecatedBadge from './atoms/DeprecatedBadge';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import EnumValuesDisplay from './atoms/EnumValuesDisplay';
import FormatBadge from './atoms/FormatBadge';
import RequiredBadge from './atoms/RequiredBadge';
import SchemaConstraints from './atoms/SchemaConstraints';
import TypeIndicator from './atoms/TypeIndicator';
import ExamplesDisplay from './ExamplesDisplay';
import ExpandCollapse from './interactive/ExpandCollapse';

// Type guard to check if it's a SchemaObject and not a ReferenceObject
function isSchemaObject(obj: SchemaObject | ReferenceObject): obj is SchemaObject {
  return obj && !('$ref' in obj);
}

// HeaderObject already has all necessary fields from ParameterObject except name and in
interface HeaderItemProps extends HeaderObject {
  name: string; // Add header name as it's not part of HeaderObject
  components?: ComponentsObject; // For rendering examples
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
  examples,
  components,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // 使用类型守卫来安全地访问schema属性
  const hasSchemaDetails = schema && isSchemaObject(schema) && (
    schema.default !== undefined ||
    schema.enum ||
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern
  );

  const hasDetails = description || hasSchemaDetails || (examples && Object.keys(examples).length > 0);

  return (
    <div className={`mb-2 p-2 border rounded ${deprecated ? 'border-red-300 bg-red-50' : 'border-gray-200'} ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center flex-wrap gap-2">
          <span className={`font-mono font-medium ${deprecated ? 'line-through text-red-500' : ''}`}>{name}</span>
          {required && <RequiredBadge />}
          {deprecated && <DeprecatedBadge />}
          {schema && isSchemaObject(schema) && schema.type && <TypeIndicator type={schema.type as any} />}
          {schema && isSchemaObject(schema) && schema.format && <FormatBadge format={schema.format as any} />}
          {style && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded">style: {style}</span>}
          {explode && <span className="bg-purple-100 text-purple-800 px-2 py-0.5 text-xs rounded">explode</span>}
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
        <div className="text-sm text-gray-600 truncate">
          <DescriptionDisplay description={description} />
        </div>
      )}

      {isExpanded && hasDetails && (
        <div className="mt-3 pl-2 border-l-2 border-gray-200 space-y-4">
          {description && (
            <div>
              <DescriptionDisplay description={description} className="text-sm" />
            </div>
          )}

          {schema && isSchemaObject(schema) && <DefaultValueDisplay value={schema.default} />}
          {schema && isSchemaObject(schema) && <EnumValuesDisplay values={schema.enum || []} />}
          {schema && isSchemaObject(schema) && <SchemaConstraints schema={schema} />}

          {examples && Object.keys(examples).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Examples</h4>
              <ExamplesDisplay examples={examples} components={components} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderItem;
