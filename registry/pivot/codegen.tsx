"use client";

import { cn } from "@/lib/utils";
import { Braces, Code2, Terminal } from "lucide-react";
import React, { useState } from "react";
import { CopyButton } from "./copy-button";

// Type definitions
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export interface ParameterObject {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  required?: boolean;
  schema?: any;
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
  [key: string]: any;
}

export interface ComponentsObject {
  [key: string]: any;
}

export interface CodeGeneratorParams {
  endpoint: string;
  method: HttpMethod;
  parameters: ParameterObject[];
  requestBody?: RequestBodyObject;
  requestBodyExample: any;
}

export interface CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.ReactNode;
  generateCode(params: CodeGeneratorParams): string;
}

// Utility functions
function replaceDoubleQuotes(str: string): string {
  return str.replace(/"/g, "'");
}

function generateExample(schema: any, components?: ComponentsObject, options?: any): any {
  // Improved example generator with realistic data
  if (!schema) return { message: "Hello World" };

  if (schema.example) return schema.example;

  // Generate realistic examples based on field names and types
  const generateByFieldName = (fieldName: string, type: string): any => {
    const lowerName = fieldName.toLowerCase();

    // Email fields
    if (lowerName.includes('email')) {
      return "user@example.com";
    }

    // ID fields
    if (lowerName.includes('id') || lowerName === 'uuid') {
      return type === 'integer' ? 12345 : "usr_123abc456def";
    }

    // Name fields
    if (lowerName.includes('name') || lowerName.includes('title')) {
      if (lowerName.includes('first')) return "John";
      if (lowerName.includes('last')) return "Doe";
      if (lowerName.includes('user')) return "john_doe";
      if (lowerName.includes('company')) return "Acme Corp";
      return "Sample Name";
    }

    // URL fields
    if (lowerName.includes('url') || lowerName.includes('link') || lowerName.includes('avatar')) {
      return "https://example.com/resource";
    }

    // Phone fields
    if (lowerName.includes('phone') || lowerName.includes('mobile')) {
      return "+1-555-123-4567";
    }

    // Address fields
    if (lowerName.includes('address')) {
      return "123 Main St, Anytown, ST 12345";
    }

    // Date fields
    if (lowerName.includes('date') || lowerName.includes('time') || lowerName.includes('created') || lowerName.includes('updated')) {
      return "2024-01-15T10:30:00Z";
    }

    // Status fields
    if (lowerName.includes('status')) {
      return "active";
    }

    // Count/number fields
    if (lowerName.includes('count') || lowerName.includes('total') || lowerName.includes('amount')) {
      return 42;
    }

    // Age fields
    if (lowerName.includes('age')) {
      return 28;
    }

    // Description fields
    if (lowerName.includes('description') || lowerName.includes('content') || lowerName.includes('message')) {
      return "This is a sample description that provides meaningful context.";
    }

    return null; // Fall back to type-based generation
  };

  switch (schema.type) {
    case "string":
      if (schema.enum) return schema.enum[0];
      if (schema.format === "email") return "user@example.com";
      if (schema.format === "date") return "2024-01-15";
      if (schema.format === "date-time") return "2024-01-15T10:30:00Z";
      if (schema.format === "uri") return "https://example.com";
      if (schema.format === "uuid") return "123e4567-e89b-12d3-a456-426614174000";
      return "Sample text";

    case "number":
    case "integer":
      if (schema.minimum !== undefined) return schema.minimum + 1;
      if (schema.maximum !== undefined) return Math.min(schema.maximum - 1, 100);
      return 42;

    case "boolean":
      return true;

    case "array":
      const itemExample = generateExample(schema.items, components, options);
      return [itemExample];

    case "object":
      const obj: any = {};
      if (schema.properties) {
        Object.keys(schema.properties).forEach(key => {
          const fieldExample = generateByFieldName(key, schema.properties[key].type);
          obj[key] = fieldExample !== null
            ? fieldExample
            : generateExample(schema.properties[key], components, options);
        });
      }
      return obj;

    default:
      return "sample_value";
  }
}

function resolveRef<T>(ref: any, components?: ComponentsObject, type?: string): T | null {
  if (!ref || !ref.$ref) return ref as T;

  // Simple ref resolution - in production this would be more robust
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

// Code Generators
class CurlGenerator implements CodeGenerator {
  id = "curl";
  label = "cURL";

  getIcon() {
    return <Terminal size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, parameters, requestBodyExample, requestBody } = params;
    let code = `curl -X ${method} "${endpoint}"`;

    code += '\n  -H "Content-Type: application/json"';

    const queryParams = parameters.filter((p) => p.in === "query");
    if (queryParams.length > 0) {
      const queryString = queryParams.map((p) => `${p.name}=value`).join("&");
      code += `?${queryString}`;
    }

    if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
      code += `\n  -d '${JSON.stringify(requestBodyExample, null, 2)}'`;
    }

    return code;
  }
}

