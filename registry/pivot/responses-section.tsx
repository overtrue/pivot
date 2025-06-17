"use client";

import type { OpenAPIV3 } from 'openapi-types';
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { ResponseGroup } from "./response-group";
import { SectionTitle } from "./section-title";
import { StatusCode } from "./status-code";

interface ResponsesSectionProps {
  responses: OpenAPIV3.ResponsesObject;
  components?: OpenAPIV3.ComponentsObject;
  spec?: OpenAPIV3.Document; // 可选，如果提供则使用完整的OpenAPI规范
  className?: string;
}

const ResponsesSection = React.forwardRef<HTMLDivElement, ResponsesSectionProps>(
  ({ responses, components, spec, className = "" }, ref) => {
    const { t } = useI18n();
    const [activeStatus, setActiveStatus] = useState<string | null>(null);

    // 简化的解析逻辑，如果没有 useOpenApi hook 可用
    const resolveResponse = (response: any): OpenAPIV3.ResponseObject | null => {
      if (!response) return null;

      // 如果是引用对象，尝试解析
      if (typeof response === 'object' && '$ref' in response) {
        // 简化的引用解析
        return null; // 在实际应用中需要完整的引用解析
      }

      return response as OpenAPIV3.ResponseObject;
    };

    // 对状态码进行分组
    const statusGroups: Record<string, string[]> = {
      '1xx': [],
      '2xx': [],
      '3xx': [],
      '4xx': [],
      '5xx': [],
      'default': [],
      'other': []
    };

    // 分类状态码
    Object.keys(responses).forEach(status => {
      if (status === 'default') {
        if (statusGroups.default) {
          statusGroups.default.push(status);
        }
      } else if (/^[1-5]\d\d$/.test(status)) {
        const group = `${status[0]}xx`;
        if (statusGroups[group]) {
          statusGroups[group].push(status);
        }
      } else {
        if (statusGroups.other) {
          statusGroups.other.push(status);
        }
      }
    });

    // 确定默认活动状态
    if (activeStatus === null) {
      // 按优先级查找: 2xx, 默认, 其他任何状态
      for (const group of ['2xx', 'default', '1xx', '3xx', '4xx', '5xx', 'other']) {
        const groupStatuses = statusGroups[group];
        if (groupStatuses && groupStatuses.length > 0 && groupStatuses[0]) {
          setActiveStatus(groupStatuses[0]);
          break;
        }
      }
    }

    // 所有可用的状态码
    const allStatusCodes = Object.values(statusGroups).flat();

    // 通过状态码获取响应对象
    const getResponseByStatus = (status: string): OpenAPIV3.ResponseObject | null => {
      const response = responses[status];
      if (!response) return null;
      return resolveResponse(response);
    };

    // Current active response
    const activeResponse = activeStatus ? getResponseByStatus(activeStatus) : null;

    return (
      <div ref={ref} className={cn(className)}>
        <SectionTitle title={t('Response')} className="text-lg my-3" />

        {/* Status code list */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {allStatusCodes.map(status => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
              >
                <StatusCode
                  code={status === 'default' ? 'default' : status}
                  className={cn(
                    "cursor-pointer",
                    status === activeStatus ? "opacity-100" : "opacity-80 hover:opacity-100"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Active response content */}
        {activeStatus && activeResponse && (
          <div className="rounded">
            <ResponseGroup
              status={activeStatus}
              response={activeResponse}
              components={components}
            />
          </div>
        )}

        {/* Prompt when no response is available */}
        {(!activeStatus || !activeResponse) && (
          <div className="text-yellow-600 dark:text-yellow-400 text-sm p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded">
            {allStatusCodes.length === 0 ? t('No responses defined') : t('Could not resolve selected response')}
          </div>
        )}
      </div>
    );
  }
);

ResponsesSection.displayName = "ResponsesSection";

export {
  ResponsesSection,
  type ResponsesSectionProps
};

