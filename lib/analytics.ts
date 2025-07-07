import { env } from "@/env.mjs";

// Google Analytics 事件追踪
export const gtag = (...args: unknown[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
};

// 追踪页面浏览
export const trackPageView = (url: string) => {
  gtag("config", env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

// 追踪事件
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// 追踪组件复制事件
export const trackComponentCopy = (componentName: string) => {
  trackEvent("copy_component", "component", componentName);
};

// 追踪代码生成事件
export const trackCodeGeneration = (language: string, operation: string) => {
  trackEvent("generate_code", "codegen", `${language}_${operation}`);
};

// 追踪文档查看事件
export const trackDocumentView = (documentPath: string) => {
  trackEvent("view_document", "documentation", documentPath);
};

// 扩展 Window 接口以包含 gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
