import { cn } from "@/lib/utils";
import React from "react";
import { SectionTitle } from "../pivot/section-title";

interface RequestBodyObject {
  description?: string;
  content: Record<string, any>;
  required?: boolean;
}

interface ReferenceObject {
  $ref: string;
}

interface ComponentsObject {
  [key: string]: any;
}

interface RequestBodySectionProps {
  requestBody: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  className?: string;
  titleClassName?: string;
}

// Simple ref resolution function (simplified version)
function resolveRef<T>(
  obj: T | ReferenceObject,
  components?: ComponentsObject,
  section?: string,
): T | null {
  if (!obj || typeof obj !== "object") return null;

  if ("$ref" in obj) {
    // This is a simplified resolution - in real implementation you'd parse the $ref path
    return null; // For now, return null for references
  }

  return obj as T;
}

const RequestBodySection = React.forwardRef<
  HTMLDivElement,
  RequestBodySectionProps
>(({ requestBody, components, className, titleClassName }, ref) => {
  // Resolve reference object
  const resolvedBody = resolveRef<RequestBodyObject>(
    requestBody,
    components,
    "requestBodies",
  );

  if (!resolvedBody) {
    return (
      <div
        ref={ref}
        className={cn("text-red-500 dark:text-red-400", className)}
      >
        Cannot resolve request body reference
      </div>
    );
  }

  // Get content
  const content = resolvedBody.content;
  if (!content) {
    return (
      <div
        ref={ref}
        className={cn("text-yellow-500 dark:text-yellow-400", className)}
      >
        Request body has no content defined
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <SectionTitle
        title="Request Body"
        className={cn("text-lg font-medium my-3", titleClassName)}
      />

      {/* Required indicator */}
      {resolvedBody.required && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
            Required
          </span>
        </div>
      )}

      {/* Description */}
      {resolvedBody.description && (
        <div className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          {resolvedBody.description}
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Content Types
        </h4>
        <div className="space-y-2">
          {Object.entries(content).map(([mediaType, mediaTypeObj]) => (
            <div
              key={mediaType}
              className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                  {mediaType}
                </span>
              </div>

              {mediaTypeObj?.schema && (
                <div className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                  Schema available (requires schema display component)
                </div>
              )}

              {mediaTypeObj?.example && (
                <div className="mt-2">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    Example:
                  </span>
                  <pre className="text-xs bg-neutral-100 dark:bg-neutral-700 p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(mediaTypeObj.example, null, 2)}
                  </pre>
                </div>
              )}

              {mediaTypeObj?.examples && (
                <div className="mt-2">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    Examples:
                  </span>
                  <div className="space-y-1 mt-1">
                    {Object.entries(mediaTypeObj.examples).map(
                      ([name, example]) => (
                        <div key={name} className="text-xs">
                          <span className="font-medium">{name}:</span>
                          <pre className="bg-neutral-100 dark:bg-neutral-700 p-1 rounded ml-2 overflow-x-auto">
                            {JSON.stringify(example, null, 2)}
                          </pre>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

RequestBodySection.displayName = "RequestBodySection";

export {
  RequestBodySection,
  type ComponentsObject,
  type ReferenceObject,
  type RequestBodyObject,
  type RequestBodySectionProps,
};
