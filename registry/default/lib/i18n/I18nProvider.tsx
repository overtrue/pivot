"use client";

import React, { createContext, useContext, useState } from "react";
import en from "@/registry/default/ui/locales/en/locales/en";
import zh from "@/registry/default/ui/locales/zh/locales/zh";

type LocaleStrings = Record<string, string>;
const locales: Record<string, LocaleStrings> = { en, zh };

interface I18nContextProps {
  locale: "en" | "zh";
  setLocale: (locale: "en" | "zh") => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<"en" | "zh">("en");

  const t = (key: string): string => {
    // 直接使用扁平结构查找，如果未找到则返回原key
    return locales[locale]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// 创建一个默认的翻译函数，使用英文作为默认语言
const createDefaultTranslator = (defaultLocale: "en" | "zh" = "en") => {
  return (key: string): string => {
    return locales[defaultLocale]?.[key] || key;
  };
};

// 重构后的 useI18n hook，支持在没有 provider 的情况下使用默认语言
export const useI18n = (): I18nContextProps => {
  const context = useContext(I18nContext);

  // 如果没有 provider，返回默认的 i18n 对象
  if (!context) {
    const defaultT = createDefaultTranslator("en");
    return {
      locale: "en",
      setLocale: () => {
        console.warn(
          "useI18n: setLocale called outside of I18nProvider. Language switching is not available.",
        );
      },
      t: defaultT,
    };
  }

  return context;
};

// 导出一个独立的翻译函数，可以在组件外部使用
export const t = createDefaultTranslator("en");

// 导出一个创建翻译函数的工厂函数
export const createTranslator = (locale: "en" | "zh" = "en") => {
  return createDefaultTranslator(locale);
};
