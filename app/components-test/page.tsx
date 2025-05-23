"use client";

import { Codegen } from "@/registry/pivot/codegen";
import { NavigationSidebar } from "@/registry/pivot/navigation-sidebar";
import { TryItOutPanel } from "@/registry/pivot/try-it-out-panel";

export default function ComponentsTestPage() {
  // Mock OpenAPI spec for testing
  const mockOpenApiSpec = {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      description: "A test API for component verification"
    },
    paths: {
      "/users": {
        get: {
          summary: "Get all users",
          operationId: "getUsers",
          tags: ["Users"],
          parameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer" },
              description: "Maximum number of users to return"
            }
          ],
          responses: {
            "200": {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Create a user",
          operationId: "createUser",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" }
              }
            }
          },
          responses: {
            "201": {
              description: "User created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            }
          }
        }
      },
      "/posts": {
        get: {
          summary: "Get all posts",
          operationId: "getPosts",
          tags: ["Posts"],
          responses: {
            "200": {
              description: "List of posts"
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
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string", format: "email" }
          },
          required: ["name", "email"]
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            content: { type: "string" },
            userId: { type: "integer" }
          }
        }
      }
    },
    tags: [
      {
        name: "Users",
        description: "User management operations"
      },
      {
        name: "Posts",
        description: "Post management operations"
      }
    ]
  };

  const mockOperation = {
    summary: "Create a user",
    operationId: "createUser",
    description: "Create a new user in the system",
    parameters: [
      {
        name: "x-api-key",
        in: "header",
        required: true,
        schema: { type: "string" },
        description: "API key for authentication"
      }
    ],
    requestBody: {
      required: true,
      description: "User object that needs to be created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string", format: "email" },
              age: { type: "integer", minimum: 0 }
            },
            required: ["name", "email"]
          },
          example: {
            name: "John Doe",
            email: "john@example.com",
            age: 30
          }
        }
      }
    },
    responses: {
      "201": {
        description: "User created successfully"
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
          Pivot Components Test Page
        </h1>

        <div className="space-y-8">
          {/* Navigation Sidebar Test */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Navigation Sidebar
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
              <div className="lg:col-span-1">
                <NavigationSidebar
                  openapi={mockOpenApiSpec}
                  activePath="/users"
                  activeMethod="POST"
                  onSelectOperation={(path, method, operation) => {
                    console.log("Selected operation:", { path, method, operation });
                  }}
                  onSelectSchema={(schemaName) => {
                    console.log("Selected schema:", schemaName);
                  }}
                  className="h-full"
                />
              </div>
              <div className="lg:col-span-2 bg-white dark:bg-neutral-800 rounded-lg p-6 flex items-center justify-center">
                <p className="text-neutral-600 dark:text-neutral-400">
                  Content area - click items in the sidebar to see interactions
                </p>
              </div>
            </div>
          </section>

          {/* Try It Out Panel Test */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Try It Out Panel
            </h2>
            <TryItOutPanel
              operation={mockOperation}
              method="POST"
              path="/users"
              baseUrl="https://api.example.com"
              className="max-w-4xl"
            />
          </section>

          {/* Code Generator Test */}
          <section>
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Code Generator
            </h2>
            <Codegen
              endpoint="https://api.example.com/users"
              method="POST"
              parameters={[
                {
                  name: "x-api-key",
                  in: "header",
                  required: true,
                  schema: { type: "string" }
                }
              ]}
              requestBody={mockOperation.requestBody}
              className="max-w-4xl"
            />
          </section>

          {/* Status */}
          <section className="bg-white dark:bg-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Migration Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">86</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Components Migrated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">98.9%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">1</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Remaining</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
