import { useI18n } from '@/lib/i18n/I18nProvider';
import { ComponentsObject, HttpMethod, ParameterObject, ReferenceObject, RequestBodyObject } from '@/types/openapi';
import React, { useState } from 'react';
import { generateExample } from '../../utils/generateExample';
import { resolveRef } from '../../utils/resolveRef';
import CodeMarkdown from '../atoms/CodeMarkdown';
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
  const { t } = useI18n();
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
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800 transition-all">
      {!collapsed && (
        <>
          <div className="flex flex-wrap space-x-1 p-1 bg-gray-50 dark:bg-gray-800/70">
            {codeGenerators.map((generator) => (
              <button
                key={generator.id}
                onClick={() => setLanguageId(generator.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors mb-1 ${languageId === generator.id
                  ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
              >
                {generator.getIcon()}
                {generator.label}
              </button>
            ))}
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
