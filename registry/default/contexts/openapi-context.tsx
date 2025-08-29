"use client";

import { RefResolver } from "@/registry/default/lib/ref-resolver";
import { atom, useAtom } from "jotai";
import type { OpenAPIV3 } from "openapi-types";
import React, { createContext, useContext, useMemo, useRef } from "react";

// ===== Jotai Atoms =====

// 选中的操作状态
export const selectedOperationAtom = atom<{
  path: string | null;
  method: string | null;
}>({
  path: null,
  method: null,
});

// OpenAPI 规范数据
export const openAPISpecAtom = atom<OpenAPIV3.Document | null>(null);

// ===== Context Types =====

interface OpenAPIContextValue {
  spec: OpenAPIV3.Document | null;
  components?: OpenAPIV3.ComponentsObject;
  resolver: RefResolver;
  selectedOperation: {
    path: string | null;
    method: string | null;
  };
  setSelectedOperation: (path: string | null, method: string | null) => void;
}

// ===== Context Creation =====

const OpenAPIContext = createContext<OpenAPIContextValue | undefined>(undefined);

// ===== Provider Component =====

interface OpenAPIProviderProps {
  children: React.ReactNode;
  spec: OpenAPIV3.Document | null;
}

export function OpenAPIProvider({ children, spec }: OpenAPIProviderProps) {
  const resolverRef = useRef<RefResolver | null>(null);
  const [selectedOperation, setSelectedOperationAtom] = useAtom(selectedOperationAtom);

  // 创建或获取解析器实例
  if (!resolverRef.current) {
    resolverRef.current = new RefResolver();
  }

  // 当 spec 改变时清除缓存
  React.useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current.clearCache();
    }
  }, [spec]);

  const setSelectedOperation = React.useCallback(
    (path: string | null, method: string | null) => {
      setSelectedOperationAtom({ path, method });
    },
    [setSelectedOperationAtom]
  );

  const value = useMemo(
    () => ({
      spec,
      components: spec?.components,
      resolver: resolverRef.current!,
      selectedOperation,
      setSelectedOperation,
    }),
    [spec, selectedOperation, setSelectedOperation]
  );

  return (
    <OpenAPIContext.Provider value={value}>
      {children}
    </OpenAPIContext.Provider>
  );
}

// ===== Hook =====

export function useOpenAPIContext() {
  const context = useContext(OpenAPIContext);
  if (!context) {
    throw new Error("useOpenAPIContext must be used within OpenAPIProvider");
  }
  return context;
}

// ===== Utility Hooks =====

/**
 * 使用带缓存的引用解析
 */
export function useResolveRef<T>(
  obj: T | OpenAPIV3.ReferenceObject | undefined,
  category?: string
): T | null {
  const { resolver, components } = useOpenAPIContext();
  return useMemo(
    () => resolver.resolve(obj, components, category),
    [resolver, obj, components, category]
  );
}

/**
 * 获取当前选中的操作对象
 */
export function useCurrentOperation(): OpenAPIV3.OperationObject | null {
  const { spec, selectedOperation } = useOpenAPIContext();
  
  if (!spec || !selectedOperation.path || !selectedOperation.method) {
    return null;
  }

  const pathItem = spec.paths?.[selectedOperation.path];
  if (!pathItem) return null;

  const operation = pathItem[selectedOperation.method.toLowerCase() as keyof typeof pathItem];
  if (!operation || typeof operation !== "object" || !("responses" in operation)) {
    return null;
  }

  return operation as OpenAPIV3.OperationObject;
}