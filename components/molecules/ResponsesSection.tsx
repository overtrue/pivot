'use client';

import React from 'react';
// import ResponseObjectComponent from './ResponseObject'; // Remove old import
import { resolveRef } from '../../utils/resolveRef'; // Import the generic resolver
import SectionTitle from '../atoms/typography/SectionTitle'; // Use SectionTitle
import ResponseItem from './response/ResponseItem'; // Import the new ResponseItem

// 导入共享类型
import {
  OpenApiComponents,
  ReferenceObject,
  ResponseObject,
  ResponsesObjectMap
} from '../../types/openapi'; // Adjust path

interface ResponsesSectionProps {
  responses: ResponsesObjectMap;
  components?: OpenApiComponents; // For $ref resolution
}

// Remove the specific resolveResponseRef function
// const resolveResponseRef = (...) => { ... };

const ResponsesSection: React.FC<ResponsesSectionProps> = ({ responses, components }) => {
  if (!responses || Object.keys(responses).length === 0) {
    return null;
  }

  return (
    <div className="border-t p-4">
      {/* <h4 className="font-semibold text-sm mb-3">响应</h4> */}
      <SectionTitle title="Responses" />
      <div className="space-y-4 mt-3">
        {Object.entries(responses).map(([statusCode, responseObjectOrRef]) => {
          // Use the generic resolver
          const resolvedResponse = resolveRef<ResponseObject>(responseObjectOrRef, components, 'responses');

          if (!resolvedResponse) {
            // Error message logic remains the same, but we check the original object for $ref
            const refString = (responseObjectOrRef && typeof responseObjectOrRef === 'object' && '$ref' in responseObjectOrRef)
              ? (responseObjectOrRef as ReferenceObject).$ref
              : '[unknown reference]';
            return (
              <div key={statusCode} className="text-xs text-red-500 p-2 border rounded bg-red-50">
                无法显示响应 {statusCode}: 引用 {refString} 未解析或解析失败。
              </div>
            );
          }

          return (
            <ResponseItem
              key={statusCode}
              code={statusCode}
              {...resolvedResponse} // Spread the resolved response object
              // description={resolvedResponse.description || 'No description provided.'} // Description is now part of resolvedResponse
              components={components} // Pass components down
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResponsesSection;
