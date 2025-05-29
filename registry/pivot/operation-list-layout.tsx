"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import * as yaml from "js-yaml";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useOpenApi } from "../lib/use-openapi";
import { OperationBox } from "./operation-box";
import { TryItOutPanel } from "./try-it-out-panel";

// Import types from the centralized types file
import type {
  OpenApiSpec,
  OperationObject,
  PathItemObject,
  ServerObject
} from "@/types/openapi";

// Simple components for basic sections
const SectionTitle = React.forwardRef<HTMLDivElement, { title: string; className?: string }>(
  ({ title, className }, ref) => (
    <div ref={ref} className={cn("text-xl font-semibold text-neutral-900 dark:text-white", className)}>
      {title}
    </div>
  )
);
SectionTitle.displayName = "SectionTitle";

const InfoSection = React.forwardRef<HTMLDivElement, { info: any }>(
  ({ info }, ref) => (
    <div ref={ref} className="space-y-4">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{info.title}</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">Version: {info.version}</p>
      {info.description && (
        <p className="text-neutral-700 dark:text-neutral-300">{info.description}</p>
      )}
    </div>
  )
);
InfoSection.displayName = "InfoSection";

const ServersSection = React.forwardRef<HTMLDivElement, { servers: ServerObject[] }>(
  ({ servers }, ref) => (
    <div ref={ref} className="space-y-2">
      {servers.map((server, index) => (
        <div key={index} className="p-3 bg-white dark:bg-neutral-800 rounded-md">
          <code className="text-sm font-mono text-blue-600 dark:text-blue-400">{server.url}</code>
          {server.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{server.description}</p>
          )}
        </div>
      ))}
    </div>
  )
);
ServersSection.displayName = "ServersSection";

// 统一的接口定义
interface OperationListLayoutProps {
  spec: OpenApiSpec | string | null;
  selectedPath?: string | null;
  selectedMethod?: string | null;
  onSelectOperation?: (path: string, method: string, operation: OperationObject) => void;
  className?: string;
}

interface OperationInfo {
  path: string;
  method: string;
  operation: OperationObject;
}

