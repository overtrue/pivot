"use client";

import { OperationListLayout } from "@/registry/default/ui/operation-list-layout";
import type { OpenAPIV3 } from "openapi-types";
import { useState } from "react";

// Mock OpenAPI specification for demo
const mockSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "1.0.0",
    description: "Comprehensive e-commerce platform API with user management, product catalog, and order processing"
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
        tags: ["User Management"],
        operationId: "getUsers",
        summary: "Get all users",
        description: "Retrieve a list of all users in the system with pagination support",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
            description: "Page number (default: 1)"
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 10 },
            description: "Items per page (default: 10)"
          }
        ],
        responses: {
          "200": {
            description: "Successfully retrieved users list"
          }
        }
      },
      post: {
        tags: ["User Management"],
        operationId: "createUser",
        summary: "Create new user",
        description: "Create a new user account in the system",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User created successfully"
          }
        }
      }
    },
    "/users/{id}": {
      get: {
        tags: ["User Management"],
        operationId: "getUserById",
        summary: "Get user by ID",
        description: "Retrieve detailed information about a specific user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Successfully retrieved user details"
          },
          "404": {
            description: "User not found"
          }
        }
      },
      put: {
        tags: ["User Management"],
        operationId: "updateUser",
        summary: "Update user",
        description: "Update an existing user's information",
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
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User updated successfully"
          }
        }
      },
      delete: {
        tags: ["User Management"],
        operationId: "deleteUser",
        summary: "Delete user",
        description: "Delete a user account from the system",
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
          }
        }
      }
    },
    "/products": {
      get: {
        tags: ["Product Management"],
        operationId: "getProducts",
        summary: "Get all products",
        description: "Retrieve product catalog with filtering options",
        parameters: [
          {
            name: "category",
            in: "query",
            schema: { type: "string" },
            description: "Filter by product category"
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Search products by name or description"
          }
        ],
        responses: {
          "200": {
            description: "Successfully retrieved products list"
          }
        }
      },
      post: {
        tags: ["Product Management"],
        operationId: "createProduct",
        summary: "Create product",
        description: "Add a new product to the catalog",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "price"],
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  price: { type: "number", minimum: 0 },
                  category: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Product created successfully"
          }
        }
      }
    },
    "/orders": {
      get: {
        tags: ["Order Management"],
        operationId: "getOrders",
        summary: "Get all orders",
        description: "Retrieve order history with status filtering",
        parameters: [
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
            },
            description: "Filter by order status"
          }
        ],
        responses: {
          "200": {
            description: "Successfully retrieved orders list"
          }
        }
      },
      post: {
        tags: ["Order Management"],
        operationId: "createOrder",
        summary: "Create order",
        description: "Place a new order for products",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["items"],
                properties: {
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["productId", "quantity"],
                      properties: {
                        productId: { type: "string" },
                        quantity: { type: "integer", minimum: 1 }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Order created successfully"
          }
        }
      }
    }
  },
  tags: [
    {
      name: "User Management",
      description: "User-related operations including registration, authentication, and profile management"
    },
    {
      name: "Product Management",
      description: "Product catalog operations including listing, searching, and inventory management"
    },
    {
      name: "Order Management",
      description: "Order processing operations including creation, tracking, and status updates"
    }
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" }
        }
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          category: { type: "string" }
        }
      },
      Order: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          status: {
            type: "string",
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
          },
          total: { type: "number" }
        }
      }
    }
  }
};

export default function OperationListLayoutDemo() {
  const [showNavigation, setShowNavigation] = useState(true);
  const [showTryPanel, setShowTryPanel] = useState(true);

  return (
    <div className="w-full h-screen">
      <OperationListLayout
        spec={mockSpec}
        showNavigation={showNavigation}
        onSelectOperation={(path, method, operation) => {
          console.log("Selected operation:", path, method, operation);
        }}
        showTryPanel={false}
      />
    </div>
  );
}

