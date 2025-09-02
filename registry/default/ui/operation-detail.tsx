"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useOpenApi } from "@/registry/default/hooks/use-openapi";
import { useI18n } from "@/registry/default/lib/i18n";
import { DeprecatedBadge } from "@/registry/default/ui/deprecated-badge";
import { DescriptionDisplay } from "@/registry/default/ui/description-display";
import { ExternalDocsDisplay } from "@/registry/default/ui/external-docs-display";
import { MethodLabel } from "@/registry/default/ui/method-label";
import { OperationPath } from "@/registry/default/ui/operation-path";
import { ParametersSection } from "@/registry/default/ui/parameters-section";
import { RequestBodySection } from "@/registry/default/ui/request-body-section";
import { ResponsesSection } from "@/registry/default/ui/responses-section";
import { SecurityRequirementsSection } from "@/registry/default/ui/security-requirements-section";
import type { OpenAPIV3 } from "openapi-types";
import React, { useMemo } from "react";

interface OperationDetailProps {
  // Support multiple input formats for operation
  operation:
    | OpenAPIV3.OperationObject
    | OpenAPIV3.ReferenceObject
    | Partial<OpenAPIV3.OperationObject>;

  path: string;
  method: string;

  // Optional for standalone mode
  components?: OpenAPIV3.ComponentsObject;
  spec?: OpenAPIV3.Document;

  className?: string;
}

export const OperationDetail = React.forwardRef<
  HTMLDivElement,
  OperationDetailProps
>(({ operation, path, method, components, spec, className }, ref) => {
  const { t } = useI18n();

  // Use OpenAPI hook for intelligent data access
  const openapi = useOpenApi(spec || null, components);

  // Adapt operation to standard format
  const adaptedOperation = useMemo(() => {
    if (typeof operation === 'object' && !('$ref' in operation)) {
      return operation as OpenAPIV3.OperationObject;
    }
    return operation;
  }, [operation]);

  // Resolve operation using context or fallback
  const resolvedOperation = openapi.resolve<OpenAPIV3.OperationObject>(
    adaptedOperation,
    "operations"
  );

  // Error handling for unresolved references
  if (!resolvedOperation && adaptedOperation && '$ref' in adaptedOperation) {
    const refString = (adaptedOperation as OpenAPIV3.ReferenceObject).$ref;
    return (
      <div ref={ref} className={cn("border rounded p-4", "bg-yellow-50 dark:bg-yellow-900/20", "border-yellow-200 dark:border-yellow-800", className)}>
        <div className="flex items-center gap-2 text-sm mb-2">
          <MethodLabel method={method.toUpperCase() as any} />
          <OperationPath path={path} className="text-lg font-mono" />
        </div>
        <div className="text-yellow-700 dark:text-yellow-400">
          Could not resolve operation reference: {refString}
        </div>
        {!openapi.hasComponents && (
          <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
            💡 Tip: Provide components or wrap with OpenAPIProvider
          </div>
        )}
      </div>
    );
  }

  const effectiveOperation = resolvedOperation || adaptedOperation as OpenAPIV3.OperationObject;

  // 确保 method 是有效的 HTTP 方法
  const normalizedMethod = method.toUpperCase() as
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD";

  const parameters = effectiveOperation.parameters;
  const requestBody = effectiveOperation.requestBody;
  const responses = effectiveOperation.responses;
  const security = effectiveOperation.security;
  const externalDocs = effectiveOperation.externalDocs;

  return (
    <div ref={ref} className={cn("space-y-6", className)}>
      {/* 操作头部信息 */}
      <div className="space-y-4">
        {/* 方法和路径 */}
        <div className="flex items-center gap-3 flex-wrap">
          <MethodLabel method={normalizedMethod} />
          <OperationPath path={path} className="text-lg font-mono" />
          {effectiveOperation.deprecated && <DeprecatedBadge />}
        </div>

        {/* 摘要 */}
        {effectiveOperation.summary && (
          <h1 className="text-2xl font-semibold text-foreground">
            {effectiveOperation.summary}
          </h1>
        )}

        {/* 描述 */}
        {effectiveOperation.description && (
          <DescriptionDisplay
            description={effectiveOperation.description}
            className="text-muted-foreground prose dark:prose-invert max-w-none"
          />
        )}

        {/* 外部文档 */}
        {externalDocs && (
          <ExternalDocsDisplay externalDocs={externalDocs} className="mt-4" />
        )}
      </div>

      {/* 标签和操作ID */}
      {(effectiveOperation.tags || effectiveOperation.operationId) && (
        <div className="flex flex-wrap gap-4">
          {effectiveOperation.tags && effectiveOperation.tags.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("Tags")}</Label>
              <div className="flex flex-wrap gap-2">
                {effectiveOperation.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {effectiveOperation.operationId && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("Operation ID")}</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="font-mono">
                  {effectiveOperation.operationId}
                </Badge>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 参数部分 */}
      {parameters && parameters.length > 0 && (
        <ParametersSection
          parameters={parameters}
          components={openapi.components}
          expanded={true}
        />
      )}

      {/* 请求体部分 */}
      {requestBody && (
        <RequestBodySection
          requestBody={requestBody}
          components={openapi.components}
        />
      )}

      {/* 响应部分 */}
      {responses && (
        <ResponsesSection
          responses={responses}
          components={openapi.components}
          spec={openapi.spec || undefined}
        />
      )}

      {/* 安全要求部分 */}
      {security && security.length > 0 && (
        <SecurityRequirementsSection security={security} />
      )}
    </div>
  );
});

OperationDetail.displayName = "OperationDetail";

export { type OperationDetailProps };
