import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import React, { useState } from "react";

// Type definitions
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export interface ParameterObject {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  required?: boolean;
  schema?: any;
  description?: string;
  [key: string]: any;
}

export interface RequestBodyObject {
  content?: {
    [mediaType: string]: {
      schema?: any;
      example?: any;
    };
  };
  required?: boolean;
  description?: string;
  [key: string]: any;
}

export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses?: any;
  security?: any[];
  [key: string]: any;
}

export interface ComponentsObject {
  [key: string]: any;
}

export interface SecuritySchemeObject {
  type: "apiKey" | "http" | "oauth2" | "openIdConnect";
  scheme?: string;
  name?: string;
  in?: "query" | "header" | "cookie";
  flows?: any;
  [key: string]: any;
}

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}

interface AuthState {
  apiKey?: { [name: string]: string };
  http?: { [scheme: string]: string };
  oauth2?: { [flow: string]: { token: string; scopes: string[] } };
  openIdConnect?: { token: string };
}

interface TryItOutPanelProps {
  operation: OperationObject;
  method: HttpMethod;
  path: string;
  baseUrl?: string;
  components?: ComponentsObject;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

// Utility functions
function resolveRef<T>(ref: any, components?: ComponentsObject, type?: string): T | null {
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

function generateExample(schema: any, components?: ComponentsObject): any {
  if (!schema) return "example data";

  if (schema.example) return schema.example;

  switch (schema.type) {
    case "string":
      return schema.enum ? schema.enum[0] : "string";
    case "number":
    case "integer":
      return 123;
    case "boolean":
      return true;
    case "array":
      return [generateExample(schema.items, components)];
    case "object":
      const obj: any = {};
      if (schema.properties) {
        Object.keys(schema.properties).forEach(key => {
          obj[key] = generateExample(schema.properties[key], components);
        });
      }
      return obj;
    default:
      return "example";
  }
}

const TryItOutPanel = React.forwardRef<HTMLDivElement, TryItOutPanelProps>(
  ({
    operation,
    method,
    path,
    baseUrl = "",
    components,
    collapsible = false,
    defaultCollapsed = false,
    className,
  }, ref) => {
    // State management
    const [paramValues, setParamValues] = useState<Record<string, string>>({});
    const [requestBodyValue, setRequestBodyValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<ResponseData | null>(null);
    const [headers, setHeaders] = useState<Record<string, string>>({
      "Content-Type": "application/json",
    });
    const [error, setError] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
    const [authState, setAuthState] = useState<AuthState>({});

    // Toggle collapse state
    const toggleCollapse = () => {
      if (collapsible) {
        setCollapsed(!collapsed);
      }
    };

    // Resolve and combine request parameters
    const resolveParameters = () => {
      const resolvedParams: ParameterObject[] = [];

      if (operation.parameters) {
        operation.parameters.forEach((param) => {
          if ("$ref" in param) {
            const resolvedParam = resolveRef<ParameterObject>(
              param,
              components,
              "parameters",
            );
            if (resolvedParam) {
              resolvedParams.push(resolvedParam);
            }
          } else {
            resolvedParams.push(param as ParameterObject);
          }
        });
      }

      return resolvedParams;
    };

    // Resolve request body
    const resolveRequestBody = () => {
      if (!operation.requestBody) return null;
      return operation.requestBody;
    };

    // Handle parameter changes
    const handleParamChange = (name: string, value: string) => {
      setParamValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    // Handle request body changes
    const handleRequestBodyChange = (value: string) => {
      setRequestBodyValue(value);
    };

    // Build request URL
    const buildRequestUrl = () => {
      let url = baseUrl + path;
      const parameters = resolveParameters();

      // Replace path parameters
      parameters
        .filter((param) => param.in === "path")
        .forEach((param) => {
          const value = paramValues[param.name] || "";
          url = url.replace(`{${param.name}}`, encodeURIComponent(value));
        });

      // Add query parameters
      const queryParams = parameters
        .filter((param) => param.in === "query" && paramValues[param.name])
        .map(
          (param) =>
            `${param.name}=${encodeURIComponent(paramValues[param.name] || "")}`,
        );

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      return url;
    };

    // Build request headers
    const buildRequestHeaders = () => {
      const requestHeaders: Record<string, string> = { ...headers };
      const parameters = resolveParameters();

      // Add header parameters
      parameters
        .filter((param) => param.in === "header" && paramValues[param.name])
        .forEach((param) => {
          requestHeaders[param.name] = paramValues[param.name] || "";
        });

      return requestHeaders;
    };

    // Send request
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        const url = buildRequestUrl();
        const requestHeaders = buildRequestHeaders();

        // Get resolved request body
        const requestBody = resolveRequestBody();
        let body: string | undefined = undefined;

        if (requestBody && requestBodyValue) {
          try {
            // Parse JSON string to check if it's valid
            JSON.parse(requestBodyValue);
            body = requestBodyValue;
          } catch (e) {
            setError("Request body is not valid JSON");
            setIsLoading(false);
            return;
          }
        }

        const startTime = Date.now();

        const response = await fetch(url, {
          method: method.toUpperCase(),
          headers: requestHeaders,
          body: ["GET", "HEAD"].includes(method.toUpperCase()) ? undefined : body,
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        // Read response headers
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

        // Read response body
        let responseBody = "";
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const jsonBody = await response.json();
          responseBody = JSON.stringify(jsonBody, null, 2);
        } else if (
          contentType.includes("text/") ||
          contentType.includes("application/xml") ||
          contentType.includes("application/javascript")
        ) {
          responseBody = await response.text();
        } else {
          responseBody = "Cannot display binary response content";
        }

        setResponse({
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseBody,
          time: duration,
        });
      } catch (err) {
        console.error("Request error:", err);
        setError(err instanceof Error ? err.message : "Error sending request");
      } finally {
        setIsLoading(false);
      }
    };

    // Get status style
    const getStatusStyle = (status: number) => {
      if (status >= 200 && status < 300) return "text-green-600 dark:text-green-400";
      if (status >= 300 && status < 400) return "text-yellow-600 dark:text-yellow-400";
      if (status >= 400) return "text-red-600 dark:text-red-400";
      return "text-neutral-600 dark:text-neutral-400";
    };

    // Generate request body example
    const getRequestBodyExample = () => {
      const requestBody = resolveRequestBody();
      if (!requestBody || !requestBody.content) return { example: "data" };

      const contentType = requestBody.content["application/json"]
        ? "application/json"
        : Object.keys(requestBody.content)[0];

      if (!contentType || !requestBody.content[contentType].schema) return { example: "data" };

      const schema = requestBody.content[contentType].schema;
      if (!schema) return { example: "data" };

      return (
        requestBody.content[contentType].example ||
        generateExample(schema, components)
      );
    };

    // Initialize request body value
    React.useEffect(() => {
      if (!requestBodyValue && resolveRequestBody()) {
        const example = getRequestBodyExample();
        setRequestBodyValue(JSON.stringify(example, null, 2));
      }
    }, [operation, requestBodyValue]);

    const parameters = resolveParameters();
    const requestBody = resolveRequestBody();

    return (
      <div
        ref={ref}
        className={cn(
          "border dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-neutral-800 transition-all",
          className
        )}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700/60"
          onClick={toggleCollapse}
        >
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            Try it out
          </h3>
          {collapsible && (
            <span className="text-neutral-500 dark:text-neutral-400">
              {collapsed ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-5 w-5" />
              )}
            </span>
          )}
        </div>

        {!collapsed && (
          <div className="p-4 space-y-4">
            {/* Parameters */}
            {parameters.length > 0 && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white mb-3">
                  Parameters
                </h4>
                <div className="space-y-3">
                  {parameters.map((param) => (
                    <div key={param.name} className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {param.name}
                        {param.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                        <span className="text-xs text-neutral-500 ml-2">
                          ({param.in})
                        </span>
                      </label>
                      {param.description && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {param.description}
                        </p>
                      )}
                      <input
                        type="text"
                        value={paramValues[param.name] || ""}
                        onChange={(e) => handleParamChange(param.name, e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 dark:text-white text-sm"
                        placeholder={`Enter ${param.name}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Body */}
            {requestBody && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white mb-3">
                  Request Body
                  {requestBody.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h4>
                {requestBody.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    {requestBody.description}
                  </p>
                )}
                <textarea
                  value={requestBodyValue}
                  onChange={(e) => handleRequestBodyChange(e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-neutral-700 dark:text-white text-sm font-mono"
                  placeholder="Enter request body (JSON)"
                />
              </div>
            )}

            {/* Send Button */}
            <div>
              <button
                onClick={sendRequest}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors text-sm font-medium"
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Sending..." : "Send Request"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Response */}
            {response && (
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-white mb-3">
                  Response
                </h4>
                <div className="space-y-3">
                  {/* Status and timing */}
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Status:
                    </span>
                    <span className={cn("font-medium", getStatusStyle(response.status))}>
                      {response.status} {response.statusText}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Time: {response.time}ms
                    </span>
                  </div>

                  {/* Response body */}
                  <div>
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                      Response Body
                    </label>
                    <pre className="w-full max-h-64 p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md overflow-auto text-sm">
                      <code>{response.body}</code>
                    </pre>
                  </div>

                  {/* Response headers */}
                  <div>
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                      Response Headers
                    </label>
                    <pre className="w-full max-h-32 p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-md overflow-auto text-sm">
                      <code>{JSON.stringify(response.headers, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

TryItOutPanel.displayName = "TryItOutPanel";

export {
  TryItOutPanel, type AuthState, type ComponentsObject, type OperationObject,
  type ParameterObject,
  type RequestBodyObject, type ResponseData, type SecuritySchemeObject, type TryItOutPanelProps
};

