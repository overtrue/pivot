"use client";

import { cn } from "@/lib/utils";
import { useOpenApi } from "@/registry/default/hooks/use-openapi";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";

import { ParameterItem } from "@/registry/default/ui/parameter-item";
import { SectionTitle } from "@/registry/default/ui/section-title";
import { type StyleType } from "@/registry/default/ui/style-badge";
import React, { useMemo } from "react";

interface ParametersSectionProps {
  // Support multiple input formats
  parameters:
    | (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
    | { name: string; in: string; [key: string]: any }[];

  // Optional for standalone mode
  components?: OpenAPIV3.ComponentsObject;
  spec?: OpenAPIV3.Document;

  className?: string;
  expanded?: boolean;
}

const ParametersSection = React.forwardRef<
  HTMLDivElement,
  ParametersSectionProps
>(({ parameters, components, spec, className, expanded }, ref) => {
  const { t } = useI18n();

  // Use OpenAPI hook for intelligent data access
  const openapi = useOpenApi(spec || null, components);

  // Adapt parameters to standard format
  const adaptedParameters = useMemo(() => {
    if (!parameters || !Array.isArray(parameters)) return [];

    return parameters.map(param => {
      if (typeof param === 'object' && !('$ref' in param)) {
        return param as OpenAPIV3.ParameterObject;
      }
      return param;
    });
  }, [parameters]);

  // Note: We resolve parameters individually in the map below for better error handling

  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn(className, "dark:text-neutral-200")}>
      <SectionTitle
        title={t("Parameters")}
        className="text-lg font-medium mb-3"
      />
      <div className="space-y-3">
        {adaptedParameters.map((paramOrRef, index) => {
          // If we have components/spec, try to resolve references
          if (openapi.hasComponents && paramOrRef && '$ref' in paramOrRef) {
            const parameter = openapi.resolve<OpenAPIV3.ParameterObject>(
              paramOrRef,
              "parameters"
            );

            // Error handling for unresolved references
            if (!parameter) {
              const refString = (paramOrRef as OpenAPIV3.ReferenceObject).$ref;
              return (
                <div
                  key={index}
                  className={cn("border rounded p-3", "bg-yellow-50 dark:bg-yellow-900/20", "border-yellow-200 dark:border-yellow-800")}
                >
                  <div className="text-sm text-yellow-700 dark:text-yellow-400">
                    {t("Could not resolve parameter:")} {refString}
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
                    💡 {t("Tip: Check if the referenced parameter exists in components")}
                  </div>
                </div>
              );
            }

            return (
              <ParameterItem
                key={`${parameter.name}-${parameter.in}-${index}`}
                name={parameter.name}
                in={parameter.in as "path" | "header" | "query" | "cookie"}
                required={parameter.required ?? false}
                description={parameter.description}
                deprecated={parameter.deprecated}
                schema={
                  parameter.schema && "type" in parameter.schema
                    ? parameter.schema
                    : {}
                }
                style={parameter.style as StyleType}
                explode={parameter.explode}
                examples={parameter.examples}
              />
            );
          }

          // For direct parameters (no references), use them directly
          if (paramOrRef && typeof paramOrRef === 'object' && !('$ref' in paramOrRef)) {
            const parameter = paramOrRef as OpenAPIV3.ParameterObject;

            // Validate required fields
            if (!parameter.name || !parameter.in) {
              return (
                <div
                  key={index}
                  className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded"
                >
                  {t("Invalid parameter at index")} {index}: {t("Missing name or in property")}
                </div>
              );
            }

            return (
              <ParameterItem
                key={`${parameter.name}-${parameter.in}-${index}`}
                name={parameter.name}
                in={parameter.in as "path" | "header" | "query" | "cookie"}
                required={parameter.required ?? false}
                description={parameter.description}
                deprecated={parameter.deprecated}
                schema={
                  parameter.schema && "type" in parameter.schema
                    ? parameter.schema
                    : {}
                }
                style={parameter.style as StyleType}
                explode={parameter.explode}
                examples={parameter.examples}
              />
            );
          }

          // Fallback for unexpected parameter format
          return (
            <div
              key={index}
              className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded"
            >
              {t("Invalid parameter at index")} {index}: {t("Unexpected format")}
            </div>
          );
        })}
      </div>
    </div>
  );
});

ParametersSection.displayName = "ParametersSection";

export { ParametersSection, type ParametersSectionProps };
