import { cn } from "@/lib/utils";
import React from "react";
import { HeaderItem } from "./header-item";

interface ComponentsObject {
  [key: string]: any;
}

interface ReferenceObject {
  $ref: string;
}

interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: any;
  style?: string;
  explode?: boolean;
  examples?: Record<string, any>;
  [key: string]: any;
}

interface HeadersSectionProps {
  headers?: Record<string, HeaderObject | ReferenceObject>;
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

const HeadersSection = React.forwardRef<HTMLDivElement, HeadersSectionProps>(
  ({ headers, components, className }, ref) => {
    if (!headers) {
      return null;
    }

    const headerEntries = Object.entries(headers);

    if (headerEntries.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("mb-4 dark:text-neutral-200", className)}>
        <h4 className="text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
          Headers
        </h4>
        <div className="space-y-3">
          {headerEntries.map(([name, headerOrRef]) => {
            // Resolve header ref
            const header = resolveRef<HeaderObject>(
              headerOrRef,
              components,
              "headers",
            );

            if (!header) {
              const refString =
                headerOrRef &&
                  typeof headerOrRef === "object" &&
                  "$ref" in headerOrRef
                  ? (headerOrRef as ReferenceObject).$ref
                  : "[unknown reference]";
              console.warn(
                `[HeadersSection] Failed to resolve header ref: ${refString} for key ${name}`,
              );
              // Optionally render an error state for this header
              return (
                <div
                  key={name}
                  className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded"
                >
                  Failed to resolve reference: {name} ({refString})
                </div>
              );
            }

            return (
              <HeaderItem
                key={name}
                name={name}
                description={header.description}
                required={header.required}
                deprecated={header.deprecated}
                schema={header.schema}
                style={header.style}
                explode={header.explode}
                examples={header.examples}
                components={components}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

HeadersSection.displayName = "HeadersSection";

export {
  HeadersSection,
  type ComponentsObject,
  type HeaderObject,
  type HeadersSectionProps,
  type ReferenceObject
};

