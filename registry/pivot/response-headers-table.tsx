"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/lib/i18n";
import { resolveRef } from "@/registry/lib/utils/resolve-ref";
import { HeaderItem } from "@/registry/pivot/header-item";
import { type StyleType } from "@/registry/pivot/style-badge";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";

// Import types from the centralized types file

interface ResponseHeadersTableProps {
  headers: Record<string, OpenAPIV3.HeaderObject | OpenAPIV3.ReferenceObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

/**
 * 响应头部表格组件，负责展示API响应的头部信息
 */
const ResponseHeadersTable = React.forwardRef<HTMLDivElement, ResponseHeadersTableProps>(
  ({ headers, components, className }, ref) => {
    const { t } = useI18n();

    if (!headers || Object.keys(headers).length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        {Object.entries(headers).map(([name, headerOrRef]) => {
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
              `[ResponseHeadersTable] Failed to resolve header ref: ${refString} for key ${name}`,
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
    );
  },
);

ResponseHeadersTable.displayName = "ResponseHeadersTable";

export { ResponseHeadersTable, type ResponseHeadersTableProps };
