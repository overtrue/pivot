import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DefaultValueDisplay } from "../pivot/default-value-display";
import { DeprecatedBadge } from "../pivot/deprecated-badge";
import { DescriptionDisplay } from "../pivot/description-display";
import { EnumValuesDisplay } from "../pivot/enum-values-display";
import { FormatBadge } from "../pivot/format-badge";
import { RequiredBadge } from "../pivot/required-badge";
import { TypeIndicator } from "../pivot/type-indicator";
import { ExamplesDisplay } from "./examples-display";
import { ExpandCollapse } from "./expand-collapse";

interface ComponentsObject {
  [key: string]: any;
}

interface ReferenceObject {
  $ref: string;
}

interface SchemaObject {
  type?: string;
  format?: string;
  default?: any;
  enum?: any[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  [key: string]: any;
}

interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: Record<string, any>;
}

// Type guard to check if it's a SchemaObject and not a ReferenceObject
function isSchemaObject(
  obj: SchemaObject | ReferenceObject,
): obj is SchemaObject {
  return obj && !("$ref" in obj);
}

// HeaderObject already has all necessary fields from ParameterObject except name and in
interface HeaderItemProps extends HeaderObject {
  name: string; // Add header name as it's not part of HeaderObject
  components?: ComponentsObject; // For rendering examples
  className?: string;
}

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

    // Simple schema constraints display
    const SchemaConstraints = ({ schema }: { schema: SchemaObject }) => {
      const constraints = [];

      if (schema.minimum !== undefined)
        constraints.push(`min: ${schema.minimum}`);
      if (schema.maximum !== undefined)
        constraints.push(`max: ${schema.maximum}`);
      if (schema.minLength !== undefined)
        constraints.push(`minLength: ${schema.minLength}`);
      if (schema.maxLength !== undefined)
        constraints.push(`maxLength: ${schema.maxLength}`);
      if (schema.pattern) constraints.push(`pattern: ${schema.pattern}`);

      if (constraints.length === 0) return null;

      return (
        <div className="text-xs text-neutral-600 dark:text-neutral-400">
          <span className="font-medium">Constraints: </span>
          {constraints.join(", ")}
        </div>
      );
    };

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
            {required && <RequiredBadge />}
            {deprecated && <DeprecatedBadge />}
            {schema && isSchemaObject(schema) && schema.type && (
              <TypeIndicator type={schema.type as any} />
            )}
            {schema && isSchemaObject(schema) && schema.format && (
              <FormatBadge format={schema.format as any} />
            )}
            {style && (
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200 px-2 py-0.5 text-xs rounded">
                style: {style}
              </span>
            )}
            {explode && (
              <span className="bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-200 px-2 py-0.5 text-xs rounded">
                explode
              </span>
            )}
          </div>

          {hasDetails && (
            <ExpandCollapse
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
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
          <div className="mt-3 pl-2 border-l-2 border-neutral-200 dark:border-neutral-600 space-y-4">
            {description && (
              <div>
                <DescriptionDisplay
                  description={description}
                  className="text-sm"
                />
              </div>
            )}

            {schema && isSchemaObject(schema) && (
              <DefaultValueDisplay value={schema.default} />
            )}
            {schema && isSchemaObject(schema) && (
              <EnumValuesDisplay values={schema.enum || []} />
            )}
            {schema && isSchemaObject(schema) && (
              <SchemaConstraints schema={schema} />
            )}

            {examples && Object.keys(examples).length > 0 && (
              <div>
                <ExamplesDisplay examples={examples} components={components} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

HeaderItem.displayName = "HeaderItem";

export {
  HeaderItem,
  type ComponentsObject,
  type HeaderItemProps,
  type HeaderObject,
  type ReferenceObject,
  type SchemaObject,
};
