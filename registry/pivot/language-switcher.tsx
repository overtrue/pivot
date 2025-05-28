"use client";

import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import React, { useState } from "react";

interface LanguageSwitcherProps {
  className?: string;
  onLanguageChange?: (language: string) => void;
}

const LanguageSwitcher = React.forwardRef<
  HTMLButtonElement,
  LanguageSwitcherProps
>(({ className, onLanguageChange }, ref) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "zh" : "en";
    setCurrentLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <button
      ref={ref}
      onClick={toggleLanguage}
      className={cn(
        "flex items-center px-3 py-1.5 text-sm text-white hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-colors rounded-md",
        className,
      )}
      aria-label="Switch Language"
    >
      <Globe className="w-4 h-4 mr-1.5" />
      {currentLanguage === "en" ? "中文" : "English"}
    </button>
  );
});

LanguageSwitcher.displayName = "LanguageSwitcher";

export { LanguageSwitcher };
