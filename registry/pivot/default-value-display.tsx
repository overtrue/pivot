import { cn } from "@/lib/utils";
import React from "react";
import { ValueDisplay } from "@/registry/pivot/value-display";

interface DefaultValueDisplayProps {
  value: any;
  className?: string;
}

const DefaultValueDisplay = React.forwardRef<HTMLDivElement, DefaultValueDisplayProps>(
  ({ value, className }, ref) => {
    if (value === undefined || value === null) {
      return null;
    }

    return (
      <div ref={ref} className={cn(className)}>
        <h4 className="text-xs font-semibold mb-1 text-neutral-500 dark:text-neutral-400">
          Default
        </h4>
        <ValueDisplay value={value} />
      </div>
    );
  }
);

DefaultValueDisplay.displayName = "DefaultValueDisplay";

export { DefaultValueDisplay };
