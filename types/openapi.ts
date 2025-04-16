// types/openapi.ts

// Basic OpenAPI 3.0 Types (Simplified)
// Consider using a library like openapi-types for more comprehensive definitions

export interface ReferenceObject { $ref: string; }

// HTTP方法类型定义
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE';

// 格式类型定义，用于schema.format
export type FormatType = 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' |
  'date' | 'date-time' | 'password' | 'email' | 'uuid' | 'uri' |
  'hostname' | 'ipv4' | 'ipv6';

// JSON Schema 组合关键字
export type SchemaCompositionKeyword = 'allOf' | 'anyOf' | 'oneOf' | 'not';

// 安全方案类型
export type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'mutualTLS';

// OAuth流程类型
export type OAuthFlowType = 'implicit' | 'password' | 'clientCredentials' | 'authorizationCode';

// 数据类型
export type DataType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';

// 参数样式类型
export type StyleType = 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject' | 'matrix' | 'label';

// 参数位置类型
export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie';

// ExternalDocumentationObject 定义
export interface ExternalDocumentationObject {
  description?: string;
  url: string;
}

// SchemaObject 定义
export interface SchemaObject {
  type?: DataType;
  format?: FormatType;
  enum?: any[];
  default?: any;
  example?: any;
  properties?: Record<string, SchemaObject | ReferenceObject>;
  required?: string[];
  items?: SchemaObject | ReferenceObject;
  allOf?: (SchemaObject | ReferenceObject)[];
  anyOf?: (SchemaObject | ReferenceObject)[];
  oneOf?: (SchemaObject | ReferenceObject)[];
  not?: SchemaObject | ReferenceObject;
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  nullable?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  maxProperties?: number;
  multipleOf?: number;
  exclusiveMinimum?: boolean | number;
  exclusiveMaximum?: boolean | number;
}

export interface BaseParameterObject {
  name: string;
  in: ParameterLocation;
  required?: boolean;
  description?: string;
  schema?: SchemaObject | ReferenceObject;
  deprecated?: boolean;
  style?: StyleType;
  explode?: boolean;
  allowEmptyValue?: boolean;
  allowReserved?: boolean;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  content?: Record<string, MediaTypeObject>;
}
export interface ParameterObject extends BaseParameterObject { /* Allow extension */ }

export interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

export interface EncodingPropertyObject {
  contentType?: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

export interface MediaTypeObject {
  schema?: SchemaObject | ReferenceObject;
  example?: any;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  encoding?: Record<string, EncodingPropertyObject>;
}

export interface RequestBodyObject {
  description?: string;
  content: Record<string, MediaTypeObject>;
  required?: boolean;
}

export type HeaderObject = Omit<ParameterObject, "name" | "in">;

export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: any; // ServerObject
}

export interface ResponseObject {
  description: string;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  content?: Record<string, MediaTypeObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
}
export interface ResponsesObjectMap { [statusCode: string]: ResponseObject | ReferenceObject; }

export interface SecurityRequirementObject { [name: string]: string[]; }

export interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  responses?: ResponsesObjectMap;
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
  externalDocs?: ExternalDocumentationObject;
}

export interface PathItemObject {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: any[]; // ServerObject[]
  parameters?: (ParameterObject | ReferenceObject)[];
}

export interface PathsObject { [path: string]: PathItemObject; }

// 回调对象是一个运行时表达式到PathItem对象的映射
export interface CallbackObject {
  // 键是运行时表达式，值是PathItem对象
  [expression: string]: PathItemObject;
}

export interface OAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

export interface OAuthFlows {
  [flowType: string]: OAuthFlow | undefined;
  implicit?: OAuthFlow;
  password?: OAuthFlow;
  clientCredentials?: OAuthFlow;
  authorizationCode?: OAuthFlow;
}

export interface SecuritySchemeObject {
  type: SecuritySchemeType;
  description?: string;
  name?: string; // For apiKey
  in?: 'query' | 'header' | 'cookie'; // For apiKey
  scheme?: string; // For http
  bearerFormat?: string; // For http bearer
  flows?: OAuthFlows; // For oauth2
  openIdConnectUrl?: string; // For openIdConnect
}

export interface ComponentsObject {
  schemas?: Record<string, SchemaObject | ReferenceObject>;
  responses?: Record<string, ResponseObject | ReferenceObject>;
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
  callbacks?: Record<string, CallbackObject | ReferenceObject>;
}

export interface ContactObject {
  name?: string;
  url?: string;
  email?: string;
}

export interface LicenseObject {
  name: string;
  identifier?: string;
  url?: string;
}

export interface InfoObject {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: string;
}

export interface ServerVariableObject {
  enum?: string[];
  default: string;
  description?: string;
}

export interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
}

export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export interface OpenApiSpec {
  openapi: string;
  info: InfoObject;
  servers?: ServerObject[];
  paths: PathsObject;
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
}
