import { Terminal } from "lucide-react";
import React from "react";

// Import types from the centralized types file
import type { ParameterObject } from "@/types/openapi";

// Type definitions
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

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
  id: string; // 唯一标识符，如 'curl', 'php'
  label: string; // 显示名称，如 'cURL', 'PHP'
  getIcon(): React.ReactNode; // 返回语言图标
  generateCode(params: CodeGeneratorParams): string; // 生成代码
}

// CurlGenerator implementation
export class CurlGeneratorClass implements CodeGenerator {
  id = "curl";
  label = "cURL";

  getIcon() {
    return <Terminal size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, parameters, requestBodyExample, requestBody } =
      params;
    let code = `curl -X ${method} "${endpoint}"`;

    // 添加请求头
    code += '\n  -H "Content-Type: application/json"';

    // 添加查询参数
    const queryParams = parameters.filter((p) => p.in === "query");
    if (queryParams.length > 0) {
      const queryString = queryParams.map((p) => `${p.name}=value`).join("&");
      code += `?${queryString}`;
    }

    // 添加请求体
    if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
      code += `\n  -d '${JSON.stringify(requestBodyExample, null, 2)}'`;
    }

    return code;
  }
}

// React component wrapper
interface CurlGeneratorProps {
  params: CodeGeneratorParams;
  className?: string;
}

const CurlGeneratorComponent = React.forwardRef<HTMLDivElement, CurlGeneratorProps>(
  ({ params, className }, ref) => {
    const generator = new CurlGeneratorClass();
    const code = generator.generateCode(params);

    return (
      <div ref={ref} className={className}>
        <div className="flex items-center gap-2 mb-2">
          {generator.getIcon()}
          <span className="font-medium">{generator.label}</span>
        </div>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md overflow-x-auto">
          <code className="text-sm">{code}</code>
        </pre>
      </div>
    );
  },
);

CurlGeneratorComponent.displayName = "CurlGenerator";

export {
  CurlGeneratorComponent as CurlGenerator,
  type CurlGeneratorProps
};

