'use client'; // May need client features for tabs or schema viewer interaction

import { useOpenApi } from '@/hooks/useOpenApi';
import {
  ComponentsObject,
  OpenApiSpec,
  ReferenceObject,
  RequestBodyObject
} from '@/types/openapi';
import React from 'react';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import SectionTitle from './atoms/SectionTitle';
import SchemaDisplay from './SchemaDisplay';

interface RequestBodySectionProps {
  requestBody: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  spec?: OpenApiSpec; // 可选，如果提供则使用完整的OpenAPI规范
  className?: string;
}

const RequestBodySection: React.FC<RequestBodySectionProps> = ({
  requestBody,
  components,
  spec,
  className = ''
}) => {
  // 如果提供了完整规范，使用useOpenApi处理数据
  const openApi = spec
    ? useOpenApi(spec)
    : components
      ? { resolve: (obj: any, category?: string) => obj, components }
      : null;

  // 如果没有提供spec或components，无法处理引用
  if (!openApi) {
    return <div className="text-red-500">缺少解析引用所需的组件定义</div>;
  }

  // 解析引用对象
  const resolvedBody = openApi.resolve<RequestBodyObject>(requestBody, 'requestBodies');
  if (!resolvedBody) {
    return <div className="text-red-500">无法解析请求体</div>;
  }

  // 获取内容
  const content = resolvedBody.content;
  if (!content) {
    return <div className="text-yellow-500">请求体无内容定义</div>;
  }

  // 优先使用application/json
  const contentTypes = Object.keys(content);
  const jsonContentType = contentTypes.find(type => type.includes('json')) || contentTypes[0];
  const mediaType = content[jsonContentType];

  if (!mediaType || !mediaType.schema) {
    return <div className="text-yellow-500">请求体的内容类型未定义模式</div>;
  }

  const schema = mediaType.schema;

  return (
    <div className={className}>
      <SectionTitle title="请求体" className="text-lg font-medium mb-3" />

      {/* 必填标记 */}
      {resolvedBody.required && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            必填
          </span>
        </div>
      )}

      {/* 描述信息 */}
      {resolvedBody.description && (
        <div className="mb-4">
          <DescriptionDisplay description={resolvedBody.description} />
        </div>
      )}

      {/* 内容类型 */}
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700">内容类型: </h4>
        <div className="flex flex-wrap gap-1 mt-1">
          {contentTypes.map(type => (
            <span
              key={type}
              className={`inline-block px-2 py-1 text-xs font-mono rounded ${type === jsonContentType ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* 模式显示 */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Schema:</h4>
        <SchemaDisplay
          schema={schema}
          components={openApi.components}
          className="border rounded p-3 bg-gray-50"
        />
      </div>

      {/* 示例显示，如果有的话 */}
      {mediaType.example && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">示例:</h4>
          <pre className="bg-gray-50 rounded p-3 text-xs overflow-x-auto border">
            <code>{JSON.stringify(mediaType.example, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default RequestBodySection;
