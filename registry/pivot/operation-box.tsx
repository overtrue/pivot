"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/lib/i18n";
import { DeprecatedBadge } from "@/registry/pivot/deprecated-badge";
import { DescriptionDisplay } from "@/registry/pivot/description-display";
import { ExpandCollapse } from "@/registry/pivot/expand-collapse";
import { ExternalDocsDisplay } from "@/registry/pivot/external-docs-display";
import { MethodLabel } from "@/registry/pivot/method-label";
import { OperationPath } from "@/registry/pivot/operation-path";
import { ParametersSection } from "@/registry/pivot/parameters-section";
import { RequestBodySection } from "@/registry/pivot/request-body-section";
import { ResponsesSection } from "@/registry/pivot/responses-section";
import { SecurityRequirementsSection } from "@/registry/pivot/security-requirements-section";
import type { OpenAPIV3 } from 'openapi-types';
import React, { useState } from "react";

// Import types from the centralized types file

interface OperationBoxProps {
  path: string;
  method: string;
  operation: OpenAPIV3.OperationObject;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
  onSelectOperation?: () => void;
  spec?: OpenAPIV3.Document;
}

const OperationBox = React.forwardRef<HTMLDivElement, OperationBoxProps>(
  (
    { path, method, operation, components, className, onSelectOperation, spec },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t } = useI18n();

    // Use spec components if provided, otherwise use direct components
    const resolvedComponents = spec?.components || components;

    const parameters = operation.parameters;
    const requestBody = operation.requestBody;
    const responses = operation.responses;
    const security = operation.security;
    const externalDocs = operation.externalDocs;

    const handleHeaderClick = () => {
      if (onSelectOperation) {
        onSelectOperation();
      }
      toggleExpand();
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg overflow-hidden border bg-background",
          operation.deprecated
            ? "bg-red-300 dark:bg-red-900/50" : '',
          className,
        )}
      >
        {/* Header Section */}
        <div
          className={cn(
            "p-3 flex justify-between items-center cursor-pointer",
            operation.deprecated ? "bg-red-50 dark:bg-red-900/30" : "",
          )}
          onClick={handleHeaderClick}
        >
          <div className="flex items-center space-x-3 flex-wrap">
            <MethodLabel method={method.toUpperCase() as any} />
            <OperationPath path={path} className="break-all" />
            {operation.summary && (
              <span className="text-sm text-neutral-700 dark:text-neutral-300 hidden md:inline">
                - {operation.summary}
              </span>
            )}
            {operation.deprecated && <DeprecatedBadge />}
          </div>
          <ExpandCollapse isExpanded={isExpanded} onToggle={toggleExpand} />
        </div>

        {/* Collapsible Body */}
        {isExpanded && (
          <div className="">
            {/* Description Section */}
            {(operation.summary || operation.description || externalDocs) && (
              <div className="p-4 pt-0 space-y-2">
                {operation.summary && (
                  <DescriptionDisplay
                    className="text-base text-neutral-800 dark:text-neutral-200 font-medium md:hidden"
                    description={operation.summary}
                  />
                )}
                {operation.description && (
                  <DescriptionDisplay
                    description={operation.description}
                    className="text-sm text-neutral-800 dark:text-neutral-200 prose dark:prose-invert max-w-none"
                  />
                )}
                {externalDocs && (
                  <ExternalDocsDisplay
                    externalDocs={externalDocs}
                    className="mt-2"
                  />
                )}
              </div>
            )}

            {/* Parameters Section */}
            {parameters && parameters.length > 0 && (
              <div className="p-4">
                <ParametersSection
                  parameters={parameters}
                  components={resolvedComponents}
                />
              </div>
            )}

            {/* Request Body Section */}
            {requestBody && (
              <div className="p-4">
                <RequestBodySection
                  requestBody={requestBody}
                  components={resolvedComponents}
                />
              </div>
            )}

            {/* Responses Section */}
            {responses && (
              <div className="p-4">
                <ResponsesSection
                  responses={responses}
                  components={resolvedComponents}
                />
              </div>
            )}

            {/* Security Requirements Section */}
            {security && security.length > 0 && (
              <div className="p-4">
                <SecurityRequirementsSection security={security} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

OperationBox.displayName = "OperationBox";

export {
  OperationBox,
  type OperationBoxProps
};

