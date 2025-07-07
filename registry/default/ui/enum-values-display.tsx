import { cn } from "@/lib/utils";
import React from "react";
import { EnumValues } from "@/registry/default/ui/enum-values";

interface EnumValuesDisplayProps {
  values: any[];
  className?: string;
}

const EnumValuesDisplay = React.forwardRef<
  HTMLDivElement,
  EnumValuesDisplayProps
>(({ values, className }, ref) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={cn(className)}>
      <h4 className="text-xs font-semibold mb-1 text-neutral-500 dark:text-neutral-400">
        Allowed Values
      </h4>
      <EnumValues values={values} className="flex flex-wrap gap-1" />
    </div>
  );
});

EnumValuesDisplay.displayName = "EnumValuesDisplay";

export { EnumValuesDisplay };
