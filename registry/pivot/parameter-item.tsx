"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ConstraintDisplay } from "../pivot/constraint-display";
import { DefaultValueDisplay } from "../pivot/default-value-display";
import { DeprecatedBadge } from "../pivot/deprecated-badge";
import { EnumValuesDisplay } from "../pivot/enum-values-display";
import { FormatBadge } from "../pivot/format-badge";
import { InLabel } from "../pivot/in-label";
import { ParameterDescription } from "../pivot/parameter-description";
import { ParameterName } from "../pivot/parameter-name";
import { StyleBadge } from "../pivot/style-badge";
import { TypeIndicator, type DataType } from "../pivot/type-indicator";
import { ExampleDisplay } from "./example-display";
import { ExpandCollapse } from "./expand-collapse";

interface SchemaObject {
  type: DataType;
  format?: string;
  default?: any;
  example?: any;
  enum?: any[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  maxProperties?: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
}

interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

interface ReferenceObject {
  $ref: string;
}

interface ComponentsObject {
  [key: string]: any;
}

type StyleType =
  | "form"
  | "simple"
  | "label"
  | "matrix"
  | "spaceDelimited"
  | "pipeDelimited"
  | "deepObject";

interface ParameterItemProps {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  schema: SchemaObject;
  required?: boolean;
  description?: string;
  deprecated?: boolean;
  style?: StyleType;
  explode?: boolean;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  components?: ComponentsObject;
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
              <TypeIndicator type={schema.type} />
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

export {
  ParameterItem,
  type ComponentsObject,
  type ExampleObject,
  type ParameterItemProps,
  type ReferenceObject,
  type SchemaObject,
  type StyleType
};

