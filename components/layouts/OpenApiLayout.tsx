import { useOpenApi } from '@/hooks/useOpenApi';
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  HttpMethod,
  OpenApiSpec as OpenApiObject,
  OperationObject,
} from '@/types/openapi';
import * as yaml from 'js-yaml';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AccordionComponentsSection from '../AccordionComponentsSection';
import ExternalDocsDisplay from '../atoms/ExternalDocsDisplay';
import SectionTitle from '../atoms/SectionTitle';
import InfoSection from '../InfoSection';
import Codegen from '../interactive/Codegen';
import OperationBox from '../OperationBox';
import SecuritySection from '../SecuritySection';
import ServersSection from '../ServersSection';
import TryItOutPanel from '../TryItOutPanel';
import NavigationSidebar from './NavigationSidebar';
import ResizableSidebar from './ResizableSidebar';

interface AllInOneLayoutProps {
  spec: OpenApiObject | string | null; // Allow spec to be null
  className?: string;
}

const MIN_SIDEBAR_WIDTH = 280; // Minimum width
const MAX_SIDEBAR_WIDTH = 350; // Maximum width
const DEFAULT_SIDEBAR_WIDTH = 280; // Default width

const AllInOneLayout: React.FC<AllInOneLayoutProps> = ({ spec: inputSpec, className }) => {
  const { t } = useI18n();

  // All hooks must be called at the top level without conditions
  const [parsedSpec, setParsedSpec] = useState<OpenApiObject | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<{ path: string; method: string; operation: OperationObject } | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);

  const componentsRef = useRef<HTMLDivElement>(null);

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
  }, [inputSpec]);  // Create an empty spec object to provide to useOpenApi when parsedSpec is null
  const emptySpec = useMemo(() => ({
    openapi: '3.0.0',
    info: { title: '', version: '' },
    paths: {},
    components: {}
  }), []);

  // 无条件调用 useOpenApi，符合 React Hooks 规则
  // 当 parsedSpec 为 null 时，使用 emptySpec
  const {
    getOperationsByTag,
    components,
    resolve
  } = useOpenApi(parsedSpec || emptySpec);

  // 处理侧边栏宽度变化
  const handleSidebarWidthChange = (width: number) => {
    setSidebarWidth(width);
  };

  // Operations filtered by tag
  const currentOperationsByTag = getOperationsByTag();
  const taggedOperations = activeTag
    ? { [activeTag]: currentOperationsByTag[activeTag] || [] }
    : currentOperationsByTag;

  // Update the selected operation
  const handleSelectOperation = useCallback((operationId: string, path: string, method: string, operation: OperationObject) => {
    setSelectedOperationId(operationId);
    setSelectedOperation({
      path,
      method: method.toUpperCase(),
      operation
    });

    // Scroll to the selected operation
    setTimeout(() => {
      const element = document.getElementById(`operation-${operationId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  // Handle schema selection events
  const handleSelectSchema = (schemaName: string) => {
    setSelectedSchema(schemaName);

    // First scroll to the components section
    if (componentsRef.current) {
      componentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Notify AccordionComponentsSection to expand the corresponding schema
    setTimeout(() => {
      // Use custom event to notify AccordionComponentsSection
      const event = new CustomEvent('openapi-select-schema', {
        detail: { name: schemaName, type: 'schemas' }
      });
      document.dispatchEvent(event);
    }, 300);
  };

  // Auto-select the first operation, to display content by default when page loads
  useEffect(() => {
    // Delay execution to ensure components are fully rendered and data is loaded
    const timer = setTimeout(() => {
      if (selectedOperation || !parsedSpec) return;

      try {
        const operationsByTag = getOperationsByTag(); // Call the function directly from the hook
        const tags = Object.keys(operationsByTag);

        if (tags.length > 0) {
          const firstTag = tags[0];
          const operations = operationsByTag[firstTag];

          if (operations && operations.length > 0) {
            const { path, method, operation } = operations[0];
            const operationId = operation.operationId || `${method}-${path}`;
            handleSelectOperation(operationId, path, method, operation);
            console.log('Auto-selected operation:', operationId);
          }
        }
      } catch (error) {
        console.error('Error auto-selecting operation:', error);
      }
    }, 300); // Allow time for page rendering

    return () => clearTimeout(timer);
  }, [parsedSpec, handleSelectOperation, getOperationsByTag]);

  // If there's a parsing error, display the error message
  if (parseError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">{t('Specification Parse Error')}</h2>
          <p className="text-gray-700 dark:text-gray-300">{parseError}</p>
        </div>
      </div>
    );
  }

  // If the spec is not yet parsed, display loading state
  if (!parsedSpec) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] dark:text-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-500 dark:border-slate-400"></div>
        <p className="ml-4 text-slate-500 dark:text-slate-400">{t('Parsing specification...')}</p>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen bg-white dark:bg-gray-900 ${className}`}>
      {/* 使用ResizableSidebar组件 */}
      <ResizableSidebar
        defaultWidth={DEFAULT_SIDEBAR_WIDTH}
        minWidth={MIN_SIDEBAR_WIDTH}
        maxWidth={MAX_SIDEBAR_WIDTH}
        onWidthChange={handleSidebarWidthChange}
        sidebarClassName="bg-gray-50 dark:bg-gray-800"
        stickyPosition={true}
        topOffset="0px"
      >
        <NavigationSidebar
          openapi={parsedSpec}
          onSelectOperation={(path, method, operation) => {
            const operationId = operation.operationId || `${method}-${path}`;
            handleSelectOperation(operationId, path, method, operation);
          }}
          onSelectSchema={handleSelectSchema}
        />
      </ResizableSidebar>

      {/* Center Content Area */}
      <main className="flex-1 flex gap-2 p-8 overflow-y-auto h-screen mx-auto dark:text-gray-200">
        <div>
          {/* 1. Info Section */}
          <div className="mb-10">
            <SectionTitle title={t('Basic Information')} className="text-2xl mb-6 pb-2 border-b dark:border-b-gray-700" />
            {parsedSpec?.info && <InfoSection info={parsedSpec.info} />} {/* 使用可选链确保安全访问 */}
          </div>

          {/* 2. Servers Section */}
          {parsedSpec?.servers && parsedSpec.servers.length > 0 && ( /* 使用可选链确保安全访问 */
            <div className="mb-10">
              <SectionTitle title={t('Servers')} className="text-2xl mb-6 pb-2 border-b dark:border-b-gray-700" />
              <ServersSection servers={parsedSpec.servers} /> {/* 已确保服务器存在 */}
            </div>
          )}

          {/* 3. Operations Section (Filtered) */}
          <div className="mb-10">
            <SectionTitle
              title={activeTag ? t('Operations "%s"').replace('%s', activeTag) : t('All Operations')}
              className="text-2xl mb-6 pb-2 border-b dark:border-b-gray-700"
            />

            {Object.keys(taggedOperations).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(taggedOperations).map(([tag, operations]) => (
                  <div key={tag} className="space-y-4">
                    {tag !== activeTag && (
                      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">{tag}</h3>
                    )}

                    {operations.map(({ path, method, operation }: { path: string; method: string; operation: OperationObject }) => {
                      const operationId = operation.operationId || `${method}-${path}`;
                      return (
                        <div key={`${method}-${path}`} id={`operation-${operationId}`}>
                          <OperationBox
                            onSelectOperation={() => handleSelectOperation(operationId, path, method, operation)}
                            path={path}
                            method={method.toUpperCase()} // 确保这里仍然是大写，因为 NavigationSidebar 可能期望大写
                            operation={operation}
                            components={components}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              activeTag && (
                <div className="text-gray-500 dark:text-gray-400 italic">{t('No operations found with tag "%s"').replace('%s', activeTag)}</div>
              )
            )}
          </div>

          {/* 4. Components Section */}
          {components && Object.keys(components).length > 0 && (
            <div ref={componentsRef} className="mb-10" id="components-section">
              <SectionTitle title={t('Components')} className="text-2xl mb-6 pb-2 border-b dark:border-b-gray-700" />
              <AccordionComponentsSection
                components={components} // This comes from useOpenApi(parsedSpec)
                selectedSchema={selectedSchema}
              />
            </div>
          )}

          {/* 5. Security Section */}
          {(parsedSpec?.security || (components && 'securitySchemes' in components)) && ( /* 使用可选链确保安全访问 */
            <div className="mb-10">
              <SectionTitle title={t('Security')} className="text-2xl mb-6 pb-2 border-b dark:border-b-gray-700" />
              <SecuritySection
                security={parsedSpec?.security} /* 使用可选链确保安全访问 */
                securitySchemes={components && 'securitySchemes' in components ? components.securitySchemes : undefined}
                components={components} // This comes from useOpenApi(parsedSpec)
              />
            </div>
          )}

          {/* 6. External Docs Section (Root Level) */}
          {parsedSpec?.externalDocs && ( /* 使用可选链确保安全访问 */
            <div className="mb-10">
              <SectionTitle title={t('External Documentation')} className="text-2xl mb-6 pb-2 border-b dark:border-b-gray-700" />
              <ExternalDocsDisplay externalDocs={parsedSpec.externalDocs} /> {/* 已确保 externalDocs 存在 */}
            </div>
          )}
        </div>
        {/* Right Sidebar (Code Samples Placeholder) */}
        {selectedOperation && (
          <aside className="w-1/3 max-w-screen-md flex-shrink-0 p-4 relative">
            <div className="sticky top-4">
              <Codegen
                endpoint={selectedOperation.path}
                method={selectedOperation.method as HttpMethod}
                components={components} // This comes from useOpenApi(parsedSpec)
                requestBody={selectedOperation.operation.requestBody}
                parameters={selectedOperation.operation.parameters || []}
                collapsible={true}
                defaultCollapsed={false}
              />

              <div className="mt-6">
                <TryItOutPanel
                  operation={selectedOperation.operation}
                  method={selectedOperation.method}
                  path={selectedOperation.path}
                  baseUrl={parsedSpec?.servers && parsedSpec.servers.length > 0 ? parsedSpec.servers[0].url : ''} // 使用可选链确保安全访问
                  components={components} // This comes from useOpenApi(parsedSpec)
                  collapsible={true}
                  defaultCollapsed={false}
                />
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default AllInOneLayout;
