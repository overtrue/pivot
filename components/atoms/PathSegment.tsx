import { cn } from "@/utils/cn";
import React from "react";

interface PathSegmentProps {
  path: string;
  isParameter?: boolean;
  className?: string;
}

const PathSegment: React.FC<PathSegmentProps> = ({
  path,
  isParameter = false,
  className,
}) => {
  return (
    <span
      className={cn(
        "text-sm font-mono",
        isParameter
          ? "text-blue-600 dark:text-blue-400"
          : "text-neutral-800 dark:text-neutral-300",
        className,
      )}
    >
      {path}
    </span>
  );
};

export default PathSegment;
