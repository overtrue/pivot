"use client";

import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";

// 内联类型定义
interface CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.ReactNode;
  generateCode(params: CodeGeneratorParams): string;
}

interface CodeGeneratorParams {
  endpoint: string;
  method: string;
  parameters: OpenAPIV3.ParameterObject[];
  requestBody?: OpenAPIV3.RequestBodyObject;
  requestBodyExample?: any;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

import { generateExample } from "@/registry/default/lib/generate-example";
import { resolveRef } from "@/registry/default/lib/resolve-ref";
import { CodeMarkdown } from "@/registry/default/ui/code-markdown";
import { Braces, ChevronDown, Code2, Terminal } from "lucide-react";
import React, { useState } from "react";

// Code Generators
class CurlGenerator implements CodeGenerator {
  id = "curl";
  label = "cURL";

  getIcon() {
    return <Terminal size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, parameters, requestBodyExample, requestBody } =
      params;
    let code = `curl -X ${method} "${endpoint}"`;

    code += '\n  -H "Content-Type: application/json"';

    const queryParams = parameters.filter((p) => p.in === "query");
    if (queryParams.length > 0) {
      const queryString = queryParams.map((p) => `${p.name}=value`).join("&");
      code = code.replace(endpoint, `${endpoint}?${queryString}`);
    }

    const headerParams = parameters.filter((p) => p.in === "header");
    headerParams.forEach((p) => {
      code += `\n  -H "${p.name}: value"`;
    });

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
    const { endpoint, method, parameters, requestBodyExample, requestBody } =
      params;

    let code = "import requests\nimport json\n\n";
    code += `url = "${endpoint}"\n`;

    const headerParams = parameters.filter((p) => p.in === "header");
    if (headerParams.length > 0) {
      code += "headers = {\n";
      code += '    "Content-Type": "application/json",\n';
      headerParams.forEach((p) => {
        code += `    "${p.name}": "value",\n`;
      });
      code += "}\n\n";
    } else {
      code += 'headers = {"Content-Type": "application/json"}\n\n';
    }

    const queryParams = parameters.filter((p) => p.in === "query");
    if (queryParams.length > 0) {
      code += "params = {\n";
      queryParams.forEach((p) => {
        code += `    "${p.name}": "value",\n`;
      });
      code += "}\n\n";
    }

    if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
      code += `data = ${JSON.stringify(requestBodyExample, null, 4)}\n\n`;
      code += `response = requests.${method.toLowerCase()}(url, headers=headers${queryParams.length > 0 ? ", params=params" : ""}, json=data)\n`;
    } else {
      code += `response = requests.${method.toLowerCase()}(url, headers=headers${queryParams.length > 0 ? ", params=params" : ""})\n`;
    }

    code += "print(response.json())";

    return code;
  }
}

class TypeScriptGenerator implements CodeGenerator {
  id = "typescript";
  label = "TypeScript";

  getIcon() {
    return <Braces size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, parameters, requestBodyExample, requestBody } =
      params;

    let code = "";

    const queryParams = parameters.filter((p) => p.in === "query");
    const headerParams = parameters.filter((p) => p.in === "header");

    if (queryParams.length > 0) {
      code += "const params = new URLSearchParams({\n";
      queryParams.forEach((p) => {
        code += `  '${p.name}': 'value',\n`;
      });
      code += "});\n\n";
    }

    code += `const response = await fetch('${endpoint}${queryParams.length > 0 ? "?${params}" : ""}', {\n`;
    code += `  method: '${method}',\n`;
    code += "  headers: {\n";
    code += "    'Content-Type': 'application/json',\n";

    headerParams.forEach((p) => {
      code += `    '${p.name}': 'value',\n`;
    });

    code += "  },\n";

    if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
      code += `  body: JSON.stringify(${JSON.stringify(requestBodyExample, null, 4)}),\n`;
    }

    code += "});\n\n";
    code += "const data = await response.json();\nconsole.log(data);";

    return code;
  }
}

class PhpGenerator implements CodeGenerator {
  id = "php";
  label = "PHP";

  getIcon() {
    return <Code2 size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, parameters, requestBodyExample, requestBody } =
      params;

