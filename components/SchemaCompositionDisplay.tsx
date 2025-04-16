'use client';

import {
  ComponentsObject,
  ReferenceObject,
  SchemaCompositionKeyword,
  SchemaObject
} from '@/types/openapi'; // 导入SchemaCompositionKeyword
import React from 'react';
import SchemaDisplay from './SchemaDisplay'; // Import the main display component

interface SchemaCompositionDisplayProps {
  keyword: SchemaCompositionKeyword;
  subschemas: (SchemaObject | ReferenceObject)[];
  components?: ComponentsObject;
  currentDepth: number; // Receive depth from parent
  className?: string;
}

const keywordTitles = {
  allOf: 'All Of',
  anyOf: 'Any Of',
  oneOf: 'One Of',
  not: 'Not',
};

const SchemaCompositionDisplay: React.FC<SchemaCompositionDisplayProps> = ({
  keyword,
  subschemas,
  components,
  currentDepth,
  className,
}) => {
  if (!subschemas || subschemas.length === 0) {
    return null;
  }

  const title = keywordTitles[keyword];
  const borderColor = {
    allOf: 'border-blue-300',
    anyOf: 'border-green-300',
    oneOf: 'border-purple-300',
    not: 'border-red-300',
  }[keyword];

  return (
    <div className={`mt-3 p-3 border rounded ${borderColor} ${className}`}>
      <h4 className="text-sm font-semibold mb-2 text-gray-700">{title}</h4>
      <div className="space-y-3">
        {subschemas.map((subschema, index) => (
          <SchemaDisplay
            key={index}
            schema={subschema}
            components={components}
            currentDepth={currentDepth + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default SchemaCompositionDisplay;
