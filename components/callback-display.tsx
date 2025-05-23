
import {
  CallbackObject,
  ComponentsObject,
  PathItemObject,
  ReferenceObject
} from '@/types/openapi'; // Adjust path
import React from 'react';
import { resolveRef } from '../utils/openapi';
import OperationBox from '.'; // Reuse OperationBox to display callback operations

interface CallbackDisplayProps {
  name: string; // Name of the callback defined in the parent component
  callback: CallbackObject | ReferenceObject;
  components?: ComponentsObject;
  className?: string;
}

const CallbackDisplay: React.FC<CallbackDisplayProps> = ({
  name,
  callback: callbackOrRef,
  components,
  className
}) => {
  // Resolve callback ref if necessary
  const callback = resolveRef<CallbackObject>(callbackOrRef, components, 'callbacks');

  if (!callback) {
    const refString = (callbackOrRef && typeof callbackOrRef === 'object' && '$ref' in callbackOrRef)
      ? (callbackOrRef as ReferenceObject).$ref
      : '[invalid callback object]';
    return (
      <div className={`text-xs text-red-500 p-1 border border-dashed rounded ${className}`}>
        Failed to resolve callback: {refString}
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded bg-neutral-50 ${className}`}>
      <h3 className="text-lg font-semibold mb-3 font-mono">Callback: {name}</h3>
      {/* Callbacks are a map of expressions to PathItemObjects */}
      {Object.entries(callback).map(([expression, pathItemOrRef]) => (
        <div key={expression} className="mb-6">
          <h4 className="text-md font-semibold mb-2 font-mono bg-neutral-200 px-2 py-1 rounded inline-block">Expression: {expression}</h4>
          {/* Resolve PathItem ref */}
          {(() => {
            const pathItem = resolveRef<PathItemObject>(pathItemOrRef, components, 'pathItems');
            if (!pathItem) {
              const refString = (pathItemOrRef && typeof pathItemOrRef === 'object' && '$ref' in pathItemOrRef)
                ? (pathItemOrRef as ReferenceObject).$ref
                : '[invalid pathItem object]';
              return <div className="text-xs text-red-500">Failed to resolve path item: {refString}</div>;
            }

            return (
              <div className="space-y-4 pl-4 border-l-2 mt-2">
                {/* Render methods within the PathItem using OperationBox */}
                {Object.entries(pathItem).map(([method, operationOrRef]) => {
                  if (['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].includes(method.toLowerCase())) {
                    // OperationBox expects a resolved OperationObject
                    // Parent (ComponentsSection) passed resolved Callback,
                    // but Operation inside PathItem might still be a ref.
                    // OperationBox now handles internal ref resolution.
                    return (
                      <OperationBox
                        key={`${method}-${expression}`}
                        path={expression} // Use expression as path context
                        method={method.toUpperCase()}
                        operation={operationOrRef} // Pass potentially unresolved operation
                        components={components}
                        className="shadow-none border-neutral-300"
                      />
                    );
                  }
                  return null;
                })}
                {/* TODO: Render path-level parameters for callback pathItem? */}
              </div>
            );
          })()}
        </div>
      ))}
    </div>
  );
};

export default CallbackDisplay;
