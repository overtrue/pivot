import { Code2 } from "lucide-react";
import React from "react";

// Reuse types from curl-generator
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

// PythonGenerator implementation
export class PythonGenerator implements CodeGenerator {
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

// React component wrapper
interface PythonGeneratorProps {
  params: CodeGeneratorParams;
  className?: string;
}

const PythonGeneratorComponent = React.forwardRef<HTMLDivElement, PythonGeneratorProps>(
  ({ params, className }, ref) => {
    const generator = new PythonGenerator();
    const code = generator.generateCode(params);

    return (
      <div ref={ref} className={className}>
        <div className="flex items-center gap-2 mb-2">
          {generator.getIcon()}
          <span className="font-medium">{generator.label}</span>
        </div>
        <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md overflow-x-auto">
          <code className="text-sm language-python">{code}</code>
        </pre>
      </div>
    );
  },
);

PythonGeneratorComponent.displayName = "PythonGenerator";

export {
  PythonGeneratorComponent as PythonGenerator,
  type PythonGeneratorProps
};

