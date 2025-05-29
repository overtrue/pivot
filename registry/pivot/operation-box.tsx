"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DeprecatedBadge } from "./deprecated-badge";
import { DescriptionDisplay } from "./description-display";
import { ExpandCollapse } from "./expand-collapse";
import { ExternalDocsDisplay } from "./external-docs-display";
import { MethodLabel } from "./method-label";
import { OperationPath } from "./operation-path";
import { ParametersSection } from "./parameters-section";
import { RequestBodySection } from "./request-body-section";
import { ResponsesSection } from "./responses-section";
import { SecurityRequirementsSection } from "./security-requirements-section";

// Import types from the centralized types file
import type {
  ComponentsObject,
  OpenApiSpec,
  OperationObject
} from "@/types/openapi";

interface OperationBoxProps {
  path: string;
  method: string;
  operation: OperationObject;
  components?: ComponentsObject;
  className?: string;
  onSelectOperation?: () => void;
  spec?: OpenApiSpec;
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

