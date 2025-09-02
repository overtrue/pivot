"use client";

import { cn } from "@/lib/utils";
import { useOpenApi } from "@/registry/default/hooks/use-openapi";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";

import { SchemaWithExampleViewer } from "@/registry/default/ui/schema-with-example-viewer";
import { SectionTitle } from "@/registry/default/ui/section-title";
import React, { useMemo } from "react";

interface RequestBodySectionProps {
  // Support multiple input formats
  requestBody:
    | OpenAPIV3.RequestBodyObject
    | OpenAPIV3.ReferenceObject
    | Partial<OpenAPIV3.RequestBodyObject>;

  // Optional for standalone mode
  components?: OpenAPIV3.ComponentsObject;
  spec?: OpenAPIV3.Document;

  className?: string;
  titleClassName?: string;
}

const RequestBodySection = React.forwardRef<
  HTMLDivElement,
  RequestBodySectionProps
>(({ requestBody, components, spec, className = "", titleClassName }, ref) => {
  const { t } = useI18n();

  // Use OpenAPI hook for intelligent data access
  const openapi = useOpenApi(spec || null, components);

  // Adapt request body to standard format
  const adaptedRequestBody = useMemo(() => {
    if (typeof requestBody === 'object' && !('$ref' in requestBody)) {
      return requestBody as OpenAPIV3.RequestBodyObject;
    }
    return requestBody;
  }, [requestBody]);

  // Resolve request body using context or fallback
  const resolvedBody = openapi.resolve<OpenAPIV3.RequestBodyObject>(
    adaptedRequestBody,
    "requestBodies"
  );

  // Error handling for unresolved references
  if (!resolvedBody && adaptedRequestBody && '$ref' in adaptedRequestBody) {
    const refString = (adaptedRequestBody as OpenAPIV3.ReferenceObject).$ref;
    return (
      <div ref={ref} className={cn("border rounded p-4", "bg-yellow-50 dark:bg-yellow-900/20", "border-yellow-200 dark:border-yellow-800", className)}>
        <SectionTitle
          title={t("Request Body")}
          className={cn("text-lg font-medium mb-3", titleClassName)}
        />
        <div className="text-yellow-700 dark:text-yellow-400">
          {t("Could not resolve request body reference:")} {refString}
        </div>
        {!openapi.hasComponents && (
          <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
            💡 {t("Tip: Provide components or wrap with OpenAPIProvider")}
          </div>
        )}
      </div>
    );
  }

  const effectiveBody = resolvedBody || adaptedRequestBody as OpenAPIV3.RequestBodyObject;

  if (!effectiveBody) {
    return (
      <div
        ref={ref}
        className={cn("text-red-500 dark:text-red-400", className)}
      >
        {t("Cannot resolve request body")}
      </div>
    );
  }

  // 获取内容
  const content = effectiveBody.content;
  if (!content) {
    return (
      <div
        ref={ref}
        className={cn("text-yellow-500 dark:text-yellow-400", className)}
      >
        {t("Request body has no content defined")}
      </div>
    );
  }

  // 自定义头部渲染函数
  const renderHeader = () => {
    return (
      <>
        {/* Required indicator */}
        {effectiveBody.required && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              {t("Required")}
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <div ref={ref} className={className}>
      <SectionTitle
        title={t("Request Body")}
        className={cn("text-lg font-medium my-3", titleClassName)}
      />

      <SchemaWithExampleViewer
        content={effectiveBody}
        components={openapi.components}
        contentType="requestBody"
        renderHeader={renderHeader}
      />
    </div>
  );
});

RequestBodySection.displayName = "RequestBodySection";

export { RequestBodySection, type RequestBodySectionProps };
