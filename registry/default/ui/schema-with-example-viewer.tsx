"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";

import { generateExample } from "@/registry/default/lib/generate-example";
import { resolveRef } from "@/registry/default/lib/resolve-ref";
import { ExampleDisplay } from "@/registry/default/ui/example-display";
import { MediaTypeSelector } from "@/registry/default/ui/media-type-selector";
import { SchemaDisplay } from "@/registry/default/ui/schema-display";
import React, { useEffect, useMemo, useState } from "react";

// 简化的视图模式类型
type ViewMode = "schema" | "example";

// 提取媒体类型语言检测逻辑
const getLanguageForMediaType = (mediaTypeName: string): string => {
  if (mediaTypeName.includes("json")) return "json";
  if (mediaTypeName.includes("xml")) return "xml";
  if (mediaTypeName.includes("yaml") || mediaTypeName.includes("yml")) return "yaml";
  return "text";
};

// 提取示例选择器组件
const ExampleSelector = ({
  examples,
  selectedExample,
  onSelect
}: {
  examples: Record<string, OpenAPIV3.ExampleObject | OpenAPIV3.ReferenceObject>;
  selectedExample: string;
  onSelect: (value: string) => void;
}) => {
  const { t } = useI18n();

  if (Object.keys(examples).length <= 1) return null;

  return (
    <div className="ml-2 relative">
      <select
        className="text-sm border rounded-md px-2 py-1 bg-white dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600"
        value={selectedExample}
        onChange={(e) => onSelect(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      >
        {Object.keys(examples).map((key) => (
          <option key={key} value={key} className="dark:bg-neutral-700">
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

// 简化的 Schema 和示例视图组件
interface SchemaExampleViewProps {
  mediaType: OpenAPIV3.MediaTypeObject;
  mediaTypeName?: string;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

const SchemaExampleView = React.forwardRef<
  HTMLDivElement,
  SchemaExampleViewProps
>(({
  mediaType,
  mediaTypeName = "application/json",
  components,
  className = "",
  buttonClassName = "",
  contentClassName = "",
}, ref) => {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>("example");
  const [selectedExample, setSelectedExample] = useState<string>("");

  // 获取 schema 和示例
  const schema = mediaType.schema;
  if (!schema) {
    return (
      <div className="text-yellow-500 dark:text-yellow-400">
        {t("Schema not defined")}
      </div>
    );
  }

  const examples = mediaType.examples || {};
  const hasExamples = Object.keys(examples).length > 0;

  // 设置初始示例
  useEffect(() => {
    if (hasExamples && !selectedExample) {
      setSelectedExample(Object.keys(examples)[0]);
    }
  }, [hasExamples, selectedExample, examples]);

  // 获取当前示例值
  const exampleValue = useMemo(() => {
    if (hasExamples && selectedExample) {
      const example = resolveRef<OpenAPIV3.ExampleObject>(
        examples[selectedExample],
        components,
        "examples"
      );
      return example?.value || mediaType.example;
    }
    return mediaType.example || generateExample(schema, components);
  }, [hasExamples, selectedExample, examples, mediaType.example, schema, components]);

  // 切换视图模式
  const toggleViewMode = (mode: ViewMode) => {
    if (mode !== viewMode) {
      setViewMode(mode);
    }
  };

  return (
    <div ref={ref} className={className}>
      {/* 视图切换器 */}
      <div className="mb-4 flex items-center justify-between">
        <div className={cn(
          "flex bg-neutral-100 dark:bg-neutral-700 rounded-lg p-0.5 relative",
          buttonClassName
        )}>
          <button
            onClick={() => toggleViewMode("example")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              viewMode === "example"
                ? "bg-white dark:bg-neutral-800 shadow text-blue-700 dark:text-blue-400"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            )}
            type="button"
          >
            {t("Example")}
          </button>
          <button
            onClick={() => toggleViewMode("schema")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              viewMode === "schema"
                ? "bg-white dark:bg-neutral-800 shadow text-blue-700 dark:text-blue-400"
                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            )}
            type="button"
          >
            {t("Schema")}
          </button>
        </div>

        {/* 示例选择器 */}
        {viewMode === "example" && hasExamples && (
          <ExampleSelector
            examples={examples}
            selectedExample={selectedExample}
            onSelect={setSelectedExample}
          />
        )}
      </div>

      {/* 内容显示区域 */}
      <div className={contentClassName}>
        {viewMode === "example" ? (
          <ExampleDisplay
            example={exampleValue}
            className="rounded overflow-hidden bg-neutral-50 dark:bg-neutral-800"
            language={getLanguageForMediaType(mediaTypeName)}
          />
        ) : (
          <SchemaDisplay
            schema={schema}
            components={components}
            className="rounded p-3 bg-neutral-50 dark:bg-neutral-800"
          />
        )}
      </div>
    </div>
  );
});

SchemaExampleView.displayName = "SchemaExampleView";

// 简化的主组件接口
interface SchemaWithExampleViewerProps {
  content: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject | Record<string, OpenAPIV3.MediaTypeObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
  title?: string;
  showTitle?: boolean;
  contentType?: "requestBody" | "response" | "mediaTypes";
  renderHeader?: () => React.ReactNode;
  renderFooter?: (mediaType: OpenAPIV3.MediaTypeObject) => React.ReactNode;
}

// 提取媒体类型获取逻辑
const getMediaTypes = (
  content: any,
  contentType: string,
  components?: OpenAPIV3.ComponentsObject
): Record<string, OpenAPIV3.MediaTypeObject> => {
  if (contentType === "mediaTypes" && typeof content === "object") {
    return content;
  }

  if (contentType === "requestBody") {
    const resolvedBody = resolveRef<OpenAPIV3.RequestBodyObject>(
      content,
      components,
      "requestBodies"
    );
    return resolvedBody?.content || {};
  }

  if (contentType === "response") {
    const resolvedResponse = resolveRef<OpenAPIV3.ResponseObject>(
      content,
      components,
      "responses"
    );
    return resolvedResponse?.content || {};
  }

  return {};
};

const SchemaWithExampleViewer = React.forwardRef<
  HTMLDivElement,
  SchemaWithExampleViewerProps
>(({
  content,
  components,
  className = "",
  title,
  showTitle = false,
  contentType = "mediaTypes",
  renderHeader,
  renderFooter,
}, ref) => {
  const { t } = useI18n();

  // 获取媒体类型
  const mediaTypesContent = useMemo(() =>
    getMediaTypes(content, contentType, components),
    [content, contentType, components]
  );

  const mediaTypes = Object.keys(mediaTypesContent);
  const [activeMediaType, setActiveMediaType] = useState<string | null>(null);

  // 设置初始媒体类型
  useEffect(() => {
    if (mediaTypes.length > 0 && !activeMediaType) {
      const jsonType = mediaTypes.find(type => type.includes("json"));
      setActiveMediaType(jsonType || mediaTypes[0]);
    }
  }, [mediaTypes, activeMediaType]);

  // 如果没有媒体类型
  if (mediaTypes.length === 0) {
    return (
      <div ref={ref} className={className}>
        {showTitle && title && (
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
        )}
        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
          {t("No content types available")}
        </div>
      </div>
    );
  }

  // 如果只有一个媒体类型，直接显示
  if (mediaTypes.length === 1) {
    const mediaType = mediaTypesContent[mediaTypes[0]];
    return (
      <div ref={ref} className={className}>
        {showTitle && title && (
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
        )}
        {renderHeader?.()}
        <SchemaExampleView
          mediaType={mediaType}
          mediaTypeName={mediaTypes[0]}
          components={components}
        />
        {renderFooter?.(mediaType)}
      </div>
    );
  }

  // 多个媒体类型，显示选择器
  return (
    <div ref={ref} className={className}>
      {showTitle && title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      {renderHeader?.()}

      <MediaTypeSelector
        mediaTypes={mediaTypes}
        activeMediaType={activeMediaType}
        onSelectMediaType={setActiveMediaType}
      />

      {activeMediaType && (
        <>
          <SchemaExampleView
            mediaType={mediaTypesContent[activeMediaType]}
            mediaTypeName={activeMediaType}
            components={components}
          />
          {renderFooter?.(mediaTypesContent[activeMediaType])}
        </>
      )}
    </div>
  );
});

SchemaWithExampleViewer.displayName = "SchemaWithExampleViewer";

export { SchemaWithExampleViewer, type SchemaWithExampleViewerProps };

