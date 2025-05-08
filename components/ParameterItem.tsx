
import EnumValuesDisplay from '@/components/atoms/EnumValuesDisplay';
import { ComponentsObject, ExampleObject, ParameterObject, ReferenceObject, SchemaObject, StyleType } from '@/types/openapi';
import React, { useState } from 'react';
import DefaultValueDisplay from './atoms/DefaultValueDisplay';
import DeprecatedBadge from './atoms/DeprecatedBadge';
import FormatBadge from './atoms/FormatBadge';
import InLabel from './atoms/InLabel';
import ParameterDescription from './atoms/ParameterDescription';
import ParameterName from './atoms/ParameterName';
import SchemaConstraints from './atoms/SchemaConstraints';
import StyleBadge from './atoms/StyleBadge';
import TypeIndicator from './atoms/TypeIndicator';
import ExamplesDisplay from './ExamplesDisplay';
import ExpandCollapse from './interactive/ExpandCollapse';

// 类型守卫函数，检查是否为SchemaObject
function isSchemaObject(obj: SchemaObject | ReferenceObject | undefined): obj is SchemaObject {
  return !!obj && !('$ref' in obj);
}

interface ParameterItemProps extends Omit<ParameterObject, 'schema' | 'examples' | 'style'> {
  schema: SchemaObject; // 要求传入的是SchemaObject而不是引用
  style?: StyleType; // 明确StyleType类型
  examples?: Record<string, ExampleObject | ReferenceObject>;
  components?: ComponentsObject; // 用于解析引用
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
  components,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = schema.default !== undefined || schema.enum || examples || description ||
    schema.minimum !== undefined || schema.maximum !== undefined ||
    schema.minLength !== undefined || schema.maxLength !== undefined ||
    schema.pattern;

  return (
    <div className={`border rounded-md overflow-hidden ${deprecated ? 'border-red-300' : 'border-gray-300'} ${className}`}>
      <div className="p-3 flex flex-wrap items-center justify-between gap-2" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex flex-wrap items-center gap-2">
          <ParameterName name={name} required={required} deprecated={deprecated} />

          {deprecated && <DeprecatedBadge />}

          <InLabel type={paramIn} />

          {schema.type && (
            <TypeIndicator type={schema.type} />
          )}

          {schema.format && (
            <FormatBadge format={schema.format} />
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
        <div className="p-4 border-t border-gray-200 flex flex-col gap-3">
          {description && (
            <div className="">
              <h4 className="text-xs font-semibold mb-1 text-gray-500">Description</h4>
              <ParameterDescription description={description} />
            </div>
          )}

          <DefaultValueDisplay value={schema.default} />

          <EnumValuesDisplay values={schema.enum || []} />

          <SchemaConstraints schema={schema} />

          {examples && Object.keys(examples).length > 0 && (
            <ExamplesDisplay examples={examples} components={components} />
          )}
        </div>
      )}
    </div>
  );
};

export default ParameterItem;
