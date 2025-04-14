'use client';

import React from 'react';
import {
  OpenApiComponents,
  ParameterObject,
  ReferenceObject
} from '../../types/openapi'; // Adjust path
import { resolveRef } from '../../utils/resolveRef';
import ParameterItem from './parameter/ParameterItem'; // Import ParameterItem

interface ParametersSectionProps {
  parameters: (ParameterObject | ReferenceObject)[];
  components?: OpenApiComponents;
  className?: string;
}

const ParametersSection: React.FC<ParametersSectionProps> = ({ parameters, components, className }) => {
  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div className={`p-4 ${className}`}>
      {/* Optionally add a title, or assume OperationBox provides context */}
      {/* <SectionTitle title="Parameters" className="text-sm font-semibold mb-3"/> */}
      <h4 className="text-sm font-semibold mb-3">Parameters</h4>
      <div className="space-y-3">
        {parameters.map((paramOrRef, index) => {
          // Resolve parameter ref
          const parameter = resolveRef<ParameterObject>(paramOrRef, components, 'parameters');

          if (!parameter) {
            const refString = (paramOrRef && typeof paramOrRef === 'object' && '$ref' in paramOrRef)
              ? (paramOrRef as ReferenceObject).$ref
              : `[invalid parameter at index ${index}]`;
            return (
              <div key={index} className="text-xs text-red-500 p-1 border border-dashed rounded">
                Failed to resolve parameter: {refString}
              </div>
            );
          }

          return (
            <ParameterItem
              // Use unique key combining name and location or index
              key={`${parameter.name}-${parameter.in}-${index}`}
              {...parameter} // Spread resolved properties
              // ParameterItem expects name directly, ensure it's passed correctly
              name={parameter.name}
              // ParameterItem might need components passed down if it resolves schema refs internally
              components={components}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ParametersSection;
