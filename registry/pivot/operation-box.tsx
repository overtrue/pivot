"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DeprecatedBadge } from "../pivot/deprecated-badge";
import { DescriptionDisplay } from "../pivot/description-display";
import { ExternalDocsDisplay } from "../pivot/external-docs-display";
import { MethodLabel } from "../pivot/method-label";
import { OperationPath } from "../pivot/operation-path";
import { ExpandCollapse } from "./expand-collapse";
import { ParametersSection } from "./parameters-section";
import { RequestBodySection } from "./request-body-section";
import { ResponsesSection } from "./responses-section";
import { SecurityRequirementsSection } from "./security-requirements-section";

interface OperationObject {
  summary?: string;
  description?: string;
  deprecated?: boolean;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  security?: any[];
  externalDocs?: {
    description?: string;
    url: string;
  };
}

interface ComponentsObject {
  [key: string]: any;
}

interface OpenApiSpec {
  components?: ComponentsObject;
  [key: string]: any;
}

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

    if (!operation) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded overflow-hidden bg-neutral-50/50 dark:bg-neutral-800/50 p-3",
            className,
          )}
        >
          <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
            No operation data available
          </div>
        </div>
      );
    }

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
          "rounded overflow-hidden",
          operation.deprecated
            ? "bg-red-50/50 dark:bg-red-900/20"
            : "bg-neutral-50/50 dark:bg-neutral-800/50",
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
          <div className={cn(
            operation.deprecated ? "bg-red-50/30 dark:bg-red-900/10" : ""
          )}>
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
  type ComponentsObject,
  type OpenApiSpec,
  type OperationBoxProps,
  type OperationObject
};

