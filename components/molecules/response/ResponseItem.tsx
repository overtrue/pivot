'use client';

import React, { useState } from 'react';
import {
  ContentObject,
  HeadersObject,
  LinksObject,
  OpenApiComponents,
  ResponseObject
} from '../../../types/openapi'; // Adjust path
import StatusCode from '../../atoms/http/StatusCode';
import DescriptionDisplay from '../../atoms/typography/DescriptionDisplay';
import ExpandCollapse from '../../interactive/ExpandCollapse';
import HeadersSection from '../header/HeadersSection';
import LinksSection from '../link/LinksSection';
import ResponseContentSection from './ResponseContentSection';

// Interface now expects the fully resolved ResponseObject
interface ResponseItemProps extends ResponseObject {
  code: string; // Keep the status code separate
  components?: OpenApiComponents; // Pass components down for potential nested refs
}

const ResponseItem: React.FC<ResponseItemProps> = ({
  code,
  description,
  headers,
  content,
  links,
  components
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasHeaders = headers && Object.keys(headers).length > 0;
  const hasContent = content && Object.keys(content).length > 0;
  const hasLinks = links && Object.keys(links).length > 0;
  const hasDetails = hasHeaders || hasContent || hasLinks;

  return (
    <div className="border rounded mb-4 overflow-hidden">
      {/* Header part */}
      <div className="p-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StatusCode code={code} />
          {description && <DescriptionDisplay description={description} className="text-sm mb-0" />}
        </div>
        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? "Hide Details" : "Show Details"}
          />
        )}
      </div>

      {/* Collapsible Details part */}
      {isExpanded && hasDetails && (
        <div className="p-4 border-t">
          {hasHeaders && <HeadersSection headers={headers as HeadersObject} components={components} />}
          {hasContent && <ResponseContentSection content={content as ContentObject} components={components} />}
          {hasLinks && <LinksSection links={links as LinksObject} components={components} />}
        </div>
      )}
    </div>
  );
};

export default ResponseItem;
