// 导出所有 i18n 相关的功能
export { createTranslator, I18nProvider, t, useI18n } from "@/registry/default/ui/I18nProvider/I18nProvider";
export type { default as EnLocale } from "@/registry/default/ui/locales/en/locales/en";
export type { default as ZhLocale } from "@/registry/default/ui/locales/zh/locales/zh";

// 支持的语言类型
export type SupportedLocale = "en" | "zh";

// 翻译函数类型
export type TranslationFunction = (key: string) => string;
