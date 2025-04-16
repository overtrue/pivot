'use client';

import {
  ComponentsObject,
  ParameterObject,
  ReferenceObject
} from '@/types/openapi'; // Adjust path
import React from 'react';
import { resolveRef } from '../utils/resolveRef';
import ParameterItem, { StyleType } from './ParameterItem'; // Import ParameterItem and StyleType

interface ParametersSectionProps {
  parameters: (ParameterObject | ReferenceObject)[];
  components?: ComponentsObject;
  className?: string;
}

const ParametersSection: React.FC<ParametersSectionProps> = ({ parameters, components, className }) => {
  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div className={className}>
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
              key={`${parameter.name} -${parameter.in} -${index} `}
              {...parameter} // Spread resolved properties, but override required and schema below
              name={parameter.name}
              required={parameter.required ?? false} // Provide default value for required
              // 确保schema是SchemaObject类型并提供默认空对象
              schema={parameter.schema && 'type' in parameter.schema ? parameter.schema : {}}
              // 处理style的类型问题
              style={parameter.style as StyleType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ParametersSection;
