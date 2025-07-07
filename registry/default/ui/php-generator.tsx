import type { CodeGenerator, CodeGeneratorParams } from "@/types/project";
import { Code2 } from "lucide-react";
import React from "react";

// Utility function
function replaceDoubleQuotes(str: string): string {
  return str.replace(/"/g, "'");
}

// PhpGenerator implementation
export class PhpGeneratorClass implements CodeGenerator {
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
        CURLOPT_CUSTOMREQUEST => "${method}",${
          ["POST", "PUT", "PATCH"].includes(method) && requestBody
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

// React component wrapper
interface PhpGeneratorProps {
  params?: CodeGeneratorParams;
  className?: string;
}

const PhpGeneratorComponent = React.forwardRef<
  HTMLDivElement,
  PhpGeneratorProps
>(({ params, className }, ref) => {
  if (!params) {
    return (
      <div ref={ref} className={className}>
        <div className="flex items-center gap-2 mb-2">
          <Code2 size={16} />
          <span className="font-medium">PHP</span>
        </div>
        <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md text-neutral-500 dark:text-neutral-400">
          No parameters provided for code generation
        </div>
      </div>
    );
  }

  const generator = new PhpGeneratorClass();
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
});

PhpGeneratorComponent.displayName = "PhpGenerator";

export { PhpGeneratorComponent as PhpGenerator, type PhpGeneratorProps };
