import { ComponentsObject, ReferenceObject, SchemaObject } from '@/types/openapi';
import { resolveRef } from './resolveRef';

/**
 * 根据OpenAPI Schema生成示例数据
 *
 * @param schema 要生成示例的Schema对象
 * @param components 引用解析所需的components
 * @param options 额外配置选项
 * @returns 生成的示例数据
 */
export function generateExample(
  schema: SchemaObject | ReferenceObject,
  components?: ComponentsObject,
  options: {
    maxDepth?: number;
    currentDepth?: number;
    includeReadOnly?: boolean;
    includeWriteOnly?: boolean;
  } = {}
): any {
  // 默认选项
  const {
    maxDepth = 3,
    currentDepth = 0,
    includeReadOnly = true,
    includeWriteOnly = true
  } = options;

  // 防止过深递归
  if (currentDepth > maxDepth) {
    return {};
  }

  // 解析引用
  let resolvedSchema: SchemaObject | null = null;
  if ('$ref' in schema) {
    resolvedSchema = resolveRef<SchemaObject>(schema, components, 'schemas');
    if (!resolvedSchema) {
      console.warn(`无法解析引用: ${schema.$ref}`);
      return {};
    }
  } else {
    resolvedSchema = schema;
  }

  // 如果提供了example，直接使用
  if (resolvedSchema.example !== undefined) {
    return resolvedSchema.example;
  }

  // 如果提供了default，使用默认值
  if (resolvedSchema.default !== undefined) {
    return resolvedSchema.default;
  }

  // 如果有enum，返回第一个枚举值
  if (resolvedSchema.enum && resolvedSchema.enum.length > 0) {
    return resolvedSchema.enum[0];
  }

  // 根据type生成示例
  const type = resolvedSchema.type;

  // 处理复合模式
  if (resolvedSchema.allOf && resolvedSchema.allOf.length > 0) {
    // 合并所有allOf模式
    const mergedExample = {};
    for (const subSchema of resolvedSchema.allOf) {
      const subExample = generateExample(subSchema, components, {
        ...options,
        currentDepth: currentDepth + 1
      });
      Object.assign(mergedExample, subExample);
    }
    return mergedExample;
  }

  if (resolvedSchema.oneOf && resolvedSchema.oneOf.length > 0) {
    // 使用第一个oneOf模式
    return generateExample(resolvedSchema.oneOf[0], components, {
      ...options,
      currentDepth: currentDepth + 1
    });
  }

  if (resolvedSchema.anyOf && resolvedSchema.anyOf.length > 0) {
    // 使用第一个anyOf模式
    return generateExample(resolvedSchema.anyOf[0], components, {
      ...options,
      currentDepth: currentDepth + 1
    });
  }

  // 根据类型处理
  switch (type) {
    case 'string': {
      // 为不同格式生成合适的字符串
      const format = resolvedSchema.format;
      if (format === 'date') {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (format === 'date-time') {
        return new Date().toISOString(); // YYYY-MM-DDThh:mm:ss.sssZ
      } else if (format === 'email') {
        return 'user@example.com';
      } else if (format === 'uuid') {
        return '123e4567-e89b-12d3-a456-426614174000';
      } else if (format === 'uri') {
        return 'https://example.com';
      } else if (format === 'url') {
        return 'https://example.com';
      } else if (format === 'hostname') {
        return 'example.com';
      } else if (format === 'ipv4') {
        return '192.168.0.1';
      } else if (format === 'ipv6') {
        return '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
      } else if (resolvedSchema.pattern) {
        // 对于有模式的，只返回一个简单的示例，而不尝试匹配正则
        return `示例(符合模式: ${resolvedSchema.pattern})`;
      } else {
        // 使用属性名作为示例
        return '示例字符串';
      }
    }

    case 'number':
    case 'integer': {
      // 处理数字范围
      if (resolvedSchema.minimum !== undefined && resolvedSchema.maximum !== undefined) {
        return resolvedSchema.minimum; // 使用最小值作为示例
      } else if (resolvedSchema.minimum !== undefined) {
        return resolvedSchema.minimum;
      } else if (resolvedSchema.maximum !== undefined) {
        return Math.min(resolvedSchema.maximum, 0); // 不超过最大值的示例
      } else {
        return type === 'integer' ? 0 : 0.0;
      }
    }

    case 'boolean':
      return false;

    case 'null':
      return null;

    case 'array': {
      // 检查items定义
      if (!resolvedSchema.items) {
        return [];
      }

      // 生成一个元素的数组作为示例
      const itemExample = generateExample(resolvedSchema.items, components, {
        ...options,
        currentDepth: currentDepth + 1
      });

      return [itemExample];
    }

    case 'object':
    default: {
      // 对于对象或未指定类型但有properties的情况
      const result: Record<string, any> = {};

      if (resolvedSchema.properties) {
        // 遍历所有属性
        for (const [propName, propSchema] of Object.entries(resolvedSchema.properties)) {
          // 跳过只读/只写属性（如果配置了）
          if (
            (propSchema as SchemaObject).readOnly && !includeReadOnly ||
            (propSchema as SchemaObject).writeOnly && !includeWriteOnly
          ) {
            continue;
          }

          // 递归生成属性值
          result[propName] = generateExample(propSchema, components, {
            ...options,
            currentDepth: currentDepth + 1
          });
        }
      }

      // 处理additionalProperties
      if (
        typeof resolvedSchema.additionalProperties === 'object' &&
        !Array.isArray(resolvedSchema.additionalProperties)
      ) {
        // 添加一个额外属性的示例
        result['additionalProp'] = generateExample(
          resolvedSchema.additionalProperties,
          components,
          {
            ...options,
            currentDepth: currentDepth + 1
          }
        );
      }

      return result;
    }
  }
}
