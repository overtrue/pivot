'use client';

import {
  ComponentsObject,
  MediaTypeObject,
  ReferenceObject,
  RequestBodyObject,
  SchemaObject
} from '@/types/openapi';
import React, { useEffect, useMemo, useState } from 'react';
import { generateExample } from '../../../utils/generateExample';
import { resolveRef } from '../../../utils/resolveRef';
import { CodeMirrorEditor } from '../../atoms/CodeMirrorEditor';

interface RequestBodyInputProps {
  requestBody?: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  value: string;
  onChange: (value: string) => void;
}

const RequestBodyInput: React.FC<RequestBodyInputProps> = ({
  requestBody,
  components,
  value,
  onChange
}) => {
  // 解析请求体引用
  const resolvedRequestBody = useMemo(() => {
    if (!requestBody) return null;

    if ('$ref' in requestBody) {
      return resolveRef<RequestBodyObject>(requestBody, components, 'requestBodies');
    }

    return requestBody as RequestBodyObject;
  }, [requestBody, components]);

  // 获取内容类型列表
  const contentTypes = useMemo(() => {
    if (!resolvedRequestBody?.content) return [];
    return Object.keys(resolvedRequestBody.content);
  }, [resolvedRequestBody]);

  // 当前选择的内容类型
  const [selectedContentType, setSelectedContentType] = useState<string>('');

  // 当前模式
  const [currentSchema, setCurrentSchema] = useState<SchemaObject | null>(null);

  // 生成示例错误状态
  const [exampleError, setExampleError] = useState<string | null>(null);

  // 当内容类型列表变化时，选择第一个类型
  useEffect(() => {
    if (contentTypes.length > 0 && !selectedContentType) {
      // 优先选择 application/json，其次是第一个类型
      const defaultType = contentTypes.includes('application/json')
        ? 'application/json'
        : contentTypes[0];

      setSelectedContentType(defaultType);
    }
  }, [contentTypes, selectedContentType]);

  // 当选择的内容类型变化时，更新模式
  useEffect(() => {
    if (!resolvedRequestBody?.content || !selectedContentType) {
      setCurrentSchema(null);
      return;
    }

    const mediaType: MediaTypeObject = resolvedRequestBody.content[selectedContentType];

    if (!mediaType.schema) {
      setCurrentSchema(null);
      return;
    }

    const schema = '$ref' in mediaType.schema
      ? resolveRef<SchemaObject>(mediaType.schema, components, 'schemas')
      : mediaType.schema;

    setCurrentSchema(schema || null);
  }, [resolvedRequestBody, selectedContentType, components]);

  // 内容类型变更处理
  const handleContentTypeChange = (newType: string) => {
    setSelectedContentType(newType);
    // 清空值，因为不同内容类型的格式可能不同
    onChange('');
    setExampleError(null);
  };

  // 生成示例数据
  const generateExampleData = () => {
    if (!currentSchema) return;

    try {
      const example = generateExample(currentSchema, components);

      // 根据内容类型格式化数据
      if (selectedContentType.includes('json')) {
        onChange(JSON.stringify(example, null, 2));
      } else if (selectedContentType.includes('xml')) {
        // 简单XML转换，实际使用中可能需要更复杂的XML处理库
        const xmlData = `<?xml version="1.0" encoding="UTF-8"?>\n<root>${JSON.stringify(example)}</root>`;
        onChange(xmlData);
      } else {
        onChange(String(example));
      }

      setExampleError(null);
    } catch (error) {
      setExampleError(`生成示例失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  // 如果没有请求体
  if (!resolvedRequestBody) {
    return <div className="text-gray-500 italic">无请求体</div>;
  }

  // 获取编辑器语言
  const getLanguage = () => {
    if (selectedContentType.includes('json')) {
      return 'json';
    } else if (selectedContentType.includes('xml')) {
      return 'xml';
    } else if (selectedContentType.includes('javascript')) {
      return 'javascript';
    }
    return 'plaintext';
  };

  return (
    <div className="space-y-4">
      {resolvedRequestBody.description && (
        <div className="text-sm text-gray-700">{resolvedRequestBody.description}</div>
      )}

      {/* 内容类型选择器 */}
      <div className="flex space-x-2 items-center">
        <label className="text-sm font-medium text-gray-700">
          内容类型:
        </label>
        <select
          value={selectedContentType}
          onChange={(e) => handleContentTypeChange(e.target.value)}
          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {contentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 必填提示 */}
      {resolvedRequestBody.required && (
        <div className="text-sm text-red-500">* 必填</div>
      )}

      {/* 代码编辑器 */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <CodeMirrorEditor
          value={value}
          onChange={onChange}
          language={getLanguage()}
          height="200px"
          placeholder={`请输入${selectedContentType}格式的请求体...`}
        />
      </div>

      {/* 生成示例按钮 */}
      {currentSchema && (
        <div className="flex items-center">
          <button
            type="button"
            onClick={generateExampleData}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md border border-gray-300 transition-colors"
          >
            生成示例
          </button>

          {exampleError && (
            <div className="ml-2 text-sm text-red-500">{exampleError}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestBodyInput;
