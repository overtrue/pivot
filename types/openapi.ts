// types/openapi.ts

// Basic OpenAPI 3.0 Types (Simplified)
// Consider using a library like openapi-types for more comprehensive definitions

export interface ReferenceObject { $ref: string; }

export interface BaseParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  required?: boolean;
  description?: string;
  schema?: any; // Should be SchemaObject | ReferenceObject
  deprecated?: boolean;
  // ... other parameter fields like style, explode, examples etc.
}
export interface ParameterObject extends BaseParameterObject { /* Allow extension */ }

export interface MediaTypeObject {
  schema?: any; // Should be SchemaObject | ReferenceObject
  example?: any;
  examples?: Record<string, any>; // ExampleObject | ReferenceObject
  encoding?: Record<string, any>; // EncodingObject
}

export interface RequestBodyObject {
  description?: string;
  content: Record<string, MediaTypeObject>;
  required?: boolean;
}

export interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: any; // Should be SchemaObject | ReferenceObject
  // ... other header fields
}

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
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  // ... callbacks, servers, externalDocs etc.
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

export interface SecuritySchemeObject {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  name?: string; // For apiKey
  in?: 'query' | 'header' | 'cookie'; // For apiKey
  scheme?: string; // For http
  bearerFormat?: string; // For http bearer
  flows?: any; // OAuthFlowsObject - For oauth2
  openIdConnectUrl?: string; // For openIdConnect
}

export interface OpenApiComponents {
  schemas?: Record<string, any>; // SchemaObject | ReferenceObject
  responses?: Record<string, ResponseObject | ReferenceObject>;
  parameters?: Record<string, ParameterObject | ReferenceObject>;
  examples?: Record<string, any>; // ExampleObject | ReferenceObject
  requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
  headers?: Record<string, HeaderObject | ReferenceObject>;
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  links?: Record<string, LinkObject | ReferenceObject>;
  callbacks?: Record<string, any>; // CallbackObject | ReferenceObject
}

export interface OpenApiSpec {
  openapi: string;
  info: any; // InfoObject
  servers?: any[]; // ServerObject[]
  paths: PathsObject;
  components?: OpenApiComponents;
  security?: SecurityRequirementObject[];
  tags?: any[]; // TagObject[]
  externalDocs?: any; // ExternalDocumentationObject
}
