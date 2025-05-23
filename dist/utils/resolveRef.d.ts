import { ComponentsObject, ReferenceObject } from '../types/type-script-generator';

/**
 * 解析OpenAPI中的引用对象
 * @param obj 可能是引用对象的数据
 * @param components OpenAPI组件定义
 * @param category 可选的组件类别(schemas, parameters等)
 * @returns 解析后的对象或原始对象
 */
export declare function resolveRef<T>(obj: T | ReferenceObject | undefined, components?: ComponentsObject, category?: string): T | null;
