import { ComponentsObject } from "../types/openapi";

/**
 * 获取OpenAPI组件中可用的组件类型及其项目
 * @param components OpenAPI组件对象
 * @returns 组件类型到其项目名称数组的映射
 */
export declare const getAvailableComponents: (
  components: ComponentsObject,
) => Partial<Record<keyof ComponentsObject, string[]>>;
