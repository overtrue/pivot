
import { resolveRef } from "@/registry/lib/utils/resolve-ref";
import type { OpenAPIV3 } from 'openapi-types';
import { useMemo } from "react";

/**
 * 自定义钩子，简化OpenAPI结构的处理
 * @param spec OpenAPI规范对象或null
 * @returns 一组处理OpenAPI结构的工具函数
 */
export function useOpenApi(spec: OpenAPIV3.Document | null) {
  // 当spec为null时，返回空的组件
  const components = spec?.components;

  // 优化引用解析，避免重复计算
  const resolve = useMemo(() => {
    return function resolve<T>(
      obj: T | OpenAPIV3.ReferenceObject | undefined,
      category?: string,
    ): T | null {
      if (!spec || !components) return null;
      return resolveRef<T>(obj, components, category);
    };
  }, [components, spec]);

  /**
   * 获取模式的类型信息
   * @param schema 模式对象
   * @returns 类型信息字符串
   */
  const getSchemaType = (
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  ): string => {
    if (!schema) return "未知";

    const resolvedSchema = resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return "未知";

    let type = resolvedSchema.type || "";

    // 处理数组类型
    if (type === "array" && resolvedSchema.items) {
      const itemType = getSchemaType(resolvedSchema.items);
      return `${type}<${itemType}>`;
    }

    // 处理对象或复合类型
    if (type === "object" || !type) {
      if (resolvedSchema.properties) {
        return "object";
      }
      if (resolvedSchema.allOf) {
        return "allOf";
      }
      if (resolvedSchema.oneOf) {
        return "oneOf";
      }
      if (resolvedSchema.anyOf) {
        return "anyOf";
      }
    }

    // 处理格式化的类型
    if (resolvedSchema.format) {
      return `${type}(${resolvedSchema.format})`;
    }

    return type || "未知";
  };

  /**
   * 从请求体中获取模式对象
   * @param requestBody 请求体对象
   * @returns 解析后的模式对象
   */
  const getRequestBodySchema = (
    requestBody: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject | undefined,
  ): OpenAPIV3.SchemaObject | null => {
    if (!requestBody) return null;

    const resolvedBody = resolve<OpenAPIV3.RequestBodyObject>(
      requestBody,
      "requestBodies",
    );
    if (!resolvedBody || !resolvedBody.content) return null;

    // 尝试获取常见内容类型
    const contentTypes = ["application/json", "application/xml", "*/*"];
    for (const contentType of contentTypes) {
      if (resolvedBody.content[contentType]?.schema) {
        return (
          resolve<OpenAPIV3.SchemaObject>(
            resolvedBody.content[contentType].schema,
            "schemas",
          ) || null
        );
      }
    }

    // 如果找不到常见类型，使用第一个可用类型
    const firstContentType = Object.keys(resolvedBody.content)[0];
    if (firstContentType && resolvedBody.content[firstContentType]?.schema) {
      return (
        resolve<OpenAPIV3.SchemaObject>(
          resolvedBody.content[firstContentType].schema,
          "schemas",
        ) || null
      );
    }

    return null;
  };

  /**
   * 获取模式的属性信息
   * @param schema 模式对象
   * @returns 属性对象集合
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
    if (resolvedSchema.type === "array" && resolvedSchema.items) {
      const itemsSchema = resolve<OpenAPIV3.SchemaObject>(
        resolvedSchema.items,
        "schemas",
      );
      if (itemsSchema?.properties) {
        return itemsSchema.properties;
      }
    }

    // 处理组合模式
    if (resolvedSchema.allOf) {
      // 合并所有allOf模式的属性
      const mergedProperties = {};
      for (const subSchema of resolvedSchema.allOf) {
        const subProperties = getSchemaProperties(subSchema);
        Object.assign(mergedProperties, subProperties);
      }
      return mergedProperties;
    }

    return {};
  };

  /**
   * 处理参数集合，按位置分组
   * @param parameters 参数对象数组
   * @returns 按位置分组的参数
   */
  const processParameters = (
    parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] | undefined,
  ) => {
    if (!parameters || parameters.length === 0) {
      return {};
    }

    const result: { [key: string]: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[] } = {
      path: [],
      query: [],
      header: [],
      cookie: [],
    };

    for (const param of parameters) {
      const resolvedParam = resolve<OpenAPIV3.ParameterObject>(param, "parameters");
      if (resolvedParam && resolvedParam.in) {
        const paramIn = resolvedParam.in as keyof typeof result;
        if (paramIn in result && result[paramIn]) {
          result[paramIn].push(resolvedParam);
        }
      }
    }

    return result;
  };

  /**
   * 处理响应对象
   * @param response 响应对象
   * @returns 处理后的响应对象
   */
  const processResponse = (
    response: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject | undefined,
  ) => {
    if (!response) return null;

    const resolvedResponse = resolve<OpenAPIV3.ResponseObject>(response, "responses");
    if (!resolvedResponse) return null;

    const result = {
      description: resolvedResponse.description || "",
      headers: resolvedResponse.headers || {},
      content: resolvedResponse.content || {},
    };

    return result;
  };

  /**
   * 获取模式的约束条件
   * @param schema 模式对象
   * @returns 约束条件对象
   */
  const getSchemaConstraints = (
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
  ) => {
    if (!schema) return {};

    const resolvedSchema = resolve<OpenAPIV3.SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return {};

    const constraints: { [key: string]: any } = {};

    // 数值约束
    if (typeof resolvedSchema.minimum === "number") {
      constraints.minimum = resolvedSchema.minimum;
    }
    if (typeof resolvedSchema.maximum === "number") {
      constraints.maximum = resolvedSchema.maximum;
    }
    if (typeof resolvedSchema.exclusiveMinimum === "number") {
      constraints.exclusiveMinimum = resolvedSchema.exclusiveMinimum;
    }
    if (typeof resolvedSchema.exclusiveMaximum === "number") {
      constraints.exclusiveMaximum = resolvedSchema.exclusiveMaximum;
    }
    if (typeof resolvedSchema.multipleOf === "number") {
      constraints.multipleOf = resolvedSchema.multipleOf;
    }

    // 字符串约束
    if (typeof resolvedSchema.minLength === "number") {
      constraints.minLength = resolvedSchema.minLength;
    }
    if (typeof resolvedSchema.maxLength === "number") {
      constraints.maxLength = resolvedSchema.maxLength;
    }
    if (resolvedSchema.pattern) {
      constraints.pattern = resolvedSchema.pattern;
    }

    // 数组约束
    if (typeof resolvedSchema.minItems === "number") {
      constraints.minItems = resolvedSchema.minItems;
    }
    if (typeof resolvedSchema.maxItems === "number") {
      constraints.maxItems = resolvedSchema.maxItems;
    }
    if (resolvedSchema.uniqueItems) {
      constraints.uniqueItems = resolvedSchema.uniqueItems;
    }

    // 对象约束
    if (typeof resolvedSchema.minProperties === "number") {
      constraints.minProperties = resolvedSchema.minProperties;
    }
    if (typeof resolvedSchema.maxProperties === "number") {
      constraints.maxProperties = resolvedSchema.maxProperties;
    }

    return constraints;
  };

  /**
   * 获取指定路径和方法的操作对象
   * @param path 路径
   * @param method HTTP方法
   * @returns 操作对象
   */
  const getOperation = (
    path: string,
    method: string,
  ): OpenAPIV3.OperationObject | null => {
    if (!spec || !spec.paths || !spec.paths[path]) {
      return null;
    }

    const pathItem = spec.paths[path] as OpenAPIV3.PathItemObject;
    const operation = pathItem[method.toLowerCase() as keyof OpenAPIV3.PathItemObject];

    if (operation && typeof operation === "object" && "responses" in operation) {
      return operation as OpenAPIV3.OperationObject;
    }

    return null;
  };

  /**
   * 获取服务器列表
   * @returns 服务器对象数组
   */
  const getServers = (): OpenAPIV3.ServerObject[] => {
    return spec?.servers || [];
  };

  /**
   * 按标签分组获取操作
   * @returns 按标签分组的操作对象
   */
  const getOperationsByTag = () => {
    if (!spec || !spec.paths) {
      return {};
    }

    const operations: { [tag: string]: Array<{ path: string; method: string; operation: OpenAPIV3.OperationObject }> } = {};

    Object.entries(spec.paths).forEach(([path, pathItem]) => {
      if (!pathItem || typeof pathItem !== "object") return;

      const methods = ["get", "post", "put", "delete", "patch", "head", "options", "trace"];

      methods.forEach((method) => {
        const operation = pathItem[method as keyof OpenAPIV3.PathItemObject];
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
   * @returns 标签数组
   */
  const getTags = () => {
    if (!spec) return [];
    return spec.tags || [];
  };

  /**
   * 获取API信息
   * @returns API信息对象
   */
  const getInfo = () => {
    return spec?.info || null;
  };

  /**
   * 获取组件定义
   * @returns 组件对象
   */
  const getComponents = () => {
    return spec?.components || null;
  };

  return {
    // 原始数据
    spec,
    components,

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
