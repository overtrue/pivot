# 组件最佳实践指南

## 核心原则

### 1. 组件应该是纯净和无状态的
- 组件不应该包含过度的容错处理
- 数据验证应该由调用方负责
- 组件专注于渲染逻辑，而不是数据处理

### 2. 使用严格的 TypeScript 类型定义
- 必需的 props 不应该标记为可选
- 使用具体的类型而不是 `any`
- 通过类型系统确保数据完整性

### 3. 避免不必要的可选链操作符
- 如果数据是必需的，在类型中明确定义
- 只在真正可选的字段上使用可选链
- 让 TypeScript 帮助你发现潜在问题

## 重构前后对比

### ❌ 错误做法

```typescript
interface ParameterItemProps {
  name: string;
  schema?: SchemaObject; // schema 实际上是必需的
}

const ParameterItem = ({ name, schema }: ParameterItemProps) => {
  // 过度的容错处理
  const hasDetails =
    schema?.default !== undefined ||
    schema?.enum ||
    schema?.minimum !== undefined;

  return (
    <div>
      {schema?.type && <TypeIndicator type={schema.type} />}
    </div>
  );
};
```

### ✅ 正确做法

```typescript
interface SchemaObject {
  type: string; // 明确必需字段
  format?: string; // 真正可选的字段
  default?: any;
  enum?: any[];
}

interface ParameterItemProps {
  name: string;
  schema: SchemaObject; // 明确必需
}

const ParameterItem = ({ name, schema }: ParameterItemProps) => {
  // 清晰的逻辑，无需容错
  const hasDetails =
    schema.default !== undefined ||
    schema.enum ||
    schema.minimum !== undefined;

  return (
    <div>
      <TypeIndicator type={schema.type} />
      {schema.format && <FormatBadge format={schema.format} />}
    </div>
  );
};
```

## 何时使用可选链

### ✅ 合理使用场景

1. **真正可选的字段**
```typescript
interface MediaTypeObject {
  schema?: any; // OpenAPI 规范中确实是可选的
  example?: any;
}

// 这里使用可选链是合理的
{mediaTypeObj.schema && <SchemaDisplay schema={mediaTypeObj.schema} />}
```

2. **回调函数**
```typescript
interface Props {
  onThemeChange?: (theme: string) => void;
}

// 回调函数确实可能不存在
onThemeChange?.(newTheme);
```

### ❌ 不合理使用场景

1. **必需的数据结构**
```typescript
// 错误：如果 schema 是必需的，不应该用可选链
{schema?.type && <TypeIndicator type={schema.type} />}

// 正确：直接使用
<TypeIndicator type={schema.type} />
```

2. **过度防御性编程**
```typescript
// 错误：如果 headers 是必需的，不应该这样检查
if (!headers || Object.keys(headers).length === 0) return null;

// 正确：相信类型系统
const headerEntries = Object.entries(headers);
if (headerEntries.length === 0) return null;
```

## 类型定义最佳实践

### 1. 明确区分必需和可选字段

```typescript
// 好的类型定义
interface SchemaObject {
  type: string;           // 必需
  format?: string;        // 可选
  description?: string;   // 可选
  default?: any;          // 可选
}
```

### 2. 使用具体的联合类型

```typescript
// 好的做法
type ParameterLocation = "query" | "header" | "path" | "cookie";

// 避免
type ParameterLocation = string;
```

### 3. 为复杂对象定义接口

```typescript
// 好的做法
interface MediaTypeObject {
  schema?: SchemaObject;
  example?: any;
  examples?: Record<string, ExampleObject>;
}

// 避免
content: Record<string, any>;
```

## 组件职责分离

### 组件应该专注于：
- 渲染 UI
- 处理用户交互
- 管理内部状态（如展开/折叠）

### 组件不应该：
- 验证外部数据
- 处理复杂的业务逻辑
- 进行过度的错误处理

### 数据验证应该在：
- 数据获取层
- 父组件
- 自定义 hooks
- 工具函数

## 总结

通过遵循这些最佳实践，我们可以创建：
- 更可靠的组件
- 更好的开发体验
- 更容易维护的代码
- 更清晰的错误信息

记住：**让 TypeScript 为你工作，而不是与它对抗**。
