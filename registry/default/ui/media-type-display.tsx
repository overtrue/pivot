import { cn } from "@/lib/utils";
import React from "react";

interface MediaTypeDisplayProps {
  mediaType?: string;
  className?: string;
}

const MediaTypeDisplay = React.forwardRef<
  HTMLDivElement,
  MediaTypeDisplayProps
>(({ mediaType, className }, ref) => {
  // 根据媒体类型返回不同的样式
  const getMediaTypeStyle = (type?: string) => {
    if (!type)
      return "bg-neutral-100 dark:bg-neutral-900/30 text-neutral-800 dark:text-neutral-300";

    const lowerType = type.toLowerCase();
    if (lowerType.includes("json")) {
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
    }
    if (lowerType.includes("xml")) {
      return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
    }
    if (lowerType.includes("text")) {
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    }
    if (lowerType.includes("multipart")) {
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
    }
    if (lowerType.includes("binary") || lowerType.includes("octet-stream")) {
      return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
    return "bg-neutral-100 dark:bg-neutral-900/30 text-neutral-800 dark:text-neutral-300";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-1 rounded text-xs font-mono",
        getMediaTypeStyle(mediaType),
        className,
      )}
    >
      {mediaType || "unknown"}
    </div>
  );
});

MediaTypeDisplay.displayName = "MediaTypeDisplay";

export { MediaTypeDisplay };
