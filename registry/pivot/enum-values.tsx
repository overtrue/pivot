import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ValueDisplay } from "./value-display";

interface EnumValuesProps {
  values: any[];
  className?: string;
}

const EnumValues = React.forwardRef<HTMLDivElement, EnumValuesProps>(
  ({ values, className }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (values.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn(className)}>
        {values.map((value, index) => (
          <ValueDisplay key={index} value={value} />
        ))}
      </div>
    );
  }
);

EnumValues.displayName = "EnumValues";

export { EnumValues };
