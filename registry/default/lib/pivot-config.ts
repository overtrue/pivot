import type { OpenAPIV3 } from 'openapi-types';

/**
 * Pivot component library configuration interface
 */
export interface PivotConfig {
  // Theme configuration
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
  
  // Feature toggles
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
  
  // Localization configuration
  locale?: 'en' | 'zh' | 'ja' | 'es' | 'fr' | 'de';
  translations?: Record<string, string>;
  
  // Styling configuration
  styling?: {
    prefix?: string;           // Tailwind class prefix
    container?: string;         // Container class name
    isolated?: boolean;         // Style isolation
    customCSS?: string;        // Custom CSS
    cssVariables?: Record<string, string>; // CSS variables
  };
  
  // Data resolver configuration
  resolver?: {
    cache?: boolean;
    maxCacheSize?: number;
    timeout?: number;
    retries?: number;
    headers?: Record<string, string>;
  };
  
  // Rendering configuration
  rendering?: {
    virtual?: boolean;          // Virtual scrolling
    lazy?: boolean;            // Lazy loading
    maxItems?: number;         // Max display items
    defaultExpanded?: boolean; // Default expanded state
    animations?: boolean;      // Animation effects
  };
  
  // Layout configuration
  layout?: {
    type?: 'documentation' | 'portal' | 'compact' | 'embedded' | 'custom';
    sidebar?: boolean;
    header?: boolean;
    footer?: boolean;
    navigation?: 'sidebar' | 'tabs' | 'none';
  };
  
  // Code generation configuration
  codeGeneration?: {
    languages?: string[];
    defaultLanguage?: string;
    templates?: Record<string, string>;
  };
  
  // Callback functions
  callbacks?: {
    onOperationSelect?: (operation: OperationInfo) => void;
    onTryItOut?: (request: RequestInfo) => void;
    onCodeGenerate?: (code: string, language: string) => void;
    onError?: (error: Error) => void;
  };
}

/**
 * Operation information interface
 */
export interface OperationInfo {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
}

/**
 * Request information interface
 */
export interface RequestInfo {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  query?: Record<string, string>;
}

/**
 * Default configuration
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
 * Merge configurations
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
 * Validate configuration
 */
export function validateConfig(config: PivotConfig): string[] {
  const errors: string[] = [];
  
  // Validate theme
  if (config.theme?.mode && !['light', 'dark', 'system'].includes(config.theme.mode)) {
    errors.push(`Invalid theme mode: ${config.theme.mode}`);
  }
  
  // Validate locale
  if (config.locale && !['en', 'zh', 'ja', 'es', 'fr', 'de'].includes(config.locale)) {
    errors.push(`Unsupported locale: ${config.locale}`);
  }
  
  // Validate layout
  if (config.layout?.type && !['documentation', 'portal', 'compact', 'embedded', 'custom'].includes(config.layout.type)) {
    errors.push(`Invalid layout type: ${config.layout.type}`);
  }
  
  return errors;
}