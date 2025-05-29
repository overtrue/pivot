import { cn } from "@/lib/utils";
import { ParameterLocation } from "@/types/openapi";
import React from "react";

interface InLabelProps {
  type: ParameterLocation;
  className?: string;
}

const getColorForType = (type: ParameterLocation): string => {
  switch (type) {
    case "query":
      return "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300";
    case "path":
      return "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300";
    case "header":
      return "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300";
    case "cookie":
      return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300";
    default:
      return "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300";
  }
};

const InLabel = React.forwardRef<HTMLSpanElement, InLabelProps>(
  ({ type, className }, ref) => {
    const colorClass = getColorForType(type);

    return (
      <span
        ref={ref}
        className={cn(
          "px-2 py-0.5 rounded text-xs font-medium",
          colorClass,
          className,
        )}
      >
        in: {type}
      </span>
    );
  }
);

InLabel.displayName = "InLabel";

export { InLabel };
