import { OpenApiComponentType } from "@/registry/pivot/component-tabs";
import { ComponentsObject } from "@/types/openapi";

/**
 * 获取OpenAPI组件中可用的组件类型及其项目
 * @param components OpenAPI组件对象
 * @returns 组件类型到其项目名称数组的映射
 */
export const getAvailableComponents = (components: ComponentsObject) => {
  const available: Partial<Record<OpenApiComponentType, string[]>> = {};

  for (const key in components) {
    const componentType = key as OpenApiComponentType;
    const items = components[componentType];
    if (items && Object.keys(items).length > 0) {
      available[componentType] = Object.keys(items);
    }
  }

  return available;
};
