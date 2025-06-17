"use client";

import { useI18n } from "@/lib/i18n";
import type { OpenAPIV3 } from 'openapi-types';

import React from "react";
import { SchemaWithExampleViewer } from "./schema-with-example-viewer";

interface ResponseContentSectionProps {
  content: Record<string, OpenAPIV3.MediaTypeObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const ResponseContentSection = React.forwardRef<HTMLDivElement, ResponseContentSectionProps>(
  ({ content, components, className = '' }, ref) => {
    const { t } = useI18n();

    // 渲染媒体类型的额外信息（如编码）
    const renderMediaTypeEncoding = (mediaType: OpenAPIV3.MediaTypeObject) => {
      if (!mediaType.encoding || Object.keys(mediaType.encoding).length === 0) {
        return null;
      }

      return (
        <div className="mt-4">
          <h5 className="text-sm font-medium mb-2">{t('Encoding')}</h5>
          <div className="space-y-2">
            {Object.entries(mediaType.encoding).map(([property, encoding]: [string, OpenAPIV3.EncodingObject]) => (
              <div key={property} className="border rounded p-2 bg-white dark:bg-neutral-800">
                <div className="font-mono text-sm mb-1 font-medium">{property}</div>
                <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs">
                  {encoding.contentType && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">{t('Content Type')}</div>
                      <div className="font-mono">{encoding.contentType}</div>
                    </>
                  )}
                  {encoding.style && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">{t('Style')}</div>
                      <div className="font-mono">{encoding.style}</div>
                    </>
                  )}
                  {encoding.explode !== undefined && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">{t('Explode')}</div>
                      <div className="font-mono">{encoding.explode.toString()}</div>
                    </>
                  )}
                  {encoding.allowReserved !== undefined && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">{t('Allow Reserved')}</div>
                      <div className="font-mono">{encoding.allowReserved.toString()}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={className}>
        <SchemaWithExampleViewer
          content={content}
          components={components}
          contentType="mediaTypes"
          showTitle={true}
          renderFooter={renderMediaTypeEncoding}
        />
      </div>
    );
  }
);

ResponseContentSection.displayName = "ResponseContentSection";

export { ResponseContentSection, type ResponseContentSectionProps };

