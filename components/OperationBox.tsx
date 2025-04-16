'use client';

import MethodLabel from '@/components/atoms/MethodLabel';
import OperationPath from '@/components/atoms/OperationPath';
import {
  ComponentsObject,
  OperationObject
} from '@/types/openapi';
import React, { useState } from 'react';
import ParametersSection from './/ParametersSection';
import ResponsesSection from './/ResponsesSection';
import TryItOutPanel from './/TryItOutPanel';
import DeprecatedBadge from './atoms/DeprecatedBadge';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import ExternalDocsDisplay from './atoms/ExternalDocsDisplay';
import ExpandCollapse from './interactive/ExpandCollapse';
import RequestBodySection from './RequestBodySection';
import SecurityRequirementsSection from './SecurityRequirementsSection';

interface OperationBoxProps {
  path: string;
  method: string;
  operation: OperationObject;
  components?: ComponentsObject;
  className?: string;
  onSelectOperation?: () => void;
}

const OperationBox: React.FC<OperationBoxProps> = ({
  path,
  method,
  operation,
  components,
  className,
  onSelectOperation
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTryItOutVisible, setIsTryItOutVisible] = useState(false);

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
  const toggleTryItOut = () => setIsTryItOutVisible(!isTryItOutVisible);

  return (
    <div className={`border rounded overflow-hidden shadow-sm ${operation.deprecated ? 'border-red-300' : 'border-gray-300'} ${className}`}>
      {/* Header Section */}
      <div
        className={`p-3 flex justify-between items-center`}
        onClick={handleHeaderClick}
      >
        <div className="flex items-center space-x-3 flex-wrap cursor-pointer">
          <MethodLabel method={method.toUpperCase() as any} />
          <OperationPath path={path} className="break-all" />
          {operation.summary && <span className="text-sm text-gray-700 hidden md:inline">- {operation.summary}</span>}
          {operation.deprecated && <DeprecatedBadge />}
        </div>
        <ExpandCollapse isExpanded={isExpanded} onToggle={toggleExpand} label="" />
      </div>

      {/* Collapsible Body */}
      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {/* Description Section */}
          {(operation.summary || operation.description || externalDocs) && (
            <div className="p-4 space-y-2">
              {operation.summary && (
                <DescriptionDisplay className="text-base font-medium md:hidden" description={operation.summary} />
              )}
              {operation.description && (
                <div className="text-sm text-gray-700 prose max-w-none">
                  <DescriptionDisplay description={operation.description} />
                </div>
              )}
              {/* Render externalDocs correctly using ExternalDocsDisplay */}
              {externalDocs && <ExternalDocsDisplay externalDocs={externalDocs} className="mt-2" />}
            </div>
          )}

          {/* Try it out Button and Panel */}
          {/* <div className="p-4">
            <button
              onClick={toggleTryItOut}
              className="px-3 py-1.5 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isTryItOutVisible ? 'Cancel' : 'Try it out'}
            </button>
          </div> */}

          {isTryItOutVisible && (
            <TryItOutPanel
              path={path}
              method={method}
              operation={operation}
              components={components}
            />
          )}

          {/* Parameters Section */}
          {parameters && parameters.length > 0 && (
            <div className="p-4">
              <ParametersSection parameters={parameters} components={components} />
            </div>
          )}

          {/* Request Body Section */}
          {requestBody && (
            <div className="p-4">
              <RequestBodySection requestBody={requestBody} components={components} />
            </div>
          )}

          {/* Responses Section */}
          {responses && (
            <div className="p-4">
              <ResponsesSection responses={responses} components={components} />
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
