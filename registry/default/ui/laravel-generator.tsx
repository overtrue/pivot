import { Code2 } from "lucide-react";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";

// 代码生成器参数接口
interface CodeGeneratorParams {
  endpoint: string;
  method: OpenAPIV3.HttpMethods;
  parameters: OpenAPIV3.ParameterObject[];
  requestBody?: OpenAPIV3.RequestBodyObject;
  requestBodyExample: unknown;
}

// 代码生成器接口
interface CodeGenerator {
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

    // 生成格式化后的PHP数组表示，使用较小的缩进
    const formattedRequestBody = this.convertToPhpArray(requestBodyExample, 4);
    const guzzleRequestBody = this.convertToPhpArray(requestBodyExample, 8);

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

  // 将 JSON 对象转换为 PHP 数组格式，优化宽度
  private convertToPhpArray(obj: unknown, indent: number = 0): string {
    if (obj === null) return 'null';
    if (typeof obj === 'string') return `'${obj.replace(/'/g, "\\'")}'`;
    if (typeof obj === 'number') return obj.toString();
    if (typeof obj === 'boolean') return obj ? 'true' : 'false';

    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      const items = obj.map(item => this.convertToPhpArray(item, indent + 2));
      return `[\n${' '.repeat(indent + 2)}${items.join(",\n" + ' '.repeat(indent + 2))}\n${' '.repeat(indent)}]`;
    }

    if (typeof obj === 'object' && obj !== null) {
      const entries = Object.entries(obj as Record<string, unknown>);
      if (entries.length === 0) return '[]';

      const items = entries.map(([key, value]) =>
        `'${key}' => ${this.convertToPhpArray(value, indent + 2)}`
      );
      return `[\n${' '.repeat(indent + 2)}${items.join(",\n" + ' '.repeat(indent + 2))}\n${' '.repeat(indent)}]`;
    }

    return 'null';
  }
}

// React component wrapper
interface LaravelGeneratorProps {
  params?: CodeGeneratorParams;
  className?: string;
}

const LaravelGeneratorComponent = React.forwardRef<
  HTMLDivElement,
  LaravelGeneratorProps
>(({ params, className }, ref) => {
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
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden w-full">
        <pre className="p-4 overflow-x-auto w-full max-w-full" style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
          <code className="text-sm language-php" style={{ maxWidth: '100%', display: 'block' }}>{code}</code>
        </pre>
      </div>
    </div>
  );
});

LaravelGeneratorComponent.displayName = "LaravelGenerator";

export {
  LaravelGeneratorComponent as LaravelGenerator,
  type LaravelGeneratorProps
};