    let code = "<?php\n\n";
    code += `$url = '${endpoint}';\n`;

    const queryParams = parameters.filter((p) => p.in === "query");
    if (queryParams.length > 0) {
      code += "$params = [\n";
      queryParams.forEach((p) => {
        code += `    '${p.name}' => 'value',\n`;
      });
      code += "];\n";
      code += "$url .= '?' . http_build_query($params);\n\n";
    }

    code += "$headers = [\n";
    code += "    'Content-Type: application/json',\n";

    const headerParams = parameters.filter((p) => p.in === "header");
    headerParams.forEach((p) => {
      code += `    '${p.name}: value',\n`;
    });

    code += "];\n\n";

    code += "$ch = curl_init();\n";
    code += "curl_setopt($ch, CURLOPT_URL, $url);\n";
    code += "curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n";
    code += "curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\n";
    code += `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');\n`;

    if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
      code += `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${JSON.stringify(requestBodyExample, null, 4).replace(/"/g, "'")}));\n`;
    }

    code += "\n$response = curl_exec($ch);\n";
    code += "curl_close($ch);\n\n";
    code += "echo $response;\n";

    return code;
  }
}

const codeGenerators: CodeGenerator[] = [
  new CurlGenerator(),
  new PythonGenerator(),
  new TypeScriptGenerator(),
  new PhpGenerator(),
];

interface CodegenProps {
  endpoint: string;
  method:
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options"
  | "trace";
  parameters?: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[];
  requestBody?: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject;
  components?: OpenAPIV3.ComponentsObject;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

const Codegen: React.FC<CodegenProps> = ({
  endpoint,
  method,
  parameters = [],
  requestBody,
  components,
  className,
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [languageId, setLanguageId] = useState(codeGenerators[0]?.id || "curl");
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 点击外部关闭下拉菜单
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  // 解析请求体
  const resolvedRequestBody = requestBody
    ? resolveRef(requestBody, components, "requestBodies")
    : undefined;

  // 解析参数
  const resolvedParameters = parameters
    .map((param) => resolveRef(param, components, "parameters"))
    .filter(Boolean) as OpenAPIV3.ParameterObject[];

  // 生成请求体示例数据
  const getRequestBodyExample = () => {
    if (!resolvedRequestBody || !resolvedRequestBody.content)
      return { example: "data" };

    // 获取内容类型，优先使用application/json
    const contentType = resolvedRequestBody.content["application/json"]
      ? "application/json"
      : Object.keys(resolvedRequestBody.content)[0];

    if (!contentType || !resolvedRequestBody.content[contentType]?.schema)
      return { example: "data" };

    const schema = resolvedRequestBody.content[contentType].schema;
    if (!schema) return { example: "data" };

    // 使用通用的示例生成工具
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
    // 使用模块化的代码生成器
    const generator = codeGenerators.find((gen) => gen.id === languageId);
    if (!generator) return "";

    return generator.generateCode({
      endpoint,
      method: method.toUpperCase() as HttpMethod,
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

  const currentGenerator = codeGenerators.find((gen) => gen.id === languageId);

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 bg-muted/50",
          collapsible && "cursor-pointer hover:bg-muted",
        )}
        onClick={collapsible ? toggleCollapse : undefined}
      >
        <h3 className="text-sm font-medium text-foreground">代码示例</h3>

        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors"
            >
              <span>{currentGenerator?.label}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-md shadow-lg z-50">
                  {codeGenerators.map((generator) => (
                    <button
                      key={generator.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguageId(generator.id);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors first:rounded-t-md last:rounded-b-md",
                        languageId === generator.id && "bg-muted text-primary",
                      )}
                    >
                      {generator.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {collapsible && (
            <span className="text-muted-foreground">
              {collapsed ? "展开" : "收起"}
            </span>
          )}
        </div>
      </div>

      {!collapsed && (
        <div className="p-0">
          <CodeMarkdown
            className="rounded-none"
            code={getCode()}
            language={getCodeLanguage()}
          />
        </div>
      )}
    </div>
  );
};

export { Codegen, type CodegenProps };
export default Codegen;
