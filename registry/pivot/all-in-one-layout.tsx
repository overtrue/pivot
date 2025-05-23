import { cn } from "@/lib/utils";
import * as yaml from "js-yaml";
import React, { useCallback, useEffect, useState } from "react";

// Type definitions
export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    contact?: any;
    license?: any;
    termsOfService?: string;
    [key: string]: any;
  };
  paths: {
    [path: string]: PathItemObject;
  };
  components?: {
    schemas?: { [name: string]: any };
    responses?: { [name: string]: any };
    parameters?: { [name: string]: any };
    examples?: { [name: string]: any };
    requestBodies?: { [name: string]: any };
    headers?: { [name: string]: any };
    securitySchemes?: { [name: string]: any };
    links?: { [name: string]: any };
    callbacks?: { [name: string]: any };
    [key: string]: any;
  };
  servers?: ServerObject[];
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentationObject;
  [key: string]: any;
}

export interface PathItemObject {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  summary?: string;
  description?: string;
  parameters?: ParameterObject[];
  servers?: ServerObject[];
  [key: string]: any;
}

export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses?: ResponsesObject;
  callbacks?: { [name: string]: any };
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
  servers?: ServerObject[];
  externalDocs?: ExternalDocumentationObject;
  [key: string]: any;
}

export interface ParameterObject {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  required?: boolean;
  deprecated?: boolean;
  schema?: SchemaObject;
  description?: string;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  example?: any;
  examples?: { [name: string]: any };
  [key: string]: any;
}

export interface RequestBodyObject {
  description?: string;
  content: { [mediaType: string]: MediaTypeObject };
  required?: boolean;
  [key: string]: any;
}

export interface ResponsesObject {
  [statusCode: string]: ResponseObject;
}

export interface ResponseObject {
  description: string;
  headers?: { [name: string]: HeaderObject };
  content?: { [mediaType: string]: MediaTypeObject };
  links?: { [name: string]: any };
  [key: string]: any;
}

export interface MediaTypeObject {
  schema?: SchemaObject;
  example?: any;
  examples?: { [name: string]: any };
  encoding?: { [name: string]: any };
  [key: string]: any;
}

export interface SchemaObject {
  type?: string;
  format?: string;
  title?: string;
  description?: string;
  default?: any;
  enum?: any[];
  example?: any;
  examples?: any[];
  properties?: { [name: string]: SchemaObject };
  items?: SchemaObject;
  required?: string[];
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  not?: SchemaObject;
  additionalProperties?: boolean | SchemaObject;
  nullable?: boolean;
  discriminator?: any;
  readOnly?: boolean;
  writeOnly?: boolean;
  deprecated?: boolean;
  xml?: any;
  externalDocs?: ExternalDocumentationObject;
  $ref?: string;
  [key: string]: any;
}

export interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject;
  example?: any;
  examples?: { [name: string]: any };
  [key: string]: any;
}

export interface ServerObject {
  url: string;
  description?: string;
  variables?: { [name: string]: ServerVariableObject };
  [key: string]: any;
}

export interface ServerVariableObject {
  enum?: string[];
  default: string;
  description?: string;
  [key: string]: any;
}

export interface SecurityRequirementObject {
  [name: string]: string[];
}

export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  [key: string]: any;
}

export interface ExternalDocumentationObject {
  description?: string;
  url: string;
  [key: string]: any;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

interface AllInOneLayoutProps {
  spec: OpenApiSpec | string | null;
  className?: string;
}

interface OperationInfo {
  path: string;
  method: string;
  operation: OperationObject;
}

// Utility functions
function resolveRef<T>(ref: any, components?: any): T | null {
  if (!ref || !ref.$ref) return ref as T;

  const refPath = ref.$ref.replace("#/components/", "").split("/");
  let resolved = components;

  for (const part of refPath) {
    if (resolved && resolved[part]) {
      resolved = resolved[part];
    } else {
      return null;
    }
  }

  return resolved as T;
}

function getOperationsByTag(spec: OpenApiSpec): Record<string, OperationInfo[]> {
  const operationsByTag: Record<string, OperationInfo[]> = {};

  Object.entries(spec.paths || {}).forEach(([path, pathItem]) => {
    const methods: (keyof PathItemObject)[] = ["get", "post", "put", "delete", "patch", "head", "options"];

    methods.forEach((method) => {
      const operation = pathItem[method] as OperationObject;
      if (!operation) return;

      const tags = operation.tags || ["default"];

      tags.forEach((tag) => {
        if (!operationsByTag[tag]) {
          operationsByTag[tag] = [];
        }
        operationsByTag[tag].push({
          path,
          method: method.toUpperCase(),
          operation,
        });
      });
    });
  });

  return operationsByTag;
}

// Mock components to replace complex dependencies
const SectionTitle = React.forwardRef<HTMLDivElement, { title: string; className?: string }>(
  ({ title, className }, ref) => (
    <div ref={ref} className={cn("text-xl font-semibold text-neutral-900 dark:text-white", className)}>
      {title}
    </div>
  )
);
SectionTitle.displayName = "SectionTitle";

const InfoSection = React.forwardRef<HTMLDivElement, { info: any }>(
  ({ info }, ref) => (
    <div ref={ref} className="space-y-4">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{info.title}</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">Version: {info.version}</p>
      {info.description && (
        <p className="text-neutral-700 dark:text-neutral-300">{info.description}</p>
      )}
    </div>
  )
);
InfoSection.displayName = "InfoSection";

const ServersSection = React.forwardRef<HTMLDivElement, { servers: ServerObject[] }>(
  ({ servers }, ref) => (
    <div ref={ref} className="space-y-2">
      {servers.map((server, index) => (
        <div key={index} className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
          <code className="text-sm font-mono text-blue-600 dark:text-blue-400">{server.url}</code>
          {server.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{server.description}</p>
          )}
        </div>
      ))}
    </div>
  )
);
ServersSection.displayName = "ServersSection";

