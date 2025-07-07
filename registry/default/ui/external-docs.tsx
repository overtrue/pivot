import { cn } from "@/lib/utils";
import React from "react";

interface ExternalDocsProps {
  url: string;
  description?: string;
  className?: string;
}

const ExternalDocs = React.forwardRef<HTMLDivElement, ExternalDocsProps>(
  ({ url, description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-4 border rounded bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700",
          className,
        )}
      >
        <h2 className="text-lg font-bold mb-2 dark:text-white">
          External Documentation
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description || "Additional information can be found here:"}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {url}
        </a>
      </div>
    );
  },
);

ExternalDocs.displayName = "ExternalDocs";

export { ExternalDocs };
