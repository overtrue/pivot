import type { OpenAPIV3 } from "openapi-types";
import { cn } from "@/lib/utils";

import React from "react";

type SchemaCompositionKeyword = "allOf" | "anyOf" | "oneOf" | "not";

interface SchemaCompositionDisplayProps {
  keyword: SchemaCompositionKeyword;
  subschemas: (OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject)[];
  components?: OpenAPIV3.ComponentsObject;
  currentDepth: number;
  className?: string;
}

// 辅助函数：从引用路径中提取引用名称
const extractRefName = (ref: string): string | null => {
  const refMatch = ref.match(/^#\/components\/([^/]+)\/(.+)$/);
  if (refMatch && refMatch[2]) {
    return refMatch[2]; // 返回引用名称
  }
  return null;
};

const SchemaCompositionDisplay = React.forwardRef<
  HTMLDivElement,
  SchemaCompositionDisplayProps
>(({ keyword, subschemas, components, currentDepth, className }, ref) => {
  if (!subschemas || subschemas.length === 0) {
    return null;
  }

  const keywordTitles = {
    allOf: "All Of",
    anyOf: "Any Of",
    oneOf: "One Of",
    not: "Not",
  };

  const title = keywordTitles[keyword];
  const borderColor = {
    allOf: "border-blue-300 dark:border-blue-700",
    anyOf: "border-green-300 dark:border-green-700",
    oneOf: "border-purple-300 dark:border-purple-700",
    not: "border-red-300 dark:border-red-700",
  }[keyword];

  return (
    <div
      ref={ref}
      className={cn(
        "mt-3 p-3 border rounded",
        borderColor,
        "bg-white dark:bg-neutral-800",
        className,
      )}
    >
      <h4 className="text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-200">
        {title}
      </h4>
      <div className="space-y-3">
        {subschemas.map((subschema, index) => {
          // 检查是否是引用对象并提取引用名称
          const isRef =
            typeof subschema === "object" &&
            subschema !== null &&
            "$ref" in subschema;
          const refName = isRef
            ? extractRefName((subschema as OpenAPIV3.ReferenceObject).$ref)
            : null;

          return (
            <div key={index}>
              {refName && (
                <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                  Reference: {refName}
                </div>
              )}
              <div className="text-xs text-neutral-600 dark:text-neutral-300 p-2 bg-neutral-50 dark:bg-neutral-700 rounded">
                Schema composition subschema #{index + 1}
                {/* Note: In real implementation, this would recursively call SchemaDisplay */}
                {/* <SchemaDisplay
                  schema={subschema}
                  components={components}
                  currentDepth={currentDepth + 1}
                /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

SchemaCompositionDisplay.displayName = "SchemaCompositionDisplay";

export {
  SchemaCompositionDisplay,
  type SchemaCompositionDisplayProps,
  type SchemaCompositionKeyword,
};
