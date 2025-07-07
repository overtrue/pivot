import { cn } from "@/lib/utils";
import React from "react";

// Define OAuth flow types
type OAuthFlowType =
  | "implicit"
  | "password"
  | "clientCredentials"
  | "authorizationCode";

interface OAuthFlowProps {
  flow: OAuthFlowType;
  className?: string;
}

const flowColors: Record<OAuthFlowType, string> = {
  implicit:
    "bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300",
  password: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
  clientCredentials:
    "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
  authorizationCode:
    "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
};

const OAuthFlow = React.forwardRef<HTMLSpanElement, OAuthFlowProps>(
  ({ flow, className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "px-2 py-1 text-xs font-semibold rounded",
          flowColors[flow],
          className,
        )}
      >
        {flow}
      </span>
    );
  },
);

OAuthFlow.displayName = "OAuthFlow";

export { OAuthFlow, type OAuthFlowType };
