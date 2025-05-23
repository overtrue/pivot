import { cn } from "@/lib/utils";
import React from "react";

interface TermsOfServiceProps {
  url: string;
  className?: string;
  children?: React.ReactNode;
}

const TermsOfService = React.forwardRef<HTMLAnchorElement, TermsOfServiceProps>(
  ({ url, className, children }, ref) => {
    return (
      <a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-blue-600 dark:text-blue-400 hover:underline text-sm",
          className,
        )}
      >
        {children || "Terms of Service"}
      </a>
    );
  },
);

TermsOfService.displayName = "TermsOfService";

export { TermsOfService };
