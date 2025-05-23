import React, { createContext, useContext, useState } from 'react';
import en from './locales/en';
import zh from './locales/zh';

type LocaleStrings = Record<string, string>;
const locales: Record<string, LocaleStrings> = { en, zh };

interface I18nContextProps {
  locale: 'en' | 'zh';
  setLocale: (locale: 'en' | 'zh') => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  const t = (key: string): string => {
    // 直接使用扁平结构查找，如果未找到则返回原key
    return locales[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextProps => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