class PythonGenerator implements CodeGenerator {
  id = "python";
  label = "Python";

  getIcon() {
    return <Code2 size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;

    return `# Using requests library
import requests

def call_${method.toLowerCase()}():
    url = "${endpoint}"
    headers = {
        "Content-Type": "application/json"
    }
    ${["POST", "PUT", "PATCH"].includes(method) && requestBody
        ? `
    payload = ${JSON.stringify(requestBodyExample, null, 4)
          .split("\n")
          .map((line) => "    " + line)
          .join("\n")}

    response = requests.${method.toLowerCase()}(url, json=payload, headers=headers)
    `
        : `
    response = requests.${method.toLowerCase()}(url, headers=headers)
    `
      }
    return response.json()`;
  }
}

class TypeScriptGenerator implements CodeGenerator {
  id = "typescript";
  label = "TypeScript";

  getIcon() {
    return <Braces size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;

    return `// Using fetch API
async function call${method}() {
  const response = await fetch("${endpoint}", {
    method: "${method}",
    headers: {
      "Content-Type": "application/json"
    }${["POST", "PUT", "PATCH"].includes(method) && requestBody
        ? `,
    body: JSON.stringify(
${JSON.stringify(requestBodyExample, null, 4)
          .split("\n")
          .map((line) => "      " + line)
          .join("\n")}
    )`
        : ""
      }
  });

  const data = await response.json();
  return data;
}`;
  }
}

class PhpGenerator implements CodeGenerator {
  id = "php";
  label = "PHP";

  getIcon() {
    return <Code2 size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;

    return `<?php
// 使用 PHP 的 cURL 扩展
function call_${method.toLowerCase()}() {
    $url = "${endpoint}";

    $curl = curl_init();

    $headers = [
        "Content-Type: application/json",
        "Accept: application/json"
    ];

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CUSTOMREQUEST => "${method}",${["POST", "PUT", "PATCH"].includes(method) && requestBody
        ? `
        CURLOPT_POSTFIELDS => json_encode(
${JSON.stringify(requestBodyExample, null, 4)
          .split("\n")
          .map((line) => "            " + replaceDoubleQuotes(line))
          .join(",\n")}
        ),`
        : ""
      }
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return "cURL Error: " . $err;
    } else {
        return json_decode($response, true);
    }
}`;
  }
}

// Available generators
const codeGenerators: CodeGenerator[] = [
  new CurlGenerator(),
  new PythonGenerator(),
  new TypeScriptGenerator(),
  new PhpGenerator(),
];

// Simplified CodeMarkdown component
interface CodeMarkdownProps {
  code: string;
  language: string;
  className?: string;
  disableCopy?: boolean;
}

const CodeMarkdown = React.forwardRef<HTMLDivElement, CodeMarkdownProps>(
  ({ code, language, className, disableCopy = false }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)}>
        {!disableCopy && (
          <div className="absolute top-3 right-3 z-10">
            <CopyButton text={code} size="sm" />
          </div>
        )}
        <div className="overflow-hidden dark:bg-neutral-800">
          <pre className="m-0 p-4 text-xs leading-tight border-none rounded-lg bg-neutral-50 dark:bg-neutral-900 overflow-x-auto">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
    );
  }
);

