'use client'; // Keep client directive if utils might be used in client components

import { ComponentsObject } from '@/types/openapi'; // Adjust path as needed

// Defines the possible keys within the ComponentsObject
export type ComponentType = keyof ComponentsObject;

/**
 * 解析 OpenAPI 引用
 * @param ref 引用对象
 * @param components 组件定义
 * @param componentType 组件类型 (如 'schemas', 'requestBodies' 等)
 * @returns 解析后的对象，如果无法解析则返回 null
 */
export function resolveRef<T>(
  ref: any,
  components?: ComponentsObject,
  componentType?: string
): T | null {
  // 如果不是引用对象，直接返回
  if (!ref || typeof ref !== 'object' || !('$ref' in ref)) {
    return ref as T;
  }

  if (!components) {
    return null;
  }

  try {
    // 从 $ref 字符串中提取组件类型和名称
    // 典型的 $ref 格式: '#/components/schemas/Pet'
    const refParts = ref.$ref.split('/');

    // 如果提供了组件类型，直接使用它
    const type = componentType || refParts[2];
    const name = refParts[refParts.length - 1];

    // 确保组件类型存在
    if (!components[type]) {
      return null;
    }

    // 获取引用的对象
    const resolved = components[type][name];

    // 如果解析的对象本身也是一个引用，则递归解析
    if (resolved && typeof resolved === 'object' && '$ref' in resolved) {
      return resolveRef<T>(resolved, components, type);
    }

    return resolved as T;
  } catch (error) {
    console.error('解析 $ref 失败:', error);
    return null;
  }
}
