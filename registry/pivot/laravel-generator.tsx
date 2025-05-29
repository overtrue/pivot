import { Code2 } from "lucide-react";
import React from "react";

// Reuse types
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

// LaravelGenerator implementation
export class LaravelGeneratorClass implements CodeGenerator {
  id = "laravel";
  label = "Laravel";

  getIcon() {
    return <Code2 size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;

    // 生成格式化后的PHP数组表示
    const formattedRequestBody = JSON.stringify(requestBodyExample, null, 2)
      .replace(/"/g, "'")
      .replace(/\n/g, "\n        ");

    const guzzleRequestBody = JSON.stringify(requestBodyExample, null, 2)
      .replace(/"/g, "'")
      .replace(/\n/g, "\n            ");

    return `<?php
// 使用 Laravel HTTP 客户端
use Illuminate\\Support\\Facades\\Http;

function call_${method.toLowerCase()}()
{
    $response = Http::withHeaders([
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ])${["POST", "PUT", "PATCH"].includes(method) && requestBody
        ? `->${method.toLowerCase()}("${endpoint}",
        ${formattedRequestBody}
    );`
        : `.${method.toLowerCase()}("${endpoint}");`
      }

    return $response->json();
}

// 或者使用 Laravel 的 Guzzle 封装
public function call_${method.toLowerCase()}_guzzle()
{
    $client = new \\GuzzleHttp\\Client();

    $response = $client->request("${method}", "${endpoint}", [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],${["POST", "PUT", "PATCH"].includes(method) && requestBody
        ? `
        'json' => ${guzzleRequestBody}`
        : ""
      }
    ]);

    return json_decode($response->getBody(), true);
}`;
  }
}

// React component wrapper
interface LaravelGeneratorProps {
  params?: CodeGeneratorParams;
  className?: string;
}

const LaravelGeneratorComponent = React.forwardRef<HTMLDivElement, LaravelGeneratorProps>(
  ({ params, className }, ref) => {
    if (!params) {
      return (
        <div ref={ref} className={className}>
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={16} />
            <span className="font-medium">Laravel</span>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md text-neutral-500 dark:text-neutral-400">
            No parameters provided for code generation
          </div>
        </div>
      );
    }

    const generator = new LaravelGeneratorClass();
    const code = generator.generateCode(params);

    return (
      <div ref={ref} className={className}>
        <div className="flex items-center gap-2 mb-2">
          {generator.getIcon()}
          <span className="font-medium">{generator.label}</span>
        </div>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md overflow-x-auto">
          <code className="text-sm language-php">{code}</code>
        </pre>
      </div>
    );
  },
);

LaravelGeneratorComponent.displayName = "LaravelGenerator";

export {
  LaravelGeneratorComponent as LaravelGenerator,
  type LaravelGeneratorProps
};

