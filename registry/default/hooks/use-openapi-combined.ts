"use client";

import type { OpenAPIV3 } from "openapi-types";
import { useMemo } from "react";
import { useOpenApi } from "./use-openapi";
import { useOpenAPILoader } from "./use-openapi-loader";

// 组合 Hook 的返回类型
export interface UseOpenAPICombinedResult {
  // 来自 loader 的状态和方法
  spec: OpenAPIV3.Document | null;
  loading: boolean;
  error: string | null;
  loadFromUrl: (url: string) => Promise<void>;
  loadFromString: (content: string) => Promise<void>;
  loadFromObject: (spec: OpenAPIV3.Document) => void;
  reload: () => Promise<void>;
  reset: () => void;

  // 来自 openapi 的处理方法
  openapi: ReturnType<typeof useOpenApi>;
}

/**
 * 组合 Hook - 整合数据加载和数据处理
 *
 * 这个 Hook 展示了如何正确地组合使用：
 * - useOpenAPILoader: 专门处理数据获取和格式转换
 * - useOpenApi: 专门处理已解析数据的结构操作
 *
 * @example
 * ```tsx
 * // 基础使用
 * const api = useOpenAPICombined();
 *
 * // 加载数据
 * await api.loadFromUrl('https://api.example.com/openapi.json');
 *
 * // 使用处理方法
 * const operations = api.openapi.getOperationsByTag();
 * const servers = api.openapi.getServers();
 * ```
 */
export function useOpenAPICombined(
  input?: OpenAPIV3.Document | string | null | undefined
): UseOpenAPICombinedResult {
  // 数据加载层
  const loader = useOpenAPILoader(input);

  // 数据处理层 - 只有当 spec 存在时才进行处理
  const openapi = useOpenApi(loader.spec);

  // 返回组合结果
  return useMemo(() => ({
    // 直接透传 loader 的所有属性和方法
    ...loader,

    // 添加 openapi 处理器
    openapi,
  }), [loader, openapi]);
}

/**
 * 便捷的 URL 加载 Hook
 *
 * @example
 * ```tsx
 * const { spec, loading, error, openapi } = useOpenAPIFromUrl(
 *   'https://petstore3.swagger.io/api/v3/openapi.json'
 * );
 *
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 *
 * const operations = openapi.getOperationsByTag();
 * ```
 */
export function useOpenAPIFromUrl(url: string) {
  return useOpenAPICombined(url);
}

/**
 * 便捷的字符串解析 Hook
 *
 * @example
 * ```tsx
 * const yamlContent = `
 * openapi: 3.0.0
 * info:
 *   title: My API
 *   version: 1.0.0
 * paths: {}
 * `;
 *
 * const { spec, error, openapi } = useOpenAPIFromString(yamlContent);
 * ```
 */
export function useOpenAPIFromString(content: string) {
  return useOpenAPICombined(content);
}

/**
 * 便捷的对象 Hook
 *
 * @example
 * ```tsx
 * const spec: OpenAPIV3.Document = { ... };
 * const { openapi } = useOpenAPIFromObject(spec);
 * ```
 */
export function useOpenAPIFromObject(spec: OpenAPIV3.Document) {
  return useOpenAPICombined(spec);
}
