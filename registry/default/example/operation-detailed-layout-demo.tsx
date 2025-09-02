"use client";

import { OperationDetailedLayout } from "@/registry/default/ui/operation-detailed-layout";
import type { OpenAPIV3 } from "openapi-types";
import { useState } from "react";

// Mock OpenAPI specification for demo
const mockSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "2.0.0",
    description: "Advanced e-commerce platform API with comprehensive features"
  },
  servers: [
    {
      url: "https://api.ecommerce.example.com/v2",
      description: "Production server"
    },
    {
      url: "https://staging-api.ecommerce.example.com/v2",
      description: "Staging server"
    }
  ],
  paths: {
    "/users/{id}": {
      get: {
        tags: ["User Management"],
        operationId: "getUserById",
        summary: "Get user details",
        description: "Retrieve detailed information about a specific user by ID, including profile data, preferences, and activity records.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              pattern: "^[0-9]+$"
            },
            description: "The unique identifier of the user",
            example: "12345"
          },
          {
            name: "include",
            in: "query",
            required: false,
            schema: {
              type: "array",
              items: {
                type: "string",
                enum: ["profile", "preferences", "activity", "statistics"]
              }
            },
            description: "Additional data fields to include in the response",
            example: ["profile", "preferences"]
          }
        ],
        responses: {
          "200": {
            description: "Successfully retrieved user information",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    avatar: { type: "string", format: "uri" },
                    profile: {
                      type: "object",
                      properties: {
                        bio: { type: "string" },
                        location: { type: "string" },
                        website: { type: "string", format: "uri" }
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            description: "User not found"
          }
        }
      },
      put: {
        tags: ["User Management"],
        operationId: "updateUser",
        summary: "Update user information",
        description: "Update user profile information and preferences",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" },
                  avatar: { type: "string", format: "uri" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User updated successfully"
          },
          "404": {
            description: "User not found"
          }
        }
      },
      delete: {
        tags: ["User Management"],
        operationId: "deleteUser",
        summary: "Delete user account",
        description: "Permanently delete a user account and all associated data",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "204": {
            description: "User deleted successfully"
          },
          "404": {
            description: "User not found"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" }
        }
      }
    }
  }
};

export default function OperationDetailedLayoutDemo() {
  const [selectedPath, setSelectedPath] = useState<string>("/users/{id}");
  const [selectedMethod, setSelectedMethod] = useState<string>("get");

  return (
    <div className="w-full h-screen">
      <OperationDetailedLayout
        spec={mockSpec}
        selectedPath={selectedPath}
        selectedMethod={selectedMethod}
        onSelectOperation={(path, method, operation) => {
          setSelectedPath(path);
          setSelectedMethod(method);
          console.log("Selected operation:", path, method, operation);
        }}

      />
    </div>
  );
}
