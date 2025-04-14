'use client';

import React, { useEffect, useState } from 'react';
import {
  EncodingObject,
  MediaTypeObject,
  OpenApiComponents,
} from '../../../types/openapi'; // Adjust path
import ExamplesDisplay from '../ExamplesDisplay';
import MediaTypeSelector from '../MediaTypeSelector';
import SchemaDisplay from '../schema/SchemaDisplay';
// import SectionTitle from '../../atoms/typography/SectionTitle'; // Optional title

interface ResponseContentSectionProps {
  content: Record<string, MediaTypeObject>;
  components?: OpenApiComponents;
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
        <div className="mt-3 bg-gray-50 p-3 rounded space-y-4">
          {/* Schema */}
          {selectedMediaTypeObject.schema && (
            <div>
              <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Schema</h5>
              <SchemaDisplay schema={selectedMediaTypeObject.schema} components={components} />
            </div>
          )}

          {/* Examples */}
          {selectedMediaTypeObject.examples && Object.keys(selectedMediaTypeObject.examples).length > 0 && (
            <div>
              <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Examples</h5>
              <ExamplesDisplay examples={selectedMediaTypeObject.examples} components={components} />
            </div>
          )}

          {/* Single Example (Legacy) */}
          {selectedMediaTypeObject.example !== undefined && !selectedMediaTypeObject.examples && (
            <div>
              <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Example</h5>
              <pre className="bg-gray-100 p-2 rounded font-mono text-xs overflow-x-auto">
                <code>{JSON.stringify(selectedMediaTypeObject.example, null, 2)}</code>
              </pre>
            </div>
          )}

          {/* Encoding */}
          {selectedMediaTypeObject.encoding && Object.keys(selectedMediaTypeObject.encoding).length > 0 && (
            <div>
              <h5 className="text-xs font-semibold uppercase text-gray-500 mb-1">Encoding</h5>
              <div className="space-y-2">
                {Object.entries(selectedMediaTypeObject.encoding).map(([property, encoding]: [string, EncodingObject]) => (
                  <div key={property} className="border rounded p-2 bg-white">
                    <div className="font-mono text-sm mb-1 font-medium">{property}</div>
                    <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs">
                      {encoding.contentType && (
                        <>
                          <div className="text-gray-600">Content Type:</div>
                          <div className="font-mono">{encoding.contentType}</div>
                        </>
                      )}
                      {encoding.style && (
                        <>
                          <div className="text-gray-600">Style:</div>
                          <div className="font-mono">{encoding.style}</div>
                        </>
                      )}
                      {encoding.explode !== undefined && (
                        <>
                          <div className="text-gray-600">Explode:</div>
                          <div className="font-mono">{encoding.explode.toString()}</div>
                        </>
                      )}
                      {encoding.allowReserved !== undefined && (
                        <>
                          <div className="text-gray-600">Allow Reserved:</div>
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