const SimpleOperationBox = React.forwardRef<HTMLDivElement, {
  path: string;
  method: string;
  operation: OperationObject;
  onClick?: () => void;
  isSelected?: boolean;
}>(({ path, method, operation, onClick, isSelected }, ref) => {
  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "get": return "bg-blue-500 text-white";
      case "post": return "bg-green-500 text-white";
      case "put": return "bg-orange-500 text-white";
      case "delete": return "bg-red-500 text-white";
      case "patch": return "bg-purple-500 text-white";
      default: return "bg-neutral-500 text-white";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-colors",
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className={cn("px-2 py-1 text-xs font-medium rounded", getMethodColor(method))}>
          {method}
        </span>
        <code className="font-mono text-sm text-neutral-700 dark:text-neutral-300">{path}</code>
      </div>
      {operation.summary && (
        <h3 className="font-medium text-neutral-900 dark:text-white">{operation.summary}</h3>
      )}
      {operation.description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{operation.description}</p>
      )}
    </div>
  );
});
SimpleOperationBox.displayName = "SimpleOperationBox";

const MIN_SIDEBAR_WIDTH = 280;
const MAX_SIDEBAR_WIDTH = 450;
const DEFAULT_SIDEBAR_WIDTH = 320;

const AllInOneLayout = React.forwardRef<HTMLDivElement, AllInOneLayoutProps>(
  ({ spec: inputSpec, className }, ref) => {
    const [parsedSpec, setParsedSpec] = useState<OpenApiSpec | null>(null);
    const [parseError, setParseError] = useState<string | null>(null);
    const [selectedOperation, setSelectedOperation] = useState<OperationInfo | null>(null);
    const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);

    // Parse spec
    useEffect(() => {
      if (typeof inputSpec === "string") {
        try {
          try {
            const jsonData = JSON.parse(inputSpec);
            setParsedSpec(jsonData);
            setParseError(null);
            return;
          } catch {
            const yamlData = yaml.load(inputSpec);
            if (typeof yamlData === "object" && yamlData !== null) {
              setParsedSpec(yamlData as OpenApiSpec);
              setParseError(null);
              return;
            } else {
              throw new Error("Parsed YAML is not a valid object");
            }
          }
        } catch (error) {
          setParseError(
            `Failed to parse OpenAPI spec: ${error instanceof Error ? error.message : "Unknown error"}`
          );
          setParsedSpec(null);
        }
      } else {
        setParsedSpec(inputSpec);
        setParseError(null);
      }
    }, [inputSpec]);

    // Auto-select first operation
    useEffect(() => {
      if (!parsedSpec || selectedOperation) return;

      const operationsByTag = getOperationsByTag(parsedSpec);
      const tags = Object.keys(operationsByTag);

      if (tags.length > 0) {
        const firstTag = tags[0];
        const operations = operationsByTag[firstTag];
        if (operations && operations.length > 0) {
          setSelectedOperation(operations[0]);
        }
      }
    }, [parsedSpec, selectedOperation]);

    const handleSelectOperation = useCallback((operation: OperationInfo) => {
      setSelectedOperation(operation);
    }, []);

    if (parseError) {
      return (
        <div ref={ref} className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md text-center max-w-md">
            <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
              Specification Parse Error
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">{parseError}</p>
          </div>
        </div>
      );
    }

    if (!parsedSpec) {
      return (
        <div ref={ref} className="flex justify-center items-center min-h-screen dark:text-neutral-200">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-neutral-500 dark:border-neutral-400"></div>
          <p className="ml-4 text-neutral-500 dark:text-neutral-400">Parsing specification...</p>
        </div>
      );
    }

    const operationsByTag = getOperationsByTag(parsedSpec);

    return (
      <div ref={ref} className={cn("flex min-h-screen bg-white dark:bg-neutral-900", className)}>
        {/* Sidebar */}
        <div
          className="bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto"
          style={{ width: sidebarWidth, minWidth: MIN_SIDEBAR_WIDTH, maxWidth: MAX_SIDEBAR_WIDTH }}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              {parsedSpec.info?.title || "API Documentation"}
            </h2>

            <div className="space-y-4">
              {Object.entries(operationsByTag).map(([tag, operations]) => (
                <div key={tag}>
                  <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                    {tag}
                  </h3>
                  <div className="space-y-1">
                    {operations.map((operation, index) => {
                      const isSelected = selectedOperation?.path === operation.path &&
                        selectedOperation?.method === operation.method;
                      return (
                        <button
                          key={`${operation.method}-${operation.path}-${index}`}
                          onClick={() => handleSelectOperation(operation)}
                          className={cn(
                            "w-full text-left p-2 rounded-md text-sm transition-colors flex items-center gap-2",
                            isSelected
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                          )}
                        >
                          <span className={cn(
                            "px-1.5 py-0.5 text-xs font-medium rounded uppercase",
                            isSelected ? "bg-blue-500 text-white" : "bg-neutral-500 text-white"
                          )}>
                            {operation.method}
                          </span>
                          <span className="font-mono text-xs truncate">{operation.path}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Info Section */}
            <div className="mb-10">
              <SectionTitle
                title="API Information"
                className="text-2xl mb-6 pb-2 border-b dark:border-neutral-700"
              />
              <InfoSection info={parsedSpec.info} />
            </div>

            {/* Servers Section */}
            {parsedSpec.servers && parsedSpec.servers.length > 0 && (
              <div className="mb-10">
                <SectionTitle
                  title="Servers"
                  className="text-2xl mb-6 pb-2 border-b dark:border-neutral-700"
                />
                <ServersSection servers={parsedSpec.servers} />
              </div>
            )}

            {/* Selected Operation Detail */}
            {selectedOperation && (
              <div className="mb-10">
                <SectionTitle
                  title="Operation Details"
                  className="text-2xl mb-6 pb-2 border-b dark:border-neutral-700"
                />
                <SimpleOperationBox
                  path={selectedOperation.path}
                  method={selectedOperation.method}
                  operation={selectedOperation.operation}
                  isSelected={true}
                />

                {/* Operation Details */}
                <div className="mt-6 space-y-6">
                  {/* Parameters */}
                  {selectedOperation.operation.parameters && selectedOperation.operation.parameters.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">Parameters</h3>
                      <div className="space-y-2">
                        {selectedOperation.operation.parameters.map((param, index) => (
                          <div key={index} className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-neutral-900 dark:text-white">{param.name}</span>
                              <span className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded">
                                {param.in}
                              </span>
                              {param.required && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
                                  required
                                </span>
                              )}
                            </div>
                            {param.description && (
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">{param.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Request Body */}
                  {selectedOperation.operation.requestBody && (
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">Request Body</h3>
                      <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                        {selectedOperation.operation.requestBody.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                            {selectedOperation.operation.requestBody.description}
                          </p>
                        )}
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Content Types: {Object.keys(selectedOperation.operation.requestBody.content || {}).join(", ")}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Responses */}
                  {selectedOperation.operation.responses && (
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">Responses</h3>
                      <div className="space-y-2">
                        {Object.entries(selectedOperation.operation.responses).map(([status, response]) => (
                          <div key={status} className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-neutral-900 dark:text-white">{status}</span>
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                {(response as ResponseObject).description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* All Operations */}
            <div className="mb-10">
              <SectionTitle
                title="All Operations"
                className="text-2xl mb-6 pb-2 border-b dark:border-neutral-700"
              />
              <div className="space-y-6">
                {Object.entries(operationsByTag).map(([tag, operations]) => (
                  <div key={tag}>
                    <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300 mb-4">{tag}</h3>
                    <div className="space-y-3">
                      {operations.map((operation, index) => (
                        <SimpleOperationBox
                          key={`${operation.method}-${operation.path}-${index}`}
                          path={operation.path}
                          method={operation.method}
                          operation={operation.operation}
                          onClick={() => handleSelectOperation(operation)}
                          isSelected={selectedOperation?.path === operation.path &&
                            selectedOperation?.method === operation.method}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
);

AllInOneLayout.displayName = "AllInOneLayout";

export {
  AllInOneLayout,
  type AllInOneLayoutProps,
  type ExternalDocumentationObject,
  type HeaderObject,
  type HttpMethod,
  type MediaTypeObject,
  type OpenApiSpec,
  type OperationInfo,
  type OperationObject,
  type ParameterObject,
  type PathItemObject,
  type RequestBodyObject,
  type ResponseObject,
  type ResponsesObject,
  type SchemaObject,
  type SecurityRequirementObject,
  type ServerObject,
  type ServerVariableObject,
  type TagObject
};

