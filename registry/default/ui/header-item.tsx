"use client";

import { cn } from "@/lib/utils";
import { DefaultValueDisplay } from "@/registry/default/ui/default-value-display";
import { DeprecatedBadge } from "@/registry/default/ui/deprecated-badge";
import { DescriptionDisplay } from "@/registry/default/ui/description-display";
import { EnumValuesDisplay } from "@/registry/default/ui/enum-values-display";
import { ExamplesDisplay } from "@/registry/default/ui/examples-display";
import { ExpandCollapse } from "@/registry/default/ui/expand-collapse";
import { FormatBadge } from "@/registry/default/ui/format-badge";
import { RequiredBadge } from "@/registry/default/ui/required-badge";
import { TypeIndicator } from "@/registry/default/ui/type-indicator";
import type { OpenAPIV3 } from "openapi-types";
import React, { useState } from "react";

// Import types from the centralized types file

// Type guard to check if it's a OpenAPIV3.SchemaObject and not a OpenAPIV3.ReferenceObject
function isSchemaObject(
  obj: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
): obj is OpenAPIV3.SchemaObject {
  return obj && !("$ref" in obj);
}

// OpenAPIV3.HeaderObject already has all necessary fields from OpenAPIV3.ParameterObject except name and in
interface HeaderItemProps extends OpenAPIV3.HeaderObject {
  name: string; // Add header name as it's not part of OpenAPIV3.HeaderObject
  components?: OpenAPIV3.ComponentsObject; // For rendering examples
  className?: string;
}

// 提取样式徽章组件
const StyleBadge = ({ style }: { style: string }) => (
  <span className="bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200 px-2 py-0.5 text-xs rounded">
    style: {style}
  </span>
);

const ExplodeBadge = () => (
  <span className="bg-purple-100 text-purple-800 dark:text-purple-700 dark:text-purple-200 px-2 py-0.5 text-xs rounded">
    explode
  </span>
);

// 提取头部徽章组件
const HeaderBadges = ({
  schema,
  style,
  explode,
  required,
  deprecated
}: {
  schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
  style?: string;
  explode?: boolean;
  required?: boolean;
  deprecated?: boolean;
}) => (
  <div className="flex items-center flex-wrap gap-2">
    {required && <RequiredBadge />}
    {deprecated && <DeprecatedBadge />}
    {schema && isSchemaObject(schema) && schema.type && (
      <TypeIndicator type={schema.type} />
    )}
    {schema && isSchemaObject(schema) && schema.format && (
      <FormatBadge format={schema.format} />
    )}
    {style && <StyleBadge style={style} />}
    {explode && <ExplodeBadge />}
  </div>
);

// 提取详情内容组件
const HeaderDetails = ({
  schema,
  description,
  examples,
  components
}: {
  schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
  description?: string;
  examples?: Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>;
  components?: OpenAPIV3.ComponentsObject;
}) => {
  if (!schema || !isSchemaObject(schema)) return null;

  return (
    <div className="mt-3 pl-2 border-l-2 border-neutral-200 dark:border-neutral-600 space-y-4">
      {description && (
        <div>
          <DescriptionDisplay
            description={description}
            className="text-sm"
          />
        </div>
      )}

      <DefaultValueDisplay value={schema.default} />
      <EnumValuesDisplay values={schema.enum || []} />

      {/* Schema constraints */}
      {(() => {
        const constraints = [];
        if (schema.minimum !== undefined) constraints.push(`min: ${schema.minimum}`);
        if (schema.maximum !== undefined) constraints.push(`max: ${schema.maximum}`);
        if (schema.minLength !== undefined) constraints.push(`minLength: ${schema.minLength}`);
        if (schema.maxLength !== undefined) constraints.push(`maxLength: ${schema.maxLength}`);
        if (schema.pattern) constraints.push(`pattern: ${schema.pattern}`);

        if (constraints.length === 0) return null;

        return (
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            <span className="font-medium">Constraints: </span>
            {constraints.join(", ")}
          </div>
        );
      })()}

      {examples && Object.keys(examples).length > 0 && (
        <div>
          <ExamplesDisplay examples={examples} components={components} />
        </div>
      )}
    </div>
  );
};

const HeaderItem = React.forwardRef<HTMLDivElement, HeaderItemProps>(
  (
    {
      name,
      required,
      schema,
      description,
      deprecated,
      style,
      explode,
      examples,
      components,
      className,
    },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // 使用类型守卫来安全地访问schema属性
    const hasSchemaDetails =
      schema &&
      isSchemaObject(schema) &&
      (schema.default !== undefined ||
        schema.enum ||
        schema.minimum !== undefined ||
        schema.maximum !== undefined ||
        schema.minLength !== undefined ||
        schema.maxLength !== undefined ||
        schema.pattern);

    const hasDetails =
      description ||
      hasSchemaDetails ||
      (examples && Object.keys(examples).length > 0);

    const toggleExpansion = () => setIsExpanded(!isExpanded);

    return (
      <div
        ref={ref}
        className={cn(
          "mb-2 p-2 border rounded",
          deprecated
            ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
            : "border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center flex-wrap gap-2">
            <span
              className={`font-mono font-medium ${deprecated ? "line-through text-red-500" : ""}`}
            >
              {name}
            </span>
            <HeaderBadges
              schema={schema}
              style={style}
              explode={explode}
              required={required}
              deprecated={deprecated}
            />
          </div>

          {hasDetails && (
            <ExpandCollapse
              isExpanded={isExpanded}
              onToggle={toggleExpansion}
              label={isExpanded ? "Hide Details" : "Show Details"}
            />
          )}
        </div>

        {description && !isExpanded && (
          <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
            <DescriptionDisplay description={description} />
          </div>
        )}

        {isExpanded && hasDetails && (
          <HeaderDetails
            schema={schema}
            description={description}
            examples={examples}
            components={components}
          />
        )}
      </div>
    );
  },
);

HeaderItem.displayName = "HeaderItem";

export { HeaderItem, type HeaderItemProps };
