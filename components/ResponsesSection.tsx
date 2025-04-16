'use client';

import { useOpenApi } from '@/hooks/useOpenApi';
import {
  ComponentsObject,
  OpenApiSpec,
  ResponseObject,
  ResponsesObjectMap
} from '@/types/openapi';
import React, { useState } from 'react';
import ResponseGroup from './ResponseGroup';
import SectionTitle from './atoms/SectionTitle';

interface ResponsesSectionProps {
  responses: ResponsesObjectMap;
  components?: ComponentsObject;
  spec?: OpenApiSpec; // 可选，如果提供则使用完整的OpenAPI规范
  className?: string;
}

const ResponsesSection: React.FC<ResponsesSectionProps> = ({
  responses,
  components,
  spec,
  className = ''
}) => {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  // 使用钩子处理OpenAPI数据
  const openApi = spec
    ? useOpenApi(spec)
    : components
      ? { resolve: (obj: any, category?: string) => obj, components }
      : null;

  // 如果没有提供spec或components，无法处理引用
  if (!openApi) {
    return <div className="text-red-500">缺少解析引用所需的组件定义</div>;
  }

  // 对状态码进行分组
  const statusGroups: Record<string, string[]> = {
    '1xx': [],
    '2xx': [],
    '3xx': [],
    '4xx': [],
    '5xx': [],
    'default': [],
    'other': []
  };

  // 分类状态码
  Object.keys(responses).forEach(status => {
    if (status === 'default') {
      statusGroups.default.push(status);
    } else if (/^[1-5]\d\d$/.test(status)) {
      const group = `${status[0]}xx`;
      statusGroups[group].push(status);
    } else {
      statusGroups.other.push(status);
    }
  });

  // 确定默认活动状态
  if (activeStatus === null) {
    // 按优先级查找: 2xx, 默认, 其他任何状态
    for (const group of ['2xx', 'default', '1xx', '3xx', '4xx', '5xx', 'other']) {
      if (statusGroups[group].length > 0) {
        setActiveStatus(statusGroups[group][0]);
        break;
      }
    }
  }

  // 所有可用的状态码
  const allStatusCodes = Object.values(statusGroups).flat();

  // 通过状态码获取响应对象
  const getResponseByStatus = (status: string): ResponseObject | null => {
    const response = responses[status];
    if (!response) return null;
    return openApi.resolve<ResponseObject>(response, 'responses');
  }

  // 当前活动响应
  const activeResponse = activeStatus ? getResponseByStatus(activeStatus) : null;

  return (
    <div className={className}>
      <SectionTitle title="响应" className="text-lg font-medium mb-3" />

      {/* 状态码列表 */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {allStatusCodes.map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${status === activeStatus
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
            >
              {status === 'default' ? 'Default' : status}
            </button>
          ))}
        </div>
      </div>

      {/* 活动响应内容 */}
      {activeStatus && activeResponse && (
        <div className="border rounded bg-gray-50 p-4">
          <ResponseGroup
            status={activeStatus}
            response={activeResponse}
            components={openApi.components}
          />
        </div>
      )}

      {/* 无响应时的提示 */}
      {(!activeStatus || !activeResponse) && (
        <div className="text-yellow-600 p-3 bg-yellow-50 rounded">
          {allStatusCodes.length === 0
            ? '未定义响应'
            : '无法解析所选响应'}
        </div>
      )}
    </div>
  );
};

export default ResponsesSection;