const OperationListLayout = React.forwardRef<HTMLDivElement, OperationListLayoutProps>(
  ({ spec: inputSpec, selectedPath, selectedMethod, onSelectOperation, className }, ref) => {
    const { t } = useI18n();

    const [parsedSpec, setParsedSpec] = useState<OpenApiSpec | null>(null);
    const [parseError, setParseError] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState<string | null>(null);
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
                setParsedSpec(yamlData as OpenApiSpec);
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
        setParsedSpec(inputSpec);
        setParseError(null);
      }
    }, [inputSpec]);

    // Use the OpenAPI hook (now supports null spec)
    const openApiHook = useOpenApi(parsedSpec);

    // Get operations by tag using the hook
    const getOperationsByTagMemo = useMemo(() => {
      if (!openApiHook || !parsedSpec) return {};
      return openApiHook.getOperationsByTag();
    }, [openApiHook, parsedSpec]);

    // Operations filtered by tag
    const taggedOperations = useMemo(() => {
      if (activeTag && getOperationsByTagMemo[activeTag]) {
        return { [activeTag as string]: getOperationsByTagMemo[activeTag] || [] };
      }
      return getOperationsByTagMemo;
    }, [activeTag, getOperationsByTagMemo]);

    // Update the selected operation
    const handleSelectOperation = useCallback((path: string, method: string, operation: OperationObject) => {
      if (onSelectOperation) {
        onSelectOperation(path, method, operation);
      }

      // Scroll to the selected operation
      setTimeout(() => {
        // Use the same operationId generation logic as in the render
        const operationId = operation.operationId || `${method}-${path}`;
        const element = document.getElementById(`operation-${operationId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, [onSelectOperation]);

    // Auto-select the first operation, to display content by default when page loads
    useEffect(() => {
      try {
        if (parsedSpec && !selectedPath && !selectedMethod && openApiHook) {
          const operationsByTag = openApiHook.getOperationsByTag();
          const tags = Object.keys(operationsByTag);

          if (tags.length > 0) {
            const firstTag = tags[0];
            if (firstTag) {
              const operations = operationsByTag[firstTag];

              if (operations && operations.length > 0) {
                const firstOperation = operations[0];
                if (firstOperation) {
                  const { path, method, operation } = firstOperation;
                  handleSelectOperation(path, method, operation);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error auto-selecting operation:', error);
      }
    }, [parsedSpec, selectedPath, selectedMethod, handleSelectOperation, openApiHook]);

    // Scroll to selected operation when selectedPath or selectedMethod changes
    useEffect(() => {
      if (selectedPath && selectedMethod && parsedSpec) {
        setTimeout(() => {
          // Find the operation to get its operationId
          const pathItem = parsedSpec.paths[selectedPath];
          if (pathItem) {
            const operation = pathItem[selectedMethod.toLowerCase() as keyof PathItemObject];
            if (operation && typeof operation === 'object') {
              // Use the same operationId generation logic as in the render
              const operationId = (operation as OperationObject).operationId || `${selectedMethod.toLowerCase()}-${selectedPath}`;
              const element = document.getElementById(`operation-${operationId}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }
        }, 300); // Increased delay to ensure DOM is ready
      }
    }, [selectedPath, selectedMethod, parsedSpec]);

    // If there's a parsing error, display the error message
    if (parseError) {
      return (
        <div ref={ref} className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900">
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
        <div ref={ref} className="flex justify-center items-center min-h-[60vh] dark:text-neutral-200">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-neutral-500 dark:border-neutral-400"></div>
          <p className="ml-4 text-neutral-500 dark:text-neutral-400">{t('Parsing specification...')}</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("flex min-h-full bg-neutral-50 dark:bg-neutral-900", className)}>
        {/* Center Content Area */}
        <main className="flex-1 flex gap-2 p-8 mx-auto dark:text-neutral-200">
          <div>
            {/* 1. Info Section */}
            <div className="mb-10">
              {parsedSpec?.info && <InfoSection info={parsedSpec.info} />}
            </div>

            {/* 2. Servers Section */}
            {parsedSpec?.servers && parsedSpec.servers.length > 0 && (
              <div className="mb-10">
                <SectionTitle title={t('Servers')} className="text-2xl mb-6 pb-2 border-b dark:border-b-neutral-700" />
                <ServersSection servers={parsedSpec.servers} />
              </div>
            )}

            {/* 3. Operations Section (Filtered) */}
            <div className="mb-10">
              <SectionTitle
                title={activeTag ? t('Operations "%s"').replace('%s', activeTag) : t('All Operations')}
                className="text-2xl mb-6 pb-2 border-b dark:border-b-neutral-700"
              />

              {Object.keys(taggedOperations).length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(taggedOperations).map(([tag, operations]) => (
                    <div key={tag} className="space-y-4">
                      {tag !== activeTag && (
                        <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">{tag}</h3>
                      )}

                      {operations.map(({ path, method, operation }: { path: string; method: string; operation: OperationObject }) => {
                        const operationId = operation.operationId || `${method}-${path}`;
                        return (
                          <div key={`${method}-${path}`} id={`operation-${operationId}`}>
                            <OperationBox
                              onSelectOperation={() => handleSelectOperation(path, method, operation)}
                              path={path}
                              method={method.toUpperCase()}
                              operation={operation}
                              components={parsedSpec?.components}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                activeTag && (
                  <div className="text-neutral-500 dark:text-neutral-400 italic">{t('No operations found with tag "%s"').replace('%s', activeTag)}</div>
                )
              )}
            </div>
          </div>

          {/* Right Sidebar (Try It Out Panel) */}
          {selectedPath && selectedMethod && parsedSpec?.paths[selectedPath] && (
            <aside className="w-1/3 max-w-screen-md flex-shrink-0 p-4 relative">
              <div className="sticky top-4">
                {(() => {
                  const pathItem = parsedSpec.paths[selectedPath];
                  const operation = pathItem[selectedMethod.toLowerCase() as keyof PathItemObject];
                  if (operation && typeof operation === 'object' && 'summary' in operation) {
                    return (
                      <TryItOutPanel
                        operation={operation as any}
                        method={selectedMethod}
                        path={selectedPath}
                        baseUrl={parsedSpec?.servers?.[0]?.url || ''}
                        components={parsedSpec?.components}
                        collapsible={true}
                        defaultCollapsed={false}
                      />
                    );
                  }
                  return null;
                })()}
              </div>
            </aside>
          )}
        </main>
      </div>
    );
  }
);

OperationListLayout.displayName = "OperationListLayout";

export {
  OperationListLayout, type OperationInfo, type OperationListLayoutProps
};

