import { useOpenApi } from '@/hooks/useOpenApi';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  ComponentsObject,
  OpenApiSpec,
  ResponseObject,
  ResponsesObjectMap
} from '@/types/openapi';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import ResponseGroup from './ResponseGroup';
import SectionTitle from './atoms/SectionTitle';
import StatusCode from './atoms/StatusCode';

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
  const { t } = useI18n();
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  // 使用钩子处理OpenAPI数据
  const openApi = spec
    ? useOpenApi(spec)
    : components
      ? { resolve: (obj: any, category?: string) => obj, components }
      : null;

  // 如果没有提供spec或components，无法处理引用
  if (!openApi) {
    return <div className="text-red-500 dark:text-red-400">{t('Missing component definitions required to resolve references')}</div>;
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

  // Current active response
  const activeResponse = activeStatus ? getResponseByStatus(activeStatus) : null;

  return (
    <div className={cn(className)}>
      <SectionTitle title={t('Response')} className="text-lg my-3" />

      {/* Status code list */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {allStatusCodes.map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
            >
              <StatusCode
                code={status === 'default' ? 'default' : status}
                size="medium"
                className={cn(
                  "cursor-pointer",
                  status === activeStatus ? "opacity-100" : "opacity-80 hover:opacity-100"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Active response content */}
      {activeStatus && activeResponse && (
        <div className="rounded">
          <ResponseGroup
            status={activeStatus}
            response={activeResponse}
            components={openApi.components}
          />
        </div>
      )}

      {/* Prompt when no response is available */}
      {(!activeStatus || !activeResponse) && (
        <div className="text-yellow-600 dark:text-yellow-400 text-sm p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded">
          {allStatusCodes.length === 0 ? t('No responses defined') : t('Could not resolve selected response')}
        </div>
      )}
    </div >
  );
};

export default ResponsesSection;
