import { useOpenApi } from '@/hooks/useOpenApi';
import { useI18n } from '@/lib/i18n/i18n-provider';
import {
  ComponentsObject,
  OpenApiSpec,
  ReferenceObject,
  RequestBodyObject
} from '@/types/openapi';
import { cn } from '@/utils/cn';
import React from 'react';
import SectionTitle from './section-title';
import SchemaWithExampleViewer from './schema-with-example-viewer';

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
}) => {
  const { t } = useI18n();

  // 如果提供了完整规范，使用useOpenApi处理数据
  const openApi = spec
    ? useOpenApi(spec)
    : components
      ? { resolve: (obj: any, category?: string) => obj, components }
      : null;

  // 如果没有提供spec或components，无法处理引用
  if (!openApi) {
    return <div className="text-red-500 dark:text-red-400">{t('Missing component definitions required to resolve references')}</div>;
  }

  // 解析引用对象
  const resolvedBody = openApi.resolve<RequestBodyObject>(requestBody, 'requestBodies');
  if (!resolvedBody) {
    return <div className="text-red-500 dark:text-red-400">{t('Cannot resolve request body')}</div>;
  }

  // 获取内容
  const content = resolvedBody.content;
  if (!content) {
    return <div className="text-yellow-500 dark:text-yellow-400">{t('Request body has no content defined')}</div>;
  }

  // 自定义头部渲染函数
  const renderHeader = () => {
    return (
      <>
        {/* Required indicator */}
        {resolvedBody.required && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              {t('Required')}
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={className}>
      <SectionTitle title={t('Request Body')} className={cn('text-lg font-medium my-3')} />

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
