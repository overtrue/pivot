'use client';

import React from 'react';
import { SchemaObject } from '../../../types/openapi'; // Adjust path

interface SchemaConstraintsProps {
  schema: SchemaObject;
  className?: string;
}

const SchemaConstraints: React.FC<SchemaConstraintsProps> = ({ schema, className }) => {
  // Collect constraints that are present
  const constraints: { label: string; value: React.ReactNode }[] = [];

  if (schema.minimum !== undefined) {
    constraints.push({ label: 'Minimum', value: <>{schema.minimum}{schema.exclusiveMinimum && ' (exclusive)'}</> });
  }
  if (schema.maximum !== undefined) {
    constraints.push({ label: 'Maximum', value: <>{schema.maximum}{schema.exclusiveMaximum && ' (exclusive)'}</> });
  }
  if (schema.minLength !== undefined) {
    constraints.push({ label: 'Min Length', value: schema.minLength });
  }
  if (schema.maxLength !== undefined) {
    constraints.push({ label: 'Max Length', value: schema.maxLength });
  }
  if (schema.pattern) {
    constraints.push({ label: 'Pattern', value: <code className="text-xs font-mono bg-gray-100 px-1 rounded">{schema.pattern}</code> });
  }
  if (schema.minItems !== undefined) {
    constraints.push({ label: 'Min Items', value: schema.minItems });
  }
  if (schema.maxItems !== undefined) {
    constraints.push({ label: 'Max Items', value: schema.maxItems });
  }
  if (schema.uniqueItems) {
    constraints.push({ label: 'Unique Items', value: 'true' });
  }
  if (schema.minProperties !== undefined) {
    constraints.push({ label: 'Min Properties', value: schema.minProperties });
  }
  if (schema.maxProperties !== undefined) {
    constraints.push({ label: 'Max Properties', value: schema.maxProperties });
  }

  if (constraints.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h4 className="text-xs font-semibold mb-1">Constraints</h4>
      <ul className="text-xs text-gray-600 pl-4 list-disc space-y-0.5">
        {constraints.map((constraint) => (
          <li key={constraint.label}>
            <span className="font-medium">{constraint.label}:</span> {constraint.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemaConstraints;
