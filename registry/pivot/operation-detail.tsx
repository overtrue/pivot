"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/lib/i18n";
import { DeprecatedBadge } from "@/registry/pivot/deprecated-badge";
import { DescriptionDisplay } from "@/registry/pivot/description-display";
import { ExternalDocsDisplay } from "@/registry/pivot/external-docs-display";
import { MethodLabel } from "@/registry/pivot/method-label";
import { OperationPath } from "@/registry/pivot/operation-path";
import { ParametersSection } from "@/registry/pivot/parameters-section";
import { RequestBodySection } from "@/registry/pivot/request-body-section";
import { ResponsesSection } from "@/registry/pivot/responses-section";
import { SecurityRequirementsSection } from "@/registry/pivot/security-requirements-section";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";

// Import types from the centralized types file

interface OperationDetailProps {
  operation: OpenAPIV3.OperationObject;
  path: string;
  method: string;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

export const OperationDetail = React.forwardRef<HTMLDivElement, OperationDetailProps>(
  ({ operation, path, method, components, className }, ref) => {
    const { t } = useI18n();

    // 确保 method 是有效的 HTTP 方法
    const normalizedMethod = method.toUpperCase() as "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

    const parameters = operation.parameters;
    const requestBody = operation.requestBody;
    const responses = operation.responses;
    const security = operation.security;
    const externalDocs = operation.externalDocs;

    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        {/* 操作头部信息 */}
        <div className="space-y-4">
          {/* 方法和路径 */}
          <div className="flex items-center gap-3 flex-wrap">
            <MethodLabel method={normalizedMethod} />
            <OperationPath path={path} className="text-lg font-mono" />
            {operation.deprecated && <DeprecatedBadge />}
          </div>

          {/* 摘要 */}
          {operation.summary && (
            <h1 className="text-2xl font-semibold text-foreground">
              {operation.summary}
            </h1>
          )}

          {/* 描述 */}
          {operation.description && (
            <DescriptionDisplay
              description={operation.description}
              className="text-muted-foreground prose dark:prose-invert max-w-none"
            />
          )}

          {/* 外部文档 */}
          {externalDocs && (
            <ExternalDocsDisplay
              externalDocs={externalDocs}
              className="mt-4"
            />
          )}
        </div>

        {/* 标签和操作ID */}
        {(operation.tags || operation.operationId) && (
          <div className="flex flex-wrap gap-4">
            {operation.tags && operation.tags.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t('Tags')}</Label>
                <div className="flex flex-wrap gap-2">
                  {operation.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {operation.operationId && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t('Operation ID')}</Label>
                <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                  {operation.operationId}
                </code>
              </div>
            )}
          </div>
        )}

        {/* 参数部分 */}
        {parameters && parameters.length > 0 && (
          <ParametersSection
            parameters={parameters}
            components={components}
            expanded={true}
          />
        )}

        {/* 请求体部分 */}
        {requestBody && (
          <RequestBodySection
            requestBody={requestBody}
            components={components}
          />
        )}

        {/* 响应部分 */}
        {responses && (
          <ResponsesSection
            responses={responses}
            components={components}
          />
        )}

        {/* 安全要求部分 */}
        {security && security.length > 0 && (
          <SecurityRequirementsSection security={security} />
        )}
      </div>
    );
  }
);

OperationDetail.displayName = "OperationDetail";

export { type OperationDetailProps };
