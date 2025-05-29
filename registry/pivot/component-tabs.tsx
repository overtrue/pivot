import { cn } from "@/lib/utils";
import React from "react";

// Define component types
type OpenApiComponentType =
  | "schemas"
  | "responses"
  | "parameters"
  | "examples"
  | "requestBodies"
  | "headers"
  | "securitySchemes"
  | "links"
  | "callbacks";

interface ComponentTabsProps {
  availableTypes: OpenApiComponentType[];
  activeType: OpenApiComponentType | null;
  onSelectType: (type: OpenApiComponentType) => void;
  className?: string;
}

const ComponentTabs = React.forwardRef<HTMLDivElement, ComponentTabsProps>(
  ({ availableTypes, activeType, onSelectType, className }, ref) => {
    return (
      <div ref={ref} className={cn("mb-4 border-b", className)}>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {availableTypes.map((type) => (
            <li key={type} className="mr-2">
              <button
                onClick={() => onSelectType(type)}
                className={cn(
                  "inline-block p-2 border-b-2 rounded-t-lg capitalize",
                  activeType === type
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    : "border-transparent hover:text-neutral-600 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600",
                )}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

ComponentTabs.displayName = "ComponentTabs";

export { ComponentTabs, type OpenApiComponentType };
