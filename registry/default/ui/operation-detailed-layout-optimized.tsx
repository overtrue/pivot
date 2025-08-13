"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { OpenAPIProvider, useOpenAPIContext } from "@/registry/default/contexts/openapi-context";
import { useOpenAPILoader } from "@/registry/default/hooks/use-openapi-loader";
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
import React, { useEffect, useMemo } from "react";

// ===== 内部组件（使用 Context）=====

const OperationDetailContent: React.FC<{
  showCodegen?: boolean;
  showTryPanel?: boolean;
}> = ({ showCodegen = true, showTryPanel = true }) => {
  const { t } = useI18n();
  const { spec, selectedOperation, setSelectedOperation } = useOpenAPIContext();

  // 自动选择第一个操作
  useEffect(() => {
    if (spec && !selectedOperation.path && !selectedOperation.method) {
      // 找到第一个可用的操作
      for (const [path, pathItem] of Object.entries(spec.paths || {})) {
        const methods = ["get", "post", "put", "delete", "patch", "options", "head"];
        for (const method of methods) {
          const operation = (pathItem as OpenAPIV3.PathItemObject)?.[
            method as keyof OpenAPIV3.PathItemObject
          ];
          if (operation && typeof operation === "object" && "responses" in operation) {
            setSelectedOperation(path, method);
            return;
          }
        }
      }
    }
  }, [spec, selectedOperation, setSelectedOperation]);

  // 获取当前选择的操作
  const currentOperation = useMemo(() => {
    if (!spec || !selectedOperation.path || !selectedOperation.method) return null;

    const pathItem = spec.paths?.[selectedOperation.path];
    if (!pathItem) return null;

    const operation =
      pathItem[selectedOperation.method.toLowerCase() as keyof typeof pathItem];
    if (!operation || typeof operation !== "object" || !("responses" in operation)) {
      return null;
    }

    return operation as OpenAPIV3.OperationObject;
  }, [spec, selectedOperation]);

  // 构建服务器 URL
  const baseUrl = useMemo(() => {
    if (!spec?.servers || spec.servers.length === 0) return "";
    return spec.servers[0]?.url || "";
  }, [spec]);

  // 操作选择处理
  const handleSelectOperation = (
    path: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    operation: OpenAPIV3.OperationObject
  ) => {
    setSelectedOperation(path, method);
  };

  // 判断是否显示右侧面板
  const showRightPanel = showCodegen || showTryPanel;

  return (
    <SidebarProvider>
      {/* 导航侧边栏 */}
      <NavigationSidebar
        spec={spec!}
        activePath={selectedOperation.path}
        activeMethod={selectedOperation.method}
        onSelectOperation={handleSelectOperation}
        className="w-64"
      />

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 顶部栏 */}
        <div className="border-b px-4 py-3 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            {selectedOperation.path && selectedOperation.method && (
              <div className="flex items-center gap-2">
                <MethodLabel method={selectedOperation.method.toUpperCase() as any} />
                <OperationPath
                  path={selectedOperation.path}
                  className="text-sm font-mono"
                />
                {currentOperation?.deprecated && (
                  <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                    {t("Deprecated")}
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
        <div className="flex-1 flex overflow-hidden">
          {/* 操作详情区域 */}
          <div
            className={cn(
              "flex-1 overflow-y-auto p-6",
              showRightPanel ? "border-r" : "max-w-4xl mx-auto w-full"
            )}
          >
            {currentOperation && selectedOperation.path && selectedOperation.method ? (
              <OperationDetail
                operation={currentOperation}
                path={selectedOperation.path}
                method={selectedOperation.method}
                components={spec?.components}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">
                    {t("Select an operation")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("Choose an operation from the sidebar to view its details")}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 右侧面板 */}
          {showRightPanel && (
            <div className="w-1/3 max-w-xl flex flex-col p-6 gap-6 overflow-y-auto">
              {/* 代码生成面板 */}
              {showCodegen && currentOperation && selectedOperation.path && selectedOperation.method && (
                <Codegen
                  endpoint={`${baseUrl}${selectedOperation.path}`}
                  method={selectedOperation.method.toLowerCase() as any}
                  parameters={currentOperation.parameters}
                  requestBody={currentOperation.requestBody}
                  components={spec?.components}
                  collapsible={false}
                />
              )}

              {/* 试用面板 */}
              {showTryPanel && currentOperation && selectedOperation.path && selectedOperation.method && (
                <TryItOutPanel
                  operation={currentOperation}
                  path={selectedOperation.path}
                  method={selectedOperation.method}
                  baseUrl={baseUrl}
                  components={spec?.components}
                  collapsible={false}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </SidebarProvider>
  );
};

// ===== 主组件（包含 Provider）=====

interface OperationDetailedLayoutOptimizedProps {
  spec?: OpenAPIV3.Document | string | null;
  selectedPath?: string | null;
  selectedMethod?: string | null;
  onSelectOperation?: (
    path: string,
    method: string,
    operation: OpenAPIV3.OperationObject
  ) => void;
  className?: string;
  showCodegen?: boolean;
  showTryPanel?: boolean;
  navigationWidth?: string;
}

const OperationDetailedLayoutOptimized = React.forwardRef<
  HTMLDivElement,
  OperationDetailedLayoutOptimizedProps
>(
  (
    {
      spec: inputSpec,
      selectedPath = null,
      selectedMethod = null,
      onSelectOperation,
      className,
      showCodegen = true,
      showTryPanel = true,
    },
    ref
  ) => {
    const { t } = useI18n();

    // 使用统一的数据加载器
    const { spec, loading, error } = useOpenAPILoader(inputSpec);

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
              {t("No OpenAPI specification loaded")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("Please provide a valid OpenAPI specification")}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("h-full", className)}>
        <OpenAPIProvider spec={spec}>
          <OperationDetailContent
            showCodegen={showCodegen}
            showTryPanel={showTryPanel}
          />
        </OpenAPIProvider>
      </div>
    );
  }
);

OperationDetailedLayoutOptimized.displayName = "OperationDetailedLayoutOptimized";

export { OperationDetailedLayoutOptimized, type OperationDetailedLayoutOptimizedProps };