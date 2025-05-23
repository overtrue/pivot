import { cn } from "@/lib/utils";
import React from "react";
import { DescriptionDisplay } from "../pivot/description-display";
import { StatusCode } from "../pivot/status-code";

interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: any;
  example?: any;
  examples?: Record<string, any>;
}

interface MediaTypeObject {
  schema?: any;
  example?: any;
  examples?: Record<string, any>;
  encoding?: Record<string, any>;
}

interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: any;
}

interface ResponseObject {
  description: string;
  headers?: Record<string, HeaderObject>;
  content?: Record<string, MediaTypeObject>;
  links?: Record<string, LinkObject>;
}

interface ReferenceObject {
  $ref: string;
}

interface ComponentsObject {
  [key: string]: any;
}

interface ResponseItemProps {
  code: string;
  response: ResponseObject | ReferenceObject;
  components?: ComponentsObject;
  className?: string;
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

const ResponseItem = React.forwardRef<HTMLDivElement, ResponseItemProps>(
  ({ code, response, components, className }, ref) => {
    // Resolve response object (if it's a reference)
    const resolvedResponse = resolveRef<ResponseObject>(
      response,
      components,
      "responses",
    );

    // If unable to resolve reference, show error message
    if (!resolvedResponse) {
      const refString =
        response && typeof response === "object" && "$ref" in response
          ? response.$ref
          : "[unknown reference]";
      return (
        <div
          ref={ref}
          className={cn(
            "text-xs text-red-500 dark:text-red-400 p-2 border dark:border-red-800 rounded bg-red-50 dark:bg-red-900/20",
            className,
          )}
        >
          Cannot display response {code}: Reference {refString} failed to
          resolve.
        </div>
      );
    }

    // Extract properties from resolved object
    const { description, headers, content, links } = resolvedResponse;

    const hasHeaders = headers && Object.keys(headers).length > 0;
    const hasContent = content && Object.keys(content).length > 0;
    const hasLinks = links && Object.keys(links).length > 0;
    const hasDetails = hasHeaders || hasContent || hasLinks;

    return (
      <div
        ref={ref}
        className={cn(
          "border rounded mb-4 overflow-hidden dark:border-neutral-700",
          className,
        )}
      >
        {/* Header part */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <StatusCode code={code} />
            {description && (
              <DescriptionDisplay
                description={description}
                className="text-sm mb-0"
              />
            )}
          </div>
        </div>

        {/* Details part - Always shown if hasDetails */}
        {hasDetails && (
          <div className="p-4 border-t dark:border-neutral-700">
            {hasHeaders && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                  Headers
                </h4>
                <div className="space-y-2">
                  {Object.entries(headers).map(([headerName, headerObj]) => (
                    <div
                      key={headerName}
                      className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded"
                    >
                      <span className="font-mono text-sm text-neutral-800 dark:text-neutral-200">
                        {headerName}
                      </span>
                      {headerObj.description && (
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          {headerObj.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasContent && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                  Content
                </h4>
                <div className="space-y-2">
                  {Object.entries(content).map(([mediaType, mediaTypeObj]) => (
                    <div
                      key={mediaType}
                      className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded"
                    >
                      <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
                        {mediaType}
                      </span>
                      {mediaTypeObj.schema && (
                        <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 italic">
                          Schema available (requires schema display component)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasLinks && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                  Links
                </h4>
                <div className="space-y-2">
                  {Object.entries(links).map(([linkName, linkObj]) => (
                    <div
                      key={linkName}
                      className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded"
                    >
                      <span className="font-mono text-sm text-green-600 dark:text-green-400">
                        {linkName}
                      </span>
                      {linkObj.description && (
                        <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                          {linkObj.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

ResponseItem.displayName = "ResponseItem";

export {
  ResponseItem,
  type ComponentsObject,
  type HeaderObject,
  type LinkObject,
  type MediaTypeObject,
  type ReferenceObject,
  type ResponseItemProps,
  type ResponseObject,
};
