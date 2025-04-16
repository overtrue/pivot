'use client';

import {
  ComponentsObject,
  HeaderObject,
  LinkObject,
  MediaTypeObject,
  ReferenceObject,
  ResponseObject
} from '@/types/openapi'; // Adjust path
import React from 'react';
import { resolveRef } from '../utils/resolveRef';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import StatusCode from './atoms/StatusCode';
import HeadersSection from './HeadersSection';
import LinksSection from './LinksSection';
import ResponseContentSection from './ResponseContentSection';

// 修改接口，接受原始响应对象或引用
interface ResponseItemProps {
  code: string; // 状态码
  response: ResponseObject | ReferenceObject; // 可能是引用或已解析的响应对象
  components?: ComponentsObject; // 用于解析引用
}

const ResponseItem: React.FC<ResponseItemProps> = ({
  code,
  response,
  components
}) => {
  // 解析响应对象（如果是引用）
  const resolvedResponse = resolveRef<ResponseObject>(response, components, 'responses');

  // 如果无法解析引用，显示错误信息
  if (!resolvedResponse) {
    const refString = (response && typeof response === 'object' && '$ref' in response)
      ? response.$ref
      : '[unknown reference]';
    return (
      <div className="text-xs text-red-500 p-2 border rounded bg-red-50">
        无法显示响应 {code}: 引用 {refString} 未解析或解析失败。
      </div>
    );
  }

  // 从解析后的对象中提取属性
  const { description, headers, content, links } = resolvedResponse;

  const hasHeaders = headers && Object.keys(headers).length > 0;
  const hasContent = content && Object.keys(content).length > 0;
  const hasLinks = links && Object.keys(links).length > 0;
  const hasDetails = hasHeaders || hasContent || hasLinks;

  return (
    <div className="border rounded mb-4 overflow-hidden">
      {/* Header part */}
      <div className="p-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StatusCode code={code} />
          {description && <DescriptionDisplay description={description} className="text-sm mb-0" />}
        </div>
      </div>

      {/* Collapsible Details part - Now always shown if hasDetails */}
      {hasDetails && (
        <div className="p-4 border-t">
          {hasHeaders && <HeadersSection headers={headers as { [key: string]: HeaderObject }} components={components} />}
          {hasContent && <ResponseContentSection content={content as Record<string, MediaTypeObject>} components={components} />}
          {hasLinks && <LinksSection links={links as { [key: string]: LinkObject }} components={components} />}
        </div>
      )}
    </div>
  );
};

export default ResponseItem;
