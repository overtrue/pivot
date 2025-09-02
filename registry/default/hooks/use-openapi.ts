"use client";

import { resolveRef } from "@/registry/default/lib/resolve-ref";
import type { OpenAPIV3 } from "openapi-types";
import { useMemo } from "react";

/**
 * 自定义钩子，简化OpenAPI结构的处理
 * @param spec OpenAPI规范对象或null
 * @returns 一组处理OpenAPI结构的工具函数
 */
export function useOpenApi(spec: OpenAPIV3.Document | null, components?: OpenAPIV3.ComponentsObject) {
  // 优先使用传入的components，如果没有则使用spec中的components
  const effectiveComponents = components || spec?.components;

  // 优化引用解析，避免重复计算
  const resolve = useMemo(() => {
    return function resolve<T>(
      obj: T | OpenAPIV3.ReferenceObject | undefined,
      category?: string,
    ): T | null {
      if (!effectiveComponents) return null;
      return resolveRef<T>(obj, effectiveComponents, category);
    };
  }, [effectiveComponents]);

  /**
   * 获取模式的类型信息
   */
  const getSchemaType = (
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  ): string => {
    if (!schema) return "未知";

    const resolvedSchema = resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return "未知";

    let type = resolvedSchema.type || "";

    // 处理数组类型
    if (type === "array" && "items" in resolvedSchema && resolvedSchema.items) {
      const itemType = getSchemaType(resolvedSchema.items);
      return `${type}<${itemType}>`;
    }

    // 处理对象或复合类型
    if (type === "object" || !type) {
      if (resolvedSchema.properties) return "object";
      if (resolvedSchema.allOf) return "allOf";
      if (resolvedSchema.oneOf) return "oneOf";
      if (resolvedSchema.anyOf) return "anyOf";
    }

    // 处理格式化的类型
    if (resolvedSchema.format) {
      return `${type}(${resolvedSchema.format})`;
    }

    return type || "未知";
  };

  /**
   * 从请求体中获取模式对象
   */
  const getRequestBodySchema = (
    requestBody: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject | undefined,
  ): OpenAPIV3.SchemaObject | null => {
    if (!requestBody) return null;

    const resolvedBody = resolve<OpenAPIV3.RequestBodyObject>(requestBody, "requestBodies");
    if (!resolvedBody?.content) return null;

    // 尝试获取常见内容类型
    const contentTypes = ["application/json", "application/xml", "*/*"];
    for (const contentType of contentTypes) {
      const schema = resolvedBody.content[contentType]?.schema;
      if (schema) {
        return resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
      }
    }

    // 如果找不到常见类型，使用第一个可用类型
    const firstContentType = Object.keys(resolvedBody.content)[0];
    if (firstContentType) {
      const schema = resolvedBody.content[firstContentType]?.schema;
      if (schema) {
        return resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
      }
    }

    return null;
  };

  /**
   * 获取模式的属性信息
   */
  const getSchemaProperties = (
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  ) => {
    if (!schema) return {};

    const resolvedSchema = resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return {};

    // 处理基本对象
    if (resolvedSchema.properties) {
      return resolvedSchema.properties;
    }

    // 处理数组
    if (resolvedSchema.type === "array" && "items" in resolvedSchema && resolvedSchema.items) {
      const itemsSchema = resolve<OpenAPIV3.SchemaObject>(resolvedSchema.items, "schemas");
      return itemsSchema?.properties || {};
    }

    // 处理组合模式
    if (resolvedSchema.allOf) {
      const mergedProperties = {};
      for (const subSchema of resolvedSchema.allOf) {
        Object.assign(mergedProperties, getSchemaProperties(subSchema));
      }
      return mergedProperties;
    }

    return {};
  };

  /**
   * 处理参数集合，按位置分组
   */
  const processParameters = (
    parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] | undefined,
  ) => {
    if (!parameters?.length) return {};

    const result: Record<string, (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]> = {
      path: [],
      query: [],
      header: [],
      cookie: [],
    };

    for (const param of parameters) {
      const resolvedParam = resolve<OpenAPIV3.ParameterObject>(param, "parameters");
      if (resolvedParam?.in && resolvedParam.in in result) {
        result[resolvedParam.in].push(resolvedParam);
      }
    }

    return result;
  };

  /**
   * 处理响应对象
   */
  const processResponse = (
    response: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject | undefined,
  ) => {
    if (!response) return null;

    const resolvedResponse = resolve<OpenAPIV3.ResponseObject>(response, "responses");
    if (!resolvedResponse) return null;

    return {
      description: resolvedResponse.description || "",
      headers: resolvedResponse.headers || {},
      content: resolvedResponse.content || {},
    };
  };

  /**
   * 获取模式的约束条件
   */
  const getSchemaConstraints = (
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  ) => {
    if (!schema) return {};

    const resolvedSchema = resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return {};

    const constraints: Record<string, any> = {};

    // 数值约束
    if (typeof resolvedSchema.minimum === "number") constraints.minimum = resolvedSchema.minimum;
    if (typeof resolvedSchema.maximum === "number") constraints.maximum = resolvedSchema.maximum;
    if (typeof resolvedSchema.exclusiveMinimum === "number") constraints.exclusiveMinimum = resolvedSchema.exclusiveMinimum;
    if (typeof resolvedSchema.exclusiveMaximum === "number") constraints.exclusiveMaximum = resolvedSchema.exclusiveMaximum;
    if (typeof resolvedSchema.multipleOf === "number") constraints.multipleOf = resolvedSchema.multipleOf;

    // 字符串约束
    if (typeof resolvedSchema.minLength === "number") constraints.minLength = resolvedSchema.minLength;
    if (typeof resolvedSchema.maxLength === "number") constraints.maxLength = resolvedSchema.maxLength;
    if (resolvedSchema.pattern) constraints.pattern = resolvedSchema.pattern;

    // 数组约束
    if (typeof resolvedSchema.minItems === "number") constraints.minItems = resolvedSchema.minItems;
    if (typeof resolvedSchema.maxItems === "number") constraints.maxItems = resolvedSchema.maxItems;
    if (resolvedSchema.uniqueItems) constraints.uniqueItems = resolvedSchema.uniqueItems;

    // 对象约束
    if (typeof resolvedSchema.minProperties === "number") constraints.minProperties = resolvedSchema.minProperties;
    if (typeof resolvedSchema.maxProperties === "number") constraints.maxProperties = resolvedSchema.maxProperties;

    return constraints;
  };

  /**
   * 获取指定路径和方法的操作对象
   */
  const getOperation = (path: string, method: string): OpenAPIV3.OperationObject | null => {
    if (!spec?.paths?.[path]) return null;

    const pathItem = spec.paths[path] as OpenAPIV3.PathItemObject;
    const operation = pathItem[method.toLowerCase() as keyof OpenAPIV3.PathItemObject];

    if (operation && typeof operation === "object" && "responses" in operation) {
      return operation as OpenAPIV3.OperationObject;
    }

    return null;
  };

  /**
   * 获取服务器列表
   */
  const getServers = (): OpenAPIV3.ServerObject[] => {
    return spec?.servers || [];
  };

  // 提取 HTTP 方法列表
  const HTTP_METHODS = ["get", "post", "put", "delete", "patch", "head", "options", "trace"] as const;

  /**
   * 按标签分组获取操作
   */
  const getOperationsByTag = () => {
    if (!spec?.paths) return {};

    const operations: Record<string, Array<{
      path: string;
      method: string;
      operation: OpenAPIV3.OperationObject;
    }>> = {};

    Object.entries(spec.paths).forEach(([path, pathItem]) => {
      if (!pathItem || typeof pathItem !== "object") return;

      HTTP_METHODS.forEach((method) => {
        const operation = pathItem[method];
        if (operation && typeof operation === "object" && "responses" in operation) {
          const op = operation as OpenAPIV3.OperationObject;
          const tags = op.tags || ["default"];

          tags.forEach((tag) => {
            if (!operations[tag]) {
              operations[tag] = [];
            }
            operations[tag].push({
              path,
              method: method.toUpperCase(),
              operation: op,
            });
          });
        }
      });
    });

    return operations;
  };

  /**
   * 获取所有标签
   */
  const getTags = () => {
    return spec?.tags || [];
  };

  /**
   * 获取API信息
   */
  const getInfo = () => {
    return spec?.info || null;
  };

  /**
   * 获取组件定义
   */
  const getComponents = () => {
    return effectiveComponents || null;
  };

  return {
    // 原始数据
    spec,
    components: effectiveComponents,

    // 状态检查
    hasComponents: !!effectiveComponents,

    // 解析函数
    resolve,

    // 模式处理
    getSchemaType,
    getSchemaProperties,
    getSchemaConstraints,
    getRequestBodySchema,

    // 参数和响应处理
    processParameters,
    processResponse,

    // 操作处理
    getOperation,
    getOperationsByTag,
    getTags,

    // 服务器和基本信息
    getServers,
    getInfo,
    getComponents,
  };
}
