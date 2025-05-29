import { cn } from "@/lib/utils";
import React from "react";

interface VersionBadgeProps {
  version: string;
  className?: string;
}

const VersionBadge = React.forwardRef<HTMLSpanElement, VersionBadgeProps>(
  ({ version, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "px-2 py-1 text-xs font-semibold rounded",
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          className,
        )}
      >
        v{version}
      </span>
    );
  }
);

VersionBadge.displayName = "VersionBadge";

export { VersionBadge };
