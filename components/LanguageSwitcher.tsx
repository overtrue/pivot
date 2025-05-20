import { useI18n } from '@/lib/i18n/I18nProvider';
import React from 'react';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'zh' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-1.5 text-xs rounded-md transition-colors bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200"
    >
      {locale === 'en' ? '中文' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
