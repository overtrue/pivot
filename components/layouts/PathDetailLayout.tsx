import { useOpenApi } from '@/hooks/useOpenApi';
import useUrlParams from '@/hooks/useUrlParams';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  HttpMethod,
  OpenApiSpec as OpenApiObject,
  OperationObject,
  PathItemObject
} from '@/types/openapi';
import * as yaml from 'js-yaml';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DescriptionDisplay from '../atoms/DescriptionDisplay';
import MethodLabel from '../atoms/MethodLabel';
import OperationPath from '../atoms/OperationPath';
import Codegen from '../interactive/Codegen';
import ParametersSection from '../ParametersSection';
import RequestBodySection from '../RequestBodySection';
import ResponsesSection from '../ResponsesSection';
import TryItOutPanel from '../TryItOutPanel';
import NavigationSidebar from './NavigationSidebar';
import ResizableSidebar from './ResizableSidebar';

interface PathDetailLayoutProps {
  spec: OpenApiObject | string | null; // Allow spec to be null
  className?: string;
}

const MIN_SIDEBAR_WIDTH = 280; // Minimum width
const MAX_SIDEBAR_WIDTH = 350; // Maximum width
const DEFAULT_SIDEBAR_WIDTH = 280; // Default width

const PathDetailLayout: React.FC<PathDetailLayoutProps> = ({ spec: inputSpec, className }) => {
  const { t } = useI18n();

  // All hooks must be called at the top level without conditions
  const [parsedSpec, setParsedSpec] = useState<OpenApiObject | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [urlParams, setUrlParams] = useUrlParams<{ path: string | null; method: string | null }>({
    path: null,
    method: null
  });
  const [selectedOperation, setSelectedOperation] = useState<{ path: string; method: string; operation: OperationObject } | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);

  // Parse string to OpenAPI object
  useEffect(() => {
    if (typeof inputSpec === 'string') {
      try {
        // Try to parse as JSON
        try {
          const jsonData = JSON.parse(inputSpec);
          setParsedSpec(jsonData);
          setParseError(null);
          return;
        } catch (jsonError) {
          // JSON parsing failed, try parsing as YAML
          try {
            const yamlData = yaml.load(inputSpec);
            if (typeof yamlData === 'object' && yamlData !== null) {
              setParsedSpec(yamlData as OpenApiObject);
              setParseError(null);
              return;
            } else {
              throw new Error('Parsed YAML is not a valid object');
            }
          } catch (yamlError) {
            setParseError(`Failed to parse OpenAPI spec: ${yamlError instanceof Error ? yamlError.message : 'Unknown error'}`);
            setParsedSpec(null);
          }
        }
      } catch (error) {
        setParseError(`Failed to parse OpenAPI spec: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setParsedSpec(null);
      }
    } else {
      // Input is already an object
      console.log('Parsed OpenAPI spec:', inputSpec);
      setParsedSpec(inputSpec);
      setParseError(null);
    }
  }, [inputSpec]);

  // Create an empty spec object to provide to useOpenApi when parsedSpec is null
  const emptySpec = useMemo(() => ({
    openapi: '3.0.0',
    info: { title: '', version: '' },
    paths: {},
    components: {}
  }), []);

  // 无条件调用 useOpenApi，符合 React Hooks 规则
  // 当 parsedSpec 为 null 时，使用 emptySpec
  const {
    components,
    resolve
  } = useOpenApi(parsedSpec || emptySpec);

  // 处理侧边栏宽度变化
  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  // Update the selected operation
  const handleSelectOperation = useCallback((path: string, method: string, operation: OperationObject) => {
    setSelectedOperation({
      path,
      method: method.toUpperCase(),
      operation
    });
    setUrlParams({
      path,
      method: method.toUpperCase()
    });
  }, [setUrlParams]);

  // 组件加载时，从 URL 参数中恢复选中状态
  useEffect(() => {
    if (parsedSpec && parsedSpec.paths) {
      const { path, method } = urlParams;

      if (path && method && parsedSpec.paths[path]) {
        const pathItem = parsedSpec.paths[path];
        const normalizedMethod = method.toLowerCase() as keyof PathItemObject;

        // 检查方法是否为有效的 HTTP 方法
        if (
          normalizedMethod === 'get' ||
          normalizedMethod === 'post' ||
          normalizedMethod === 'put' ||
          normalizedMethod === 'delete' ||
          normalizedMethod === 'options' ||
          normalizedMethod === 'head' ||
          normalizedMethod === 'patch' ||
          normalizedMethod === 'trace'
        ) {
          const operation = pathItem[normalizedMethod];
          if (operation) {
            // 只设置 selectedOperation 状态，避免重复更新 URL
            setSelectedOperation({
              path,
              method: method.toUpperCase(),
              operation
            });
          }
        }
      }
    }
  }, [parsedSpec, urlParams]);

  // If there's a parsing error, display the error message
  if (parseError) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">{t('Specification Parse Error')}</h2>
          <p className="text-neutral-700 dark:text-neutral-300">{parseError}</p>
        </div>
      </div>
    );
  }

  // If the spec is not yet parsed, display loading state
  if (!parsedSpec) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] dark:text-neutral-200">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-neutral-500 dark:border-neutral-400"></div>
        <p className="ml-4 text-neutral-500 dark:text-neutral-400">{t('Parsing specification...')}</p>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen bg-white dark:bg-neutral-900 ${className}`}>
      {/* 使用ResizableSidebar组件 */}
      <ResizableSidebar
        defaultWidth={DEFAULT_SIDEBAR_WIDTH}
        minWidth={MIN_SIDEBAR_WIDTH}
        maxWidth={MAX_SIDEBAR_WIDTH}
        onWidthChange={handleSidebarWidthChange}
        sidebarClassName="bg-neutral-50 dark:bg-neutral-800"
        stickyPosition={true}
        topOffset="0px"
      >
        <NavigationSidebar
          openapi={parsedSpec}
          activePath={selectedOperation?.path}
          activeMethod={selectedOperation?.method}
          onSelectOperation={handleSelectOperation}
        />
      </ResizableSidebar>

      {/* Center Content Area */}
      <main className="flex-1 p-8 overflow-y-auto h-screen dark:text-neutral-200">
        {selectedOperation ? (
          <div className="xl:flex flex-wrap w-full gap-6">
            {/* 左侧内容面板 - API详情 */}
            <div className="flex-1">
              {/* API 操作详情 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <MethodLabel method={selectedOperation.method as any} className="text-sm" />
                  <OperationPath path={selectedOperation.path} className="text-2xl font-semibold" />
                </div>

                {/* 操作描述 */}
                {(selectedOperation.operation.summary || selectedOperation.operation.description) && (
                  <div className="my-8">
                    {selectedOperation.operation.summary && (
                      <h2 className="text-xl font-medium mb-2 dark:text-neutral-200">{selectedOperation.operation.summary}</h2>
                    )}
                    {selectedOperation.operation.description && (
                      <DescriptionDisplay description={selectedOperation.operation.description} />
                    )}
                  </div>
                )}

                {/* 参数部分 */}
                {selectedOperation.operation.parameters && selectedOperation.operation.parameters.length > 0 && (
                  <ParametersSection
                    parameters={selectedOperation.operation.parameters}
                    components={components}
                    expanded={true}
                  />
                )}

                {/* 请求体部分 */}
                {selectedOperation.operation.requestBody && (
                  <RequestBodySection
                    requestBody={selectedOperation.operation.requestBody}
                    components={components}
                  />
                )}

                {/* 响应部分 */}
                {selectedOperation.operation.responses && Object.keys(selectedOperation.operation.responses).length > 0 && (
                  <ResponsesSection
                    responses={selectedOperation.operation.responses}
                    components={components}
                  />
                )}
              </div>
            </div>

            {/* 右侧面板 - 代码示例和Try It Out */}
            <div className="w-1/3 min-w-[560px] max-w-screen-md flex-shrink-0">
              <div className="sticky top-4 space-y-6">
                {/* 代码生成器面板 */}
                <div className="">
                  <Codegen
                    endpoint={selectedOperation.path}
                    method={selectedOperation.method as HttpMethod}
                    components={components}
                    requestBody={selectedOperation.operation.requestBody}
                    parameters={selectedOperation.operation.parameters || []}
                    collapsible={false}
                  />
                </div>

                {/* Try It Out面板 */}
                <div className="">
                  <TryItOutPanel
                    operation={selectedOperation.operation}
                    method={selectedOperation.method}
                    path={selectedOperation.path}
                    baseUrl={parsedSpec?.servers && parsedSpec.servers.length > 0 ? parsedSpec.servers[0].url : ''}
                    components={components}
                    collapsible={false}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-semibold mb-4 dark:text-neutral-200">{t('Select an API endpoint')}</h2>
              <p className="text-neutral-600 dark:text-neutral-400">{t('Choose an API endpoint from the sidebar to view its details.')}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PathDetailLayout;
