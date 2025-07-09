"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useOpenApi } from "@/registry/default/hooks/use-openapi";
import { useOpenAPILoader, type OpenAPISource } from "@/registry/default/hooks/use-openapi-loader";
import { useI18n } from "@/registry/default/lib/i18n";
import { NavigationSidebar } from "@/registry/default/ui/navigation-sidebar";
import { OperationBox } from "@/registry/default/ui/operation-box";
import { TryItOutPanel } from "@/registry/default/ui/try-it-out-panel";
import type { OpenAPIV3 } from "openapi-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Simple components for basic sections
const SectionTitle = React.forwardRef<
  HTMLDivElement,
  { title: string; className?: string }
>(({ title, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-semibold text-neutral-900 dark:text-white",
      className,
    )}
  >
    {title}
  </div>
));
SectionTitle.displayName = "SectionTitle";

const InfoSection = React.forwardRef<HTMLDivElement, { info: any }>(
  ({ info }, ref) => (
    <div ref={ref} className="space-y-4">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        {info.title}
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Version: {info.version}
      </p>
      {info.description && (
        <p className="text-neutral-700 dark:text-neutral-300">
          {info.description}
        </p>
      )}
    </div>
  ),
);
InfoSection.displayName = "InfoSection";

const ServersSection = React.forwardRef<
  HTMLDivElement,
  { servers: OpenAPIV3.ServerObject[] }
>(({ servers }, ref) => (
  <div ref={ref} className="space-y-2">
    {servers.map((server, index) => (
      <div key={index} className="p-3 bg-white dark:bg-neutral-800 rounded-md">
        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
          {server.url}
        </code>
        {server.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {server.description}
          </p>
        )}
      </div>
    ))}
  </div>
));
ServersSection.displayName = "ServersSection";

// 统一的接口定义
interface OperationListLayoutProps {
  // 支持多种输入方式 - 向后兼容
  spec?: OpenAPIV3.Document | string | null;
  url?: string;
  selectedPath?: string | null;
  selectedMethod?: string | null;
  onSelectOperation?: (
    path: string,
    method: string,
    operation: OpenAPIV3.OperationObject,
  ) => void;
  className?: string;
  // 新增开关控制
  showNavigation?: boolean;
  showTryPanel?: boolean;
  navigationWidth?: string;
}

interface OperationInfo {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
}

const OperationListLayout = React.forwardRef<
  HTMLDivElement,
  OperationListLayoutProps
