import { cn } from "@/utils/cn";
import React from "react";

interface ValueDisplayProps {
  value: any;
  className?: string;
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  className = "",
}) => {
  const displayValue =
    typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);

  return (
    <code
      className={cn(
        "text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-mono break-all",
        className,
      )}
    >
      {displayValue}
    </code>
  );
};

export default ValueDisplay;
