"use client";

import { cn } from "@/lib/utils";
import { useOpenApi } from "@/registry/default/hooks/use-openapi";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";
import React, { useMemo, useState } from "react";

import { ResponseGroup } from "@/registry/default/ui/response-group";
import { SectionTitle } from "@/registry/default/ui/section-title";
import { StatusCode } from "@/registry/default/ui/status-code";

// 简化的接口设计
interface ResponsesSectionProps {
  responses: OpenAPIV3.ResponsesObject;
  components?: OpenAPIV3.ComponentsObject;
  spec?: OpenAPIV3.Document;
  defaultActiveStatus?: string;
  onStatusSelect?: (status: string) => void;
  className?: string;
}

// 提取状态码排序逻辑
const getSortedStatusCodes = (responses: OpenAPIV3.ResponsesObject): string[] => {
  const codes = Object.keys(responses).filter(code => code !== 'default');
  const defaultCode = responses.default ? ['default'] : [];

  return [
    ...codes.sort((a, b) => parseInt(a) - parseInt(b)),
    ...defaultCode
  ];
};

// 提取智能状态选择逻辑
const getDefaultStatus = (statusCodes: string[]): string | null => {
  if (statusCodes.length === 0) return null;

  // 优先选择 2xx 状态码，然后是 default，最后是第一个可用状态码
  const successCode = statusCodes.find(code => /^2\d\d$/.test(code));
  if (successCode) return successCode;

  const defaultCode = statusCodes.find(code => code === 'default');
  if (defaultCode) return defaultCode;

  return statusCodes[0];
};

// 提取错误状态组件
const ErrorState = ({ message, tip }: { message: string; tip?: string }) => (
  <div className="text-red-600 dark:text-red-400 text-sm p-4 bg-red-50 dark:bg-red-900/30 rounded border border-red-200 dark:border-red-800">
    {message}
    {tip && (
      <div className="text-xs mt-2">
        💡 {tip}
      </div>
    )}
  </div>
);

const ResponsesSection = React.forwardRef<
  HTMLDivElement,
  ResponsesSectionProps
>(({
  responses,
  components,
  spec,
  defaultActiveStatus,
  onStatusSelect,
  className = ""
}, ref) => {
  const { t } = useI18n();
  const openapi = useOpenApi(spec || null, components);

  // 简化的状态管理
  const sortedStatusCodes = useMemo(() => getSortedStatusCodes(responses), [responses]);
  const initialStatus = defaultActiveStatus || getDefaultStatus(sortedStatusCodes);
  const [activeStatus, setActiveStatus] = useState<string | null>(initialStatus);

  // 简化的状态选择处理
  const handleStatusSelect = (status: string) => {
    setActiveStatus(status);
    onStatusSelect?.(status);
  };

  // 获取当前响应
  const activeResponse = useMemo(() => {
    if (!activeStatus) return null;
    const response = responses[activeStatus];
    if (!response) return null;

    // 检查是否是引用对象
    if (typeof response === "object" && response !== null && "$ref" in response) {
      // 如果有引用，尝试解析
      return openapi.resolve<OpenAPIV3.ResponseObject>(response, "responses");
    } else {
      // 如果没有引用，直接使用原始数据
      return response as OpenAPIV3.ResponseObject;
    }
  }, [activeStatus, responses, openapi]);

  // 如果没有响应定义
  if (sortedStatusCodes.length === 0) {
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <SectionTitle title={t("Responses")} className="text-lg" />
        <div className="text-yellow-600 dark:text-yellow-400 text-sm p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded border border-yellow-200 dark:border-yellow-800">
          {t("No responses defined for this operation")}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      <SectionTitle title={t("Responses")} className="text-lg" />

      {/* 状态码选择器 */}
      <div className="flex flex-wrap gap-2">
        {sortedStatusCodes.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusSelect(status)}
            className="relative"
          >
            <StatusCode
              code={status === "default" ? "default" : status}
              className={cn(
                "cursor-pointer transition-all",
                status === activeStatus
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-100",
              )}
            />
          </button>
        ))}
      </div>

      {/* 响应内容 */}
      {activeStatus && activeResponse && (
        <div className="rounded">
          <ResponseGroup
            status={activeStatus}
            response={activeResponse}
            components={components}
          />
        </div>
      )}

      {/* 解析错误状态 */}
      {activeStatus && !activeResponse && (
        <ErrorState
          message={t("Could not resolve response %s").replace("%s", activeStatus)}
          tip={!openapi.hasComponents ? t("Tip: Provide components or wrap with OpenAPIProvider") : undefined}
        />
      )}
    </div>
  );
});

ResponsesSection.displayName = "ResponsesSection";

export { ResponsesSection, type ResponsesSectionProps };
