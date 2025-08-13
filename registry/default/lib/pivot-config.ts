import type { OpenAPIV3 } from 'openapi-types';

/**
 * Pivot 组件库配置接口
 */
export interface PivotConfig {
  // 主题配置
  theme?: {
    mode?: 'light' | 'dark' | 'system';
    colors?: {
      primary?: string;
      success?: string;
      warning?: string;
      error?: string;
      info?: string;
    };
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  };
  
  // 功能配置
  features?: {
    tryItOut?: boolean;
    codeGeneration?: boolean;
    search?: boolean;
    darkMode?: boolean;
    i18n?: boolean;
    authentication?: boolean;
    export?: boolean;
    versioning?: boolean;
  };
  
  // 语言配置
  locale?: 'en' | 'zh' | 'ja' | 'es' | 'fr' | 'de';
  translations?: Record<string, string>;
  
  // 样式配置
  styling?: {
    prefix?: string;           // Tailwind 类名前缀
    container?: string;         // 容器类名
    isolated?: boolean;         // 是否隔离样式
    customCSS?: string;        // 自定义 CSS
    cssVariables?: Record<string, string>; // CSS 变量
  };
  
  // 数据配置
  resolver?: {
    cache?: boolean;
    maxCacheSize?: number;
    timeout?: number;
    retries?: number;
    headers?: Record<string, string>;
  };
  
  // 渲染配置
  rendering?: {
    virtual?: boolean;          // 虚拟滚动
    lazy?: boolean;            // 懒加载
    maxItems?: number;         // 最大显示项数
    defaultExpanded?: boolean; // 默认展开状态
    animations?: boolean;      // 动画效果
  };
  
  // 布局配置
  layout?: {
    type?: 'documentation' | 'portal' | 'compact' | 'embedded' | 'custom';
    sidebar?: boolean;
    header?: boolean;
    footer?: boolean;
    navigation?: 'sidebar' | 'tabs' | 'none';
  };
  
  // 代码生成配置
  codeGeneration?: {
    languages?: string[];
    defaultLanguage?: string;
    templates?: Record<string, string>;
  };
  
  // 回调函数
  callbacks?: {
    onOperationSelect?: (operation: OperationInfo) => void;
    onTryItOut?: (request: RequestInfo) => void;
    onCodeGenerate?: (code: string, language: string) => void;
    onError?: (error: Error) => void;
  };
}

/**
 * 操作信息接口
 */
export interface OperationInfo {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
}

/**
 * 请求信息接口
 */
export interface RequestInfo {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  query?: Record<string, string>;
}

/**
 * 默认配置
 */
export const defaultConfig: Required<PivotConfig> = {
  theme: {
    mode: 'system',
    colors: {
      primary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#6366f1',
    },
    radius: 'md',
    fontSize: 'base',
  },
  features: {
    tryItOut: true,
    codeGeneration: true,
    search: true,
    darkMode: true,
    i18n: false,
    authentication: false,
    export: false,
    versioning: false,
  },
  locale: 'en',
  translations: {},
  styling: {
    prefix: '',
    container: '',
    isolated: false,
    customCSS: '',
    cssVariables: {},
  },
  resolver: {
    cache: true,
    maxCacheSize: 100,
    timeout: 5000,
    retries: 3,
    headers: {},
  },
  rendering: {
    virtual: false,
    lazy: true,
    maxItems: 100,
    defaultExpanded: false,
    animations: true,
  },
  layout: {
    type: 'documentation',
    sidebar: true,
    header: true,
    footer: false,
    navigation: 'sidebar',
  },
  codeGeneration: {
    languages: ['curl', 'javascript', 'python', 'php', 'go'],
    defaultLanguage: 'curl',
    templates: {},
  },
  callbacks: {
    onOperationSelect: undefined,
    onTryItOut: undefined,
    onCodeGenerate: undefined,
    onError: undefined,
  },
};

/**
 * 合并配置
 */
export function mergeConfig(
  userConfig: Partial<PivotConfig>,
  baseConfig: PivotConfig = defaultConfig
): PivotConfig {
  return {
    ...baseConfig,
    ...userConfig,
    theme: { ...baseConfig.theme, ...userConfig.theme },
    features: { ...baseConfig.features, ...userConfig.features },
    styling: { ...baseConfig.styling, ...userConfig.styling },
    resolver: { ...baseConfig.resolver, ...userConfig.resolver },
    rendering: { ...baseConfig.rendering, ...userConfig.rendering },
    layout: { ...baseConfig.layout, ...userConfig.layout },
    codeGeneration: { ...baseConfig.codeGeneration, ...userConfig.codeGeneration },
    callbacks: { ...baseConfig.callbacks, ...userConfig.callbacks },
  };
}

/**
 * 验证配置
 */
export function validateConfig(config: PivotConfig): string[] {
  const errors: string[] = [];
  
  // 验证主题
  if (config.theme?.mode && !['light', 'dark', 'system'].includes(config.theme.mode)) {
    errors.push(`Invalid theme mode: ${config.theme.mode}`);
  }
  
  // 验证语言
  if (config.locale && !['en', 'zh', 'ja', 'es', 'fr', 'de'].includes(config.locale)) {
    errors.push(`Unsupported locale: ${config.locale}`);
  }
  
  // 验证布局
  if (config.layout?.type && !['documentation', 'portal', 'compact', 'embedded', 'custom'].includes(config.layout.type)) {
    errors.push(`Invalid layout type: ${config.layout.type}`);
  }
  
  return errors;
}