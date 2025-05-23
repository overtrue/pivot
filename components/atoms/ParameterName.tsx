import { cn } from "@/utils/cn";
import React from "react";

interface ParameterNameProps {
  name: string;
  deprecated?: boolean;
}

const ParameterName: React.FC<ParameterNameProps> = ({ name, deprecated }) => {
  return (
    <span
      className={cn(
        "font-mono text-sm font-medium",
        deprecated
          ? "line-through text-red-500 dark:text-red-400"
          : "dark:text-neutral-200",
      )}
    >
      {name}
    </span>
  );
};

export default ParameterName;
