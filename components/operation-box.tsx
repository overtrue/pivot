import MethodLabel from '@/components/atoms/method-label';
import OperationPath from '@/components/atoms/operation-path';
import { useOpenApi } from '@/hooks/useOpenApi';
import { useI18n } from '@/lib/i18n/i18n-provider';
import {
  ComponentsObject,
  OpenApiSpec,
  OperationObject
} from '@/types/openapi';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import DeprecatedBadge from './atoms/deprecated-badge';
import DescriptionDisplay from './atoms/description-display';
import ExternalDocsDisplay from './atoms/external-docs-display';
import ExpandCollapse from './interactive/expand-collapse';
import ParametersSection from './parameters-section';
import RequestBodySection from './request-body-section';
import ResponsesSection from './responses-section';
import SecurityRequirementsSection from './security-requirements-section';

interface OperationBoxProps {
  path: string;
  method: string;
  operation: OperationObject;
  components?: ComponentsObject;
  className?: string;
  onSelectOperation?: () => void;
  spec?: OpenApiSpec; // 可选，如果提供则优先使用
}

const OperationBox: React.FC<OperationBoxProps> = ({
  path,
  method,
  operation,
  components,
  className,
  onSelectOperation,
  spec
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTryItOutVisible, setIsTryItOutVisible] = useState(false);
  const { t } = useI18n();

  // 如果提供了完整规范，使用useOpenApi处理数据
  const openApi = spec ? useOpenApi(spec) : null;

  // 使用openApi钩子或直接从props获取组件
  const resolvedComponents = openApi?.components || components;

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
    <div className={cn(
      'rounded overflow-hidden',
      operation.deprecated ? 'bg-red-300 dark:bg-red-900/50' : 'bg-neutral-50/50 dark:bg-neutral-800/50',
      className
    )}>
      {/* Header Section */}
      <div
        className={cn(
          'p-3 flex justify-between items-center cursor-pointer',
          operation.deprecated ? 'bg-red-50 dark:bg-red-900/30' : ''
        )}
        onClick={handleHeaderClick}
      >
        <div className="flex items-center space-x-3 flex-wrap">
          <MethodLabel method={method.toUpperCase() as any} />
          <OperationPath path={path} className="break-all" />
          {operation.summary && <span className="text-sm text-neutral-700 dark:text-neutral-300 hidden md:inline">- {operation.summary}</span>}
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
                <DescriptionDisplay className="text-base text-neutral-800 dark:text-neutral-200 font-medium md:hidden" description={operation.summary} />
              )}
              {operation.description && (
                <DescriptionDisplay description={operation.description} className="text-sm text-neutral-800 dark:text-neutral-200 prose dark:prose-invert max-w-none" />
              )}
              {externalDocs && <ExternalDocsDisplay externalDocs={externalDocs} className="mt-2" />}
            </div>
          )}

          {/* Parameters Section */}
          {parameters && parameters.length > 0 && (
            <div className="p-4">
              <ParametersSection parameters={parameters} components={resolvedComponents} />
            </div>
          )}

          {/* Request Body Section */}
          {requestBody && (
            <div className="p-4">
              <RequestBodySection requestBody={requestBody} components={resolvedComponents} />
            </div>
          )}

          {/* Responses Section */}
          {responses && (
            <div className="p-4">
              <ResponsesSection responses={responses} components={resolvedComponents} />
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
};

export default OperationBox;
