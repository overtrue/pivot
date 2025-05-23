import { cn } from "@/lib/utils";
import React from "react";
import { DescriptionDisplay } from "../pivot/description-display";

interface ComponentsObject {
  [key: string]: any;
}

interface ReferenceObject {
  $ref: string;
}

interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

interface ExamplesDisplayProps {
  examples: Record<string, ExampleObject | ReferenceObject>;
  components?: ComponentsObject;
  className?: string;
}

// Simple ref resolution function (simplified version)
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

const ExamplesDisplay = React.forwardRef<HTMLDivElement, ExamplesDisplayProps>(
  ({ examples, components, className }, ref) => {
    const resolvedExamples = Object.entries(examples)
      .map(([key, exampleOrRef]) => {
        // Use the generic resolver
        const resolved = resolveRef<ExampleObject>(
          exampleOrRef,
          components,
          "examples",
        );
        // Add error handling or logging if resolveRef returns null
        if (!resolved) {
          const refString =
            exampleOrRef &&
            typeof exampleOrRef === "object" &&
            "$ref" in exampleOrRef
              ? (exampleOrRef as ReferenceObject).$ref
              : "[unknown reference]";
          console.warn(
            `[ExamplesDisplay] Failed to resolve example ref: ${refString} for key ${key}`,
          );
          return null;
        }
        return { key, ...resolved };
      })
      .filter(
        (example): example is ExampleObject & { key: string } =>
          example !== null,
      );

    if (resolvedExamples.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        {resolvedExamples.map((example) => (
          <div
            key={example.key}
            className="border border-neutral-200 dark:border-neutral-700 rounded p-3 bg-white dark:bg-neutral-800"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {example.key}
              </span>
              {example.summary && (
                <span className="text-xs text-neutral-600 dark:text-neutral-400 text-right">
                  {example.summary}
                </span>
              )}
            </div>
            {example.description && (
              <DescriptionDisplay
                description={example.description}
                className="text-xs mb-2"
              />
            )}
            {example.value !== undefined && (
              <div>
                <pre className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded font-mono text-xs overflow-x-auto text-neutral-800 dark:text-neutral-200">
                  <code>{JSON.stringify(example.value, null, 2)}</code>
                </pre>
              </div>
            )}
            {example.externalValue && (
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                <span className="font-medium">External Value: </span>
                <a
                  href={example.externalValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {example.externalValue}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  },
);

ExamplesDisplay.displayName = "ExamplesDisplay";

export {
  ExamplesDisplay,
  type ComponentsObject,
  type ExampleObject,
  type ExamplesDisplayProps,
  type ReferenceObject,
};
