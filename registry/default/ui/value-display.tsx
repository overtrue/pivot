import { cn } from "@/lib/utils";
import React from "react";

interface ValueDisplayProps {
  value: unknown;
  className?: string;
}

const ValueDisplay = React.forwardRef<HTMLElement, ValueDisplayProps>(
  ({ value, className = "" }, ref) => {
    const displayValue =
      typeof value === "object"
        ? JSON.stringify(value, null, 2)
        : String(value);

    return (
      <code
        ref={ref}
        className={cn(
          "text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-mono break-all",
          className,
        )}
      >
        {displayValue}
      </code>
    );
  },
);

ValueDisplay.displayName = "ValueDisplay";

export { ValueDisplay };
