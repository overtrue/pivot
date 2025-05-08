
import { ComponentsObject, HttpMethod, ParameterObject, ReferenceObject, RequestBodyObject } from '@/types/openapi';
import { Braces, Check, ChevronDown, ChevronUp, Code2, Copy, Terminal } from 'lucide-react';
import React, { useState } from 'react';
import { resolveRef } from '../../utils/resolveRef';
import MethodLabel from '../atoms/MethodLabel';

interface CodegenProps {
  endpoint: string;
  method: HttpMethod;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

type CodeLanguage = 'curl' | 'typescript' | 'python';

const Codegen: React.FC<CodegenProps> = ({ endpoint, method, parameters = [], requestBody, components, collapsible = false, defaultCollapsed = false }) => {
  const [language, setLanguage] = useState<CodeLanguage>('curl');
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageIcon = (lang: CodeLanguage) => {
    switch (lang) {
      case 'curl':
        return <Terminal size={16} />;
      case 'typescript':
        return <Braces size={16} />;
      case 'python':
        return <Code2 size={16} />;
    }
  };

  const languageOptions: { id: CodeLanguage; label: string }[] = [
    { id: 'curl', label: 'cURL' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
  ];

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-all">
      <div
        className={`border-b bg-gray-50 px-4 py-3 flex items-center ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={collapsible ? toggleCollapse : undefined}
      >
        <MethodLabel method={method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'} className="mr-2" />
        <div className="text-sm text-gray-800 font-mono truncate overflow-hidden flex-grow">
          {endpoint}
        </div>
        {collapsible && (
          <div className="text-gray-500 ml-2">
            {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        )}
      </div>

      {!collapsed && (
        <>
          <div className="px-4 py-3 border-b bg-gray-50">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-md">
              {languageOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setLanguage(option.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${language === option.id
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {getLanguageIcon(option.id)}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 text-xs p-4 overflow-x-auto max-h-[400px] whitespace-pre-wrap break-words scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-950">
              <code>{getCode()}</code>
            </pre>

            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              title="复制代码"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Codegen;
