import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";

// 类型别名，供其他组件使用
export type SecurityRequirementObject = OpenAPIV3.SecurityRequirementObject;

interface SecurityRequirementItemProps {
  requirement?: OpenAPIV3.SecurityRequirementObject;
  className?: string;
}

const SecurityRequirementItem = React.forwardRef<
  HTMLDivElement,
  SecurityRequirementItemProps
>(({ requirement, className }, ref) => {
  if (!requirement) {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-neutral-50 dark:bg-neutral-800 rounded p-2 text-xs dark:text-neutral-200",
          className,
        )}
      >
        <span className="text-neutral-500 dark:text-neutral-500 italic">
          No security requirement data
        </span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "bg-neutral-50 dark:bg-neutral-800 rounded p-2 text-xs dark:text-neutral-200",
        className,
      )}
    >
      {/* A single requirement object can list multiple schemes required together (AND) */}
      {Object.entries(requirement).map(([schemeName, scopes]) => (
        <div key={schemeName} className="flex items-center space-x-1">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            {schemeName}:
          </span>
          {scopes.length > 0 ? (
            <span className="text-neutral-600 dark:text-neutral-400">
              [{scopes.join(", ")}]
            </span>
          ) : (
            <span className="text-neutral-500 dark:text-neutral-500 italic">
              (No specific scopes required)
            </span>
          )}
        </div>
      ))}
    </div>
  );
});

SecurityRequirementItem.displayName = "SecurityRequirementItem";

export { SecurityRequirementItem, type SecurityRequirementItemProps };
