import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";
import { DescriptionDisplay } from "../pivot/description-display";
import { OperationBox } from "./operation-box";

// Import types from the centralized types file

interface PathItemDisplayProps {
  path: string;
  pathItem?: OpenAPIV3.PathItemObject;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const PathItemDisplay = React.forwardRef<HTMLDivElement, PathItemDisplayProps>(
  ({ path, pathItem, components, className }, ref) => {
    if (!pathItem) {
      return (
        <div ref={ref} className={cn("space-y-4", className)}>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
            {path}
          </h2>
          <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
            No path item data available
          </div>
        </div>
      );
    }

    const operations = [
      { method: "get", operation: pathItem.get },
      { method: "put", operation: pathItem.put },
      { method: "post", operation: pathItem.post },
      { method: "delete", operation: pathItem.delete },
      { method: "options", operation: pathItem.options },
      { method: "head", operation: pathItem.head },
      { method: "patch", operation: pathItem.patch },
      { method: "trace", operation: pathItem.trace },
    ].filter(({ operation }) => operation !== undefined);

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
          {path}
        </h2>
        {pathItem.description && (
          <DescriptionDisplay description={pathItem.description} />
        )}

        <div className="space-y-6">
          {operations.map(({ method, operation }) => (
            <OperationBox
              key={method}
              path={path}
              method={method.toUpperCase()}
              operation={operation!}
              components={components}
            />
          ))}
        </div>

        {operations.length === 0 && (
          <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
            No operations defined for this path
          </div>
        )}
      </div>
    );
  },
);

PathItemDisplay.displayName = "PathItemDisplay";

export {
  PathItemDisplay,
  type PathItemDisplayProps
};

