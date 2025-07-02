// 导出所有 i18n 相关的功能
export { createTranslator, I18nProvider, t, useI18n } from './I18nProvider';
export type { default as EnLocale } from './locales/en';
export type { default as ZhLocale } from './locales/zh';

// 支持的语言类型
export type SupportedLocale = "en" | "zh";

// 翻译函数类型
export type TranslationFunction = (key: string) => string;
