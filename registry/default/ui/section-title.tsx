import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ title, className }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn("font-semibold text-sm dark:text-neutral-200", className)}
      >
        {title}
      </h4>
    );
  },
);

SectionTitle.displayName = "SectionTitle";

export { SectionTitle };
