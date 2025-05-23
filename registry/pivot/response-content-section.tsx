import { cn } from "@/lib/utils";
import React from "react";

interface EncodingPropertyObject {
  contentType?: string;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

interface MediaTypeObject {
  schema?: any;
  example?: any;
  examples?: Record<string, any>;
  encoding?: Record<string, EncodingPropertyObject>;
}

interface ComponentsObject {
  [key: string]: any;
}

interface ResponseContentSectionProps {
  content: Record<string, MediaTypeObject>;
  components?: ComponentsObject;
  className?: string;
}

const ResponseContentSection = React.forwardRef<
  HTMLDivElement,
  ResponseContentSectionProps
>(({ content, components, className }, ref) => {
  // Render media type encoding information
  const renderMediaTypeEncoding = (mediaType: MediaTypeObject) => {
    if (!mediaType.encoding || Object.keys(mediaType.encoding).length === 0) {
      return null;
    }

    return (
      <div className="mt-4">
        <h5 className="text-sm font-medium mb-2 text-neutral-800 dark:text-neutral-200">
          Encoding
        </h5>
        <div className="space-y-2">
          {Object.entries(mediaType.encoding).map(
            ([property, encoding]: [string, EncodingPropertyObject]) => (
              <div
                key={property}
                className="border rounded p-2 bg-white dark:bg-neutral-800 dark:border-neutral-700"
              >
                <div className="font-mono text-sm mb-1 font-medium text-neutral-800 dark:text-neutral-200">
                  {property}
                </div>
                <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs">
                  {encoding.contentType && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Content Type
                      </div>
                      <div className="font-mono text-neutral-800 dark:text-neutral-200">
                        {encoding.contentType}
                      </div>
                    </>
                  )}
                  {encoding.style && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Style
                      </div>
                      <div className="font-mono text-neutral-800 dark:text-neutral-200">
                        {encoding.style}
                      </div>
                    </>
                  )}
                  {encoding.explode !== undefined && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Explode
                      </div>
                      <div className="font-mono text-neutral-800 dark:text-neutral-200">
                        {encoding.explode.toString()}
                      </div>
                    </>
                  )}
                  {encoding.allowReserved !== undefined && (
                    <>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Allow Reserved
                      </div>
                      <div className="font-mono text-neutral-800 dark:text-neutral-200">
                        {encoding.allowReserved.toString()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className={cn(className)}>
      <h4 className="text-sm font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
        Response Content
      </h4>
      <div className="space-y-3">
        {Object.entries(content).map(([mediaType, mediaTypeObj]) => (
          <div
            key={mediaType}
            className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                {mediaType}
              </span>
            </div>

            {mediaTypeObj.schema && (
              <div className="mb-2 text-xs text-neutral-600 dark:text-neutral-400 italic">
                Schema available (requires schema display component)
              </div>
            )}

            {mediaTypeObj.example && (
              <div className="mb-2">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Example:
                </span>
                <pre className="text-xs bg-neutral-100 dark:bg-neutral-700 p-2 rounded mt-1 overflow-x-auto">
                  {JSON.stringify(mediaTypeObj.example, null, 2)}
                </pre>
              </div>
            )}

            {mediaTypeObj.examples && (
              <div className="mb-2">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Examples:
                </span>
                <div className="space-y-1 mt-1">
                  {Object.entries(mediaTypeObj.examples).map(
                    ([name, example]) => (
                      <div key={name} className="text-xs">
                        <span className="font-medium text-neutral-600 dark:text-neutral-400">
                          {name}:
                        </span>
                        <pre className="bg-neutral-100 dark:bg-neutral-700 p-1 rounded ml-2 overflow-x-auto">
                          {JSON.stringify(example, null, 2)}
                        </pre>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {renderMediaTypeEncoding(mediaTypeObj)}
          </div>
        ))}
      </div>
    </div>
  );
});

ResponseContentSection.displayName = "ResponseContentSection";

export {
  ResponseContentSection,
  type ComponentsObject,
  type EncodingPropertyObject,
  type MediaTypeObject,
  type ResponseContentSectionProps,
};
