import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";

interface DescriptionDisplayProps {
  description: string;
  className?: string;
}

const DescriptionDisplay = React.forwardRef<HTMLDivElement, DescriptionDisplayProps>(
  ({ description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `text-sm text-neutral-500 dark:text-neutral-300 prose dark:prose-invert max-w-none`,
          className,
        )}
      >
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    );
  }
);

DescriptionDisplay.displayName = "DescriptionDisplay";

export { DescriptionDisplay };
