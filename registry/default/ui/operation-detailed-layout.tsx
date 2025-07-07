"use client";

import { useI18n } from "@/registry/default/lib/i18n";
import { Codegen } from "@/registry/default/ui/codegen";
import { OperationDetail } from "@/registry/default/ui/operation-detail";
import { TryItOutPanel } from "@/registry/default/ui/try-it-out-panel";
import * as yaml from "js-yaml";
import type { OpenAPIV3 } from "openapi-types";
import React, { useEffect, useState } from "react";

// Import types from the centralized types file

// 统一的接口定义
interface OperationDetailedLayoutProps {
  spec: OpenAPIV3.Document | string | null;
  selectedPath?: string | null;
  selectedMethod?: string | null;
  onSelectOperation?: (
    path: string,
    method: string,
    operation: OpenAPIV3.OperationObject,
  ) => void;
  className?: string;
}

export const OperationDetailedLayout = React.forwardRef<
  HTMLDivElement,
  OperationDetailedLayoutProps
>(
  (
    {
      spec: inputSpec,
      selectedPath,
      selectedMethod,
      onSelectOperation,
      className,
    },
    ref,
  ) => {
    const { t } = useI18n();

    const [parsedSpec, setParsedSpec] = useState<OpenAPIV3.Document | null>(
      null,
    );
    const [parseError, setParseError] = useState<string | null>(null);
    const [selectedServer, setSelectedServer] = useState<string>("");

    // Parse string to OpenAPI object
    useEffect(() => {
      if (typeof inputSpec === "string") {
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
              if (typeof yamlData === "object" && yamlData !== null) {
                setParsedSpec(yamlData as OpenAPIV3.Document);
                setParseError(null);
                return;
              } else {
                throw new Error("Parsed YAML is not a valid object");
              }
            } catch (yamlError) {
              setParseError(
                `Failed to parse OpenAPI spec: ${yamlError instanceof Error ? yamlError.message : "Unknown error"}`,
              );
              setParsedSpec(null);
            }
          }
        } catch (error) {
          setParseError(
            `Failed to parse OpenAPI spec: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
          setParsedSpec(null);
        }
      } else {
        // Input is already an object
        setParsedSpec(inputSpec);
        setParseError(null);
      }
    }, [inputSpec]);

    // 初始化服务器选择
    useEffect(() => {
      if (
        parsedSpec?.servers &&
        parsedSpec.servers.length > 0 &&
        !selectedServer
      ) {
        const firstServer = parsedSpec.servers[0];
        if (firstServer?.url) {
          setSelectedServer(firstServer.url);
        }
      }
    }, [parsedSpec, selectedServer]);

    // If there's a parsing error, display the error message
    if (parseError) {
      return (
        <div ref={ref} className="flex items-center justify-center h-full p-8">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
              {t("Specification Parse Error")}
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              {parseError}
            </p>
          </div>
        </div>
      );
    }

    // If the spec is not yet parsed, display loading state
    if (!parsedSpec) {
      return (
        <div
          ref={ref}
          className="flex justify-center items-center min-h-[60vh] dark:text-neutral-200"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-neutral-500 dark:border-neutral-400"></div>
          <p className="ml-4 text-neutral-500 dark:text-neutral-400">
            {t("Parsing specification...")}
          </p>
        </div>
      );
    }

    if (!parsedSpec || !selectedPath || !selectedMethod) {
      return (
        <div ref={ref} className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {t("Please select an API endpoint")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(
                "Select a path and method from the navigation to view details",
              )}
            </p>
          </div>
        </div>
      );
    }

    const pathItem = parsedSpec.paths?.[selectedPath];
    if (!pathItem) {
      return (
        <div ref={ref} className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-destructive mb-2">
              {t("Path not found")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("The selected path does not exist in the specification")}
            </p>
          </div>
        </div>
      );
    }

    const operation =
      pathItem[selectedMethod.toLowerCase() as keyof typeof pathItem];

    if (
      !operation ||
      typeof operation !== "object" ||
      !(
        "summary" in operation ||
        "description" in operation ||
        "parameters" in operation
      )
    ) {
      return (
        <div ref={ref} className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-destructive mb-2">
              {t("Operation not found")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("The selected path and method combination does not exist")}
            </p>
          </div>
        </div>
      );
    }

    // 确保 selectedMethod 是有效的 HTTP 方法
    const normalizedMethod = selectedMethod.toUpperCase() as
      | "GET"
      | "POST"
      | "PUT"
      | "DELETE"
      | "PATCH"
      | "OPTIONS"
      | "HEAD";
    const normalizedMethodLowercase = selectedMethod.toLowerCase() as
      | "get"
      | "post"
      | "put"
      | "delete"
      | "patch"
      | "options"
      | "head";

    const resolvedComponents = parsedSpec.components;

    return (
      <div ref={ref} className="h-full overflow-auto">
        <div className="flex gap-6 p-6">
          {/* 左侧内容面板 */}
          <div className="flex-1">
            <OperationDetail
              operation={operation as OpenAPIV3.OperationObject}
              path={selectedPath}
              method={normalizedMethod}
              components={resolvedComponents}
            />
          </div>

          {/* 右侧面板 - 代码示例和Try It Out */}
          <div className="max-w-md flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              {/* 代码生成器面板 */}
              <Codegen
                endpoint={`${selectedServer}${selectedPath}`}
                method={normalizedMethodLowercase}
                parameters={operation.parameters || []}
                requestBody={operation.requestBody}
                components={resolvedComponents}
              />

              {/* Try It Out面板 */}
              <TryItOutPanel
                operation={operation as any}
                method={normalizedMethod}
                path={selectedPath}
                baseUrl={selectedServer}
                components={resolvedComponents}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

OperationDetailedLayout.displayName = "OperationDetailedLayout";

export { type OperationDetailedLayoutProps };
export default OperationDetailedLayout;
