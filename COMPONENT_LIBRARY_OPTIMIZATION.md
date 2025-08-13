# 🎯 OpenAPI 组件库优化方案

## 📚 当前状态分析

作为一个基于 shadcn registry 的 OpenAPI 组件库，当前实现存在以下需要优化的方面：

### 现有问题

1. **强依赖性**：组件间依赖关系复杂，难以单独使用
2. **配置困难**：缺少开箱即用的默认配置
3. **状态耦合**：组件内部状态管理与外部项目可能冲突
4. **样式侵入**：Tailwind 类名可能与宿主项目冲突
5. **体积过大**：引入单个组件可能带入大量依赖

## 🚀 优化方案

### 1. 组件分层架构

```typescript
// 建议的组件层级结构
pivot/
├── primitives/        // 原子组件（无依赖）
│   ├── StatusCode
│   ├── MethodLabel
│   └── OperationPath
├── compounds/         // 复合组件（最小依赖）
│   ├── ResponseItem
│   ├── ParameterItem
│   └── SchemaDisplay
├── sections/          // 区块组件（中等依赖）
│   ├── ResponsesSection
│   ├── ParametersSection
│   └── RequestBodySection
├── layouts/           // 布局组件（完整功能）
│   ├── OperationDetail
│   └── OperationListLayout
└── providers/         // 上下文提供者
    ├── OpenAPIProvider
    └── PivotConfigProvider
```

### 2. 独立的配置系统

创建 `pivot-config.ts`：

```typescript
import type { OpenAPIV3 } from 'openapi-types';

export interface PivotConfig {
  // 主题配置
  theme?: {
    mode?: 'light' | 'dark' | 'system';
    colors?: {
      primary?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  };
  
  // 功能配置
  features?: {
    tryItOut?: boolean;
    codeGeneration?: boolean;
    search?: boolean;
    darkMode?: boolean;
    i18n?: boolean;
  };
  
  // 语言配置
  locale?: 'en' | 'zh' | 'ja' | 'es';
  translations?: Record<string, string>;
  
  // 样式配置
  styling?: {
    prefix?: string;  // Tailwind 前缀
    container?: string;  // 容器类名
    isolated?: boolean;  // 样式隔离
  };
  
  // 数据配置
  resolver?: {
    cache?: boolean;
    maxCacheSize?: number;
    timeout?: number;
  };
  
  // 渲染配置
  rendering?: {
    virtual?: boolean;  // 虚拟滚动
    lazy?: boolean;     // 懒加载
    maxItems?: number;  // 最大显示项
  };
}

// 默认配置
export const defaultConfig: PivotConfig = {
  theme: {
    mode: 'system',
    radius: 'md',
  },
  features: {
    tryItOut: true,
    codeGeneration: true,
    search: true,
    darkMode: true,
    i18n: false,
  },
  locale: 'en',
  styling: {
    isolated: false,
  },
  resolver: {
    cache: true,
    maxCacheSize: 100,
    timeout: 5000,
  },
  rendering: {
    virtual: false,
    lazy: true,
    maxItems: 100,
  },
};
```

### 3. 独立使用方案

#### 3.1 最小化安装

```bash
# 只安装核心组件
npx shadcn@latest add pivot-core

# 安装特定组件
npx shadcn@latest add pivot-response-viewer
npx shadcn@latest add pivot-operation-detail
```

#### 3.2 独立组件导出

```typescript
// components/pivot/standalone.tsx
import React from 'react';
import type { OpenAPIV3 } from 'openapi-types';

// 独立的响应查看器
export function ResponseViewer({
  responses,
  spec,
  config,
}: {
  responses: OpenAPIV3.ResponsesObject;
  spec?: OpenAPIV3.Document;
  config?: Partial<PivotConfig>;
}) {
  // 内部处理所有依赖
  const internalConfig = { ...defaultConfig, ...config };
  
  return (
    <PivotConfigProvider config={internalConfig}>
      <ResponsesSection responses={responses} spec={spec} />
    </PivotConfigProvider>
  );
}

// 独立的操作详情查看器
export function OperationViewer({
  operation,
  path,
  method,
  spec,
  config,
}: {
  operation: OpenAPIV3.OperationObject;
  path: string;
  method: string;
  spec?: OpenAPIV3.Document;
  config?: Partial<PivotConfig>;
}) {
  const internalConfig = { ...defaultConfig, ...config };
  
  return (
    <PivotConfigProvider config={internalConfig}>
      <OperationDetail 
        operation={operation}
        path={path}
        method={method}
        components={spec?.components}
      />
    </PivotConfigProvider>
  );
}
```

