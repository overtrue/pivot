"use client";

import { cn } from "@/lib/utils";
import { DescriptionDisplay } from "@/registry/default/ui/description-display";
import { ExpandCollapse } from "@/registry/default/ui/expand-collapse";
import { ServerVariable } from "@/registry/default/ui/server-variable";
import type { OpenAPIV3 } from "openapi-types";
import React, { useState } from "react";

// 类型别名，供其他组件使用
export type ServerObject = OpenAPIV3.ServerObject;

interface ServerProps {
  server?: OpenAPIV3.ServerObject;
  className?: string;
}

// 提取 URL 解析工具函数
const interpolateUrl = (
  url: string,
  variables: Record<string, OpenAPIV3.ServerVariableObject> = {},
): string => {
  let interpolatedUrl = url;
  Object.entries(variables).forEach(([name, variable]) => {
    const pattern = new RegExp(`\\{${name}\\}`, "g");
    interpolatedUrl = interpolatedUrl.replace(pattern, variable.default);
  });
  return interpolatedUrl;
};

// 提取 URL 模板变量解析函数
const extractUrlParts = (url: string) => {
  const regex = /(\{[^}]+\})/g;
  const parts = url.split(regex);
  return parts.map((part, index) => {
    const isVariable = part.startsWith("{") && part.endsWith("}");
    return { text: part, isVariable, key: `part-${index}` };
  });
};

// 提取 URL 显示组件
const UrlDisplay = ({ urlParts, interpolatedUrl, hasVariables }: {
  urlParts: Array<{ text: string; isVariable: boolean; key: string }>;
  interpolatedUrl: string;
  hasVariables: boolean;
}) => (
  <div className="flex-grow overflow-auto">
    <div className="font-mono text-sm break-all dark:text-neutral-200">
      {urlParts.map((part) => (
        <span
          key={part.key}
          className={
            part.isVariable
              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded px-1"
              : ""
          }
        >
          {part.text}
        </span>
      ))}
    </div>
    {hasVariables && (
      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
        Interpolated URL: {interpolatedUrl}
      </div>
    )}
  </div>
);

// 提取展开内容组件
const ExpandedContent = ({ description, variables }: {
  description?: string;
  variables?: Record<string, OpenAPIV3.ServerVariableObject>;
}) => {
  const hasVariables = variables && Object.keys(variables).length > 0;

  if (!description && !hasVariables) return null;

  return (
    <div className="p-4 border-t dark:border-neutral-700 dark:bg-neutral-800/50">
      {description && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1 dark:text-neutral-200">
            Description
          </h4>
          <DescriptionDisplay description={description} />
        </div>
      )}

      {hasVariables && (
        <div>
          <h4 className="text-sm font-semibold mb-2 dark:text-neutral-200">
            Server Variables:
          </h4>
          <div className="space-y-3">
            {Object.entries(variables!).map(([name, variable]) => (
              <ServerVariable
                key={name}
                name={name}
                variable={variable}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Server = React.forwardRef<HTMLDivElement, ServerProps>(
  ({ server, className }, ref) => {
    if (!server) {
      return (
        <div
          ref={ref}
          className={cn("rounded mb-4 overflow-hidden", className)}
        >
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800">
            <div className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
              No server data available
            </div>
          </div>
        </div>
      );
    }

    const { url, description, variables } = server;
    const [isExpanded, setIsExpanded] = useState(false);
    const hasVariables = variables && Object.keys(variables).length > 0;

    const urlParts = extractUrlParts(url);
    const interpolatedUrl = hasVariables ? interpolateUrl(url, variables) : url;
    const toggleExpansion = () => setIsExpanded(!isExpanded);

    return (
      <div ref={ref} className={cn("rounded mb-4 overflow-hidden", className)}>
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-between">
          <UrlDisplay
            urlParts={urlParts}
            interpolatedUrl={interpolatedUrl}
            hasVariables={hasVariables || false}
          />

          {(description || hasVariables) && (
            <ExpandCollapse
              isExpanded={isExpanded}
              onToggle={toggleExpansion}
              expandedLabel="Collapse"
              collapsedLabel="Expand"
              className="ml-3 flex-shrink-0"
            />
          )}
        </div>

        {isExpanded && (
          <ExpandedContent description={description} variables={variables} />
        )}
      </div>
    );
  },
);

Server.displayName = "Server";

export { Server, type ServerProps };
