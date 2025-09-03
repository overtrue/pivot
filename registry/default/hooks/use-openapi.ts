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

  return useMemo(() => ({
    // 原始数据
    spec,
    components: effectiveComponents,

    // 状态检查
    hasComponents: !!effectiveComponents,

    // 解析函数
    resolve,
  }), [spec, effectiveComponents, resolve]);
}
