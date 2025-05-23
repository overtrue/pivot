import { cn } from "@/lib/utils";
import React from "react";

interface ParameterNameProps {
  name: string;
  deprecated?: boolean;
  className?: string;
}

const ParameterName = React.forwardRef<HTMLSpanElement, ParameterNameProps>(
  ({ name, deprecated, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "font-mono text-sm font-medium",
          deprecated
            ? "line-through text-red-500 dark:text-red-400"
            : "dark:text-neutral-200",
          className,
        )}
      >
        {name}
      </span>
    );
  },
);

ParameterName.displayName = "ParameterName";

export { ParameterName };
