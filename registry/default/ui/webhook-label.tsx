import { cn } from "@/lib/utils";
import React from "react";

interface WebhookLabelProps {
  className?: string;
  children?: React.ReactNode;
}

const WebhookLabel = React.forwardRef<HTMLSpanElement, WebhookLabelProps>(
  ({ className, children }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "px-2 py-1 text-xs font-semibold rounded",
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
          className,
        )}
      >
        {children || "Webhook"}
      </span>
    );
  },
);

WebhookLabel.displayName = "WebhookLabel";

export { WebhookLabel };
