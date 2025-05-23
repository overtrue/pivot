import { ComponentsObject, ReferenceObject, SchemaObject } from '../types/type-script-generator';

/**
 * 根据OpenAPI Schema生成示例数据
 *
 * @param schema 要生成示例的Schema对象
 * @param components 引用解析所需的components
 * @param options 额外配置选项
 * @returns 生成的示例数据
 */
export declare function generateExample(schema: SchemaObject | ReferenceObject, components?: ComponentsObject, options?: {
    maxDepth?: number;
    currentDepth?: number;
    includeReadOnly?: boolean;
    includeWriteOnly?: boolean;
}): any;