### 4. 样式隔离方案

#### 4.1 CSS Modules 支持

```typescript
// components/pivot/styles/response-viewer.module.css
.container {
  @apply p-4 border rounded-lg;
}

.header {
  @apply flex items-center justify-between mb-4;
}

/* 使用 CSS 变量而非硬编码颜色 */
.statusCode {
  color: var(--pivot-primary, theme('colors.blue.500'));
  background: var(--pivot-primary-bg, theme('colors.blue.50'));
}
```

#### 4.2 Shadow DOM 隔离（可选）

```typescript
// components/pivot/isolated-wrapper.tsx
export function IsolatedWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current && !ref.current.shadowRoot) {
      const shadow = ref.current.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = isolatedStyles; // 预编译的样式
      shadow.appendChild(style);
    }
  }, []);
  
  return <div ref={ref}>{children}</div>;
}
```

### 5. 零配置使用

```typescript
// 最简单的使用方式
import { OpenAPIViewer } from '@overtrue/pivot';

function App() {
  return (
    <OpenAPIViewer 
      url="https://petstore.swagger.io/v2/swagger.json"
    />
  );
}

// 带配置的使用
function AppWithConfig() {
  return (
    <OpenAPIViewer 
      url="https://api.example.com/openapi.json"
      config={{
        theme: { mode: 'dark' },
        features: { tryItOut: false },
        locale: 'zh',
      }}
    />
  );
}
```

### 6. 插件系统

```typescript
// 插件接口
export interface PivotPlugin {
  name: string;
  version: string;
  install: (pivot: PivotCore) => void;
}

// 核心类
export class PivotCore {
  private plugins: Map<string, PivotPlugin> = new Map();
  
  use(plugin: PivotPlugin) {
    if (!this.plugins.has(plugin.name)) {
      plugin.install(this);
      this.plugins.set(plugin.name, plugin);
    }
    return this;
  }
  
  // 扩展点
  registerComponent(name: string, component: React.ComponentType) {}
  registerGenerator(language: string, generator: CodeGenerator) {}
  registerTheme(name: string, theme: ThemeConfig) {}
}

// 使用插件
const pivot = new PivotCore();
pivot
  .use(pythonGeneratorPlugin)
  .use(graphqlPlugin)
  .use(customThemePlugin);
```

### 7. 适配器模式

为不同框架提供适配器：

```typescript
// adapters/react.tsx
export { OpenAPIViewer } from '../components/viewer';

// adapters/vue.tsx
import { createApp } from 'vue';
import { OpenAPIViewer } from '../components/viewer';

export function createVueOpenAPIViewer(props) {
  return {
    mount(el: HTMLElement) {
      const app = createApp({
        render() {
          return <OpenAPIViewer {...props} />;
        }
      });
      app.mount(el);
    }
  };
}

// adapters/vanilla.ts
export function createOpenAPIViewer(container: HTMLElement, props: any) {
  const root = createRoot(container);
  root.render(<OpenAPIViewer {...props} />);
  return {
    update: (newProps) => root.render(<OpenAPIViewer {...newProps} />),
    destroy: () => root.unmount(),
  };
}
```

### 8. 按需加载

```typescript
// components/pivot/lazy-components.tsx
import { lazy, Suspense } from 'react';

// 懒加载大型组件
const TryItOutPanel = lazy(() => import('./try-it-out-panel'));
const CodeGenerator = lazy(() => import('./code-generator'));
const SchemaViewer = lazy(() => import('./schema-viewer'));

export function LazyTryItOut(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TryItOutPanel {...props} />
    </Suspense>
  );
}
```

