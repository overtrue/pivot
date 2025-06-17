"use client";

import type { OpenAPIV3 } from 'openapi-types';
import { OperationDetailedLayout } from "@/registry/pivot/operation-detailed-layout";

import { useState } from "react";

const sampleSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Sample API",
    version: "1.0.0",
    description: "A sample API for demonstration"
  },
  servers: [
    {
      url: "https://api.example.com/v1",
      description: "Production server"
    }
  ],
  paths: {
    "/users": {
      get: {
        operationId: "getUsers",
        summary: "Get all users",
        description: "Retrieve a list of all users",
        tags: ["Users"],
        parameters: [
          {
            name: "limit",
            in: "query" as const,
            description: "Maximum number of users to return",
            schema: { type: "integer" as const, minimum: 1, maximum: 100, default: 10 }
          },
          {
            name: "offset",
            in: "query" as const,
            description: "Number of users to skip",
            schema: { type: "integer" as const, minimum: 0, default: 0 }
          }
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array" as const,
                  items: {
                    type: "object" as const,
                    properties: {
                      id: { type: "integer" as const },
                      name: { type: "string" as const },
                      email: { type: "string" as const }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        operationId: "createUser",
        summary: "Create a new user",
        description: "Create a new user account",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object" as const,
                properties: {
                  name: { type: "string" as const },
                  email: { type: "string" as const }
                },
                required: ["name", "email"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    id: { type: "integer" as const },
                    name: { type: "string" as const },
                    email: { type: "string" as const }
                  }
                }
              }
            }
          },
          "400": {
            description: "Bad request"
          }
        }
      }
    },
    "/users/{id}": {
      get: {
        operationId: "getUserById",
        summary: "Get user by ID",
        description: "Retrieve a specific user by their ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path" as const,
            required: true,
            schema: { type: "integer" as const },
            description: "User ID"
          }
        ],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  properties: {
                    id: { type: "integer" as const },
                    name: { type: "string" as const },
                    email: { type: "string" as const }
                  }
                }
              }
            }
          },
          "404": {
            description: "User not found"
          }
        }
      }
    }
  }
};

export default function OperationDetailedLayoutDemo() {
  const [selectedPath, setSelectedPath] = useState<string | null>("/users");
  const [selectedMethod, setSelectedMethod] = useState<string | null>("GET");

  const handleSelectOperation = (path: string, method: string, operation: any) => {
    setSelectedPath(path);
    setSelectedMethod(method.toUpperCase());
    console.log("Selected operation:", { path, method, operation });
  };

  return (
    <div className="w-full h-screen">
      <div className="mb-4 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">当前选择的操作</h3>
        <p className="text-sm text-muted-foreground">
          路径: <code className="bg-background px-1 rounded">{selectedPath || "无"}</code>
        </p>
        <p className="text-sm text-muted-foreground">
          方法: <code className="bg-background px-1 rounded">{selectedMethod || "无"}</code>
        </p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => handleSelectOperation("/users", "GET", {})}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded"
          >
            选择 GET /users
          </button>
          <button
            onClick={() => handleSelectOperation("/users", "POST", {})}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded"
          >
            选择 POST /users
          </button>
          <button
            onClick={() => handleSelectOperation("/users/{id}", "GET", {})}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded"
          >
            选择 GET /users/&#123;id&#125;
          </button>
        </div>
      </div>

      <OperationDetailedLayout
        spec={sampleSpec}
        selectedPath={selectedPath}
        selectedMethod={selectedMethod}
        onSelectOperation={handleSelectOperation}
        className="border rounded-lg"
      />
    </div>
  );
}
