"use client";

import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";
import React, { useState } from "react";
import { ConstraintDisplay } from "@/registry/default/ui/constraint-display";
import { DefaultValueDisplay } from "@/registry/default/ui/default-value-display";
import { DeprecatedBadge } from "@/registry/default/ui/deprecated-badge";
import { EnumValuesDisplay } from "@/registry/default/ui/enum-values-display";
import { FormatBadge } from "@/registry/default/ui/format-badge";
import { InLabel } from "@/registry/default/ui/in-label";
import { ParameterDescription } from "@/registry/default/ui/parameter-description";
import { ParameterName } from "@/registry/default/ui/parameter-name";
import { StyleBadge, type StyleType } from "@/registry/default/ui/style-badge";
import { TypeIndicator } from "@/registry/default/ui/type-indicator";
import { ExampleDisplay } from "@/registry/default/ui/example-display";
import { ExpandCollapse } from "@/registry/default/ui/expand-collapse";

// Import types from the centralized types file

interface ParameterItemProps {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  schema: OpenAPIV3.SchemaObject;
  required?: boolean;
  description?: string;
  deprecated?: boolean;
  style?: StyleType;
  explode?: boolean;
  examples?: Record<
    string,
    OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject
  >;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
  expanded?: boolean;
}

const ParameterItem = React.forwardRef<HTMLDivElement, ParameterItemProps>(
  (
    {
      name,
      in: paramIn,
      schema,
      required = false,
      description,
      deprecated = false,
      style,
      explode = false,
      examples,
      components,
      className,
      expanded = false,
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(expanded);

    const hasDetails =
      schema.default !== undefined ||
      schema.enum ||
      examples ||
      description ||
      schema.minimum !== undefined ||
      schema.maximum !== undefined ||
      schema.minLength !== undefined ||
      schema.maxLength !== undefined ||
      schema.pattern;

    return (
      <div
        ref={ref}
        className={cn(
          "bg-neutral-50 dark:bg-neutral-800 rounded-md overflow-hidden",
          className,
        )}
      >
        <div
          className="px-4 py-3 flex flex-wrap items-center justify-between gap-2 cursor-pointer dark:bg-neutral-800"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-wrap items-center gap-2">
            <ParameterName name={name} deprecated={deprecated} />

            {deprecated && <DeprecatedBadge />}

            {required && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 text-xs rounded font-semibold">
                Required
              </span>
            )}

            {explode && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 text-xs rounded">
                Explode
              </span>
            )}
          </div>

          {hasDetails && (
            <ExpandCollapse
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>

        {isExpanded && hasDetails && (
          <div className="p-4 pt-0 flex flex-col gap-3 dark:bg-neutral-800">
            {description && <ParameterDescription description={description} />}

            {schema.default !== undefined && (
              <DefaultValueDisplay value={schema.default} />
            )}

            {schema.enum && schema.enum.length > 0 && (
              <EnumValuesDisplay values={schema.enum} />
            )}

            <ConstraintDisplay schema={schema} />

            {examples && Object.keys(examples).length > 0 && (
              <div>
                <h4 className="text-xs font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                  Examples
                </h4>
                <div className="space-y-2">
                  {Object.entries(examples).map(([key, example]) => (
                    <div key={key}>
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                        {key}:
                      </span>
                      <ExampleDisplay example={example} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <InLabel type={paramIn} />
              {schema.type && <TypeIndicator type={schema.type} />}
              {schema.format && <FormatBadge format={schema.format} />}
              {style && <StyleBadge style={style} />}
            </div>
          </div>
        )}
      </div>
    );
  },
);

ParameterItem.displayName = "ParameterItem";

export { ParameterItem, type ParameterItemProps };
