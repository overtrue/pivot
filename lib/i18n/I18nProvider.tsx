'use client';

import React, { createContext, useContext, useState } from 'react';
import en from './locales/en';
import zh from './locales/zh';

const locales = { en, zh };

interface I18nContextProps {
  locale: 'en' | 'zh';
  setLocale: (locale: 'en' | 'zh') => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = locales[locale];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return value;
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
