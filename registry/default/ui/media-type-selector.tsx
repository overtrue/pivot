"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/default/lib/i18n";
import React from "react";

interface MediaTypeSelectorProps {
  mediaTypes?: string[];
  activeMediaType: string | null;
  onSelectMediaType: (mediaType: string) => void;
  className?: string;
}

const MediaTypeSelector = React.forwardRef<
  HTMLDivElement,
  MediaTypeSelectorProps
>(({ mediaTypes, activeMediaType, onSelectMediaType, className }, ref) => {
  const { t } = useI18n();

  if (!mediaTypes || mediaTypes.length <= 1) {
    return null; // Don't render tabs if only one or zero media types
  }

  const handleClick = (e: React.MouseEvent, mediaType: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(t("Switching media type to: %s").replace("%s", mediaType));
    onSelectMediaType(mediaType);
  };

  return (
    <div
      ref={ref}
      className={cn("mb-2 border-b dark:border-neutral-700", className)}
    >
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center z-10">
        {mediaTypes.map((mediaType) => (
          <li key={mediaType} className="mr-2">
            <button
              onClick={(e) => handleClick(e, mediaType)}
              className={cn(
                "inline-block p-2 border-b-2 rounded-t-lg",
                activeMediaType === mediaType
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "border-transparent hover:text-neutral-600 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600",
              )}
              type="button"
            >
              {mediaType}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

MediaTypeSelector.displayName = "MediaTypeSelector";

export { MediaTypeSelector };
