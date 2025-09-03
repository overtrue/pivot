"use client";

import { resolveRef } from "@/registry/default/lib/resolve-ref";
import type { OpenAPIV3 } from "openapi-types";
import { useMemo } from "react";

/**
 * 简化的 OpenAPI 处理钩子
 * @param spec OpenAPI规范对象或null
 * @param components 可选的组件对象
 * @returns 基本的 OpenAPI 处理工具
 */
export function useOpenApi(spec: OpenAPIV3.Document | null, components?: OpenAPIV3.ComponentsObject) {
  // 优先使用传入的components，如果没有则使用spec中的components
  const effectiveComponents = useMemo(() => components || spec?.components, [components, spec?.components]);

  // 引用解析函数
  const resolve = useMemo(() => {
    return function resolve<T>(
      obj: T | OpenAPIV3.ReferenceObject | undefined,
      category?: string,
    ): T | null {
      if (!effectiveComponents) return null;
      return resolveRef<T>(obj, effectiveComponents, category);
    };
  }, [effectiveComponents]);

  // 按标签分组获取操作
  const getOperationsByTag = useMemo(() => {
    return () => {
      if (!spec?.paths) return {};

      const operations: Record<string, Array<{
        path: string;
        method: string;
        operation: OpenAPIV3.OperationObject;
      }>> = {};

      const HTTP_METHODS = ["get", "post", "put", "delete", "patch", "head", "options", "trace"] as const;

      Object.entries(spec.paths).forEach(([path, pathItem]) => {
        if (!pathItem || typeof pathItem !== "object") return;

        HTTP_METHODS.forEach((method) => {
          const operation = pathItem[method];
          if (operation && typeof operation === "object" && "responses" in operation) {
            const operationObj = operation as OpenAPIV3.OperationObject;
            const tags = operationObj.tags || ["未分类"];

            tags.forEach((tag) => {
              if (!operations[tag]) {
                operations[tag] = [];
              }
              operations[tag].push({
                path,
                method,
                operation: operationObj,
              });
            });
          }
        });
      });

      return operations;
    };
  }, [spec]);

  return useMemo(() => ({
    // 原始数据
    spec,
    components: effectiveComponents,

    // 状态检查
    hasComponents: !!effectiveComponents,

    // 解析函数
    resolve,

    // 操作处理
    getOperationsByTag,
  }), [spec, effectiveComponents, resolve, getOperationsByTag]);
}
