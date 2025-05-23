import { cn } from "@/utils/cn";
import React from "react";

interface MethodLabelProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  variant?: "default" | "compact";
  className?: string;
}

const methodColors: Record<
  MethodLabelProps["method"],
  { text: string; bg: string; darkText: string; darkBg: string }
> = {
  GET: {
    text: "text-green-600",
    bg: "bg-green-100",
    darkText: "dark:text-green-400",
    darkBg: "dark:bg-green-900",
  },
  POST: {
    text: "text-blue-600",
    bg: "bg-blue-100",
    darkText: "dark:text-blue-400",
    darkBg: "dark:bg-blue-900",
  },
  PUT: {
    text: "text-yellow-600",
    bg: "bg-yellow-100",
    darkText: "dark:text-yellow-300",
    darkBg: "dark:bg-yellow-900",
  },
  DELETE: {
    text: "text-red-600",
    bg: "bg-red-100",
    darkText: "dark:text-red-400",
    darkBg: "dark:bg-red-900",
  },
  PATCH: {
    text: "text-purple-600",
    bg: "bg-purple-100",
    darkText: "dark:text-purple-400",
    darkBg: "dark:bg-purple-900",
  },
  OPTIONS: {
    text: "text-neutral-600",
    bg: "bg-neutral-100",
    darkText: "dark:text-neutral-300",
    darkBg: "dark:bg-neutral-800",
  },
  HEAD: {
    text: "text-neutral-600",
    bg: "bg-neutral-100",
    darkText: "dark:text-neutral-300",
    darkBg: "dark:bg-neutral-800",
  },
};

const MethodLabel: React.FC<MethodLabelProps> = ({
  method,
  variant = "default",
  className,
}) => {
  const compactStyles =
    variant === "compact"
      ? `${methodColors[method].text} ${methodColors[method].darkText} font-semibold text-xs`
      : `${methodColors[method].text} ${methodColors[method].darkText} ${methodColors[method].bg} ${methodColors[method].darkBg} px-2 py-1 text-xs font-semibold rounded`;

  return <span className={cn(compactStyles, className)}>{method}</span>;
};

export default MethodLabel;
