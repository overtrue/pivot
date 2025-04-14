'use client'; // May need client features for tabs or schema viewer interaction

import React, { useEffect, useState } from 'react';
// import SchemaDocs from '@/docs/pages/SchemaDocs';
// import SchemaViewer from '@/docs/pages/SchemaViewer'; // 移除旧的导入
import { resolveRef } from '../../utils/resolveRef'; // Import generic resolver
import RequiredBadge from '../atoms/badge/RequiredBadge'; // Import new
import DescriptionDisplay from '../atoms/typography/DescriptionDisplay'; // Import new
import SectionTitle from '../atoms/typography/SectionTitle'; // Import new
import ExamplesDisplay from './ExamplesDisplay'; // Import the new component
import MediaTypeSelector from './MediaTypeSelector'; // Import new
import SchemaDisplay from './schema/SchemaDisplay'; // Import new SchemaDisplay

// 导入共享类型
import {
  MediaTypeObject,
  OpenApiComponents,
  ReferenceObject,
  RequestBodyObject
} from '../../types/openapi'; // Adjust path

interface RequestBodySectionProps {
  requestBody: RequestBodyObject | ReferenceObject;
  components?: OpenApiComponents;
}

const RequestBodySection: React.FC<RequestBodySectionProps> = ({ requestBody: requestBodyOrRef, components }) => {
  const [activeMediaType, setActiveMediaType] = useState<string | null>(null);

  // Use the generic resolver
  const resolvedRequestBody = resolveRef<RequestBodyObject>(requestBodyOrRef, components, 'requestBodies');

  const mediaTypes = resolvedRequestBody ? Object.keys(resolvedRequestBody.content || {}) : [];

  // Effect to set the initial active media type
  useEffect(() => {
    if (activeMediaType === null && mediaTypes.length > 0) {
      setActiveMediaType(mediaTypes[0]);
    }
    // Reset if available media types change and current active one is no longer valid
    if (activeMediaType && !mediaTypes.includes(activeMediaType) && mediaTypes.length > 0) {
      setActiveMediaType(mediaTypes[0]);
    }
    if (mediaTypes.length === 0) {
      setActiveMediaType(null);
    }
  }, [mediaTypes, activeMediaType]);

  if (!resolvedRequestBody) {
    const refString = (requestBodyOrRef && typeof requestBodyOrRef === 'object' && '$ref' in requestBodyOrRef)
      ? (requestBodyOrRef as ReferenceObject).$ref
      : '[unknown reference]';
    return (
      <div className="border-t pt-4 p-3">
        <SectionTitle title="Request Body" />
        <div className="text-xs text-red-500 p-2 border rounded bg-red-50">
          无法显示请求体: 引用 {refString} 未解析或解析失败。
        </div>
      </div>
    );
  }

  const selectedMediaTypeObject: MediaTypeObject | undefined =
    activeMediaType && resolvedRequestBody.content
      ? resolvedRequestBody.content[activeMediaType]
      : undefined;

  return (
    <div className="border-t pt-4 px-4 pb-4 space-y-3">
      {/* Section Header */}
      <div className="flex items-center space-x-2">
        <SectionTitle title="Request Body" className="mb-0" />
        {resolvedRequestBody.required && <RequiredBadge />}
      </div>

      {/* Description */}
      {resolvedRequestBody.description && (
        <DescriptionDisplay description={resolvedRequestBody.description} />
      )}

      {/* Media Type Selector */}
      {mediaTypes.length > 0 && (
        <MediaTypeSelector
          mediaTypes={mediaTypes}
          activeMediaType={activeMediaType}
          onSelectMediaType={setActiveMediaType}
        />
      )}

      {/* Content for selected media type */}
      {activeMediaType && selectedMediaTypeObject && (
        <div className="bg-gray-50 p-3 rounded space-y-4">
          {selectedMediaTypeObject.schema && (
            <div>
              <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Schema</h5>
              <SchemaDisplay schema={selectedMediaTypeObject.schema} components={components} />
            </div>
          )}
          {selectedMediaTypeObject.examples && Object.keys(selectedMediaTypeObject.examples).length > 0 && (
            <div>
              <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Examples</h5>
              <ExamplesDisplay examples={selectedMediaTypeObject.examples} components={components} />
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default RequestBodySection;
