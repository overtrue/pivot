
import { ComponentsObject } from '@/types/openapi';
import { ComponentType } from '../components/ComponentTabs';

/**
 * 获取OpenAPI组件中可用的组件类型及其项目
 * @param components OpenAPI组件对象
 * @returns 组件类型到其项目名称数组的映射
 */
export const getAvailableComponents = (components: ComponentsObject) => {
  const available: Partial<Record<ComponentType, string[]>> = {};

  for (const key in components) {
    const componentType = key as ComponentType;
    const items = components[componentType];
    if (items && Object.keys(items).length > 0) {
      available[componentType] = Object.keys(items);
    }
  }

  return available;
};
