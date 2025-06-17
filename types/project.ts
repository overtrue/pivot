// 项目特定类型定义
// 这些类型不在 openapi-types 包中，或者是项目特有的扩展

export type DataType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';
export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export type SecuritySchemeType = 'http' | 'apiKey' | 'oauth2' | 'openIdConnect' | 'mutualTLS';

export type FormatType =
  | "int32" | "int64" | "float" | "double" | "byte" | "binary"
  | "date" | "date-time" | "password" | "email" | "uuid";

export type StyleType =
  | "matrix" | "label" | "form" | "simple" | "spaceDelimited" | "pipeDelimited" | "deepObject";

export type OAuthFlowType =
  | "implicit" | "password" | "clientCredentials" | "authorizationCode";

export type SchemaCompositionKeyword = "allOf" | "anyOf" | "oneOf" | "not";

// 响应数据接口（项目特定）
export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
}

// OAuth 流程类型
export interface OAuthFlows {
  implicit?: {
    authorizationUrl: string;
    refreshUrl?: string;
    scopes: Record<string, string>;
  };
  password?: {
    tokenUrl: string;
    refreshUrl?: string;
    scopes: Record<string, string>;
  };
  clientCredentials?: {
    tokenUrl: string;
    refreshUrl?: string;
    scopes: Record<string, string>;
  };
  authorizationCode?: {
    authorizationUrl: string;
    tokenUrl: string;
    refreshUrl?: string;
    scopes: Record<string, string>;
  };
}

// 组件类型（用于组件详情显示）
export type ComponentType =
  | "schemas"
  | "responses"
  | "parameters"
  | "examples"
  | "requestBodies"
  | "headers"
  | "securitySchemes"
  | "links"
  | "callbacks"
  | "webhooks"; // 扩展类型，虽然不在标准 OpenAPI 3.0 中，但项目中使用

// 代码生成器参数
export interface CodeGeneratorParams {
  endpoint: string;
  method: HttpMethod;
  parameters: any[]; // 使用 any 避免复杂的类型转换
  requestBody?: any;
  requestBodyExample: any;
}

// 代码生成器接口
export interface CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.ReactNode;
  generateCode(params: CodeGeneratorParams): string;
}
