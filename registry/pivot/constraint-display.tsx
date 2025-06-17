import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";

// Import types from the centralized types file

interface ConstraintDisplayProps {
  schema: OpenAPIV3.SchemaObject;
  className?: string;
}

const ConstraintDisplay = React.forwardRef<
  HTMLDivElement,
  ConstraintDisplayProps
>(({ schema, className }, ref) => {
  const constraints: Array<{ label: string; value: any }> = [];

  // 数字约束
  if (schema.minimum !== undefined) {
    constraints.push({
      label: schema.exclusiveMinimum ? "min (exclusive)" : "min",
      value: schema.minimum,
    });
  }
  if (schema.maximum !== undefined) {
    constraints.push({
      label: schema.exclusiveMaximum ? "max (exclusive)" : "max",
      value: schema.maximum,
    });
  }
  if (schema.multipleOf !== undefined) {
    constraints.push({ label: "multiple of", value: schema.multipleOf });
  }

  // 字符串约束
  if (schema.minLength !== undefined) {
    constraints.push({ label: "min length", value: schema.minLength });
  }
  if (schema.maxLength !== undefined) {
    constraints.push({ label: "max length", value: schema.maxLength });
  }
  if (schema.pattern) {
    constraints.push({ label: "pattern", value: schema.pattern });
  }

  // 数组约束
  if (schema.minItems !== undefined) {
    constraints.push({ label: "min items", value: schema.minItems });
  }
  if (schema.maxItems !== undefined) {
    constraints.push({ label: "max items", value: schema.maxItems });
  }
  if (schema.uniqueItems) {
    constraints.push({ label: "unique items", value: "true" });
  }

  if (constraints.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn(className)}>
      <h5 className="text-xs font-semibold mb-1 text-neutral-500 dark:text-neutral-400">
        Constraints
      </h5>
      <div className="text-xs space-y-1">
        {constraints.map(({ label, value }, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="font-medium text-neutral-600 dark:text-neutral-400">
              {label}:
            </span>
            <span className="font-mono text-neutral-800 dark:text-neutral-200">
              {String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

ConstraintDisplay.displayName = "ConstraintDisplay";

export { ConstraintDisplay, type ConstraintDisplayProps };
