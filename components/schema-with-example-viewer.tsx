import { useI18n } from '@/lib/i18n/i18n-provider';
import {
  ComponentsObject,
  ExampleObject,
  MediaTypeObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject
} from '@/types/openapi';
import { cn } from '@/utils/cn';
import { generateExample } from '@/utils/generateExample';
import { resolveRef } from '@/utils/resolveRef';
import React, { useEffect, useState } from 'react';
import DescriptionDisplay from './description-display';
import ExampleDisplay from './example-display';
import MediaTypeSelector from './media-type-selector';
import SchemaDisplay from './schema-display';

// ===== SchemaExampleView Component Section =====

// Define view modes
type ViewMode = 'schema' | 'example';

interface SchemaExampleViewProps {
  mediaType: MediaTypeObject;
  mediaTypeName?: string;
  components?: ComponentsObject;
  className?: string;
  buttonClassName?: string;
  contentClassName?: string;
}

/**
 * Generic Schema and Example Data View Component
 * Can display schema and its corresponding example data, with ability to toggle between them
 */
const SchemaExampleView: React.FC<SchemaExampleViewProps> = ({
  mediaType,
  mediaTypeName = 'application/json',
  components,
  className = '',
  buttonClassName = '',
  contentClassName = ''
}) => {
  const { t } = useI18n();

  // View mode state - defaults to example
  const [viewMode, setViewMode] = useState<ViewMode>('example');
  // Currently selected example name
  const [selectedExample, setSelectedExample] = useState<string>('');

  // Get schema
  const schema = mediaType.schema;
  if (!schema) {
    return <div className="text-yellow-500 dark:text-yellow-400">{t('Schema not defined')}</div>;
  }

  // Get example data
  const hasExample = !!mediaType.example;
  const hasExamples = !!(mediaType.examples && Object.keys(mediaType.examples || {}).length > 0);
  const examplesKeys = hasExamples ? Object.keys(mediaType.examples || {}) : [];

  // Ensure an example is selected
  useEffect(() => {
    if (hasExamples && !selectedExample && examplesKeys.length > 0) {
      setSelectedExample(examplesKeys[0]);
    }
  }, [hasExamples, selectedExample, examplesKeys]);

  // Get current selected example
  const currentExample = selectedExample && hasExamples
    ? resolveRef<ExampleObject>(mediaType.examples![selectedExample], components, 'examples')
    : null;

  // Example display content - prefer provided example, otherwise generate from schema
  const providedExample = currentExample?.value || mediaType.example;
  const generatedExample = generateExample(schema, components);
  const exampleValue = providedExample || generatedExample;

  // Check if any example is available
  const hasAnyExample = true; // Always can show example since we can generate now

  // Toggle view mode
  const toggleViewMode = (mode: ViewMode) => {
    if (mode === viewMode) return; // If already in this mode, do nothing
    setViewMode(mode);
    console.log(t('Switched view mode to: %s').replace('%s', mode));
  };

  return (
    <div className={className}>
      {/* View switcher */}
      <div className="mb-4 flex items-center justify-between">
        <div className={cn('flex bg-neutral-100 dark:bg-neutral-700 rounded-lg p-0.5 relative', buttonClassName)}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleViewMode('example');
            }}
            className={cn(
              'px-3 py-1 text-sm rounded-md transition-colors',
              viewMode === 'example'
                ? 'bg-white dark:bg-neutral-800 shadow text-blue-700 dark:text-blue-400'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
            )}
            type="button"
          >
            {t('Example')}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleViewMode('schema');
            }}
            className={cn(
              'px-3 py-1 text-sm rounded-md transition-colors',
              viewMode === 'schema'
                ? 'bg-white dark:bg-neutral-800 shadow text-blue-700 dark:text-blue-400'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
            )}
            type="button"
          >
            {t('Schema')}
          </button>
        </div>

        {/* Multiple examples selector */}
        {viewMode === 'example' && hasExamples && examplesKeys.length > 1 && (
          <div className="ml-2 relative">
            <select
              className="text-sm border rounded-md px-2 py-1 bg-white dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600"
              value={selectedExample}
              onChange={(e) => setSelectedExample(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              {examplesKeys.map(key => {
                const example = resolveRef<ExampleObject>(mediaType.examples![key], components, 'examples');
                const displayName = example?.summary || key;
                return (
                  <option key={key} value={key} className="dark:bg-neutral-700">
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* Content display area */}
      <div className={contentClassName}>
        {/* Display different content based on view mode */}
        {viewMode === 'example' ? (
          /* Example data view */
          <ExampleDisplay
            example={exampleValue}
            className="rounded overflow-hidden bg-neutral-50 dark:bg-neutral-800"
            language={getLanguageForMediaType()}
          />
        ) : (
          /* Schema structure view */
          <SchemaDisplay
            schema={schema}
            components={components}
            className="rounded p-3 bg-neutral-50 dark:bg-neutral-800"
          />
        )}
      </div>
    </div>
  );

  // Get language based on media type
  function getLanguageForMediaType(): string {
    if (mediaTypeName.includes('json')) {
      return 'json';
    } else if (mediaTypeName.includes('xml')) {
      return 'xml';
    } else if (mediaTypeName.includes('yaml') || mediaTypeName.includes('yml')) {
      return 'yaml';
    } else {
      return 'text';
    }
  }
};

// ===== SchemaWithExampleViewer Component Section =====

interface SchemaWithExampleViewerProps {
  // Content can be a request body or response body
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
 * Schema and Example Viewer Component
 * Used to display schema and its example data, supporting switching between different media type formats
 */
const SchemaWithExampleViewer: React.FC<SchemaWithExampleViewerProps> = ({
  content,
  components,
  className = '',
  contentType = 'mediaTypes',
  renderHeader,
  renderFooter
}) => {
  const { t } = useI18n();

  // Based on content type, get the media type mapping
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

  // Set initial media type, prefer application/json
  useEffect(() => {
    if (mediaTypes.length > 0 && activeMediaType === null) {
      const jsonType = mediaTypes.find(type => type.includes('json'));
      setActiveMediaType(jsonType || mediaTypes[0]);
    } else if (mediaTypes.length === 0) {
      setActiveMediaType(null);
    }
  }, [mediaTypes, activeMediaType]);

  // Check if the current media type selection is valid when the list changes
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
      <div className="text-yellow-500 dark:text-yellow-400 p-3">
        {t("No content defined")}
      </div>
    );
  }

  const selectedMediaTypeObject = activeMediaType ? mediaTypesContent[activeMediaType] : null;

  // Handle media type switching
  const handleSelectMediaType = (mediaType: string) => {
    setActiveMediaType(mediaType);
  };

  // Get description (if available)
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
    <div className={cn('mb-4', 'dark:text-neutral-200', className)}>
      {/* Custom header area */}
      {renderHeader && renderHeader()}

      {/* Description information */}
      {description && (
        <div className="mb-3">
          <DescriptionDisplay description={description} />
        </div>
      )}

      {/* Media type selector */}
      {mediaTypes.length > 1 && (
        <div className="mb-3">
          <MediaTypeSelector
            mediaTypes={mediaTypes}
            activeMediaType={activeMediaType}
            onSelectMediaType={handleSelectMediaType}
          />
        </div>
      )}

      {/* Content display area */}
      {activeMediaType && selectedMediaTypeObject && (
        <div className="space-y-4">
          {/* Use SchemaExampleView component to display schema and example data */}
          <SchemaExampleView
            key={activeMediaType}
            mediaType={selectedMediaTypeObject}
            mediaTypeName={activeMediaType}
            components={components}
            contentClassName="mt-2"
          />

          {/* Custom footer area */}
          {renderFooter && renderFooter(selectedMediaTypeObject)}
        </div>
      )}
    </div>
  );
};

export { SchemaExampleView };
export default SchemaWithExampleViewer;
