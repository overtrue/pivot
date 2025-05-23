import { ComponentsObject, ReferenceObject } from "@/types/openapi";

/**
 * 解析OpenAPI中的引用对象
 * @param obj 可能是引用对象的数据
 * @param components OpenAPI组件定义
 * @param category 可选的组件类别(schemas, parameters等)
 * @returns 解析后的对象或原始对象
 */
export function resolveRef<T>(
  obj: T | ReferenceObject | undefined,
  components?: ComponentsObject,
  category?: string,
): T | null {
  if (!obj) return null;

  // 检查是否是引用对象
  if (typeof obj === "object" && obj !== null && "$ref" in obj) {
    const refObj = obj as ReferenceObject;
    const refPath = refObj.$ref;

    // 处理标准格式的引用 #/components/{category}/{name}
    const refMatch = refPath.match(/^#\/components\/([^/]+)\/(.+)$/);

    if (refMatch && components) {
      const [, refCategory, refName] = refMatch;

      // 如果指定了类别，并且与引用类别不一致，则发出警告
      if (category && refCategory !== category) {
        console.warn(`引用类别 ${refCategory} 与期望类别 ${category} 不一致`);
      }

      // 根据类别获取组件集合
      const componentCollection =
        components[refCategory as keyof ComponentsObject];

      if (componentCollection && typeof componentCollection === "object") {
        // 解析引用对象
        const resolved = componentCollection[refName];

        if (resolved) {
          // 检查是否是嵌套引用，如果是则递归解析
          if (
            typeof resolved === "object" &&
            resolved !== null &&
            "$ref" in resolved
          ) {
            return resolveRef<T>(
              resolved as ReferenceObject,
              components,
              category,
            );
          }
          return resolved as unknown as T;
        }
      }

      console.warn(`找不到引用 ${refPath}`);
      return null;
    }

    console.warn(`不支持的引用格式 ${refPath}`);
    return null;
  }

  // 如果不是引用对象，则返回原始对象
  return obj as T;
}
