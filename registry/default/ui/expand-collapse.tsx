import { cn } from "@/lib/utils";
import React from "react";

interface ExpandCollapseProps {
  isExpanded: boolean;
  onToggle: () => void;
  label?: string;
  expandedLabel?: string;
  collapsedLabel?: string;
  className?: string;
}

const ExpandCollapse = React.forwardRef<HTMLButtonElement, ExpandCollapseProps>(
  (
    { isExpanded, onToggle, label, expandedLabel, collapsedLabel, className },
    ref,
  ) => {
    // 确定要显示的标签
    const displayLabel = label || (isExpanded ? expandedLabel : collapsedLabel);

    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        className={cn(
          "flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300",
          className,
        )}
        aria-expanded={isExpanded}
      >
        {displayLabel && <span>{displayLabel}</span>}
        <svg
          className={cn(
            "ml-1 h-4 w-4 transition-transform duration-200",
            isExpanded ? "rotate-180" : "",
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    );
  },
);

ExpandCollapse.displayName = "ExpandCollapse";

export { ExpandCollapse };
