"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from "openapi-types";

import { resolveRef } from "@/registry/default/lib/resolve-ref";
import { DescriptionDisplay } from "@/registry/default/ui/description-display";
import { HeadersSection } from "@/registry/default/ui/headers-section";
import { LinksSection } from "@/registry/default/ui/links-section";
import { StatusCode } from "@/registry/default/ui/status-code";
import React from "react";

// 修改接口，接受原始响应对象或引用
interface ResponseItemProps {
  code: string; // 状态码
  response: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject; // 可能是引用或已解析的响应对象
  components?: OpenAPIV3.ComponentsObject; // 用于解析引用
  className?: string;
}

const ResponseItem = React.forwardRef<HTMLDivElement, ResponseItemProps>(
  ({ code, response, components, className }, ref) => {
    const { t } = useI18n();

    // 解析响应对象（如果是引用）
    const resolvedResponse = resolveRef(response, components, "responses");

    // 如果无法解析引用，显示错误信息
    if (!resolvedResponse) {
      const refString =
        response && typeof response === "object" && "$ref" in response
          ? response.$ref
          : t("[unknown reference]");
      return (
        <div
          ref={ref}
          className={cn(
            "text-xs text-red-500 dark:text-red-400 p-2 border dark:border-red-800 rounded bg-red-50 dark:bg-red-900/20",
            className,
          )}
        >
          {t("Cannot display response %s: Reference %s failed to resolve.")
            .replace("%s", code)
            .replace("%s", refString)}
        </div>
      );
    }

    // 从解析后的对象中提取属性
    const { description, headers, content, links } = resolvedResponse;

    const hasHeaders = headers && Object.keys(headers).length > 0;
    const hasContent = content && Object.keys(content).length > 0;
    const hasLinks = links && Object.keys(links).length > 0;
    const hasDetails = hasHeaders || hasContent || hasLinks;

    return (
      <div
        ref={ref}
        className={cn(
          "border rounded mb-4 overflow-hidden dark:border-neutral-700",
          className,
        )}
      >
        {/* Header part */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <StatusCode code={code} />
            {description && (
              <DescriptionDisplay
                description={description}
                className="text-sm mb-0"
              />
            )}
          </div>
        </div>

        {/* Collapsible Details part - Now always shown if hasDetails */}
        {hasDetails && (
          <div className="p-4 border-t dark:border-neutral-700">
            {hasHeaders && (
              <HeadersSection headers={headers} components={components} />
            )}
            {hasContent && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                  {t("Content")}
                </h4>
                <div className="space-y-3">
                  {Object.entries(content).map(([mediaType, mediaTypeObj]) => (
                    <div
                      key={mediaType}
                      className="p-3 bg-muted/50 rounded-md border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                          {mediaType}
                        </span>
                      </div>

                      {mediaTypeObj.schema && (
                        <div className="mb-3">
                          <h5 className="text-xs font-medium text-muted-foreground mb-2">
                            Schema
                          </h5>
                          <div className="text-xs text-muted-foreground italic">
                            Schema available (requires schema display component)
                          </div>
                        </div>
                      )}

                      {mediaTypeObj.example && (
                        <div className="mb-2">
                          <h5 className="text-xs font-medium text-muted-foreground mb-2">
                            Example
                          </h5>
                          <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                            <code>
                              {JSON.stringify(mediaTypeObj.example, null, 2)}
                            </code>
                          </pre>
                        </div>
                      )}

                      {mediaTypeObj.examples &&
                        Object.keys(mediaTypeObj.examples).length > 0 && (
                          <div>
                            <h5 className="text-xs font-medium text-muted-foreground mb-2">
                              Examples
                            </h5>
                            <div className="space-y-2">
                              {Object.entries(mediaTypeObj.examples).map(
                                ([exampleName, exampleObj]) => (
                                  <div key={exampleName}>
                                    <h6 className="text-xs font-medium mb-1">
                                      {exampleName}
                                    </h6>
                                    <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                                      <code>
                                        {JSON.stringify(exampleObj, null, 2)}
                                      </code>
                                    </pre>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasLinks && <LinksSection links={links} components={components} />}
          </div>
        )}
      </div>
    );
  },
);

ResponseItem.displayName = "ResponseItem";

export { ResponseItem, type ResponseItemProps };
