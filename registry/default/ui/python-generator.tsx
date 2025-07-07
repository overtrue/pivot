import type { CodeGenerator, CodeGeneratorParams } from "@/types/project";
import { Code2 } from "lucide-react";
import React from "react";

// PythonGenerator implementation
export class PythonGeneratorClass implements CodeGenerator {
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
    ${
      ["POST", "PUT", "PATCH"].includes(method) && requestBody
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
  params?: CodeGeneratorParams;
  className?: string;
}

const PythonGeneratorComponent = React.forwardRef<
  HTMLDivElement,
  PythonGeneratorProps
>(({ params, className }, ref) => {
  if (!params) {
    return (
      <div ref={ref} className={className}>
        <div className="flex items-center gap-2 mb-2">
          <Code2 size={16} />
          <span className="font-medium">Python</span>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md text-neutral-500 dark:text-neutral-400">
          No parameters provided for code generation
        </div>
      </div>
    );
  }

  const generator = new PythonGeneratorClass();
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
});

PythonGeneratorComponent.displayName = "PythonGenerator";

export {
  PythonGeneratorComponent as PythonGenerator,
  type PythonGeneratorProps,
};
