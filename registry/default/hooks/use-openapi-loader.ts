"use client";

import * as yaml from "js-yaml";
import type { OpenAPIV3 } from "openapi-types";
import { useCallback, useEffect, useMemo, useState } from "react";

// 数据源类型
export type OpenAPISource =
  | { type: "object"; data: OpenAPIV3.Document }
  | { type: "string"; data: string }
  | { type: "url"; data: string };

// Hook 状态
export interface UseOpenAPILoaderState {
  spec: OpenAPIV3.Document | null;
  loading: boolean;
  error: string | null;
}

// Hook 返回值
export interface UseOpenAPILoaderResult extends UseOpenAPILoaderState {
  loadFromUrl: (url: string) => Promise<void>;
  loadFromString: (content: string) => Promise<void>;
  loadFromObject: (spec: OpenAPIV3.Document) => void;
  reload: () => Promise<void>;
  reset: () => void;
}

/**
 * 智能判断输入类型并转换为 OpenAPISource
 */
function createOpenAPISource(input: OpenAPIV3.Document | string | null | undefined): OpenAPISource | undefined {
  if (!input) return undefined;

  if (typeof input === "string") {
    // 检测字符串是否为 URL
    const isUrl = input.startsWith("http://") || input.startsWith("https://") || input.startsWith("/");
    return isUrl
      ? { type: "url", data: input }
      : { type: "string", data: input };
  }

  if (typeof input === "object" && input !== null) {
    return { type: "object", data: input };
  }

  return undefined;
}

/**
 * OpenAPI 数据加载器 Hook
 * 专门处理数据获取、格式转换和缓存
 * 支持智能判断输入类型
 */
export function useOpenAPILoader(
  input?: OpenAPIV3.Document | string | null | undefined
): UseOpenAPILoaderResult {
  const [state, setState] = useState<UseOpenAPILoaderState>({
    spec: null,
    loading: false,
    error: null,
  });

  const [currentSource, setCurrentSource] = useState<OpenAPISource | null>(null);

  // 智能判断输入并创建数据源
  const dataSource = useMemo(() => createOpenAPISource(input), [input]);

  // 解析字符串内容（JSON 或 YAML）
  const parseContent = useCallback((content: string): OpenAPIV3.Document => {
    // 先尝试 JSON
    try {
      return JSON.parse(content);
    } catch (jsonError) {
      // JSON 失败，尝试 YAML
      try {
        const yamlData = yaml.load(content);
        if (typeof yamlData === "object" && yamlData !== null) {
          return yamlData as OpenAPIV3.Document;
        }
        throw new Error("YAML 解析结果不是有效对象");
      } catch (yamlError) {
        throw new Error(
          `无法解析内容: JSON 错误: ${jsonError instanceof Error ? jsonError.message : "未知错误"}, YAML 错误: ${yamlError instanceof Error ? yamlError.message : "未知错误"}`
        );
      }
    }
  }, []);

  // 从 URL 加载
  const loadFromUrl = useCallback(async (url: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    setCurrentSource({ type: "url", data: url });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const content = await response.text();
      const parsedSpec = parseContent(content);

      setState({
        spec: parsedSpec,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        spec: null,
        loading: false,
        error: error instanceof Error ? error.message : "加载失败",
      });
    }
  }, [parseContent]);

  // 从字符串加载
  const loadFromString = useCallback(async (content: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    setCurrentSource({ type: "string", data: content });

    try {
      const parsedSpec = parseContent(content);
      setState({
        spec: parsedSpec,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        spec: null,
        loading: false,
        error: error instanceof Error ? error.message : "解析失败",
      });
    }
  }, [parseContent]);

  // 从对象加载
  const loadFromObject = useCallback((spec: OpenAPIV3.Document) => {
    setCurrentSource({ type: "object", data: spec });
    setState({
      spec,
      loading: false,
      error: null,
    });
  }, []);

  // 重新加载当前源
  const reload = useCallback(async () => {
    if (!currentSource) return;

    switch (currentSource.type) {
      case "url":
        await loadFromUrl(currentSource.data);
        break;
      case "string":
        await loadFromString(currentSource.data);
        break;
      case "object":
        loadFromObject(currentSource.data);
        break;
    }
  }, [currentSource, loadFromUrl, loadFromString, loadFromObject]);

  // 重置状态
  const reset = useCallback(() => {
    setState({
      spec: null,
      loading: false,
      error: null,
    });
    setCurrentSource(null);
  }, []);

  // 处理数据源变化
  useEffect(() => {
    if (dataSource) {
      switch (dataSource.type) {
        case "url":
          loadFromUrl(dataSource.data);
          break;
        case "string":
          loadFromString(dataSource.data);
          break;
        case "object":
          loadFromObject(dataSource.data);
          break;
      }
    } else {
      // 如果没有数据源，重置状态
      reset();
    }
  }, [dataSource, loadFromUrl, loadFromString, loadFromObject, reset]);

  return {
    ...state,
    loadFromUrl,
    loadFromString,
    loadFromObject,
    reload,
    reset,
  };
}
