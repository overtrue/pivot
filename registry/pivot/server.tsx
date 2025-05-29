"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DescriptionDisplay } from "../pivot/description-display";
import { ExpandCollapse } from "./expand-collapse";
import { ServerVariable, type ServerVariableObject } from "./server-variable";

interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
}

interface ServerProps {
  server?: ServerObject;
  className?: string;
}

const Server = React.forwardRef<HTMLDivElement, ServerProps>(
  ({ server, className }, ref) => {
    if (!server) {
      return (
        <div ref={ref} className={cn("rounded mb-4 overflow-hidden", className)}>
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

    // URL解析与插值逻辑
    const interpolateUrl = (
      url: string,
      variables: Record<string, ServerVariableObject> = {},
    ) => {
      let interpolatedUrl = url;
      Object.entries(variables).forEach(([name, variable]) => {
        const pattern = new RegExp(`\\{${name}\\}`, "g");
        interpolatedUrl = interpolatedUrl.replace(pattern, variable.default);
      });
      return interpolatedUrl;
    };

    // 提取URL模板变量，用于高亮显示
    const extractUrlParts = (url: string) => {
      const regex = /(\{[^}]+\})/g;
      const parts = url.split(regex);
      return parts.map((part, index) => {
        const isVariable = part.startsWith("{") && part.endsWith("}");
        return { text: part, isVariable, key: `part-${index}` };
      });
    };

    const urlParts = extractUrlParts(url);
    const interpolatedUrl = hasVariables ? interpolateUrl(url, variables) : url;

    return (
      <div ref={ref} className={cn("rounded mb-4 overflow-hidden", className)}>
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-between">
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
          {(description || hasVariables) && (
            <ExpandCollapse
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              expandedLabel="Collapse"
              collapsedLabel="Expand"
              className="ml-3 flex-shrink-0"
            />
          )}
        </div>

        {isExpanded && (description || hasVariables) && (
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
                  {Object.entries(variables).map(([name, variable]) => (
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
        )}
      </div>
    );
  },
);

Server.displayName = "Server";

export { Server, type ServerObject };
