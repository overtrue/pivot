'use client';

import { ComponentsObject, HttpMethod, ParameterObject, ReferenceObject, RequestBodyObject } from '@/types/openapi';
import React, { useState } from 'react';
import { resolveRef } from '../../utils/resolveRef';

interface CodegenProps {
  endpoint: string;
  method: HttpMethod;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
}

const Codegen: React.FC<CodegenProps> = ({ endpoint, method, parameters = [], requestBody, components }) => {
  const [language, setLanguage] = useState<'typescript' | 'python' | 'curl'>('curl');

  // 解析请求体
  const resolvedRequestBody = requestBody ? resolveRef<RequestBodyObject>(requestBody, components, 'requestBodies') : undefined;

  // 解析参数
  const resolvedParameters = parameters.map(param =>
    resolveRef<ParameterObject>(param, components, 'parameters')
  ).filter(Boolean) as ParameterObject[];

  // 生成请求体示例数据
  const getRequestBodyExample = () => {
    if (!resolvedRequestBody || !resolvedRequestBody.content) return { example: "data" };

    // 获取内容类型，优先使用application/json
    const contentType =
      resolvedRequestBody.content['application/json'] ?
        'application/json' :
        Object.keys(resolvedRequestBody.content)[0];

    if (!contentType || !resolvedRequestBody.content[contentType].schema) return { example: "data" };

    const schema = resolvedRequestBody.content[contentType].schema;
    if (!schema) return { example: "data" };

    // 解析可能存在的schema引用
    const resolvedSchema = resolveRef(schema, components, 'schemas');
    if (!resolvedSchema) return { example: "data" };

    // 根据schema类型生成示例
    const example: Record<string, any> = {};
    if (typeof resolvedSchema === 'object' && 'properties' in resolvedSchema && resolvedSchema.properties) {
      Object.entries(resolvedSchema.properties).forEach(([propName, propSchema]) => {
        // 尝试获取属性类型
        let propType = 'string';
        if (typeof propSchema === 'object') {
          if ('type' in propSchema) {
            propType = propSchema.type as string;
          } else if ('$ref' in propSchema) {
            const resolvedProp = resolveRef(propSchema, components, 'schemas');
            if (resolvedProp && typeof resolvedProp === 'object' && 'type' in resolvedProp) {
              propType = resolvedProp.type as string;
            }
          }
        }

        // 根据类型生成示例值
        switch (propType) {
          case 'string':
            example[propName] = `example_${propName}`;
            break;
          case 'number':
          case 'integer':
            example[propName] = 123;
            break;
          case 'boolean':
            example[propName] = true;
            break;
          case 'array':
            example[propName] = [];
            break;
          case 'object':
            example[propName] = {};
            break;
          default:
            example[propName] = null;
        }
      });
    }

    return Object.keys(example).length > 0 ? example : { example: "data" };
  };

  const requestBodyExample = getRequestBodyExample();

  const generateCurlCode = () => {
    let code = `curl -X ${method} "${endpoint}"`;

    // Add headers
    code += '    \n -H "Content-Type: application/json"';

    // Add query parameters
    const queryParams = resolvedParameters.filter(p => p.in === 'query');
    if (queryParams.length > 0) {
      const queryString = queryParams
        .map(p => `${p.name}=value`)
        .join('&');
      code += `?${queryString}`;
    }

    // Add request body
    if (['POST', 'PUT', 'PATCH'].includes(method) && resolvedRequestBody) {
      code += `    \n -d '${JSON.stringify(requestBodyExample, null, 2)}'`;
    }

    return code;
  };

  const generateTypeScriptCode = () => {
    return `// Using fetch API
async function call${method}() {
  const response = await fetch("${endpoint}", {
    method: "${method}",
    headers: {
      "Content-Type": "application/json"
    }${['POST', 'PUT', 'PATCH'].includes(method) && resolvedRequestBody ? `,
    body: JSON.stringify(
${JSON.stringify(requestBodyExample, null, 4).split('\n').map(line => '      ' + line).join('\n')}
    )` : ''}
  });

  const data = await response.json();
  return data;
}`;
  };

  const generatePythonCode = () => {
    return `# Using requests library
import requests

def call_${method.toLowerCase()}():
    url = "${endpoint}"
    headers = {
        "Content-Type": "application/json"
    }
    ${['POST', 'PUT', 'PATCH'].includes(method) && resolvedRequestBody ? `
    payload = ${JSON.stringify(requestBodyExample, null, 4).split('\n').map(line => '    ' + line).join('\n')}

    response = requests.${method.toLowerCase()}(url, json=payload, headers=headers)
    ` : `
    response = requests.${method.toLowerCase()}(url, headers=headers)
    `}
    return response.json()`;
  };

  const getCode = () => {
    switch (language) {
      case 'curl':
        return generateCurlCode();
      case 'typescript':
        return generateTypeScriptCode();
      case 'python':
        return generatePythonCode();
      default:
        return '';
    }
  };

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Code Samples</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('curl')}
            className={`px-3 py-1 rounded ${language === 'curl' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            cURL
          </button>
          <button
            onClick={() => setLanguage('typescript')}
            className={`px-3 py-1 rounded ${language === 'typescript' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setLanguage('python')}
            className={`px-3 py-1 rounded ${language === 'python' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Python
          </button>
        </div>
      </div>
      <pre className="bg-gray-800 text-white text-xs p-4 rounded overflow-x-auto">
        <code>{getCode()}</code>
      </pre>
    </div>
  );
};

export default Codegen;
