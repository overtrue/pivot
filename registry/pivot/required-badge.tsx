import { cn } from "@/lib/utils";
import React from "react";

interface RequiredBadgeProps {
  className?: string;
  children?: React.ReactNode;
}

const RequiredBadge = React.forwardRef<HTMLSpanElement, RequiredBadgeProps>(
  ({ className, children }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 text-xs rounded font-semibold",
          className,
        )}
      >
        {children || "Required"}
      </span>
    );
  },
);

RequiredBadge.displayName = "RequiredBadge";

export { RequiredBadge };
