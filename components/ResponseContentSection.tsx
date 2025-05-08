'use client';

import {
  ComponentsObject,
  EncodingPropertyObject,
  MediaTypeObject
} from '@/types/openapi'; // Adjust path
import React, { useEffect, useState } from 'react';
import ExamplesDisplay from './ExamplesDisplay';
import MediaTypeSelector from './MediaTypeSelector';
import SchemaDisplay from './SchemaDisplay';

interface ResponseContentSectionProps {
  content: Record<string, MediaTypeObject>;
  components?: ComponentsObject;
}

const ResponseContentSection: React.FC<ResponseContentSectionProps> = ({ content, components }) => {
  const mediaTypes = Object.keys(content);
  const [activeMediaType, setActiveMediaType] = useState<string | null>(null);

  useEffect(() => {
    if (activeMediaType === null && mediaTypes.length > 0) {
      setActiveMediaType(mediaTypes[0]);
    }
    if (activeMediaType && !mediaTypes.includes(activeMediaType) && mediaTypes.length > 0) {
      setActiveMediaType(mediaTypes[0]);
    }
    if (mediaTypes.length === 0) {
      setActiveMediaType(null);
    }
  }, [mediaTypes, activeMediaType]);

  if (mediaTypes.length === 0) {
    return null;
  }

  const selectedMediaTypeObject = activeMediaType ? content[activeMediaType] : null;

  return (
    <div className="mb-4">
      {/* <SectionTitle title="Content" /> */}
      <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Content</h4>

      <MediaTypeSelector
        mediaTypes={mediaTypes}
        activeMediaType={activeMediaType}
        onSelectMediaType={setActiveMediaType}
      />

      {activeMediaType && selectedMediaTypeObject && (
        <div className="mt-3 bg-gray-50/60 p-4 rounded space-y-4">
          {/* Schema */}
          {selectedMediaTypeObject.schema && (
            <div>
              <SchemaDisplay schema={selectedMediaTypeObject.schema} components={components} />
            </div>
          )}

          {/* Examples */}
          {selectedMediaTypeObject.examples && Object.keys(selectedMediaTypeObject.examples).length > 0 && (
            <div>
              <ExamplesDisplay examples={selectedMediaTypeObject.examples} components={components} />
            </div>
          )}

          {/* Single Example (Legacy) */}
          {selectedMediaTypeObject.example !== undefined && !selectedMediaTypeObject.examples && (
            <div>
              <pre className="bg-gray-100 p-2 rounded font-mono text-xs overflow-x-auto">
                <code>{JSON.stringify(selectedMediaTypeObject.example, null, 2)}</code>
              </pre>
            </div>
          )}

          {/* Encoding */}
          {selectedMediaTypeObject.encoding && Object.keys(selectedMediaTypeObject.encoding).length > 0 && (
            <div>
              <div className="space-y-2">
                {Object.entries(selectedMediaTypeObject.encoding).map(([property, encoding]: [string, EncodingPropertyObject]) => (
                  <div key={property} className="border rounded p-2 bg-white">
                    <div className="font-mono text-sm mb-1 font-medium">{property}</div>
                    <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs">
                      {encoding.contentType && (
                        <>
                          <div className="text-gray-600">Content Type</div>
                          <div className="font-mono">{encoding.contentType}</div>
                        </>
                      )}
                      {encoding.style && (
                        <>
                          <div className="text-gray-600">Style</div>
                          <div className="font-mono">{encoding.style}</div>
                        </>
                      )}
                      {encoding.explode !== undefined && (
                        <>
                          <div className="text-gray-600">Explode</div>
                          <div className="font-mono">{encoding.explode.toString()}</div>
                        </>
                      )}
                      {encoding.allowReserved !== undefined && (
                        <>
                          <div className="text-gray-600">Allow Reserved</div>
                          <div className="font-mono">{encoding.allowReserved.toString()}</div>
                        </>
                      )}
                      {/* TODO: Display headers within encoding? */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseContentSection;
