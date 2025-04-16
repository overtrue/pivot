'use client';

import {
  ComponentsObject,
  ExampleObject,
  ReferenceObject
} from '@/types/openapi';
import React from 'react';
import { resolveRef } from '../utils/resolveRef'; // Import generic resolver
import DescriptionDisplay from './atoms/DescriptionDisplay';

interface ExamplesDisplayProps {
  examples: Record<string, ExampleObject | ReferenceObject>;
  components?: ComponentsObject;
}

const ExamplesDisplay: React.FC<ExamplesDisplayProps> = ({ examples, components }) => {
  const resolvedExamples = Object.entries(examples)
    .map(([key, exampleOrRef]) => {
      // Use the generic resolver
      const resolved = resolveRef<ExampleObject>(exampleOrRef, components, 'examples');
      // Add error handling or logging if resolveRef returns null
      if (!resolved) {
        const refString = (exampleOrRef && typeof exampleOrRef === 'object' && '$ref' in exampleOrRef)
          ? (exampleOrRef as ReferenceObject).$ref
          : '[unknown reference]';
        console.warn(`[ExamplesDisplay] Failed to resolve example ref: ${refString} for key ${key}`);
        return null;
      }
      return { key, ...resolved };
    })
    .filter((example): example is ExampleObject & { key: string } => example !== null);

  if (resolvedExamples.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {resolvedExamples.map((example) => (
        <div key={example.key} className="border border-gray-200 rounded p-3">
          <div className="flex justify-between items-start mb-1">
            <span className="font-semibold text-sm">{example.key}</span>
            {example.summary && (
              <span className="text-xs text-gray-600 text-right">{example.summary}</span>
            )}
          </div>
          {example.description && (
            <DescriptionDisplay description={example.description} className="text-xs mb-2" />
          )}
          {example.value !== undefined && (
            <div>
              <h6 className="text-xs font-medium text-gray-500 mb-1">Value:</h6>
              <pre className="bg-gray-100 p-2 rounded font-mono text-xs overflow-x-auto">
                <code>{JSON.stringify(example.value, null, 2)}</code>
              </pre>
            </div>
          )}
          {/* TODO: Handle externalValue if needed */}
        </div>
      ))}
    </div>
  );
};

export default ExamplesDisplay;
