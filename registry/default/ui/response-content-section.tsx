"use client";

import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";

import { SchemaWithExampleViewer } from "@/registry/default/ui/schema-with-example-viewer";
import React from "react";

interface ResponseContentSectionProps {
  content: Record<string, OpenAPIV3.MediaTypeObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

// 提取编码属性显示组件
const EncodingProperty = ({
  label,
  value
}: {
  label: string;
  value: any
}) => (
  <>
    <div className="text-neutral-600 dark:text-neutral-400">
      {label}
    </div>
    <div className="font-mono">{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</div>
  </>
);

// 提取编码信息渲染组件
const MediaTypeEncoding = ({ encoding }: { encoding: OpenAPIV3.EncodingObject }) => {
  const { t } = useI18n();

  const encodingInfo = [
    { key: 'contentType', label: t("Content Type") },
    { key: 'style', label: t("Style") },
    { key: 'explode', label: t("Explode") },
    { key: 'allowReserved', label: t("Allow Reserved") }
  ];

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs">
      {encodingInfo.map(({ key, label }) => {
        const value = encoding[key as keyof OpenAPIV3.EncodingObject];
        if (value === undefined) return null;

        return (
          <EncodingProperty key={key} label={label} value={value} />
        );
      })}
    </div>
  );
};

const ResponseContentSection = React.forwardRef<
  HTMLDivElement,
  ResponseContentSectionProps
>(({ content, components, className = "" }, ref) => {
  const { t } = useI18n();

  // 渲染媒体类型的额外信息（如编码）
  const renderMediaTypeEncoding = (mediaType: OpenAPIV3.MediaTypeObject) => {
    if (!mediaType.encoding || Object.keys(mediaType.encoding).length === 0) {
      return null;
    }

    return (
      <div className="mt-4">
        <h5 className="text-sm font-medium mb-2">{t("Encoding")}</h5>
        <div className="space-y-2">
          {Object.entries(mediaType.encoding).map(([property, encoding]) => (
            <div
              key={property}
              className="border rounded p-2 bg-white dark:bg-neutral-800"
            >
              <div className="font-mono text-sm mb-1 font-medium">
                {property}
              </div>
              <MediaTypeEncoding encoding={encoding} />
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
});

ResponseContentSection.displayName = "ResponseContentSection";

export { ResponseContentSection, type ResponseContentSectionProps };
