import type { OpenAPIV3 } from "openapi-types";

/**
 * 带缓存的 OpenAPI 引用解析器
 * 解决性能问题和循环引用问题
 */
export class RefResolver {
  private cache = new Map<string, any>();
  private resolving = new Set<string>();

  /**
   * 解析引用对象
   * @param obj 可能是引用对象的数据
   * @param components OpenAPI组件定义
   * @param category 可选的组件类别(schemas, parameters等)
   * @returns 解析后的对象或原始对象
   */
  resolve<T>(
    obj: T | OpenAPIV3.ReferenceObject | undefined,
    components?: OpenAPIV3.ComponentsObject,
    category?: string
  ): T | null {
    if (!obj) return null;

    // 如果不是对象，直接返回
    if (typeof obj !== "object" || obj === null) {
      return obj as T;
    }

    // 检查是否是引用对象
    if ("$ref" in obj) {
      const refObj = obj as OpenAPIV3.ReferenceObject;
      const refPath = refObj.$ref;

      // 检查缓存
      if (this.cache.has(refPath)) {
        return this.cache.get(refPath);
      }

      // 检查循环引用
      if (this.resolving.has(refPath)) {
        console.warn(`循环引用检测到: ${refPath}`);
        return null;
      }

      // 标记正在解析
      this.resolving.add(refPath);

      try {
        // 解析引用
        const resolved = this.resolveReference(refPath, components, category);
        
        if (resolved) {
          // 缓存结果
          this.cache.set(refPath, resolved);
        }

        return resolved as T | null;
      } finally {
        // 清除解析标记
        this.resolving.delete(refPath);
      }
    }

    // 深度解析对象属性中的引用
    if (Array.isArray(obj)) {
      return obj.map(item => this.resolve(item, components, category)) as T;
    }

    // 对于普通对象，递归解析其属性
    const resolved: any = {};
    for (const [key, value] of Object.entries(obj)) {
      resolved[key] = this.resolve(value, components, category);
    }
    return resolved as T;
  }

  /**
   * 解析引用路径
   */
  private resolveReference(
    refPath: string,
    components?: OpenAPIV3.ComponentsObject,
    expectedCategory?: string
  ): any {
    // 处理标准格式的引用 #/components/{category}/{name}
    const refMatch = refPath.match(/^#\/components\/([^/]+)\/(.+)$/);

    if (!refMatch || !components) {
      console.warn(`无法解析引用: ${refPath}`);
      return null;
    }

    const [, refCategory, refName] = refMatch;

    if (!refName) {
      console.warn(`引用名称为空: ${refPath}`);
      return null;
    }

    // 如果指定了类别，并且与引用类别不一致，则发出警告
    if (expectedCategory && refCategory !== expectedCategory) {
      console.warn(
        `引用类别 ${refCategory} 与期望类别 ${expectedCategory} 不一致`
      );
    }

    // 根据类别获取组件集合
    const componentCollection =
      components[refCategory as keyof OpenAPIV3.ComponentsObject];

    if (!componentCollection || typeof componentCollection !== "object") {
      console.warn(`找不到组件集合: ${refCategory}`);
      return null;
    }

    // 获取引用的对象
    const resolved = componentCollection[refName];

    if (!resolved) {
      console.warn(`找不到引用: ${refPath}`);
      return null;
    }

    // 如果解析的结果还是引用，递归解析
    if (typeof resolved === "object" && resolved !== null && "$ref" in resolved) {
      return this.resolve(resolved as OpenAPIV3.ReferenceObject, components, expectedCategory);
    }

    return resolved;
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear();
    this.resolving.clear();
  }

  /**
   * 获取缓存统计信息
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// 创建单例实例
let globalResolver: RefResolver | null = null;

/**
 * 获取全局引用解析器实例
 */
export function getGlobalResolver(): RefResolver {
  if (!globalResolver) {
    globalResolver = new RefResolver();
  }
  return globalResolver;
}

/**
 * 便捷的解析函数，使用全局解析器
 */
export function resolveRefWithCache<T>(
  obj: T | OpenAPIV3.ReferenceObject | undefined,
  components?: OpenAPIV3.ComponentsObject,
  category?: string
): T | null {
  return getGlobalResolver().resolve(obj, components, category);
}