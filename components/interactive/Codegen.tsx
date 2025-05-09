// filepath: /workspaces/pivot/components/interactive/Codegen.tsx
import { ComponentsObject, HttpMethod, ParameterObject, ReferenceObject, RequestBodyObject } from '@/types/openapi';
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import React, { useState } from 'react';
import { resolveRef } from '../../utils/resolveRef';
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
