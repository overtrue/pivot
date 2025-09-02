"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";

import { ResponseContentSection } from "@/registry/default/ui/response-content-section";
import { ResponseHeadersTable } from "@/registry/default/ui/response-headers-table";
import React from "react";

interface ResponseGroupProps {
  status: string;
  response: OpenAPIV3.ResponseObject;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const ResponseGroup = React.forwardRef<HTMLDivElement, ResponseGroupProps>(
  ({ response, components, className }, ref) => {
    const { t } = useI18n();

    const hasContent = response.content && Object.keys(response.content).length > 0;
    const hasHeaders = response.headers && Object.keys(response.headers).length > 0;

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {/* 响应描述 */}
        {response.description && (
          <div className="flex items-center space-x-2">
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              {response.description}
            </span>
          </div>
        )}

        {/* 响应内容 */}
        {hasContent && (
          <ResponseContentSection
            content={response.content!}
            components={components}
          />
        )}

        {/* 响应头部 */}
        {hasHeaders && (
          <div>
            <h4 className="text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              {t("Response Headers")}
            </h4>
            <ResponseHeadersTable
              headers={response.headers!}
              components={components}
            />
          </div>
        )}
      </div>
    );
  },
);

ResponseGroup.displayName = "ResponseGroup";

export { ResponseGroup, type ResponseGroupProps };