### 9. 类型导出优化

```typescript
// types/index.ts
// 导出所有必要的类型，方便用户使用
export type {
  // 配置类型
  PivotConfig,
  PivotTheme,
  PivotFeatures,
  
  // 组件属性类型
  OpenAPIViewerProps,
  OperationDetailProps,
  ResponseViewerProps,
  
  // 工具类型
  RefResolver,
  CodeGenerator,
  
  // OpenAPI 类型（重新导出）
  OpenAPIDocument,
  OpenAPIOperation,
  OpenAPIResponse,
} from './types';

// 导出工具函数
export {
  resolveRef,
  isReferenceObject,
  generateExample,
  formatCode,
} from './utils';
```

### 10. 使用示例优化

创建更实用的示例：

```typescript
// examples/nextjs-app/page.tsx
import { OpenAPIViewer } from '@overtrue/pivot';

export default function APIDocumentation() {
  return (
    <OpenAPIViewer
      url="/api/openapi.json"
      config={{
        features: {
          tryItOut: true,
          codeGeneration: true,
        },
        theme: {
          mode: 'dark',
        },
      }}
      onOperationSelect={(operation) => {
        // 追踪 API 使用
        analytics.track('api_operation_viewed', {
          path: operation.path,
          method: operation.method,
        });
      }}
      customGenerators={{
        'axios': AxiosGenerator,
        'fetch': FetchGenerator,
      }}
    />
  );
}

// examples/standalone/index.html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@overtrue/pivot/dist/pivot.css">
</head>
<body>
  <div id="api-docs"></div>
  <script src="https://unpkg.com/@overtrue/pivot/dist/pivot.umd.js"></script>
  <script>
    Pivot.create('#api-docs', {
      url: 'https://api.example.com/openapi.json',
      config: {
        locale: 'zh',
      }
    });
  </script>
</body>
</html>
```

## 📦 发布策略

### 1. 多包发布

```json
{
  "packages": {
    "@overtrue/pivot": "完整版本",
    "@overtrue/pivot-core": "核心组件",
    "@overtrue/pivot-react": "React 适配器",
    "@overtrue/pivot-vue": "Vue 适配器",
    "@overtrue/pivot-themes": "主题包"
  }
}
```

### 2. CDN 支持

```html
<!-- 通过 CDN 使用 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@overtrue/pivot/dist/pivot.min.css">
<script src="https://cdn.jsdelivr.net/npm/@overtrue/pivot/dist/pivot.min.js"></script>
```

### 3. 版本兼容性

```typescript
// 版本检查
export function checkCompatibility() {
  const reactVersion = React.version;
  const majorVersion = parseInt(reactVersion.split('.')[0]);
  
  if (majorVersion < 16) {
    console.warn('Pivot requires React 16.8 or higher');
  }
  
  return {
    react: majorVersion >= 16,
    hooks: majorVersion >= 16 && parseInt(reactVersion.split('.')[1]) >= 8,
  };
}
```

## 🎯 使用场景优化

### 1. API 文档站点
```typescript
<OpenAPIViewer 
  url="/openapi.json"
  layout="documentation"
  features={{ search: true, versioning: true }}
/>
```

### 2. 开发者门户
```typescript
<OpenAPIViewer 
  url="/openapi.json"
  layout="portal"
  features={{ tryItOut: true, authentication: true }}
/>
```

### 3. 内部工具
```typescript
<OpenAPIViewer 
  url="/openapi.json"
  layout="compact"
  features={{ codeGeneration: true, export: true }}
/>
```

### 4. 嵌入式文档
```typescript
<OpenAPIViewer 
  spec={embeddedSpec}
  layout="embedded"
  height="600px"
/>
```

## 📊 性能指标

- 首次加载: < 50KB (gzipped)
- 交互响应: < 100ms
- 内存占用: < 50MB
- 支持规范大小: > 10MB

## 🔄 迁移路径

为现有用户提供平滑迁移路径：

```typescript
// v1 兼容层
export { OperationDetailedLayout as OperationDetail } from './v2/components';

// 迁移工具
npx @overtrue/pivot migrate --from v1 --to v2
```