"use client";

import { I18nProvider } from "@/registry/lib/i18n/I18nProvider";
import { ResponseContentSection } from "@/registry/pivot/response-content-section";
import type { OpenAPIV3 } from 'openapi-types';

// 示例 OpenAPI 规范
const exampleSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Example API",
    version: "1.0.0",
  },
  paths: {
    "/users/{id}": {
      get: {
        summary: "Get user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" as const },
          },
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    id: { type: "string" as const },
                    name: { type: "string" as const },
                    email: { type: "string" as const },
                  },
                },
                example: {
                  id: "123",
                  name: "John Doe",
                  email: "john@example.com",
                },
              },
              "application/xml": {
                schema: {
                  type: "object" as const,
                  xml: { name: "User" },
                },
                example: `<?xml version="1.0"?>
<User>
  <id>123</id>
  <name>John Doe</name>
  <email>john@example.com</email>
</User>`,
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    error: { type: "string" as const },
                    message: { type: "string" as const },
                  },
                },
                examples: {
                  "invalid_id": {
                    summary: "Invalid ID format",
                    value: {
                      error: "INVALID_ID",
                      message: "User ID must be a valid UUID",
                    },
                  },
                  "missing_id": {
                    summary: "Missing ID",
                    value: {
                      error: "MISSING_ID",
                      message: "User ID is required",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    error: { type: "string" as const },
                    message: { type: "string" as const },
                    timestamp: { type: "string" as const },
                  },
                },
                example: {
                  error: "INTERNAL_ERROR",
                  message: "An unexpected error occurred",
                  timestamp: "2024-03-15T10:30:00Z",
                },
              },
            },
          },
        },
      },
    },
  },
} as OpenAPIV3.Document;

export default function ResponseContentSectionDemo() {
  // 从 spec 中提取响应内容
  const getResponseContent = (statusCode: string) => {
    const operation = exampleSpec.paths["/users/{id}"]?.get;
    const response = operation?.responses?.[statusCode];

    // 处理引用对象
    if (response && typeof response === 'object' && '$ref' in response) {
      // 这里应该解析引用，但为了简化 demo，我们返回空对象
      return {};
    }

    return (response as any)?.content || {};
  };

  return (
    <I18nProvider>
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold">Response Content Section Demo</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">200 Response</h3>
          <ResponseContentSection
            content={getResponseContent("200")}
            components={exampleSpec.components}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">400 Response</h3>
          <ResponseContentSection
            content={getResponseContent("400")}
            components={exampleSpec.components}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">500 Response</h3>
          <ResponseContentSection
            content={getResponseContent("500")}
            components={exampleSpec.components}
          />
        </div>
      </div>
    </I18nProvider>
  );
}
