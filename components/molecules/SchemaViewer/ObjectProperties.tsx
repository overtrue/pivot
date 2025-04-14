'use client'; // Because it might render SchemaRenderer which could be client

import React from 'react';
import { OpenApiComponents } from '../../../types/openapi'; // Import shared types
import SchemaRenderer from '../SchemaRenderer'; // Import SchemaRenderer

// Define more accurate property schema type (or import)
interface PropertySchema {
  type?: string;
  description?: string;
  // ... other schema fields
}

interface ObjectPropertiesProps {
  properties: Record<string, PropertySchema>; // Changed to Record<string, any> or specific type
  components?: OpenApiComponents; // Needed for SchemaRenderer
  requiredProps?: string[]; // Add prop for required properties list
}

const ObjectProperties: React.FC<ObjectPropertiesProps> = ({ properties, components, requiredProps = [] }) => {
  if (!properties || Object.keys(properties).length === 0) {
    return <div className="text-sm text-gray-500 italic">无属性</div>;
  }

  return (
    <table className="w-full text-sm border-collapse my-2">
      <tbody>
        {Object.entries(properties).map(([propName, propSchema]) => {
          const isRequired = requiredProps.includes(propName);
          return (
            <tr key={propName} className="border-b border-gray-200">
              <td className="px-2 py-1.5 align-top">
                <div className="flex items-center">
                  <span className="font-mono font-medium">{propName}</span>
                  {isRequired && (
                    <span className="ml-1 text-red-600" title="Required">*</span>
                  )}
                </div>
              </td>
              <td className="px-2 py-1.5 align-top">
                <SchemaRenderer schema={propSchema} components={components} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ObjectProperties;
