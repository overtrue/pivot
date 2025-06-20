"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';

import React from "react";
import { resolveRef } from "@/registry/lib/utils/resolve-ref";
import { HeaderItem } from "@/registry/pivot/header-item";
import { type StyleType } from "@/registry/pivot/style-badge";

// Import types from the centralized types file

interface HeadersSectionProps {
  headers?: Record<string, OpenAPIV3.HeaderObject | OpenAPIV3.ReferenceObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const HeadersSection = React.forwardRef<HTMLDivElement, HeadersSectionProps>(
  ({ headers, components, className }, ref) => {
    const { t } = useI18n();

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
          {t("Headers")}
        </h4>
        <div className="space-y-3">
          {headerEntries.map(([name, headerOrRef]) => {
            // Resolve header ref
            const header = resolveRef<OpenAPIV3.HeaderObject>(
              headerOrRef,
              components,
              "headers",
            );

            if (!header) {
              const refString =
                headerOrRef &&
                  typeof headerOrRef === "object" &&
                  "$ref" in headerOrRef
                  ? (headerOrRef as OpenAPIV3.ReferenceObject).$ref
                  : t("[unknown reference]");
              console.warn(
                `[HeadersSection] Failed to resolve header ref: ${refString} for key ${name}`,
              );
              // Optionally render an error state for this header
              return (
                <div
                  key={name}
                  className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded"
                >
                  {t("Failed to resolve reference")}: {name} ({refString})
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
                style={header.style as StyleType}
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

export { HeadersSection, type HeadersSectionProps };