CodeMarkdown.displayName = "CodeMarkdown";

// Main Codegen component
interface CodegenProps {
  endpoint: string;
  method: HttpMethod;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  components?: ComponentsObject;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

const Codegen = React.forwardRef<HTMLDivElement, CodegenProps>(
  ({
    endpoint,
    method,
    parameters = [],
    requestBody,
    components,
    collapsible = false,
    defaultCollapsed = false,
    className,
  }, ref) => {
    const [languageId, setLanguageId] = useState(
      codeGenerators.length > 0 && codeGenerators[0] ? codeGenerators[0].id : "curl"
    );
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    const toggleCollapse = () => {
      if (collapsible) {
        setCollapsed(!collapsed);
      }
    };

    // 解析请求体
    const resolvedRequestBody = requestBody
      ? resolveRef<RequestBodyObject>(requestBody, components, "requestBodies")
      : undefined;

    // 解析参数
    const resolvedParameters = parameters
      .map((param) =>
        resolveRef<ParameterObject>(param, components, "parameters"),
      )
      .filter(Boolean) as ParameterObject[];

    // 生成请求体示例数据
    const getRequestBodyExample = () => {
      if (!resolvedRequestBody || !resolvedRequestBody.content)
        return { example: "data" };

      // 获取内容类型，优先使用application/json
      const contentType = resolvedRequestBody.content["application/json"]
        ? "application/json"
        : Object.keys(resolvedRequestBody.content)[0];

      if (!contentType || !resolvedRequestBody.content[contentType] || !resolvedRequestBody.content[contentType].schema)
        return { example: "data" };

      const schema = resolvedRequestBody.content[contentType].schema;
      if (!schema) return { example: "data" };

      // 使用示例生成工具
      return (
        resolvedRequestBody.content[contentType].example ||
        generateExample(schema, components, {
          maxDepth: 2,
          includeReadOnly: true,
          includeWriteOnly: true,
        })
      );
    };

    const requestBodyExample = getRequestBodyExample();

    const getCode = () => {
      const generator = codeGenerators.find((gen) => gen.id === languageId);
      if (!generator) return "";

      return generator.generateCode({
        endpoint,
        method,
        parameters: resolvedParameters,
        requestBody: resolvedRequestBody || undefined,
        requestBodyExample,
      });
    };

    // 获取代码语言
    const getCodeLanguage = () => {
      const generator = codeGenerators.find((gen) => gen.id === languageId);
      if (!generator) return "bash";

      switch (languageId) {
        case "curl":
          return "bash";
        case "python":
          return "python";
        case "typescript":
        case "javascript":
          return "javascript";
        case "php":
          return "php";
        default:
          return languageId;
      }
    };

    return (
      <div ref={ref} className={cn("border dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-neutral-800 transition-all", className)}>
        {!collapsed && (
          <>
            <div className="flex flex-wrap space-x-1 p-1 bg-neutral-50 dark:bg-neutral-800/70">
              {codeGenerators.map((generator) => (
                <button
                  key={generator.id}
                  onClick={() => setLanguageId(generator.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors mb-1",
                    languageId === generator.id
                      ? "bg-white dark:bg-neutral-700 text-blue-700 dark:text-blue-400 shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  )}
                >
                  {generator.getIcon()}
                  {generator.label}
                </button>
              ))}
            </div>

            <CodeMarkdown
              code={getCode()}
              language={getCodeLanguage()}
              className="max-h-[400px] overflow-y-auto"
            />
          </>
        )}
      </div>
    );
  },
);

Codegen.displayName = "Codegen";

export {
  Codegen,
  CodeMarkdown,
  type CodegenProps,
  type CodeMarkdownProps
};

