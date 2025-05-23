import { cn } from "@/lib/utils";
import React from "react";
import { OperationBox } from "./operation-box";

interface ComponentsObject {
  [key: string]: any;
}

interface ReferenceObject {
  $ref: string;
}

interface CallbackObject {
  [expression: string]: PathItemObject | ReferenceObject;
}

interface PathItemObject {
  [key: string]: any;
}

interface CallbackDisplayProps {
  name: string;
  callback: CallbackObject | ReferenceObject;
  components?: ComponentsObject;
  className?: string;
}

// Simple ref resolution function
function resolveRef<T>(
  obj: T | ReferenceObject,
  components?: ComponentsObject,
  section?: string,
): T | null {
  if (!obj || typeof obj !== "object") return null;

  if ("$ref" in obj) {
    // This is a simplified resolution - in real implementation you'd parse the $ref path
    return null; // For now, return null for references
  }

  return obj as T;
}

const CallbackDisplay = React.forwardRef<HTMLDivElement, CallbackDisplayProps>(
  ({ name, callback: callbackOrRef, components, className }, ref) => {
    // Resolve callback ref if necessary
    const callback = resolveRef<CallbackObject>(
      callbackOrRef,
      components,
      "callbacks",
    );

    if (!callback) {
      const refString =
        callbackOrRef &&
          typeof callbackOrRef === "object" &&
          "$ref" in callbackOrRef
          ? (callbackOrRef as ReferenceObject).$ref
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
              const pathItem = resolveRef<PathItemObject>(
                pathItemOrRef,
                components,
                "pathItems",
              );
              if (!pathItem) {
                const refString =
                  pathItemOrRef &&
                    typeof pathItemOrRef === "object" &&
                    "$ref" in pathItemOrRef
                    ? (pathItemOrRef as ReferenceObject).$ref
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
                      ].includes(method.toLowerCase())
                    ) {
                      return (
                        <OperationBox
                          key={`${method}-${expression}`}
                          path={expression} // Use expression as path context
                          method={method.toUpperCase()}
                          operation={operationOrRef} // Pass potentially unresolved operation
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

export {
  CallbackDisplay,
  type CallbackDisplayProps,
  type CallbackObject,
  type ComponentsObject,
  type PathItemObject,
  type ReferenceObject
};

