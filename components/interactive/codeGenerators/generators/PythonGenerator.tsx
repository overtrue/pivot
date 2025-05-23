import React from "react";
import { Code2 } from "lucide-react";
import { CodeGenerator, CodeGeneratorParams } from "../types";

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
