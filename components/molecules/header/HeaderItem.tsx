'use client';

import React, { useState } from 'react';
import {
  HeaderObject,
  SchemaObject,
  ExampleObject,
  ReferenceObject,
  OpenApiComponents // Needed for ExamplesDisplay
} from '../../../types/openapi';
import RequiredBadge from '../../atoms/badge/RequiredBadge';
import DeprecatedBadge from '../../atoms/parameter/DeprecatedBadge';
import FormatBadge from '../../atoms/schema/FormatBadge';
import TypeIndicator from '../../atoms/schema/TypeIndicator';
import DescriptionDisplay from '../../atoms/typography/DescriptionDisplay';
import ExpandCollapse from '../../interactive/ExpandCollapse';
import SchemaConstraints from '../../atoms/schema/SchemaConstraints'; // Import new
import DefaultValueDisplay from '../../atoms/schema/DefaultValueDisplay'; // Import new
import EnumValuesDisplay from '../../atoms/schema/EnumValuesDisplay'; // Import new
import ExamplesDisplay from '../../molecules/ExamplesDisplay'; // Import ExamplesDisplay

interface HeaderItemProps extends Omit<HeaderObject, 'schema' | 'examples'> { // Omit original types
  name: string;
  schema?: SchemaObject;
  // Use the correct type for examples, matching ExamplesDisplay props
  examples?: Record<string, ExampleObject | ReferenceObject>;
  components?: OpenApiComponents; // Pass down for ExamplesDisplay
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
  // example, // Keep example prop for now, but ExamplesDisplay might handle it later
  examples,
  components,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Update hasDetails check based on what we display
  const hasDetails = description ||
    (schema && (schema.default !== undefined || schema.enum || schema.minimum !== undefined || schema.maximum !== undefined || schema.minLength !== undefined || schema.maxLength !== undefined || schema.pattern)) ||
    // (example !== undefined) || // Decide if single 'example' should trigger details
    (examples && Object.keys(examples).length > 0);

  return (
    <div className={`mb-2 p-2 border rounded ${deprecated ? 'border-red-300 bg-red-50' : 'border-gray-200'} ${className}`}>
      {/* Header Summary - remains largely the same */}
      <div className="flex items-center justify-between mb-1">
         <div className="flex items-center flex-wrap gap-2">
           <span className={`font-mono font-medium ${deprecated ? 'line-through text-red-500' : ''}`}>{name}</span>
           {required && <RequiredBadge />}
           {deprecated && <DeprecatedBadge />}
           {schema && schema.type && <TypeIndicator type={schema.type as any} />}
           {schema && schema.format && <FormatBadge format={schema.format as any} />}
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

      {/* Truncated Description */}
      {description && !isExpanded && (
        <div className="text-sm text-gray-600 truncate">
          <DescriptionDisplay description={description} />
        </div>
      )}

      {/* Expanded Details - Use new components */}
      {isExpanded && hasDetails && (
        <div className="mt-3 pl-2 border-l-2 border-gray-200 space-y-4">
          {description && (
            <div>
              {/* <h4 className="text-xs font-semibold mb-1">Description</h4> */}
              <DescriptionDisplay description={description} className="text-sm" />
            </div>
          )}

          {schema && <DefaultValueDisplay value={schema.default} />}
          {schema && <EnumValuesDisplay values={schema.enum || []} />}
          {schema && <SchemaConstraints schema={schema} />}

          {/* Use ExamplesDisplay */}
          {examples && Object.keys(examples).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Examples</h4>
              <ExamplesDisplay examples={examples} components={components} />
            </div>
          )}

          {/* Keep single example display for now if needed, or remove if ExamplesDisplay handles it */}
          {/* {example !== undefined && !examples && (
            <div>
              <h4 className="text-xs font-semibold mb-1">Example</h4>
              <div className="text-xs bg-gray-100 p-2 rounded">
                <code>{JSON.stringify(example)}</code>
              </div>
            </div>
          )} */}

        </div>
      )}
    </div>
  );
};

export default HeaderItem;
