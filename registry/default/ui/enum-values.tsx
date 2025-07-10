"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ValueDisplay } from "@/registry/default/ui/value-display";

interface EnumValuesProps {
  values: unknown[];
  className?: string;
}

const EnumValues = React.forwardRef<HTMLDivElement, EnumValuesProps>(
  ({ values, className }, ref) => {

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
  },
);

EnumValues.displayName = "EnumValues";

export { EnumValues };
