import {
  ComponentsObject,
  EncodingPropertyObject,
  MediaTypeObject
} from '@/types/openapi'; // Adjust path
import React from 'react';
import SchemaWithExampleViewer from './SchemaWithExampleViewer';

interface ResponseContentSectionProps {
  content: Record<string, MediaTypeObject>;
  components?: ComponentsObject;
  className?: string;
}

const ResponseContentSection: React.FC<ResponseContentSectionProps> = ({
  content,
  components,
  className = ''
}) => {
  // 渲染媒体类型的额外信息（如编码）
  const renderMediaTypeEncoding = (mediaType: MediaTypeObject) => {
    if (!mediaType.encoding || Object.keys(mediaType.encoding).length === 0) {
      return null;
    }

    return (
      <div className="mt-4">
        <h5 className="text-sm font-medium mb-2">Encoding</h5>
        <div className="space-y-2">
          {Object.entries(mediaType.encoding).map(([property, encoding]: [string, EncodingPropertyObject]) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <SchemaWithExampleViewer
      content={content}
      components={components}
      contentType="mediaTypes"
      showTitle={true}
      className={className}
      renderFooter={renderMediaTypeEncoding}
    />
  );
};

export default ResponseContentSection;
