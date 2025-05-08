import { OpenApiSpec } from '../types/openapi';

/**
 * 合并多个 OpenAPI 规范文件
 * @param specs 要合并的 OpenAPI 规范对象数组
 * @param options 合并选项
 * @returns 合并后的 OpenAPI 规范对象
 */
export declare function mergeOpenApiSpecs(specs: OpenApiSpec[], options?: {
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
}): OpenApiSpec;
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
