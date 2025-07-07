import { cn } from "@/lib/utils";
import React from "react";

interface RequiredMarkerProps {
  className?: string;
}

const RequiredMarker = React.forwardRef<HTMLSpanElement, RequiredMarkerProps>(
  ({ className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-red-600 dark:text-red-400 font-bold", className)}
        title="Required"
      >
        *
      </span>
    );
  },
);

RequiredMarker.displayName = "RequiredMarker";

export { RequiredMarker };
