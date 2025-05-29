import { cn } from "@/lib/utils";
import React from "react";

interface DeprecatedBadgeProps {
  className?: string;
  children?: React.ReactNode;
}

const DeprecatedBadge = React.forwardRef<HTMLSpanElement, DeprecatedBadgeProps>(
  ({ className, children }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 text-xs rounded font-semibold",
          className,
        )}
      >
        {children || "Deprecated"}
      </span>
    );
  },
);

DeprecatedBadge.displayName = "DeprecatedBadge";

export { DeprecatedBadge };
