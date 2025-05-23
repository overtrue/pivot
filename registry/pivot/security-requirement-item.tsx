import { cn } from "@/lib/utils";
import React from "react";

interface SecurityRequirementObject {
  [key: string]: string[];
}

interface SecurityRequirementItemProps {
  requirement: SecurityRequirementObject;
  className?: string;
}

const SecurityRequirementItem = React.forwardRef<
  HTMLDivElement,
  SecurityRequirementItemProps
>(({ requirement, className }, ref) => {
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

export { SecurityRequirementItem, type SecurityRequirementObject };
