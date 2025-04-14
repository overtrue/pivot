'use client';

import MethodLabel from '@/components/atoms/http/MethodLabel';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  OpenApiComponents,
  OperationObject
} from '../../types/openapi';
import ExternalDocsDisplay from '../atoms/ExternalDocsDisplay';
import DeprecatedBadge from '../atoms/parameter/DeprecatedBadge';
import ExpandCollapse from '../interactive/ExpandCollapse';
import ParametersSection from './ParametersSection';
import RequestBodySection from './RequestBodySection';
import ResponsesSection from './ResponsesSection';
import SecurityRequirementsSection from './SecurityRequirementsSection';

// Helper function for method colors
const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
    case 'GET': return { bgHeader: 'bg-green-100', text: 'text-green-800' };
    case 'POST': return { bgHeader: 'bg-blue-100', text: 'text-blue-800' };
    case 'PUT': return { bgHeader: 'bg-yellow-100', text: 'text-yellow-800' };
    case 'DELETE': return { bgHeader: 'bg-red-100', text: 'text-red-800' };
    case 'PATCH': return { bgHeader: 'bg-purple-100', text: 'text-purple-800' };
    default: return { bgHeader: 'bg-gray-100', text: 'text-gray-800' };
  }
};

interface OperationBoxProps {
  path: string;
  method: string;
  operation: OperationObject;
  components?: OpenApiComponents;
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
  const [isExpanded, setIsExpanded] = useState(true);

  const parameters = operation.parameters;
  const requestBody = operation.requestBody;
  const responses = operation.responses;
  const security = operation.security;
  // Use 'any' for externalDocs as type seems missing
  // TODO: Update OperationObject type in types/openapi.ts to include externalDocs: ExternalDocumentationObject;
  const externalDocs = (operation as any).externalDocs;

  const methodColor = getMethodColor(method.toUpperCase());

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
    if (onSelectOperation) {
      onSelectOperation();
    }
  };

  return (
    <div className={`border rounded overflow-hidden shadow-sm ${operation.deprecated ? 'border-red-300' : 'border-gray-300'} ${className}`}>
      {/* Header Section */}
      <div
        className={`p-3 flex justify-between items-center cursor-pointer`}
        onClick={handleHeaderClick}
      >
        <div className="flex items-center space-x-3 flex-wrap">
          <MethodLabel method={method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'} />
          <span className="font-mono text-lg font-semibold break-all">{path}</span>
          {operation.summary && <span className="text-sm text-gray-700 hidden md:inline">- {operation.summary}</span>}
          {operation.deprecated && <DeprecatedBadge />}
        </div>
        <ExpandCollapse isExpanded={isExpanded} onToggle={() => { }} label="" />
      </div>

      {/* Collapsible Body */}
      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {/* Description Section */}
          {(operation.summary || operation.description || externalDocs) && (
            <div className="p-4 space-y-2">
              {operation.summary && <p className="text-base font-medium md:hidden">{operation.summary}</p>}
              {operation.description && (
                <div className="text-sm text-gray-700 prose max-w-none">
                  <ReactMarkdown>{operation.description}</ReactMarkdown>
                </div>
              )}
              {/* Render externalDocs correctly using ExternalDocsDisplay */}
              {externalDocs && <ExternalDocsDisplay externalDocs={externalDocs} className="mt-2" />}
            </div>
          )}

          {/* Parameters Section */}
          {parameters && parameters.length > 0 && (
            <ParametersSection parameters={parameters} components={components} />
          )}

          {/* Request Body Section */}
          {requestBody && (
            <RequestBodySection requestBody={requestBody} components={components} />
          )}

          {/* Responses Section */}
          {responses && (
            <ResponsesSection responses={responses} components={components} />
          )}

          {/* Security Requirements Section */}
          {security && security.length > 0 && (
            <SecurityRequirementsSection security={security} />
          )}
        </div>
      )}
    </div>
  );
};

export default OperationBox;
