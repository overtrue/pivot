"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { SectionTitle } from "../pivot/section-title";
import { StatusCode } from "../pivot/status-code";
import { ResponseItem } from "./response-item";

interface ResponseObject {
  description: string;
  headers?: Record<string, any>;
  content?: Record<string, any>;
  links?: Record<string, any>;
}

interface ReferenceObject {
  $ref: string;
}

interface ComponentsObject {
  [key: string]: any;
}

interface ResponsesObjectMap {
  [statusCode: string]: ResponseObject | ReferenceObject;
}

interface ResponsesSectionProps {
  responses?: ResponsesObjectMap;
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

const ResponsesSection = React.forwardRef<
  HTMLDivElement,
  ResponsesSectionProps
>(({ responses, components, className }, ref) => {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  if (!responses) {
    return (
      <div ref={ref} className={cn(className)}>
        <SectionTitle title="Responses" className="text-lg my-3" />
        <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
          No responses defined
        </div>
      </div>
    );
  }

  // Group status codes
  const statusGroups: Record<string, string[]> = {
    "1xx": [],
    "2xx": [],
    "3xx": [],
    "4xx": [],
    "5xx": [],
    default: [],
    other: [],
  };

  // Categorize status codes
  Object.keys(responses).forEach((status) => {
    if (status === "default") {
      statusGroups.default!.push(status);
    } else if (/^[1-5]\d\d$/.test(status)) {
      const group = `${status[0]}xx`;
      statusGroups[group]!.push(status);
    } else {
      statusGroups.other!.push(status);
    }
  });

  // Determine default active status
  if (activeStatus === null) {
    // Find by priority: 2xx, default, any other status
    for (const group of [
      "2xx",
      "default",
      "1xx",
      "3xx",
      "4xx",
      "5xx",
      "other",
    ]) {
      const groupStatuses = statusGroups[group]!;
      if (groupStatuses.length > 0 && groupStatuses[0]) {
        setActiveStatus(groupStatuses[0]);
        break;
      }
    }
  }

  // All available status codes
  const allStatusCodes = Object.values(statusGroups).flat();

  // Get response object by status
  const getResponseByStatus = (status: string): ResponseObject | null => {
    const response = responses[status];
    if (!response) return null;
    return resolveRef<ResponseObject>(response, components, "responses");
  };

  // Current active response
  const activeResponse = activeStatus
    ? getResponseByStatus(activeStatus)
    : null;

  return (
    <div ref={ref} className={cn(className)}>
      <SectionTitle title="Responses" className="text-lg my-3" />

      {/* Status code list */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {allStatusCodes.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className="transition-opacity"
            >
              <StatusCode
                code={status === "default" ? "default" : status}
                className={cn(
                  "cursor-pointer transition-opacity",
                  status === activeStatus
                    ? "opacity-100"
                    : "opacity-80 hover:opacity-100",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Active response content */}
      {activeStatus && activeResponse && (
        <div className="rounded">
          <ResponseItem
            code={activeStatus}
            response={activeResponse}
            components={components}
          />
        </div>
      )}

      {/* Prompt when no response is available */}
      {(!activeStatus || !activeResponse) && (
        <div className="text-yellow-600 dark:text-yellow-400 text-sm p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded">
          {allStatusCodes.length === 0
            ? "No responses defined"
            : "Could not resolve selected response"}
        </div>
      )}
    </div>
  );
});

ResponsesSection.displayName = "ResponsesSection";

export {
  ResponsesSection,
  type ComponentsObject,
  type ReferenceObject,
  type ResponseObject,
  type ResponsesObjectMap,
  type ResponsesSectionProps
};

