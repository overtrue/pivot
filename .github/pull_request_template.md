# Pull Request

## 📝 变更描述

请简要描述此PR的变更内容：

## 🔄 代码复用检查 (必填)

请确认以下项目已经检查：

### ✅ 现有资源使用检查
- [ ] 已检查 `hooks/` 目录，确认没有重复实现现有功能
- [ ] 已检查 `utils/` 目录，确认使用了现有工具函数
- [ ] 已检查 `lib/` 目录，确认使用了现有库函数
- [ ] 没有重复定义 `resolveRef()` 函数（使用 `@/utils/resolveRef`）
- [ ] 没有重复定义 `getOperationsByTag()` 函数（使用 `useOpenApi` hook）
- [ ] 正确使用 `cn()` 函数处理样式类名

### 🚫 禁止行为检查
- [ ] 没有在组件内直接处理 OpenAPI 规范（使用 `useOpenApi` hook）
- [ ] 没有手动拼接样式类名（使用 `cn()` 函数）
- [ ] 没有重复实现已有的工具函数

### 📚 导入检查
- [ ] 正确导入并使用 `useOpenApi` hook
- [ ] 正确导入并使用 `@/utils/resolveRef`
- [ ] 正确导入并使用 `@/lib/utils` 中的 `cn()`

## 🧪 测试

- [ ] 本地构建成功 (`npm run build`)
- [ ] Registry 构建成功 (`npm run build:registry`)
- [ ] 代码质量检查通过 (`npm run check:duplicates`)
- [ ] 类型检查通过 (`npx tsc --noEmit`)

## 📋 组件发布 (如适用)

如果这是新组件，请确认：
- [ ] 组件已在 `registry.json` 中注册
- [ ] 组件有对应的 demo 文件 (`*-demo.tsx`)
- [ ] 组件有对应的文档文件 (`*.mdx`)
- [ ] 组件遵循命名规范 (kebab-case 文件名，PascalCase 组件名)

## 📖 参考文档

- [开发指南](./DEVELOPMENT_GUIDELINES.md)
- [.cursorrules](./.cursorrules) - Cursor 编辑器规范

## 📸 截图 (如适用)

如果是 UI 变更，请提供前后对比截图。

---

> 💡 **提醒**: 请确保遵循代码复用优先原则，优先使用现有的 hooks 和工具函数！
