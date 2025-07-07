import { cn } from "@/lib/utils";
import React from "react";

// Define style types for OpenAPI
type StyleType =
  | "form"
  | "simple"
  | "matrix"
  | "label"
  | "spaceDelimited"
  | "pipeDelimited"
  | "deepObject"
  | string;

interface StyleBadgeProps {
  style: StyleType;
  className?: string;
}

const StyleBadge = React.forwardRef<HTMLSpanElement, StyleBadgeProps>(
  ({ style, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300",
          className,
        )}
      >
        {style}
      </span>
    );
  },
);

StyleBadge.displayName = "StyleBadge";

export { StyleBadge, type StyleType };
