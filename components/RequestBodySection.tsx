import { useOpenApi } from '@/hooks/useOpenApi';
import {
  ComponentsObject,
  OpenApiSpec,
  ReferenceObject,
  RequestBodyObject
} from '@/types/openapi';
import React from 'react';
import SectionTitle from './atoms/SectionTitle';
import SchemaWithExampleViewer from './SchemaWithExampleViewer';

interface RequestBodySectionProps {
  requestBody: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  spec?: OpenApiSpec; // 可选，如果提供则使用完整的OpenAPI规范
  className?: string;
  titleClassName?: string;
}

const RequestBodySection: React.FC<RequestBodySectionProps> = ({
  requestBody,
  components,
  spec,
  className = '',
  titleClassName = ''
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

  // 自定义头部渲染函数
  const renderHeader = () => {
    return (
      <>
        {/* 必填标记 */}
        {resolvedBody.required && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
              必填
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={className}>
      <SectionTitle title="请求体" className={`text-lg font-medium mb-3 ${titleClassName}`} />

      <SchemaWithExampleViewer
        content={requestBody}
        components={openApi.components}
        contentType="requestBody"
        renderHeader={renderHeader}
      />
    </div>
  );
};

export default RequestBodySection;
