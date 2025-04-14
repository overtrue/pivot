'use client'; // Might render client components via SchemaRenderer

import React from 'react';
import { OpenApiComponents } from '../../../types/openapi'; // Import shared types
import SchemaRenderer from '../SchemaRenderer'; // Import SchemaRenderer

interface ArrayItemsProps {
  items: any; // Should be SchemaObject | ReferenceObject
  components?: OpenApiComponents; // Needed for SchemaRenderer
}

const ArrayItems: React.FC<ArrayItemsProps> = ({ items, components }) => {
  return (
    <div className="pl-4 border-l-2 border-gray-300 my-1">
      <div className="text-xs text-gray-600 mb-1">数组项 (Array Items):</div>
      {/* Render the schema of the items using SchemaRenderer */}
      <SchemaRenderer schema={items} components={components} />
    </div>
  );
};

export default ArrayItems;
