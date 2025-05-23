import { cn } from "@/lib/utils";
import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, className = "", iconClassName = "", size = "md" }, ref) => {
    const [copied, setCopied] = useState(false);

    // 自动还原图标
    useEffect(() => {
      if (copied) {
        const timer = setTimeout(() => {
          setCopied(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [copied]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    };

    // 根据尺寸大小设置不同的样式
    const sizeClasses = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    };

    const iconSizes = {
      sm: 14,
      md: 16,
      lg: 20,
    };

    return (
      <button
        ref={ref}
        onClick={handleCopy}
        className={cn(
          "bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-300 rounded transition-colors",
          sizeClasses[size],
          className,
          copied ? "text-green-600 dark:text-green-400" : "",
        )}
        title="Copy to clipboard"
      >
        {copied ? (
          <ClipboardCheck size={iconSizes[size]} className={iconClassName} />
        ) : (
          <Clipboard size={iconSizes[size]} className={iconClassName} />
        )}
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";

export { CopyButton };
