"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useOpenAPILoader, type OpenAPISource } from "@/registry/default/hooks/use-openapi-loader";
import { useI18n } from "@/registry/default/lib/i18n";
import { Codegen } from "@/registry/default/ui/codegen";
import { LanguageSwitcher } from "@/registry/default/ui/language-switcher";
import { MethodLabel } from "@/registry/default/ui/method-label";
import { NavigationSidebar } from "@/registry/default/ui/navigation-sidebar";
import { OperationDetail } from "@/registry/default/ui/operation-detail";
import { OperationPath } from "@/registry/default/ui/operation-path";
import { ThemeToggle } from "@/registry/default/ui/theme-toggle";
import { TryItOutPanel } from "@/registry/default/ui/try-it-out-panel";
import type { OpenAPIV3 } from "openapi-types";
import React, { useEffect, useMemo, useState } from "react";

// 统一的接口定义
interface OperationDetailedLayoutProps {
  // 支持多种输入方式 - 自动检测 URL、JSON 字符串或对象
  spec?: OpenAPIV3.Document | string | null;
  selectedPath?: string | null;
  selectedMethod?: string | null;
  onSelectOperation?: (
    path: string,
    method: string,
    operation: OpenAPIV3.OperationObject,
  ) => void;
  className?: string;
  // 新增开关控制
  showCodegen?: boolean;
  showTryPanel?: boolean;
  navigationWidth?: string;
}

const OperationDetailedLayout = React.forwardRef<
  HTMLDivElement,
  OperationDetailedLayoutProps
>(
  (
    {
      spec: inputSpec,
      selectedPath = null,
      selectedMethod = null,
      onSelectOperation = () => { },
      className,
      showCodegen = true,
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

    // 检测字符串是否为 URL
    const isUrl = (str: string): boolean => {
      return str.startsWith("http://") || str.startsWith("https://");
    };

    // 智能数据源选择：自动检测 URL > JSON 字符串 > 对象
    const dataSource: OpenAPISource | undefined = useMemo(() => {
      if (typeof inputSpec === "string") {
        if (isUrl(inputSpec)) {
          return { type: "url", data: inputSpec };
        }
        return { type: "string", data: inputSpec };
      }
      if (inputSpec && typeof inputSpec === "object") {
        return { type: "object", data: inputSpec };
      }
      return undefined;
    }, [inputSpec]);

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

    // 自动选择第一个操作
    useEffect(() => {
      if (spec && !localSelectedPath && !localSelectedMethod) {
        // 找到第一个可用的操作
        for (const [path, pathItem] of Object.entries(spec.paths || {})) {
          const methods = ["get", "post", "put", "delete", "patch", "options", "head"];
          for (const method of methods) {
            const operation = (pathItem as any)?.[method];
            if (operation && typeof operation === "object" && "responses" in operation) {
              setLocalSelectedPath(path);
              setLocalSelectedMethod(method);
              onSelectOperation(path, method, operation);
              return;
            }
          }
        }
      }
    }, [spec, onSelectOperation]); // 移除 localSelectedPath 和 localSelectedMethod 依赖

    // 操作选择处理
    const handleSelectOperation = (
      path: string,
      method: string,
      operation: OpenAPIV3.OperationObject,
    ) => {
      setLocalSelectedPath(path);
      setLocalSelectedMethod(method);
      onSelectOperation(path, method, operation);
    };

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

    // 计算布局类名
    const showRightPanel = showCodegen || showTryPanel;

    return (
      <SidebarProvider defaultOpen={true}>
        {/* 导航侧边栏 - 始终渲染 */}
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
          {/* 顶部工具栏 */}
          <div className="p-2 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              {/* 当前选中的操作信息 */}
              {localSelectedPath && localSelectedMethod && (
                <div className="flex items-center gap-2">
                  <MethodLabel variant="compact" method={localSelectedMethod.toUpperCase() as "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD"} />
                  <OperationPath path={localSelectedPath} />
                  {currentOperation && (currentOperation.summary || currentOperation.description) && (
                    <span className="text-sm text-muted-foreground truncate max-w-md">
                      - {currentOperation.summary || currentOperation.description}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* 内容布局 */}
          <div className="flex-1 flex">
            {/* 操作详情区域 */}
            <div
              className={cn('p-4', `flex-1 ${showRightPanel ? "border-r" : "max-w-4xl mx-auto"}`)}
            >
              {currentOperation && localSelectedPath && localSelectedMethod ? (
                <OperationDetail
                  operation={currentOperation}
                  path={localSelectedPath}
                  method={localSelectedMethod}
                  components={spec.components}
                  className="h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">
                      {t("Select an operation")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(
                        "Choose an operation from the sidebar to view its details",
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 右侧面板 */}
            {showRightPanel && (
              <div className="w-1/3 max-w-128 flex flex-col items-start p-4 gap-6">
                {/* 代码生成面板 */}
                {showCodegen && (
                  <div className="w-full">
                    {currentOperation && localSelectedPath && localSelectedMethod ? (
                      <Codegen
                        endpoint={`${baseUrl}${localSelectedPath}`}
                        method={localSelectedMethod.toLowerCase() as
                          | "get"
                          | "post"
                          | "put"
                          | "delete"
                          | "patch"
                          | "head"
                          | "options"
                          | "trace"
                        }
                        parameters={currentOperation.parameters}
                        requestBody={currentOperation.requestBody}
                        components={spec.components}
                        collapsible={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-sm text-muted-foreground">
                          {t("Select an operation to generate code")}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 试用面板 */}
                {showTryPanel && (
                  <div className="">
                    {currentOperation && localSelectedPath && localSelectedMethod ? (
                      <TryItOutPanel
                        operation={currentOperation}
                        path={localSelectedPath}
                        method={localSelectedMethod}
                        baseUrl={baseUrl}
                        components={spec.components}
                        collapsible={false}
                        className="h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-32">
                        <p className="text-sm text-muted-foreground">
                          {t("Select an operation to try it out")}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </SidebarProvider>
    );
  },
);

OperationDetailedLayout.displayName = "OperationDetailedLayout";

export { OperationDetailedLayout, type OperationDetailedLayoutProps };
