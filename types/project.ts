import type { OpenAPIV3 } from "openapi-types";

export interface CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.ReactNode;
  generateCode(params: CodeGeneratorParams): string;
}

export interface CodeGeneratorParams {
  endpoint: string;
  method: string;
  parameters: OpenAPIV3.ParameterObject[];
  requestBody?: OpenAPIV3.RequestBodyObject;
  requestBodyExample?: any;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

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
  | "webhooks";

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  duration: number;
}
