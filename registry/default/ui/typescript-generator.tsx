import type { OpenAPIV3 } from "openapi-types";
import { Braces } from "lucide-react";
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

// TypeScriptGenerator implementation
export class TypeScriptGeneratorClass implements CodeGenerator {
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
    }${
      ["POST", "PUT", "PATCH"].includes(method) && requestBody
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

// React component wrapper
interface TypeScriptGeneratorProps {
  params: CodeGeneratorParams;
  className?: string;
}

const TypeScriptGeneratorComponent = React.forwardRef<
  HTMLDivElement,
  TypeScriptGeneratorProps
>(({ params, className }, ref) => {
  const generator = new TypeScriptGeneratorClass();
  const code = generator.generateCode(params);

  return (
    <div ref={ref} className={className}>
      <div className="flex items-center gap-2 mb-2">
        {generator.getIcon()}
        <span className="font-medium">{generator.label}</span>
      </div>
      <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md overflow-x-auto">
        <code className="text-sm language-typescript">{code}</code>
      </pre>
    </div>
  );
});

TypeScriptGeneratorComponent.displayName = "TypeScriptGenerator";

export {
  TypeScriptGeneratorComponent as TypeScriptGenerator,
  type TypeScriptGeneratorProps,
};
