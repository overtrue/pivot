import { useI18n } from "@/lib/i18n/I18nProvider";
import { Globe } from "lucide-react";
import React from "react";

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-1.5 text-sm text-white hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-colors rounded-md"
      aria-label="切换语言"
    >
      <Globe className="w-4 h-4 mr-1.5" />
      {locale === "en" ? "中文" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
