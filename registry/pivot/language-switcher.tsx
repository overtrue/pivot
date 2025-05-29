"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import React from "react";

interface LanguageSwitcherProps {
  className?: string;
  onLanguageChange?: (language: string) => void;
}

const LanguageSwitcher = React.forwardRef<
  HTMLButtonElement,
  LanguageSwitcherProps
>(({ className, onLanguageChange }, ref) => {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    const newLanguage = locale === "en" ? "zh" : "en";
    setLocale(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <button
      ref={ref}
      onClick={toggleLanguage}
      className={cn(
        "flex items-center px-3 py-1.5 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors rounded-md",
        className,
      )}
      aria-label="Switch Language"
    >
      <Globe className="w-4 h-4 mr-1.5" />
      {locale === "en" ? "中文" : "English"}
    </button>
  );
});

LanguageSwitcher.displayName = "LanguageSwitcher";

export { LanguageSwitcher };
