# Pivot

一个现代化的 OpenAPI 组件库，使用 Next.js 15 + App Router 和 shadcn/ui registry 系统构建。

## 特性

- 🎨 **现代化设计** - 基于 Tailwind CSS 和 shadcn/ui 设计系统
- 📱 **响应式布局** - 完美适配各种屏幕尺寸
- 🔧 **TypeScript 支持** - 完整的类型定义和智能提示
- 📦 **组件化架构** - 可复制粘贴的独立组件
- 🚀 **高性能** - 基于 Next.js 15 和 React 18
- 🎯 **专为 OpenAPI** - 针对 API 文档场景优化

## 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/pivot.git

# 安装依赖
cd pivot
pnpm install

# 启动开发服务器
pnpm dev
```

## 项目结构

```
pivot/
├── app/                    # Next.js App Router 页面
├── components/             # 网站 UI 组件
├── registry/               # 可发布的组件源码
│   ├── pivot/             # 核心组件
│   └── example/           # 示例组件
├── content/               # MDX 文档内容
├── lib/                   # 工具函数
└── styles/                # 全局样式
```

## 组件使用

所有组件都支持复制粘贴使用：

1. 浏览组件文档
2. 复制组件代码
3. 粘贴到你的项目中
4. 根据需要调整样式和功能

## 开发指南

### 添加新组件

1. 在 `registry/pivot/` 中创建组件文件
2. 在 `registry/example/` 中创建示例文件
3. 更新 `registry.json` 配置
4. 添加文档说明

### 构建和部署

```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
