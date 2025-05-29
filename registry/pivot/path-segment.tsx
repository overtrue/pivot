import { cn } from "@/lib/utils";
import React from "react";

interface PathSegmentProps {
  path: string;
  isParameter?: boolean;
  className?: string;
}

const PathSegment = React.forwardRef<HTMLSpanElement, PathSegmentProps>(
  ({ path, isParameter = false, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-sm font-mono",
          isParameter
            ? "text-blue-600 dark:text-blue-400"
            : "text-neutral-800 dark:text-neutral-300",
          className,
        )}
      >
        {path}
      </span>
    );
  },
);

PathSegment.displayName = "PathSegment";

export { PathSegment };
