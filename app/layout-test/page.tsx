"use client";

import { AllInOneLayout } from "@/registry/pivot/all-in-one-layout";

export default function LayoutTestPage() {
  // Mock OpenAPI spec for testing
  const mockOpenApiSpec = {
    openapi: "3.0.0",
    info: {
      title: "Comprehensive API",
      version: "2.0.0",
      description: "A comprehensive API with multiple endpoints and features for testing the all-in-one layout component.",
      contact: {
        name: "API Support",
        email: "support@example.com"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: "https://api.example.com/v2",
        description: "Production server"
      },
      {
        url: "https://staging-api.example.com/v2",
        description: "Staging server"
      }
    ],
    paths: {
      "/users": {
        get: {
          summary: "List all users",
          operationId: "listUsers",
          tags: ["Users"],
          parameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer", minimum: 1, maximum: 100 },
              description: "Maximum number of users to return"
            },
            {
              name: "offset",
              in: "query",
              required: false,
              schema: { type: "integer", minimum: 0 },
              description: "Number of users to skip"
            }
          ],
          responses: {
            "200": {
              description: "List of users retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" }
                  }
                }
              }
            },
            "400": {
              description: "Invalid request parameters"
            }
          }
        },
        post: {
          summary: "Create a new user",
          operationId: "createUser",
          tags: ["Users"],
          requestBody: {
            required: true,
            description: "User data to create",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateUserRequest" }
              }
            }
          },
          responses: {
            "201": {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            },
            "400": {
              description: "Invalid user data"
            },
            "409": {
              description: "User already exists"
            }
          }
        }
      },
      "/users/{userId}": {
        get: {
          summary: "Get user by ID",
          operationId: "getUserById",
          tags: ["Users"],
          parameters: [
            {
              name: "userId",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Unique identifier of the user"
            }
          ],
          responses: {
            "200": {
              description: "User details retrieved successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            },
            "404": {
              description: "User not found"
            }
          }
        },
        put: {
          summary: "Update user",
          operationId: "updateUser",
          tags: ["Users"],
          parameters: [
            {
              name: "userId",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Unique identifier of the user"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateUserRequest" }
              }
            }
          },
          responses: {
            "200": {
              description: "User updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            },
            "404": {
              description: "User not found"
            }
          }
        },
        delete: {
          summary: "Delete user",
          operationId: "deleteUser",
          tags: ["Users"],
          parameters: [
            {
              name: "userId",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Unique identifier of the user"
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
      },
      "/posts": {
        get: {
          summary: "List all posts",
          operationId: "listPosts",
          tags: ["Posts"],
          parameters: [
            {
              name: "author",
              in: "query",
              required: false,
              schema: { type: "string" },
              description: "Filter posts by author ID"
            },
            {
              name: "published",
              in: "query",
              required: false,
              schema: { type: "boolean" },
              description: "Filter by publication status"
            }
          ],
          responses: {
            "200": {
              description: "List of posts retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Post" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Create a new post",
          operationId: "createPost",
          tags: ["Posts"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreatePostRequest" }
              }
            }
          },
          responses: {
            "201": {
              description: "Post created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Post" }
                }
              }
            }
          }
        }
      },
      "/admin/analytics": {
        get: {
          summary: "Get analytics data",
          operationId: "getAnalytics",
          tags: ["Admin"],
          parameters: [
            {
              name: "x-admin-token",
              in: "header",
              required: true,
              schema: { type: "string" },
              description: "Admin authentication token"
            },
            {
              name: "period",
              in: "query",
              required: false,
              schema: {
                type: "string",
                enum: ["day", "week", "month", "year"]
              },
              description: "Analytics time period"
            }
          ],
          responses: {
            "200": {
              description: "Analytics data retrieved successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Analytics" }
                }
              }
            },
            "401": {
              description: "Unauthorized - invalid admin token"
            }
          }
        }
      }
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["id", "email", "name"],
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the user",
              example: "usr_123456"
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
              example: "john.doe@example.com"
            },
            name: {
              type: "string",
              description: "User's full name",
              example: "John Doe"
            },
            age: {
              type: "integer",
              minimum: 0,
              maximum: 150,
              description: "User's age",
              example: 30
            },
            active: {
              type: "boolean",
              description: "Whether the user account is active",
              example: true
            }
          }
        },
        CreateUserRequest: {
          type: "object",
          required: ["email", "name"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User's email address"
            },
            name: {
              type: "string",
              description: "User's full name"
            },
            age: {
              type: "integer",
              minimum: 0,
              maximum: 150,
              description: "User's age"
            }
          }
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "User's full name"
            },
            age: {
              type: "integer",
              minimum: 0,
              maximum: 150,
              description: "User's age"
            },
            active: {
              type: "boolean",
              description: "Whether the user account is active"
            }
          }
        },
        Post: {
          type: "object",
          required: ["id", "title", "content", "authorId"],
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the post",
              example: "post_789012"
            },
            title: {
              type: "string",
              description: "Post title",
              example: "My Amazing Blog Post"
            },
            content: {
              type: "string",
              description: "Post content in markdown format",
              example: "This is the content of my blog post..."
            },
            authorId: {
              type: "string",
              description: "ID of the post author",
              example: "usr_123456"
            },
            published: {
              type: "boolean",
              description: "Whether the post is published",
              example: true
            },
            publishedAt: {
              type: "string",
              format: "date-time",
              description: "Publication timestamp",
              example: "2024-01-15T10:30:00Z"
            }
          }
        },
        CreatePostRequest: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: {
              type: "string",
              description: "Post title"
            },
            content: {
              type: "string",
              description: "Post content in markdown format"
            },
            published: {
              type: "boolean",
              description: "Whether to publish the post immediately",
              default: false
            }
          }
        },
        Analytics: {
          type: "object",
          properties: {
            totalUsers: {
              type: "integer",
              description: "Total number of users",
              example: 1250
            },
            totalPosts: {
              type: "integer",
              description: "Total number of posts",
              example: 340
            },
            activeUsers: {
              type: "integer",
              description: "Number of active users",
              example: 890
            },
            period: {
              type: "string",
              description: "Analytics period",
              example: "month"
            }
          }
        }
      }
    },
    tags: [
      {
        name: "Users",
        description: "User management operations including CRUD operations for user accounts"
      },
      {
        name: "Posts",
        description: "Blog post management operations for creating and managing content"
      },
      {
        name: "Admin",
        description: "Administrative operations requiring special permissions"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <AllInOneLayout spec={mockOpenApiSpec} />
    </div>
  );
}
