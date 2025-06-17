"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';

import React from "react";
import { resolveRef } from "../lib/resolve-ref";
import { type StyleType } from "../pivot/style-badge";
import { ParameterItem } from "./parameter-item";
import { SectionTitle } from "./section-title";

// Import types from the centralized types file

interface ParametersSectionProps {
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[];
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
  expanded?: boolean;
}

const ParametersSection = React.forwardRef<
  HTMLDivElement,
  ParametersSectionProps
>(({ parameters, components, className, expanded }, ref) => {
  const { t } = useI18n();

  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn(className, "dark:text-neutral-200")}>
      <SectionTitle title={t('Parameters')} className="text-lg font-medium mb-3" />
      <div className="space-y-3">
        {parameters.map((paramOrRef, index) => {
          // Resolve parameter ref
          const parameter = resolveRef<OpenAPIV3.ParameterObject>(paramOrRef, components, 'parameters');

          if (!parameter) {
            const refString = (paramOrRef && typeof paramOrRef === 'object' && '$ref' in paramOrRef)
              ? (paramOrRef as OpenAPIV3.ReferenceObject).$ref
              : `[invalid parameter at index ${index}]`;
            return (
              <div key={index} className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded">
                {t('Failed to resolve parameter:')} {refString}
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
              schema={parameter.schema && 'type' in parameter.schema ? parameter.schema : {}}
              style={parameter.style as StyleType}
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

export { ParametersSection, type ParametersSectionProps };

