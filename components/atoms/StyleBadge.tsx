import { StyleType } from "@/types/openapi";
import { cn } from "@/utils/cn";
import React from "react";

interface StyleBadgeProps {
  style: StyleType;
  className?: string;
}

const StyleBadge: React.FC<StyleBadgeProps> = ({ style, className }) => {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300",
        className,
      )}
    >
      {style}
    </span>
  );
};

export default StyleBadge;
