'use client';

import React, { useState } from 'react';
import SectionTitle from './atoms/SectionTitle'; // Use SectionTitle
import StatusCode from './atoms/StatusCode'; // Import StatusCode
import ResponseItem from './ResponseItem'; // Import the new ResponseItem

// 导入共享类型
import {
  ComponentsObject,
  ResponsesObjectMap
} from '@/types/openapi'; // Adjust path

interface ResponsesSectionProps {
  responses: ResponsesObjectMap;
  components?: ComponentsObject; // For $ref resolution
  className?: string; // 添加className属性
}

// Remove the specific resolveResponseRef function
// const resolveResponseRef = (...) => { ... };

const ResponsesSection: React.FC<ResponsesSectionProps> = ({ responses, components, className }) => {
  if (!responses || Object.keys(responses).length === 0) {
    return null;
  }

  const responseEntries = Object.entries(responses);
  const [activeTab, setActiveTab] = useState<string>(responseEntries[0]?.[0] || ''); // Default to first status code

  if (!activeTab && responseEntries.length > 0) {
    // Handle cases where initial state might be empty string but entries exist
    setActiveTab(responseEntries[0][0]);
  }

  return (
    <div className={className || ''}>
      {/* <h4 className="font-semibold text-sm mb-3">响应</h4> */}
      <SectionTitle title="Responses" />
      <div className="mt-3"> {/* Tab container */}
        {/* Tab Triggers - Button Style */}
        {/* Remove border-b from container, adjust spacing/margins as needed */}
        <div className="flex mb-4 space-x-2"> {/* Removed border-b, adjusted space-x */}
          {responseEntries.map(([statusCode]) => (
            <button
              key={statusCode}
              onClick={() => setActiveTab(statusCode)}
              // Remove focus ring, active ring, and rounded styles from the button itself
              className={`focus:outline-none ${ // Keep focus outline none for accessibility if desired, otherwise remove
                activeTab === statusCode
                  ? 'opacity-100' // Active state: fully opaque
                  : 'opacity-60 hover:opacity-100 transition-opacity duration-150' // Inactive state: dimmed + hover effect
                }`}
            >
              <StatusCode code={statusCode} size="medium" /> {/* Use StatusCode component with medium size */}
            </button>
          ))}
        </div>

        {/* Tab Content - Render only the active tab's content */}
        <div className="mt-4"> {/* Ensure spacing below buttons */}
          {responseEntries
            .filter(([statusCode]) => statusCode === activeTab) // Filter for the active tab
            .map(([statusCode, responseObjectOrRef]) => (
              <ResponseItem
                key={statusCode}
                code={statusCode}
                response={responseObjectOrRef}
                components={components}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsesSection;
