import { cn } from "@/lib/utils";
import React from "react";
import { SectionTitle } from "../pivot/section-title";
import { ParameterItem } from "./parameter-item";

interface ParameterObject {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  required?: boolean;
  description?: string;
  deprecated?: boolean;
  schema?: any;
  style?: string;
  explode?: boolean;
  examples?: Record<string, any>;
}

interface ReferenceObject {
  $ref: string;
}

interface ComponentsObject {
  [key: string]: any;
}

interface ParametersSectionProps {
  parameters: (ParameterObject | ReferenceObject)[];
  components?: ComponentsObject;
  className?: string;
  expanded?: boolean;
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

const ParametersSection = React.forwardRef<
  HTMLDivElement,
  ParametersSectionProps
>(({ parameters, components, className, expanded }, ref) => {
  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn(className, "dark:text-neutral-200")}>
      <SectionTitle title="Parameters" className="text-lg font-medium mb-3" />
      <div className="space-y-3">
        {parameters.map((paramOrRef, index) => {
          // Resolve parameter ref
          const parameter = resolveRef<ParameterObject>(
            paramOrRef,
            components,
            "parameters",
          );

          if (!parameter) {
            const refString =
              paramOrRef &&
              typeof paramOrRef === "object" &&
              "$ref" in paramOrRef
                ? (paramOrRef as ReferenceObject).$ref
                : `[invalid parameter at index ${index}]`;
            return (
              <div
                key={index}
                className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded"
              >
                Failed to resolve parameter: {refString}
              </div>
            );
          }

          return (
            <ParameterItem
              key={`${parameter.name}-${parameter.in}-${index}`}
              name={parameter.name}
              in={parameter.in}
              required={parameter.required ?? false}
              description={parameter.description}
              deprecated={parameter.deprecated}
              schema={
                parameter.schema && typeof parameter.schema === "object"
                  ? parameter.schema
                  : { type: "string" }
              }
              style={parameter.style as any}
              explode={parameter.explode}
              examples={parameter.examples}
              components={components}
              expanded={expanded}
            />
          );
        })}
      </div>
    </div>
  );
});

ParametersSection.displayName = "ParametersSection";

export {
  ParametersSection,
  type ComponentsObject,
  type ParameterObject,
  type ParametersSectionProps,
  type ReferenceObject,
};
