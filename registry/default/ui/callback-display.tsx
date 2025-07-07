import { cn } from "@/lib/utils";
import { resolveRef } from "@/registry/default/lib/resolve-ref";
import { OperationBox } from "@/registry/default/ui/operation-box";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";

// Import types from the centralized types file

interface CallbackDisplayProps {
  name: string;
  callback: OpenAPIV3.CallbackObject | OpenAPIV3.ReferenceObject;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const CallbackDisplay = React.forwardRef<HTMLDivElement, CallbackDisplayProps>(
  ({ name, callback: callbackOrRef, components, className }, ref) => {
    // Resolve callback ref if necessary
    const callback = resolveRef<OpenAPIV3.CallbackObject>(
      callbackOrRef,
      components,
      "callbacks",
    );

    if (!callback) {
      const refString =
        callbackOrRef &&
        typeof callbackOrRef === "object" &&
        "$ref" in callbackOrRef
          ? (callbackOrRef as OpenAPIV3.ReferenceObject).$ref
          : "[invalid callback object]";
      return (
        <div
          ref={ref}
          className={cn(
            "text-xs text-red-500 dark:text-red-400 p-1 border border-dashed rounded dark:border-red-800",
            className,
          )}
        >
          Failed to resolve callback: {refString}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "p-4 border rounded bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700",
          className,
        )}
      >
        <h3 className="text-lg font-semibold mb-3 font-mono text-neutral-800 dark:text-neutral-200">
          Callback: {name}
        </h3>
        {/* Callbacks are a map of expressions to PathItemObjects */}
        {Object.entries(callback).map(([expression, pathItemOrRef]) => (
          <div key={expression} className="mb-6">
            <h4 className="text-md font-semibold mb-2 font-mono bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded inline-block text-neutral-800 dark:text-neutral-200">
              Expression: {expression}
            </h4>
            {/* Resolve PathItem ref */}
            {(() => {
              const pathItem = resolveRef<OpenAPIV3.PathItemObject>(
                pathItemOrRef,
                components,
                "pathItems",
              );
              if (!pathItem) {
                const refString =
                  pathItemOrRef &&
                  typeof pathItemOrRef === "object" &&
                  "$ref" in pathItemOrRef
                    ? (pathItemOrRef as OpenAPIV3.ReferenceObject).$ref
                    : "[invalid pathItem object]";
                return (
                  <div className="text-xs text-red-500 dark:text-red-400">
                    Failed to resolve path item: {refString}
                  </div>
                );
              }

              return (
                <div className="space-y-4 pl-4 border-l-2 border-neutral-200 dark:border-neutral-600 mt-2">
                  {/* Render methods within the PathItem using OperationBox */}
                  {Object.entries(pathItem).map(([method, operationOrRef]) => {
                    if (
                      [
                        "get",
                        "put",
                        "post",
                        "delete",
                        "options",
                        "head",
                        "patch",
                        "trace",
                      ].includes(method.toLowerCase()) &&
                      operationOrRef &&
                      typeof operationOrRef === "object"
                    ) {
                      // Resolve operation reference if necessary
                      const operation = resolveRef<OpenAPIV3.OperationObject>(
                        operationOrRef as
                          | OpenAPIV3.OperationObject
                          | OpenAPIV3.ReferenceObject,
                        components,
                        "operations",
                      );

                      if (!operation) {
                        return null;
                      }

                      return (
                        <OperationBox
                          key={`${method}-${expression}`}
                          path={expression} // Use expression as path context
                          method={method.toUpperCase()}
                          operation={operation} // Pass resolved operation
                          components={components}
                          className="shadow-none border-neutral-300 dark:border-neutral-600"
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    );
  },
);

CallbackDisplay.displayName = "CallbackDisplay";

export { CallbackDisplay, type CallbackDisplayProps };
