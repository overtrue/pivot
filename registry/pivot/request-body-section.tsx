"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/lib/i18n";
import type { OpenAPIV3 } from 'openapi-types';

import { SchemaWithExampleViewer } from "@/registry/pivot/schema-with-example-viewer";
import { SectionTitle } from "@/registry/pivot/section-title";
import React from "react";

interface RequestBodySectionProps {
  requestBody: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject;
  components?: OpenAPIV3.ComponentsObject;
  spec?: OpenAPIV3.Document; // 可选，如果提供则使用完整的OpenAPI规范
  className?: string;
  titleClassName?: string;
}

const RequestBodySection = React.forwardRef<HTMLDivElement, RequestBodySectionProps>(
  ({ requestBody, components, spec, className = "", titleClassName }, ref) => {
    const { t } = useI18n();

    // 简化的解析逻辑，如果没有 useOpenApi hook 可用
    const resolveRequestBody = (body: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject): OpenAPIV3.RequestBodyObject | null => {
      if (!body) return null;

      // 如果是引用对象，尝试解析
      if (typeof body === 'object' && '$ref' in body) {
        // 简化的引用解析
        return null; // 在实际应用中需要完整的引用解析
      }

      return body as OpenAPIV3.RequestBodyObject;
    };

    // 解析引用对象
    const resolvedBody = resolveRequestBody(requestBody);

    if (!resolvedBody) {
      return (
        <div ref={ref} className={cn("text-red-500 dark:text-red-400", className)}>
          {t('Cannot resolve request body')}
        </div>
      );
    }

    // 获取内容
    const content = resolvedBody.content;
    if (!content) {
      return (
        <div ref={ref} className={cn("text-yellow-500 dark:text-yellow-400", className)}>
          {t('Request body has no content defined')}
        </div>
      );
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
      <div ref={ref} className={className}>
        <SectionTitle title={t('Request Body')} className={cn('text-lg font-medium my-3', titleClassName)} />

        <SchemaWithExampleViewer
          content={requestBody}
          components={components}
          contentType="requestBody"
          renderHeader={renderHeader}
        />
      </div>
    );
  }
);

RequestBodySection.displayName = "RequestBodySection";

export { RequestBodySection, type RequestBodySectionProps };

