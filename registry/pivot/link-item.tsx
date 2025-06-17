"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React, { useState } from "react";
import { DescriptionDisplay } from "../pivot/description-display";
import { ServerDisplay } from "../pivot/server-display";
import { ExpandCollapse } from "./expand-collapse";

interface LinkItemProps {
  name: string;
  operationId?: string;
  operationRef?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: OpenAPIV3.ServerObject;
  className?: string;
}

const LinkItem = React.forwardRef<HTMLDivElement, LinkItemProps>(
  (
    {
      name,
      operationId,
      operationRef,
      parameters,
      requestBody,
      description,
      server,
      className,
    },
    ref,
  ) => {
    const { t } = useI18n();
    const [isExpanded, setIsExpanded] = useState(false);
    const hasDetails = description || parameters || requestBody || server;

    const primaryIdentifier = operationId
      ? { type: "operationId", value: operationId }
      : operationRef
        ? { type: "operationRef", value: operationRef }
        : null;

    return (
      <div ref={ref} className={cn("mb-2 p-3 rounded", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-medium">{name}</span>
            {primaryIdentifier && (
              <span
                className={cn(
                  "px-2 py-1 text-xs rounded",
                  primaryIdentifier.type === "operationId"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
                )}
              >
                {t(primaryIdentifier.type)}: {primaryIdentifier.value}
              </span>
            )}
          </div>

          {hasDetails && (
            <ExpandCollapse
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded(!isExpanded)}
              expandedLabel={t("Hide Details")}
              collapsedLabel={t("Show Details")}
            />
          )}
        </div>

        {description && !isExpanded && (
          <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 truncate">
            <DescriptionDisplay description={description} />
          </div>
        )}

        {isExpanded && hasDetails && (
          <div className="mt-3 pl-2 border-l-2 border-neutral-200 dark:border-neutral-700 space-y-4">
            {description && (
              <div>
                <h4 className="text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  {t('Description')}
                </h4>
                <DescriptionDisplay
                  description={description}
                  className="text-sm"
                />
              </div>
            )}

            {parameters && Object.keys(parameters).length > 0 && (
              <div>
                <h4 className="text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  {t('Parameters')}
                </h4>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-xs space-y-1">
                  {Object.entries(parameters).map(([paramName, paramValue]) => (
                    <div
                      key={paramName}
                      className="grid grid-cols-[max-content_1fr] gap-x-2"
                    >
                      <span className="font-mono font-medium text-neutral-700 dark:text-neutral-300">
                        {paramName}:
                      </span>
                      <pre className="font-mono bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded overflow-x-auto break-all">
                        <code>
                          {typeof paramValue === "string"
                            ? paramValue
                            : JSON.stringify(paramValue)}
                        </code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {requestBody && (
              <div>
                <h4 className="text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  {t('Request Body')}
                </h4>
                <div className="bg-neutral-50 dark:bg-neutral-800 p-2 rounded text-xs">
                  <pre className="font-mono bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded overflow-x-auto break-all">
                    <code>
                      {typeof requestBody === "string"
                        ? requestBody
                        : JSON.stringify(requestBody, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {server && (
              <div>
                <h4 className="text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  {t('Server')}
                </h4>
                <ServerDisplay server={server} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

LinkItem.displayName = "LinkItem";

export { LinkItem, type LinkItemProps };
