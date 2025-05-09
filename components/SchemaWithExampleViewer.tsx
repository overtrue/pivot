import {
  ComponentsObject,
  ExampleObject,
  MediaTypeObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject
} from '@/types/openapi';
import { generateExample } from '@/utils/generateExample';
import { resolveRef } from '@/utils/resolveRef';
import React, { useEffect, useState } from 'react';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import ExampleDisplay from './ExampleDisplay';
import MediaTypeSelector from './MediaTypeSelector';
import SchemaDisplay from './SchemaDisplay';

// ===== SchemaExampleView 组件部分 =====

// 定义视图类型
type ViewMode = 'schema' | 'example';

interface SchemaExampleViewProps {
  mediaType: MediaTypeObject;
  components?: ComponentsObject;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

/**
 * 通用的 Schema 和示例数据视图组件
 * 可以显示 schema 和其对应的 example 数据，并支持在两者间切换
 */
const SchemaExampleView: React.FC<SchemaExampleViewProps> = ({
  mediaType,
  components,
  className = '',
  buttonClassName = '',
  contentClassName = ''
}) => {
  // 视图模式状态 - 默认为示例数据
  const [viewMode, setViewMode] = useState<ViewMode>('example');
  // 当前选中的示例名称
  const [selectedExample, setSelectedExample] = useState<string>('');

  // 获取 schema
  const schema = mediaType.schema;
  if (!schema) {
    return <div className="text-yellow-500">未定义模式</div>;
  }

  // 获取示例数据
  const hasExample = !!mediaType.example;
  const hasExamples = !!(mediaType.examples && Object.keys(mediaType.examples || {}).length > 0);
  const examplesKeys = hasExamples ? Object.keys(mediaType.examples || {}) : [];

  // 确保有选中的示例
  useEffect(() => {
    if (hasExamples && !selectedExample && examplesKeys.length > 0) {
      setSelectedExample(examplesKeys[0]);
    }
  }, [hasExamples, selectedExample, examplesKeys]);

  // 获取当前选中的示例
  const currentExample = selectedExample && hasExamples
    ? resolveRef<ExampleObject>(mediaType.examples![selectedExample], components, 'examples')
    : null;

  // 示例显示内容 - 优先使用提供的示例，否则根据 schema 生成
  const providedExample = currentExample?.value || mediaType.example;
  const generatedExample = generateExample(schema, components);
  const exampleValue = providedExample || generatedExample;

  // 检查是否有可用的示例
  const hasAnyExample = true; // 始终可以显示示例，因为现在我们可以生成示例

  // 切换视图模式
  const toggleViewMode = (mode: ViewMode) => {
    if (mode === viewMode) return; // 如果已经是当前模式，不做任何操作
    setViewMode(mode);
    console.log(`已切换视图模式到: ${mode}`);
  };

  return (
    <div className={className}>
      {/* 视图切换器 */}
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex bg-gray-100 rounded-lg p-0.5 relative ${buttonClassName}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleViewMode('example');
            }}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'example'
              ? 'bg-white shadow text-blue-700'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
            type="button"
          >
            示例数据
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleViewMode('schema');
            }}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'schema'
              ? 'bg-white shadow text-blue-700'
              : 'text-gray-700 hover:bg-gray-200'
              }`}
            type="button"
          >
            数据结构
          </button>
        </div>

        {/* 多个示例选择器 */}
        {viewMode === 'example' && hasExamples && examplesKeys.length > 1 && (
          <div className="ml-2 relative">
            <select
              className="text-sm border rounded-md px-2 py-1 bg-white"
              value={selectedExample}
              onChange={(e) => setSelectedExample(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              {examplesKeys.map(key => {
                const example = resolveRef<ExampleObject>(mediaType.examples![key], components, 'examples');
                const displayName = example?.summary || key;
                return (
                  <option key={key} value={key}>
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* 内容显示区域 */}
      <div className={contentClassName}>
        {/* 根据视图模式显示不同内容 */}
        {viewMode === 'example' ? (
          /* 示例数据视图 */
          <ExampleDisplay
            example={exampleValue}
            className="border rounded overflow-hidden"
          />
        ) : (
          /* 数据结构视图 */
          <SchemaDisplay
            schema={schema}
            components={components}
            className="border rounded p-3 bg-gray-50"
          />
        )}
      </div>
    </div>
  );
};

// ===== SchemaWithExampleViewer 组件部分 =====

interface SchemaWithExampleViewerProps {
  // 内容可以是请求体或响应体
  content: RequestBodyObject | ReferenceObject | ResponseObject | Record<string, MediaTypeObject>;
  components?: ComponentsObject;
  className?: string;
  title?: string;
  showTitle?: boolean;
  contentType?: 'requestBody' | 'response' | 'mediaTypes';
  renderHeader?: () => React.ReactNode;
  renderFooter?: (mediaType: MediaTypeObject) => React.ReactNode;
}

/**
 * Schema与示例查看器组件
 * 用于展示 schema 和它的示例数据，支持切换不同的媒体类型格式
 */
const SchemaWithExampleViewer: React.FC<SchemaWithExampleViewerProps> = ({
  content,
  components,
  className = '',
  title,
  showTitle = false,
  contentType = 'mediaTypes',
  renderHeader,
  renderFooter
}) => {
  // 根据内容类型，获取媒体类型映射
  const getMediaTypes = (): Record<string, MediaTypeObject> => {
    if (contentType === 'mediaTypes' && typeof content === 'object') {
      return content as Record<string, MediaTypeObject>;
    }

    if (contentType === 'requestBody') {
      const resolvedBody = resolveRef<RequestBodyObject>(content as RequestBodyObject | ReferenceObject, components, 'requestBodies');
      return resolvedBody?.content || {};
    }

    if (contentType === 'response') {
      const resolvedResponse = resolveRef<ResponseObject>(content as ResponseObject | ReferenceObject, components, 'responses');
      return resolvedResponse?.content || {};
    }

    return {};
  };

  const mediaTypesContent = getMediaTypes();
  const mediaTypes = Object.keys(mediaTypesContent);
  const [activeMediaType, setActiveMediaType] = useState<string | null>(null);

  // 设置初始媒体类型，优先使用 application/json
  useEffect(() => {
    if (mediaTypes.length > 0) {
      const jsonType = mediaTypes.find(type => type.includes('json'));
      setActiveMediaType(jsonType || mediaTypes[0]);
    } else {
      setActiveMediaType(null);
    }
  }, [mediaTypes]);

  // 当媒体类型列表变化时更新选中的媒体类型
  useEffect(() => {
    if (activeMediaType && !mediaTypes.includes(activeMediaType) && mediaTypes.length > 0) {
      const jsonType = mediaTypes.find(type => type.includes('json'));
      setActiveMediaType(jsonType || mediaTypes[0]);
    }
    if (mediaTypes.length === 0) {
      setActiveMediaType(null);
    }
  }, [mediaTypes, activeMediaType]);

  if (mediaTypes.length === 0) {
    return (
      <div className="text-yellow-500 p-3">
        未定义内容
      </div>
    );
  }

  const selectedMediaTypeObject = activeMediaType ? mediaTypesContent[activeMediaType] : null;

  // 处理媒体类型切换
  const handleSelectMediaType = (mediaType: string) => {
    setActiveMediaType(mediaType);
  };

  // 获取说明信息（如果有）
  const getDescription = () => {
    if (contentType === 'requestBody') {
      const resolvedBody = resolveRef<RequestBodyObject>(content as RequestBodyObject | ReferenceObject, components, 'requestBodies');
      return resolvedBody?.description;
    }

    if (contentType === 'response') {
      const resolvedResponse = resolveRef<ResponseObject>(content as ResponseObject | ReferenceObject, components, 'responses');
      return resolvedResponse?.description;
    }

    return undefined;
  };

  const description = getDescription();

  return (
    <div className={`mb-4 ${className}`}>
      {/* 标题区域 */}
      {showTitle && title && (
        <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">{title}</h4>
      )}

      {/* 自定义头部区域 */}
      {renderHeader && renderHeader()}

      {/* 描述信息 */}
      {description && (
        <div className="mb-3">
          <DescriptionDisplay description={description} />
        </div>
      )}

      {/* 媒体类型选择器 */}
      {mediaTypes.length > 1 && (
        <div className="mb-3">
          <MediaTypeSelector
            mediaTypes={mediaTypes}
            activeMediaType={activeMediaType}
            onSelectMediaType={handleSelectMediaType}
          />
        </div>
      )}

      {/* 内容显示区域 */}
      {activeMediaType && selectedMediaTypeObject && (
        <div className="bg-gray-50/60 p-4 rounded space-y-4">
          {/* 使用 SchemaExampleView 组件显示 schema 和示例数据 */}
          <SchemaExampleView
            mediaType={selectedMediaTypeObject}
            components={components}
            contentClassName="mt-2"
          />

          {/* 自定义底部区域 */}
          {renderFooter && renderFooter(selectedMediaTypeObject)}
        </div>
      )}
    </div>
  );
};

export { SchemaExampleView };
export default SchemaWithExampleViewer;
