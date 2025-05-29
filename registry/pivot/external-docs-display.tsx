import { cn } from "@/lib/utils";
import React from "react";

interface ExternalDocumentationObject {
  description?: string;
  url: string;
}

interface ExternalDocsDisplayProps {
  externalDocs: ExternalDocumentationObject;
  className?: string;
}

const ExternalDocsDisplay = React.forwardRef<
  HTMLDivElement,
  ExternalDocsDisplayProps
>(({ externalDocs, className }, ref) => {
  return (
    <div ref={ref} className={cn("text-sm", className)}>
      <a
        href={externalDocs.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {externalDocs.description || "External Documentation"}
      </a>
    </div>
  );
});

ExternalDocsDisplay.displayName = "ExternalDocsDisplay";

export { ExternalDocsDisplay, type ExternalDocumentationObject };
