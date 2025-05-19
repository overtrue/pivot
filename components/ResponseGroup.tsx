import { useI18n } from '@/lib/i18n/I18nProvider';
import { ComponentsObject, ResponseObject } from '@/types/openapi';
import React from 'react';
import ResponseContentSection from './ResponseContentSection';
import ResponseHeadersTable from './atoms/ResponseHeadersTable';

interface ResponseGroupProps {
  status: string;
  response: ResponseObject;
  components?: ComponentsObject;
  statusCodeProps?: {
    size?: 'small' | 'medium';
    className?: string;
    show?: boolean;
  };
}

const ResponseGroup: React.FC<ResponseGroupProps> = ({
  status,
  response,
  components,
}) => {
  const { t } = useI18n();

  // 预处理内容类型
  const contentTypes = response.content ? Object.keys(response.content) : [];
  const hasContent = contentTypes.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {response.description && (
          <span className="text-gray-700 dark:text-gray-300 text-sm">{response.description}</span>
        )}
      </div>

      {/* 使用ResponseContentSection展示内容和示例 */}
      {hasContent && (
        <div className="space-y-3">
          <ResponseContentSection
            content={response.content!}
            components={components}
          />
        </div>
      )}

      {/* 头部信息 */}
      {response.headers && Object.keys(response.headers).length > 0 && (
        <div>
          <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">{t('Response Headers')}</h4>
          <ResponseHeadersTable headers={response.headers} components={components} />
        </div>
      )}
    </div>
  );
};

export default ResponseGroup;
