import { default as React } from "react";

interface I18nContextProps {
  locale: "en" | "zh";
  setLocale: (locale: "en" | "zh") => void;
  t: (key: string) => string;
}
export declare const I18nProvider: React.FC<{
  children: React.ReactNode;
}>;
export declare const useI18n: () => I18nContextProps;
export {};
