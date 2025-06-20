"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";
import { resolveRef } from "@/registry/lib/utils/resolve-ref";
import { DescriptionDisplay } from "@/registry/pivot/description-display";

// Import types from the centralized types file

interface ExamplesDisplayProps {
  examples: Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const ExamplesDisplay = React.forwardRef<HTMLDivElement, ExamplesDisplayProps>(
  ({ examples, components, className }, ref) => {
    const { t } = useI18n();

    const resolvedExamples = Object.entries(examples)
      .map(([key, exampleOrRef]) => {
        // Use the generic resolver
        const resolved = resolveRef<OpenAPIV3.ExampleObject>(
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
              ? (exampleOrRef as OpenAPIV3.ReferenceObject).$ref
              : t("[unknown reference]");
          console.warn(
            t("[ExamplesDisplay] Failed to resolve example ref: %s for key %s").replace("%s", refString).replace("%s", key),
          );
          return null;
        }
        return { key, ...resolved };
      })
      .filter(
        (example): example is OpenAPIV3.ExampleObject & { key: string } =>
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

export { ExamplesDisplay, type ExamplesDisplayProps };

