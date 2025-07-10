import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";

interface SchemeTypeProps {
  type: OpenAPIV3.SecuritySchemeObject["type"];
  className?: string;
}

const schemeColors: Record<OpenAPIV3.SecuritySchemeObject["type"], string> = {
  apiKey:
    "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
  http: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
  oauth2:
    "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
  openIdConnect:
    "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300",
};

const SchemeType = React.forwardRef<HTMLSpanElement, SchemeTypeProps>(
  ({ type, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "px-2 py-1 text-xs font-semibold rounded",
          schemeColors[type],
          className,
        )}
      >
        {type}
      </span>
    );
  },
);

SchemeType.displayName = "SchemeType";

export { SchemeType, type SchemeTypeProps };
