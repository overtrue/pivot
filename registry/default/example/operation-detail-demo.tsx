"use client";

import type { OpenAPIV3 } from "openapi-types";
import { OperationDetail } from "@/registry/default/ui/operation-detail";

import { useState } from "react";

const sampleOperation: OpenAPIV3.OperationObject = {
  operationId: "getUserById",
  summary: "Get user by ID",
  description:
    "Retrieve a specific user by their unique identifier. This endpoint returns detailed information about a user including their profile data, preferences, and account status.",
  tags: ["Users", "Profile"],
  deprecated: false,
  parameters: [
    {
      name: "id",
      in: "path" as const,
      required: true,
      schema: { type: "integer" as const, minimum: 1 },
      description: "The unique identifier of the user",
    },
    {
      name: "include",
      in: "query" as const,
      required: false,
      schema: {
        type: "array" as const,
        items: {
          type: "string" as const,
          enum: ["profile", "preferences", "activity"],
        },
      },
      description: "Additional data to include in the response",
    },
  ],
  requestBody: {
    description: "Optional request body for additional filters",
    required: false,
    content: {
      "application/json": {
        schema: {
          type: "object" as const,
          properties: {
            fields: {
              type: "array" as const,
              items: { type: "string" as const },
              description: "Specific fields to return",
            },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "User found and returned successfully",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "integer" as const },
              name: { type: "string" as const },
              email: { type: "string" as const },
              profile: {
                type: "object" as const,
                properties: {
                  avatar: { type: "string" as const },
                  bio: { type: "string" as const },
                },
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User not found",
    },
    "500": {
      description: "Internal server error",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  externalDocs: {
    description: "User API Documentation",
    url: "https://docs.example.com/users",
  },
};

const deprecatedOperation: OpenAPIV3.OperationObject = {
  operationId: "getUserByEmail",
  summary: "Get user by email (deprecated)",
  description:
    "This endpoint is deprecated. Please use GET /users/{id} instead.",
  tags: ["Users"],
  deprecated: true,
  parameters: [
    {
      name: "email",
      in: "query" as const,
      required: true,
      schema: { type: "string" as const, format: "email" as const },
      description: "User email address",
    },
  ],
  responses: {
    "200": {
      description: "User found",
    },
    "404": {
      description: "User not found",
    },
  },
};

export default function OperationDetailDemo() {
  const [selectedOperation, setSelectedOperation] = useState<
    "normal" | "deprecated"
  >("normal");

  const currentOperation =
    selectedOperation === "normal" ? sampleOperation : deprecatedOperation;
  const currentPath =
    selectedOperation === "normal" ? "/users/{id}" : "/users/by-email";
  const currentMethod = "GET";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">操作详情组件演示</h3>
        <p className="text-sm text-muted-foreground mb-4">
          这个组件展示了 OpenAPI 操作的详细信息，包括参数、请求体、响应等。
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedOperation("normal")}
            className={`px-3 py-1 text-xs rounded ${
              selectedOperation === "normal"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground border"
            }`}
          >
            普通操作
          </button>
          <button
            onClick={() => setSelectedOperation("deprecated")}
            className={`px-3 py-1 text-xs rounded ${
              selectedOperation === "deprecated"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground border"
            }`}
          >
            已弃用操作
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <OperationDetail
          operation={currentOperation}
          path={currentPath}
          method={currentMethod}
          components={{
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
