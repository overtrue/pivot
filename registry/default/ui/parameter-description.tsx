import { cn } from "@/lib/utils";
import React from "react";

interface ParameterDescriptionProps {
  description: string;
  className?: string;
}

const ParameterDescription = React.forwardRef<
  HTMLDivElement,
  ParameterDescriptionProps
>(({ description, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400 prose dark:prose-invert max-w-none",
        className,
      )}
    >
      {description}
    </div>
  );
});

ParameterDescription.displayName = "ParameterDescription";

export { ParameterDescription };