>(
  (
    {
      spec: inputSpec,
      url,
      selectedPath = null,
      selectedMethod = null,
      onSelectOperation = () => { },
      className,
      showNavigation = true,
      showTryPanel = true,
      navigationWidth = "320px",
    },
    ref,
  ) => {
    const { t } = useI18n();
    const [localSelectedPath, setLocalSelectedPath] = useState<string | null>(
      selectedPath,
    );
    const [localSelectedMethod, setLocalSelectedMethod] = useState<
      string | null
    >(selectedMethod);
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const componentsRef = useRef<HTMLDivElement>(null);

    // 智能数据源选择：URL > 字符串 > 对象
    const dataSource: OpenAPISource | undefined = useMemo(() => {
      if (url) {
        return { type: "url", data: url };
      }
      if (typeof inputSpec === "string") {
        return { type: "string", data: inputSpec };
      }
      if (inputSpec && typeof inputSpec === "object") {
        return { type: "object", data: inputSpec };
      }
      return undefined;
    }, [url, inputSpec]);

    // 使用统一的数据加载器
    const { spec, loading, error, loadFromUrl, loadFromString, loadFromObject } =
      useOpenAPILoader(dataSource);

    // 同步外部状态变化
    useEffect(() => {
      setLocalSelectedPath(selectedPath);
    }, [selectedPath]);

    useEffect(() => {
      setLocalSelectedMethod(selectedMethod);
    }, [selectedMethod]);

    // Use the OpenAPI hook
    const openApiHook = useOpenApi(spec);

    // Get operations by tag using the hook
    const getOperationsByTagMemo = useMemo(() => {
      if (!openApiHook || !spec) return {};
      return openApiHook.getOperationsByTag();
    }, [openApiHook, spec]);

    // Operations filtered by tag
    const taggedOperations = useMemo(() => {
      if (activeTag && getOperationsByTagMemo[activeTag]) {
        return {
          [activeTag as string]: getOperationsByTagMemo[activeTag] || [],
        };
      }
      return getOperationsByTagMemo;
    }, [activeTag, getOperationsByTagMemo]);

    // 操作选择处理
    const handleSelectOperation = useCallback(
      (path: string, method: string, operation: OpenAPIV3.OperationObject) => {
        setLocalSelectedPath(path);
        setLocalSelectedMethod(method);
        onSelectOperation(path, method, operation);

        // Scroll to the selected operation
        setTimeout(() => {
          const operationId = operation.operationId || `${method}-${path}`;
          const element = document.getElementById(`operation-${operationId}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      },
      [onSelectOperation],
    );

    // Auto-select the first operation, to display content by default when page loads
    useEffect(() => {
      try {
        if (spec && !localSelectedPath && !localSelectedMethod && openApiHook) {
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
        console.error("Error auto-selecting operation:", error);
      }
    }, [
      spec,
      localSelectedPath,
      localSelectedMethod,
      handleSelectOperation,
      openApiHook,
    ]);

    // Scroll to selected operation when selectedPath or selectedMethod changes
    useEffect(() => {
      if (localSelectedPath && localSelectedMethod && spec) {
        setTimeout(() => {
          // Find the operation to get its operationId
          const pathItem = spec.paths[localSelectedPath];
          if (pathItem) {
            const operation =
              pathItem[
              localSelectedMethod.toLowerCase() as keyof OpenAPIV3.PathItemObject
              ];
            if (operation && typeof operation === "object") {
              // Use the same operationId generation logic as in the render
              const operationId =
                (operation as OpenAPIV3.OperationObject).operationId ||
                `${localSelectedMethod.toLowerCase()}-${localSelectedPath}`;
              const element = document.getElementById(
                `operation-${operationId}`,
              );
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
          }
        }, 300);
      }
    }, [localSelectedPath, localSelectedMethod, spec]);

    // 获取当前选择的操作
    const currentOperation = useMemo(() => {
      if (!spec || !localSelectedPath || !localSelectedMethod) return null;

      const pathItem = spec.paths?.[localSelectedPath];
      if (!pathItem) return null;

      const operation = pathItem[localSelectedMethod.toLowerCase() as keyof typeof pathItem];
      if (!operation || typeof operation !== "object" || !("responses" in operation)) {
        return null;
      }

      return operation as OpenAPIV3.OperationObject;
    }, [spec, localSelectedPath, localSelectedMethod]);

    // 构建服务器 URL
    const baseUrl = useMemo(() => {
      if (!spec?.servers || spec.servers.length === 0) return "";
      return spec.servers[0]?.url || "";
    }, [spec]);

    // 错误状态
    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-destructive mb-2">
              {t("Error loading OpenAPI specification")}
            </h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      );
    }

    // 加载状态
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">
              {t("Loading OpenAPI specification...")}
            </p>
          </div>
        </div>
      );
    }

    // 无数据状态
    if (!spec) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">
              {t("No OpenAPI specification")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("Please provide a valid OpenAPI specification")}
            </p>
          </div>
        </div>
      );
    }

    // 如果不显示导航栏，使用原始布局
    if (!showNavigation) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex min-h-full bg-neutral-50 dark:bg-neutral-900",
            className,
          )}
        >
          {/* Center Content Area - 保持原有的操作列表结构 */}
          <main className="flex-1 flex gap-2 p-8 mx-auto dark:text-neutral-200">
            <div>
              {/* 1. Info Section */}
              <div className="mb-10">
                {spec?.info && <InfoSection info={spec.info} />}
              </div>

              {/* 2. Servers Section */}
              {spec?.servers && spec.servers.length > 0 && (
                <div className="mb-10">
                  <SectionTitle
                    title={t("Servers")}
                    className="text-2xl mb-6 pb-2 border-b dark:border-b-neutral-700"
                  />
                  <ServersSection servers={spec.servers} />
                </div>
              )}

              {/* 3. Operations Section (Filtered) - 保持原有结构 */}
              <div className="mb-10">
                <SectionTitle
                  title={
                    activeTag
                      ? t('Operations "%s"').replace("%s", activeTag)
                      : t("All Operations")
                  }
                  className="text-2xl mb-6 pb-2 border-b dark:border-b-neutral-700"
                />

                {Object.keys(taggedOperations).length > 0 ? (
                  <div className="space-y-8">
                    {Object.entries(taggedOperations).map(([tag, operations]) => (
                      <div key={tag} className="space-y-4">
                        {tag !== activeTag && (
                          <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">
                            {tag}
                          </h3>
                        )}

                        {operations.map(
                          ({
                            path,
                            method,
                            operation,
                          }: {
                            path: string;
                            method: string;
                            operation: OpenAPIV3.OperationObject;
                          }) => {
                            const operationId =
                              operation.operationId || `${method}-${path}`;
                            return (
                              <div
                                key={`${method}-${path}`}
                                id={`operation-${operationId}`}
                              >
                                <OperationBox
                                  onSelectOperation={() =>
                                    handleSelectOperation(path, method, operation)
                                  }
                                  path={path}
                                  method={method.toUpperCase()}
                                  operation={operation}
                                  components={spec?.components}
                                />
                              </div>
                            );
                          },
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  activeTag && (
                    <div className="text-neutral-500 dark:text-neutral-400 italic">
                      {t('No operations found with tag "%s"').replace(
                        "%s",
                        activeTag,
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Sidebar (Try It Out Panel) - 保持原有结构 */}
            {showTryPanel && currentOperation && localSelectedPath && localSelectedMethod && (
              <aside className="w-1/3 max-w-screen-md flex-shrink-0 p-4 relative">
                <div className="sticky top-4">
                  <TryItOutPanel
                    operation={currentOperation}
                    method={localSelectedMethod}
                    path={localSelectedPath}
                    baseUrl={baseUrl}
                    components={spec?.components}
                    collapsible={true}
                    defaultCollapsed={false}
                  />
                </div>
              </aside>
            )}
          </main>
        </div>
      );
    }

    // 使用 Sidebar 布局 - 与 operation-detailed-layout.tsx 保持一致的外层结构
    return (
      <SidebarProvider defaultOpen={true}>
        {/* 导航侧边栏 */}
        <NavigationSidebar
          openapi={spec}
          activePath={localSelectedPath}
          activeMethod={localSelectedMethod}
          onSelectOperation={handleSelectOperation}
        />

        {/* 主内容区域 */}
        <main
          ref={ref}
          className={cn(`flex-1 flex flex-col h-full`, className)}
        >
          {/* Sidebar 控制按钮 */}
          <div className="p-2 border-b">
            <SidebarTrigger />
          </div>

          {/* 内容布局 */}
          <div className="flex-1 flex">
            {/* 操作列表区域 - 保持原有的列表展示结构 */}
            <div
              className={cn(
                'p-4 bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-200',
                showTryPanel ? "flex-1 border-r" : "max-w-4xl mx-auto"
              )}
            >
              {/* 1. Info Section */}
              <div className="mb-10">
                {spec?.info && <InfoSection info={spec.info} />}
              </div>

              {/* 2. Servers Section */}
              {spec?.servers && spec.servers.length > 0 && (
                <div className="mb-10">
                  <SectionTitle
                    title={t("Servers")}
                    className="text-2xl mb-6 pb-2 border-b dark:border-b-neutral-700"
                  />
                  <ServersSection servers={spec.servers} />
                </div>
              )}

              {/* 3. Operations Section (Filtered) - 保持原有的列表结构 */}
              <div className="mb-10">
                <SectionTitle
                  title={
                    activeTag
                      ? t('Operations "%s"').replace("%s", activeTag)
                      : t("All Operations")
                  }
                  className="text-2xl mb-6 pb-2 border-b dark:border-b-neutral-700"
                />

                {Object.keys(taggedOperations).length > 0 ? (
                  <div className="space-y-8">
                    {Object.entries(taggedOperations).map(([tag, operations]) => (
                      <div key={tag} className="space-y-4">
                        {tag !== activeTag && (
                          <h3 className="text-xl font-medium text-neutral-700 dark:text-neutral-300">
                            {tag}
                          </h3>
                        )}

                        {operations.map(
                          ({
                            path,
                            method,
                            operation,
                          }: {
                            path: string;
                            method: string;
                            operation: OpenAPIV3.OperationObject;
                          }) => {
                            const operationId =
                              operation.operationId || `${method}-${path}`;
                            return (
                              <div
                                key={`${method}-${path}`}
                                id={`operation-${operationId}`}
                              >
                                <OperationBox
                                  onSelectOperation={() =>
                                    handleSelectOperation(path, method, operation)
                                  }
                                  path={path}
                                  method={method.toUpperCase()}
                                  operation={operation}
                                  components={spec?.components}
                                />
                              </div>
                            );
                          },
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  activeTag && (
                    <div className="text-neutral-500 dark:text-neutral-400 italic">
                      {t('No operations found with tag "%s"').replace(
                        "%s",
                        activeTag,
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 右侧试用面板 */}
            {showTryPanel && currentOperation && localSelectedPath && localSelectedMethod && (
              <div className="w-1/3 max-w-128 flex flex-col items-start p-4">
                <div className="w-full sticky top-4">
                  <TryItOutPanel
                    operation={currentOperation}
                    method={localSelectedMethod}
                    path={localSelectedPath}
                    baseUrl={baseUrl}
                    components={spec?.components}
                    collapsible={true}
                    defaultCollapsed={false}
                    className="h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </SidebarProvider>
    );
  },
);

OperationListLayout.displayName = "OperationListLayout";

export {
  OperationListLayout,
  type OperationInfo,
  type OperationListLayoutProps
};

