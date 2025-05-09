// filepath: /workspaces/pivot/components/interactive/Codegen.tsx
import { ComponentsObject, HttpMethod, ParameterObject, ReferenceObject, RequestBodyObject } from '@/types/openapi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { generateExample } from '../../utils/generateExample';
import { resolveRef } from '../../utils/resolveRef';
import CodeMarkdown from '../atoms/CodeMarkdown';
import MethodLabel from '../atoms/MethodLabel';
import { codeGenerators } from './codeGenerators';

interface CodegenProps {
  endpoint: string;
  method: HttpMethod;
  parameters?: (ParameterObject | ReferenceObject)[];
  requestBody?: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

const Codegen: React.FC<CodegenProps> = ({ endpoint, method, parameters = [], requestBody, components, collapsible = false, defaultCollapsed = false }) => {
  const [languageId, setLanguageId] = useState(codeGenerators[0]?.id || 'curl');
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

    // 使用通用的示例生成工具
    return resolvedRequestBody.content[contentType].example ||
      generateExample(schema, components, {
        maxDepth: 2,
        includeReadOnly: true,
        includeWriteOnly: true
      });
  };

  const requestBodyExample = getRequestBodyExample();

  const getCode = () => {
    // 使用模块化的代码生成器
    const generator = codeGenerators.find(gen => gen.id === languageId);
    if (!generator) return '';

    return generator.generateCode({
      endpoint,
      method,
      parameters: resolvedParameters,
      requestBody: resolvedRequestBody || undefined,
      requestBodyExample
    });
  };

  // 获取代码语言
  const getCodeLanguage = () => {
    const generator = codeGenerators.find(gen => gen.id === languageId);
    if (!generator) return 'bash';

    switch (languageId) {
      case 'curl': return 'bash';
      case 'python': return 'python';
      case 'typescript':
      case 'javascript': return 'javascript';
      case 'php': return 'php';
      default: return languageId;
    }
  };

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
            <div className="flex flex-wrap space-x-1 p-1 bg-gray-100 rounded-md">
              {codeGenerators.map((generator) => (
                <button
                  key={generator.id}
                  onClick={() => setLanguageId(generator.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors mb-1 ${languageId === generator.id
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {generator.getIcon()}
                  {generator.label}
                </button>
              ))}
            </div>
          </div>

          <CodeMarkdown
            code={getCode()}
            language={getCodeLanguage()}
            className="max-h-[400px] overflow-y-auto"
          />
        </>
      )}
    </div>
  );
};

export default Codegen;
