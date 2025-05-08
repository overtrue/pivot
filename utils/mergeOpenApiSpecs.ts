import { ComponentsObject, OpenApiSpec } from '@/types/openapi';

/**
 * 合并多个 OpenAPI 规范文件
 * @param specs 要合并的 OpenAPI 规范对象数组
 * @param options 合并选项
 * @returns 合并后的 OpenAPI 规范对象
 */
export function mergeOpenApiSpecs(
  specs: OpenApiSpec[],
  options: {
    /**
     * 使用哪个规范的基本信息（默认使用第一个）
     */
    infoIndex?: number;
    /**
     * 路径冲突时的处理策略
     * - 'error': 抛出错误
     * - 'first': 使用第一个出现的定义
     * - 'last': 使用最后一个出现的定义
     */
    pathConflictStrategy?: 'error' | 'first' | 'last';
  } = {}
): OpenApiSpec {
  if (!specs || specs.length === 0) {
    throw new Error('至少需要一个 OpenAPI 规范进行合并');
  }

  const { infoIndex = 0, pathConflictStrategy = 'error' } = options;

  // 使用指定索引的基本信息
  const baseSpec = specs[infoIndex];

  // 初始化合并结果
  const result: OpenApiSpec = {
    openapi: baseSpec.openapi,
    info: { ...baseSpec.info },
    paths: {},
  };

  // 合并服务器列表
  const allServers = specs.flatMap(spec => spec.servers || []);
  if (allServers.length > 0) {
    result.servers = allServers;
  }

  // 合并标签，使用 Set 去重
  const tagsSet = new Set<string>();
  const allTags: any[] = [];

  specs.forEach(spec => {
    if (spec.tags) {
      spec.tags.forEach(tag => {
        if (!tagsSet.has(tag.name)) {
          tagsSet.add(tag.name);
          allTags.push(tag);
        }
      });
    }
  });

  if (allTags.length > 0) {
    result.tags = allTags;
  }

  // 合并外部文档
  let externalDocs = undefined;
  for (const spec of specs) {
    if (spec.externalDocs) {
      externalDocs = spec.externalDocs;
      break;
    }
  }
  if (externalDocs) {
    result.externalDocs = externalDocs;
  }

  // 合并安全定义
  const allSecurity: any[] = [];
  specs.forEach(spec => {
    if (spec.security) {
      allSecurity.push(...spec.security);
    }
  });
  if (allSecurity.length > 0) {
    result.security = allSecurity;
  }

  // 合并组件
  result.components = mergeComponents(specs);

  // 合并路径
  specs.forEach(spec => {
    if (spec.paths) {
      Object.entries(spec.paths).forEach(([path, pathItem]) => {
        if (result.paths[path]) {
          // 路径冲突处理
          if (pathConflictStrategy === 'error') {
            throw new Error(`路径冲突: ${path} 在多个规范中定义`);
          } else if (pathConflictStrategy === 'first') {
            // 保留第一个定义，不做任何事
          } else {  // 'last'
            // 使用最后出现的定义
            result.paths[path] = { ...pathItem };
          }
        } else {
          // 没有冲突，直接添加
          result.paths[path] = { ...pathItem };
        }
      });
    }
  });

  return result;
}

const componentTypes = [
  'schemas',
  'responses',
  'parameters',
  'examples',
  'requestBodies',
  'headers',
  'securitySchemes',
  'links',
  'callbacks'
];

// 合并组件
function mergeComponents(specs: OpenApiSpec[]): ComponentsObject {
  const result: ComponentsObject = {};

  for (const type of componentTypes) {
    const mergedComponents: Record<string, any> = {};

    for (const spec of specs) {
      if (spec.components && (spec.components as any)[type]) {
        Object.entries((spec.components as any)[type]).forEach(([key, value]) => {
          if (mergedComponents[key]) {
            console.warn(`重复的组件: ${type}.${key}，使用第一个定义`);
          } else {
            mergedComponents[key] = value;
          }
        });
      }
    }

    if (Object.keys(mergedComponents).length > 0) {
      (result as any)[type] = mergedComponents;
    }
  }

  return result;
}

/**
 * 使用示例：
 *
 * // 导入多个规范
 * import spec1 from './spec1.json';
 * import spec2 from './spec2.json';
 *
 * // 合并规范
 * const mergedSpec = mergeOpenApiSpecs([spec1, spec2], {
 *   pathConflictStrategy: 'last'
 * });
 */
