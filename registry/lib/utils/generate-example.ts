import { resolveRef } from "@/registry/lib/utils/resolve-ref";
import { faker } from '@faker-js/faker';
import type { OpenAPIV3 } from 'openapi-types';

// 配置 faker.js
// 注意：@faker-js/faker 8.x 版本不再支持 setLocale，使用默认语言

/**
 * 根据OpenAPI Schema生成示例数据
 *
 * @param schema 要生成示例的Schema对象
 * @param components 引用解析所需的components
 * @param options 额外配置选项
 * @returns 生成的示例数据
 */
export function generateExample(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  components?: OpenAPIV3.ComponentsObject,
  options: {
    maxDepth?: number;
    currentDepth?: number;
    includeReadOnly?: boolean;
    includeWriteOnly?: boolean;
  } = {},
): any {
  // 默认选项
  const {
    maxDepth = 3,
    currentDepth = 0,
    includeReadOnly = true,
    includeWriteOnly = true,
  } = options;

  // 防止过深递归
  if (currentDepth > maxDepth) {
    return {};
  }

  // 解析引用
  let resolvedSchema: OpenAPIV3.SchemaObject | null = null;
  if ("$ref" in schema) {
    resolvedSchema = resolveRef<OpenAPIV3.SchemaObject>(schema, components, "schemas");
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
        currentDepth: currentDepth + 1,
      });
      Object.assign(mergedExample, subExample);
    }
    return mergedExample;
  }

  if (resolvedSchema.oneOf && resolvedSchema.oneOf.length > 0) {
    // 使用第一个oneOf模式
    const firstSchema = resolvedSchema.oneOf[0];
    if (firstSchema) {
      return generateExample(firstSchema, components, {
        ...options,
        currentDepth: currentDepth + 1,
      });
    }
  }

  if (resolvedSchema.anyOf && resolvedSchema.anyOf.length > 0) {
    // 使用第一个anyOf模式
    const firstSchema = resolvedSchema.anyOf[0];
    if (firstSchema) {
      return generateExample(firstSchema, components, {
        ...options,
        currentDepth: currentDepth + 1,
      });
    }
  }

  // 根据类型处理
  switch (type) {
    case "string": {
      // 为不同格式生成合适的字符串
      const format = resolvedSchema.format;
      const propName = resolvedSchema.title || '';

      if (format === "date") {
        return faker.date.recent({ days: 30 }).toISOString().split("T")[0]; // YYYY-MM-DD
      } else if (format === "date-time") {
        return faker.date.recent({ days: 30 }).toISOString(); // YYYY-MM-DDThh:mm:ss.sssZ
      } else if (format === "email") {
        return faker.internet.email();
      } else if (format === "uuid") {
        return faker.string.uuid();
      } else if (format === "uri" || format === "url") {
        return faker.internet.url();
      } else if (format === "hostname") {
        return faker.internet.domainName();
      } else if (format === "ipv4") {
        return faker.internet.ipv4();
      } else if (format === "ipv6") {
        return faker.internet.ipv6();
      } else if (format === "password") {
        return faker.internet.password({ length: 12 });
      } else if (format === "byte") {
        return faker.string.alphanumeric(8);
      } else if (format === "binary") {
        return faker.string.binary({ length: 16 });
      } else if (resolvedSchema.pattern) {
        // 对于有模式的，尝试生成符合模式的示例
        return `${faker.lorem.word()}_${faker.string.alphanumeric(6)}`;
      } else {
        // 根据属性名推断类型生成合适的示例
        const lowerPropName = propName.toLowerCase();

        // 基础信息类
        if (lowerPropName.includes('name') || lowerPropName.includes('title')) {
          return faker.person.fullName();
        } else if (lowerPropName.includes('email')) {
          return faker.internet.email();
        } else if (lowerPropName.includes('phone') || lowerPropName.includes('mobile') || lowerPropName.includes('tel')) {
          return faker.phone.number();
        } else if (lowerPropName.includes('username') || lowerPropName.includes('user_name')) {
          return faker.internet.userName();
        } else if (lowerPropName.includes('password') || lowerPropName.includes('passwd')) {
          return faker.internet.password({ length: 12 });
        }

        // 姓名相关
        else if (lowerPropName.includes('first') && (lowerPropName.includes('name') || lowerPropName.includes('_name'))) {
          return faker.person.firstName();
        } else if (lowerPropName.includes('last') && (lowerPropName.includes('name') || lowerPropName.includes('_name'))) {
          return faker.person.lastName();
        } else if (lowerPropName.includes('full') && lowerPropName.includes('name')) {
          return faker.person.fullName();
        } else if (lowerPropName.includes('middle') && lowerPropName.includes('name')) {
          return faker.person.middleName();
        }

        // 地址相关
        else if (lowerPropName.includes('address')) {
          return faker.location.streetAddress({ useFullAddress: true });
        } else if (lowerPropName.includes('street')) {
          return faker.location.street();
        } else if (lowerPropName.includes('city')) {
          return faker.location.city();
        } else if (lowerPropName.includes('state') || lowerPropName.includes('province')) {
          return faker.location.state();
        } else if (lowerPropName.includes('country')) {
          return faker.location.country();
        } else if (lowerPropName.includes('zip') || lowerPropName.includes('postal')) {
          return faker.location.zipCode();
        }

        // 公司相关
        else if (lowerPropName.includes('company') || lowerPropName.includes('organization')) {
          return faker.company.name();
        } else if (lowerPropName.includes('department')) {
          return faker.commerce.department();
        } else if (lowerPropName.includes('position') || lowerPropName.includes('job') || lowerPropName.includes('role')) {
          return faker.person.jobTitle();
        }

        // 网络相关
        else if (lowerPropName.includes('url') || lowerPropName.includes('website') || lowerPropName.includes('link')) {
          return faker.internet.url();
        } else if (lowerPropName.includes('domain')) {
          return faker.internet.domainName();
        } else if (lowerPropName.includes('ip')) {
          return faker.internet.ipv4();
        }

        // 媒体相关
        else if (lowerPropName.includes('avatar') || lowerPropName.includes('image') || lowerPropName.includes('photo')) {
          return faker.image.avatar();
        } else if (lowerPropName.includes('color') || lowerPropName.includes('colour')) {
          return faker.color.human();
        }

        // 商业相关
        else if (lowerPropName.includes('product')) {
          return faker.commerce.productName();
        } else if (lowerPropName.includes('price') || lowerPropName.includes('amount') || lowerPropName.includes('cost')) {
          return faker.commerce.price();
        } else if (lowerPropName.includes('currency')) {
          return faker.finance.currencyCode();
        } else if (lowerPropName.includes('sku') || lowerPropName.includes('code')) {
          return faker.string.alphanumeric(8).toUpperCase();
        }

        // 内容相关
        else if (lowerPropName.includes('description') || lowerPropName.includes('desc')) {
          return faker.lorem.sentence();
        } else if (lowerPropName.includes('comment') || lowerPropName.includes('note') || lowerPropName.includes('remark')) {
          return faker.lorem.sentence();
        } else if (lowerPropName.includes('content') || lowerPropName.includes('text') || lowerPropName.includes('body')) {
          return faker.lorem.paragraph();
        } else if (lowerPropName.includes('summary') || lowerPropName.includes('excerpt')) {
          return faker.lorem.sentence();
        }

        // 状态和分类
        else if (lowerPropName.includes('status')) {
          return faker.helpers.arrayElement(['active', 'inactive', 'pending', 'completed', 'draft', 'published']);
        } else if (lowerPropName.includes('type')) {
          return faker.helpers.arrayElement(['standard', 'premium', 'basic', 'advanced']);
        } else if (lowerPropName.includes('tag') || lowerPropName.includes('category')) {
          return faker.helpers.arrayElement(['technology', 'business', 'design', 'marketing', 'finance', 'education']);
        } else if (lowerPropName.includes('priority')) {
          return faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']);
        }

        // 个人信息
        else if (lowerPropName.includes('age')) {
          return faker.number.int({ min: 18, max: 80 }).toString();
        } else if (lowerPropName.includes('gender') || lowerPropName.includes('sex')) {
          return faker.person.gender();
        } else if (lowerPropName.includes('birthday') || lowerPropName.includes('birth')) {
          return faker.date.birthdate().toISOString().split('T')[0];
        }

        // ID 相关
        else if (lowerPropName.includes('id') && lowerPropName.length <= 5) {
          return faker.string.numeric(8);
        } else if (lowerPropName.includes('uuid') || lowerPropName.includes('guid')) {
          return faker.string.uuid();
        }

        // 其他常见字段
        else if (lowerPropName.includes('version')) {
          return faker.system.semver();
        } else if (lowerPropName.includes('count') || lowerPropName.includes('number') || lowerPropName.includes('num')) {
          return faker.number.int({ min: 1, max: 100 }).toString();
        } else if (lowerPropName.includes('size')) {
          return faker.helpers.arrayElement(['small', 'medium', 'large']);
        } else if (lowerPropName.includes('format')) {
          return faker.helpers.arrayElement(['json', 'xml', 'csv', 'pdf']);
        }

        else {
          // 默认生成随机词语
          return faker.lorem.words(2);
        }
      }
    }

    case "number":
    case "integer": {
      // 处理数字范围
      if (
        resolvedSchema.minimum !== undefined &&
        resolvedSchema.maximum !== undefined
      ) {
        const min = resolvedSchema.minimum;
        const max = resolvedSchema.maximum;
        return type === "integer"
          ? faker.number.int({ min, max })
          : faker.number.float({ min, max, fractionDigits: 2 });
      } else if (resolvedSchema.minimum !== undefined) {
        const min = resolvedSchema.minimum;
        const max = min + 1000;
        return type === "integer"
          ? faker.number.int({ min, max })
          : faker.number.float({ min, max, fractionDigits: 2 });
      } else if (resolvedSchema.maximum !== undefined) {
        const max = resolvedSchema.maximum;
        const min = Math.max(0, max - 1000);
        return type === "integer"
          ? faker.number.int({ min, max })
          : faker.number.float({ min, max, fractionDigits: 2 });
      } else {
        return type === "integer"
          ? faker.number.int({ min: 1, max: 100 })
          : faker.number.float({ min: 1, max: 100, fractionDigits: 2 });
      }
    }

    case "boolean":
      return faker.datatype.boolean();

    case "array": {
      // 检查items定义
      if (!resolvedSchema.items) {
        return [];
      }

      // 生成 1-3 个元素的数组作为示例
      const length = faker.number.int({ min: 1, max: 3 });
      const result = [];

      for (let i = 0; i < length; i++) {
        const itemExample = generateExample(resolvedSchema.items, components, {
          ...options,
          currentDepth: currentDepth + 1,
        });
        result.push(itemExample);
      }

      return result;
    }

    case "object":
    default: {
      // 对于对象或未指定类型但有properties的情况
      const result: Record<string, any> = {};

      if (resolvedSchema.properties) {
        // 遍历所有属性
        for (const [propName, propSchema] of Object.entries(
          resolvedSchema.properties,
        )) {
          // 跳过只读/只写属性（如果配置了）
          if (
            ((propSchema as OpenAPIV3.SchemaObject).readOnly && !includeReadOnly) ||
            ((propSchema as OpenAPIV3.SchemaObject).writeOnly && !includeWriteOnly)
          ) {
            continue;
          }

          // 创建增强的 schema，包含属性名信息用于智能推断
          const enhancedSchema = {
            ...(propSchema as OpenAPIV3.SchemaObject),
            title: (propSchema as OpenAPIV3.SchemaObject).title || propName,
          };

          // 递归生成属性值
          result[propName] = generateExample(enhancedSchema, components, {
            ...options,
            currentDepth: currentDepth + 1,
          });
        }
      }

      return result;
    }
  }
}
