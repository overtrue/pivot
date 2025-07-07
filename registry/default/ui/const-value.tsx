import { cn } from "@/lib/utils";
import React from "react";
// import { CopyButton } from "@/registry/default/interactive/copy-button";

interface ConstValueProps {
  value: any;
  className?: string;
}

const ConstValue = React.forwardRef<HTMLDivElement, ConstValueProps>(
  ({ value, className }, ref) => {
    const stringValue = JSON.stringify(value);

    return (
      <div ref={ref} className={cn("flex items-center space-x-2", className)}>
        <span className="font-mono text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-2 py-1 rounded">
          const: {stringValue}
        </span>
        {/* <CopyButton text={stringValue} /> */}
      </div>
    );
  }
);

ConstValue.displayName = "ConstValue";

export { ConstValue };
