import { resolveRef } from "@/lib/resolve-ref";
import {
  OpenApiSpec,
  OperationObject,
  ParameterObject,
  PathItemObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  ServerObject,
} from "@/types/openapi";
import { useMemo } from "react";

/**
 * 自定义钩子，简化OpenAPI结构的处理
 * @param spec OpenAPI规范对象或null
 * @returns 一组处理OpenAPI结构的工具函数
 */
export function useOpenApi(spec: OpenApiSpec | null) {
  // 当spec为null时，返回空的组件
  const components = spec?.components;

  // 优化引用解析，避免重复计算
  const resolve = useMemo(() => {
    return function resolve<T>(
      obj: T | ReferenceObject | undefined,
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
    schema: SchemaObject | ReferenceObject | undefined,
  ): string => {
    if (!schema) return "未知";

    const resolvedSchema = resolve<SchemaObject>(schema, "schemas");
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
    requestBody: RequestBodyObject | ReferenceObject | undefined,
  ): SchemaObject | null => {
    if (!requestBody) return null;

    const resolvedBody = resolve<RequestBodyObject>(
      requestBody,
      "requestBodies",
    );
    if (!resolvedBody || !resolvedBody.content) return null;

    // 尝试获取常见内容类型
    const contentTypes = ["application/json", "application/xml", "*/*"];
    for (const contentType of contentTypes) {
      if (resolvedBody.content[contentType]?.schema) {
        return (
          resolve<SchemaObject>(
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
        resolve<SchemaObject>(
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
    schema: SchemaObject | ReferenceObject | undefined,
  ) => {
    if (!schema) return {};

    const resolvedSchema = resolve<SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return {};

    // 处理基本对象
    if (resolvedSchema.properties) {
      return resolvedSchema.properties;
    }

    // 处理数组
    if (resolvedSchema.type === "array" && resolvedSchema.items) {
      const itemsSchema = resolve<SchemaObject>(
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
    parameters: (ParameterObject | ReferenceObject)[] | undefined,
  ) => {
    if (!parameters || parameters.length === 0) {
      return {};
    }

    const result: { [key: string]: (ParameterObject | ReferenceObject)[] } = {
      path: [],
      query: [],
      header: [],
      cookie: [],
    };

    for (const param of parameters) {
      const resolvedParam = resolve<ParameterObject>(param, "parameters");
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
   * @returns 处理后的响应信息
   */
  const processResponse = (
    response: ResponseObject | ReferenceObject | undefined,
  ) => {
    if (!response) return null;

    const resolvedResponse = resolve<ResponseObject>(response, "responses");
    if (!resolvedResponse) return null;

    // 处理响应内容
    if (resolvedResponse.content) {
      // 尝试获取常见内容类型
      const contentTypes = ["application/json", "application/xml", "*/*"];
      for (const contentType of contentTypes) {
        if (resolvedResponse.content[contentType]?.schema) {
          return {
            description: resolvedResponse.description || "",
            contentType,
            schema: resolve<SchemaObject>(
              resolvedResponse.content[contentType].schema,
              "schemas",
            ),
          };
        }
      }

      // 如果找不到常见类型，使用第一个可用类型
      const firstContentType = Object.keys(resolvedResponse.content)[0];
      if (firstContentType && resolvedResponse.content[firstContentType]?.schema) {
        return {
          description: resolvedResponse.description || "",
          contentType: firstContentType,
          schema: resolve<SchemaObject>(
            resolvedResponse.content[firstContentType].schema,
            "schemas",
          ),
        };
      }
    }

    // 处理没有内容的响应
    return {
      description: resolvedResponse.description || "",
      contentType: "",
      schema: null,
    };
  };

  /**
   * 获取模式的约束信息
   * @param schema 模式对象
   * @returns 约束信息对象
   */
  const getSchemaConstraints = (
    schema: SchemaObject | ReferenceObject | undefined,
  ) => {
    if (!schema) return {};

    const resolvedSchema = resolve<SchemaObject>(schema, "schemas");
    if (!resolvedSchema) return {};

    const constraints: Record<string, any> = {};

    // 收集数值约束
    if (resolvedSchema.minimum !== undefined)
      constraints.minimum = resolvedSchema.minimum;
    if (resolvedSchema.maximum !== undefined)
      constraints.maximum = resolvedSchema.maximum;
    if (resolvedSchema.exclusiveMinimum !== undefined)
      constraints.exclusiveMinimum = resolvedSchema.exclusiveMinimum;
    if (resolvedSchema.exclusiveMaximum !== undefined)
      constraints.exclusiveMaximum = resolvedSchema.exclusiveMaximum;
    if (resolvedSchema.multipleOf !== undefined)
      constraints.multipleOf = resolvedSchema.multipleOf;

    // 收集字符串约束
    if (resolvedSchema.minLength !== undefined)
      constraints.minLength = resolvedSchema.minLength;
    if (resolvedSchema.maxLength !== undefined)
      constraints.maxLength = resolvedSchema.maxLength;
    if (resolvedSchema.pattern !== undefined)
      constraints.pattern = resolvedSchema.pattern;

    // 收集数组约束
    if (resolvedSchema.minItems !== undefined)
      constraints.minItems = resolvedSchema.minItems;
    if (resolvedSchema.maxItems !== undefined)
      constraints.maxItems = resolvedSchema.maxItems;
    if (resolvedSchema.uniqueItems !== undefined)
      constraints.uniqueItems = resolvedSchema.uniqueItems;

    // 收集对象约束
    if (resolvedSchema.minProperties !== undefined)
      constraints.minProperties = resolvedSchema.minProperties;
    if (resolvedSchema.maxProperties !== undefined)
      constraints.maxProperties = resolvedSchema.maxProperties;
    if (resolvedSchema.required !== undefined)
      constraints.required = resolvedSchema.required;

    return constraints;
  };

  /**
   * 获取指定路径和方法的操作对象
   * @param path API路径
   * @param method HTTP方法
   * @returns 操作对象
   */
  const getOperation = (
    path: string,
    method: string,
  ): OperationObject | null => {
    if (!spec || !spec.paths || !spec.paths[path]) return null;

    const pathItem = resolve<PathItemObject>(spec.paths[path], "pathItems");
    if (!pathItem) return null;

    const lowerMethod = method.toLowerCase() as keyof PathItemObject;
    if (!(lowerMethod in pathItem)) return null;

    return resolve<OperationObject>(
      pathItem[lowerMethod] as OperationObject,
      "operations",
    );
  };

  /**
   * 获取所有服务器
   * @returns 服务器对象数组
   */
  const getServers = (): ServerObject[] => {
    return spec?.servers || [];
  };

  /**
   * 按标签分组操作
   * @returns 按标签分组的操作
   */
  const getOperationsByTag = useMemo(() => {
    return () => {
      if (!spec || !spec.paths) {
        return {};
      }
      const operations: Record<
        string,
        { path: string; method: string; operation: OperationObject }[]
      > = {};
      for (const path in spec.paths) {
        const pathItem = spec.paths[path] as PathItemObject;
        for (const method in pathItem) {
          const httpMethod = method.toLowerCase() as keyof PathItemObject;
          if (
            [
              "get",
              "put",
              "post",
              "delete",
              "options",
              "head",
              "patch",
              "trace",
            ].includes(httpMethod)
          ) {
            const operation = pathItem[httpMethod] as OperationObject;
            if (operation.tags && operation.tags.length > 0) {
              operation.tags.forEach((tag) => {
                if (!operations[tag]) {
                  operations[tag] = [];
                }
                operations[tag].push({ path, method: httpMethod, operation });
              });
            } else {
              const defaultTag = "default";
              if (!operations[defaultTag]) {
                operations[defaultTag] = [];
              }
              operations[defaultTag].push({
                path,
                method: httpMethod,
                operation,
              });
            }
          }
        }
      }
      return operations;
    };
  }, [spec]);

  return {
    spec,
    components,
    resolve,
    getSchemaType,
    getRequestBodySchema,
    getSchemaProperties,
    processParameters,
    processResponse,
    getSchemaConstraints,
    getOperation,
    getServers,
    getOperationsByTag,
  };
}
