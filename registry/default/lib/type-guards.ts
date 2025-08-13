import type { OpenAPIV3 } from "openapi-types";

/**
 * 检查对象是否为引用对象
 */
export function isReferenceObject(
  obj: any
): obj is OpenAPIV3.ReferenceObject {
  return obj && typeof obj === "object" && "$ref" in obj && typeof obj.$ref === "string";
}

/**
 * 检查对象是否为响应对象
 */
export function isResponseObject(
  obj: any
): obj is OpenAPIV3.ResponseObject {
  return (
    obj &&
    typeof obj === "object" &&
    "description" in obj &&
    typeof obj.description === "string"
  );
}

/**
 * 检查对象是否为操作对象
 */
export function isOperationObject(
  obj: any
): obj is OpenAPIV3.OperationObject {
  return obj && typeof obj === "object" && "responses" in obj;
}

/**
 * 检查对象是否为参数对象
 */
export function isParameterObject(
  obj: any
): obj is OpenAPIV3.ParameterObject {
  return (
    obj &&
    typeof obj === "object" &&
    "name" in obj &&
    "in" in obj &&
    typeof obj.name === "string" &&
    typeof obj.in === "string"
  );
}

/**
 * 检查对象是否为请求体对象
 */
export function isRequestBodyObject(
  obj: any
): obj is OpenAPIV3.RequestBodyObject {
  return obj && typeof obj === "object" && "content" in obj;
}

/**
 * 检查对象是否为媒体类型对象
 */
export function isMediaTypeObject(
  obj: any
): obj is OpenAPIV3.MediaTypeObject {
  return (
    obj &&
    typeof obj === "object" &&
    (obj.schema || obj.example || obj.examples || obj.encoding)
  );
}

/**
 * 检查对象是否为 Schema 对象
 */
export function isSchemaObject(
  obj: any
): obj is OpenAPIV3.SchemaObject {
  if (!obj || typeof obj !== "object") return false;
  
  // Schema 对象可能有多种属性，检查常见的
  const schemaKeys = [
    "type",
    "properties",
    "items",
    "allOf",
    "oneOf",
    "anyOf",
    "not",
    "format",
    "enum",
    "minimum",
    "maximum",
    "pattern",
    "required"
  ];
  
  return schemaKeys.some(key => key in obj);
}

/**
 * 安全地获取响应对象
 */
export function safeGetResponse(
  responses: OpenAPIV3.ResponsesObject | undefined,
  statusCode: string
): OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject | null {
  if (!responses) return null;
  
  const response = responses[statusCode];
  if (!response) return null;
  
  return response;
}

/**
 * 安全地获取操作对象
 */
export function safeGetOperation(
  pathItem: OpenAPIV3.PathItemObject | undefined,
  method: string
): OpenAPIV3.OperationObject | null {
  if (!pathItem) return null;
  
  const normalizedMethod = method.toLowerCase();
  const operation = pathItem[normalizedMethod as keyof OpenAPIV3.PathItemObject];
  
  if (!operation || !isOperationObject(operation)) {
    return null;
  }
  
  return operation;
}

/**
 * 检查是否为有效的 HTTP 方法
 */
export function isValidHttpMethod(
  method: string
): method is "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "trace" {
  const validMethods = ["get", "post", "put", "delete", "patch", "options", "head", "trace"];
  return validMethods.includes(method.toLowerCase());
}

/**
 * 检查是否为有效的参数位置
 */
export function isValidParameterLocation(
  location: string
): location is "query" | "header" | "path" | "cookie" {
  const validLocations = ["query", "header", "path", "cookie"];
  return validLocations.includes(location);
}