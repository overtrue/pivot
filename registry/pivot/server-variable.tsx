import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";
import { DescriptionDisplay } from "@/registry/pivot/description-display";

interface ServerVariableProps {
  name: string;
  variable?: OpenAPIV3.ServerVariableObject;
  className?: string;
}

const ServerVariable = React.forwardRef<HTMLDivElement, ServerVariableProps>(
  ({ name, variable, className }, ref) => {
    if (!variable) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded p-3 bg-neutral-50 dark:bg-neutral-800/70",
            className,
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm font-medium dark:text-neutral-200">
              {name}
            </span>
            <span className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded">
              No data
            </span>
          </div>
        </div>
      );
    }

    const { description, default: defaultValue, enum: enumValues } = variable;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded p-3 bg-neutral-50 dark:bg-neutral-800/70",
          className,
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm font-medium dark:text-neutral-200">
            {name}
          </span>
          <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded">
            Default: {defaultValue}
          </span>
        </div>

        {description && <DescriptionDisplay description={description} />}

        {enumValues && enumValues.length > 0 && (
          <div>
            <h5 className="text-xs font-medium mb-1 dark:text-neutral-300">
              Available values:
            </h5>
            <div className="flex flex-wrap gap-1">
              {enumValues.map((value) => (
                <span
                  key={value}
                  className="text-xs bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

ServerVariable.displayName = "ServerVariable";

export { ServerVariable, type ServerVariableProps };
