# Pivot - OpenAPI Component Library

一个基于 MagicUI 架构的现代化 OpenAPI 组件库，使用 Next.js 15 + App Router 和 shadcn/ui registry 系统构建。

## ✨ 特性

- 🎨 **现代化设计** - 基于 Tailwind CSS 的美观组件
- 🌙 **暗色模式** - 完整的暗色主题支持
- 📦 **模块化** - 通过 shadcn/ui CLI 按需安装组件
- 🔧 **TypeScript** - 完整的类型定义和类型安全
- ⚡ **高性能** - 基于 Next.js 15 的现代化架构
- 📱 **响应式** - 移动端友好的设计

## 🚀 快速开始

### 安装单个组件

```bash
# 安装状态码组件
npx shadcn@latest add http://localhost:3003/registry/status-code.json

# 安装方法标签组件
npx shadcn@latest add http://localhost:3003/registry/method-label.json

# 安装类型指示器组件
npx shadcn@latest add http://localhost:3003/registry/type-indicator.json
```

### 安装复杂组件（含依赖）

```bash
# 安装 API 信息展示区域（自动安装依赖）
npx shadcn@latest add http://localhost:3003/registry/info-section.json

# 安装服务器信息展示区域
npx shadcn@latest add http://localhost:3003/registry/servers-section.json
```

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd pivot

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建 registry
pnpm build:registry
```

## 📚 组件分类

### 🔹 原子组件 (registry/pivot/) - 27个

#### 状态和方法标识
- `status-code` - HTTP 状态码显示
- `method-label` - HTTP 方法标签

#### 数据类型指示器
- `type-indicator` - 数据类型指示器
- `format-badge` - 格式标识
- `style-badge` - 样式标识

#### 标识和标记
- `required-badge` - 必填标识
- `deprecated-badge` - 废弃标识
- `version-badge` - 版本标识
- `webhook-label` - Webhook 标签
- `required-marker` - 必填标记

#### 参数和位置
- `in-label` - 参数位置标识
- `parameter-name` - 参数名称
- `parameter-description` - 参数描述
- `path-segment` - 路径段

#### 值显示
- `value-display` - 通用值显示
- `default-value-display` - 默认值显示
- `const-value` - 常量值显示
- `enum-values` - 枚举值显示

#### 文档和描述
- `description-display` - 描述显示
- `section-title` - 章节标题
- `external-docs` - 外部文档链接

#### 安全认证
- `scheme-type` - 安全方案类型
- `oauth-flow` - OAuth 流程类型

#### 联系信息
- `contact-display` - 联系信息显示
- `license-display` - 许可证信息显示
- `terms-of-service` - 服务条款链接

#### 服务器信息
- `server-display` - 服务器信息显示

### 🔸 复杂组件 (registry/example/) - 7个

#### 信息展示组件
- `info-section` - API 信息展示区域
- `servers-section` - 服务器信息展示区域

#### 交互组件
- `copy-button` - 复制按钮
- `expand-collapse` - 展开/收起按钮

#### 选择器组件
- `media-type-selector` - 媒体类型选择器
- `component-tabs` - 组件标签页
- `parameter-group` - 参数分组显示

## 💻 使用示例

### 基础组件使用

```tsx
import { StatusCode } from "@/components/pivot/status-code";
import { MethodLabel } from "@/components/pivot/method-label";
import { TypeIndicator } from "@/components/pivot/type-indicator";

export function ApiEndpoint() {
  return (
    <div className="flex items-center gap-2">
      <MethodLabel method="GET" />
      <span>/api/users</span>
      <StatusCode code={200} />
      <TypeIndicator type="object" />
    </div>
  );
}
```

### 复杂组件使用

```tsx
import { InfoSection } from "@/components/example/info-section";

export function ApiDocumentation() {
  return (
    <InfoSection
      info={{
        title: "Pet Store API",
        version: "1.0.0",
        description: "This is a sample Pet Store Server",
        contact: {
          name: "API Support",
          email: "support@example.com"
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT"
        }
      }}
    />
  );
}
```

## 🛠️ 技术栈

- **框架**: Next.js 15 + App Router
- **样式**: Tailwind CSS
- **组件系统**: shadcn/ui registry
- **类型**: TypeScript
- **包管理**: pnpm
- **文档**: content-collections + MDX

## 📖 文档

- **在线演示**: http://localhost:3003/test
- **组件文档**: `/content/docs/components/`
- **API 参考**: 每个组件都包含完整的 TypeScript 类型定义

## 🎯 设计原则

### 组件规范
- 使用 `React.forwardRef` 处理 ref 传递
- 统一的 `className` prop 支持
- 使用 `cn()` 工具函数合并样式
- 完整的 TypeScript 类型定义
- 支持暗色模式

### 依赖管理
- 最小化外部依赖
- 组件间依赖关系清晰
- 支持按需加载

## 🔧 开发指南

### 添加新组件

1. 在 `registry/pivot/` 或 `registry/example/` 中创建组件
2. 在对应的 registry 文件中注册组件
3. 运行 `pnpm build:registry` 构建
4. 在测试页面中添加示例

### 组件命名规范

- 文件名使用 kebab-case（如：`status-code.tsx`）
- 组件名使用 PascalCase（如：`StatusCode`）
- 导出格式：`export { ComponentName }`

## 📊 项目状态

- ✅ **基础架构**: 完成
- ✅ **Registry 系统**: 运行正常
- ✅ **核心组件**: 34个已迁移
- 🔄 **剩余组件**: 约40个待迁移
- 📈 **迁移进度**: ~46% (34/74)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件。

---

**Pivot** - 让 OpenAPI 文档更美观、更易用 ✨
