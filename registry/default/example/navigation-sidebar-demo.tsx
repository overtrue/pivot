"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/registry/default/ui/navigation-sidebar";
import type { OpenAPIV3 } from "openapi-types";

// Mock OpenAPI specification for demo
const mockSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "E-commerce API",
    version: "1.0.0",
    description: "Comprehensive e-commerce platform API"
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
        description: "Retrieve a list of all users in the system",
        responses: {
          "200": {
            description: "Successfully retrieved users list",
          },
        },
      },
      post: {
        tags: ["User Management"],
        operationId: "createUser",
        summary: "Create user",
        description: "Create a new user account",
        responses: {
          "201": {
            description: "User created successfully",
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["User Management"],
        operationId: "getUserById",
        summary: "Get user details",
        description: "Get detailed information about a specific user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Successfully retrieved user details",
          },
        },
      },
      put: {
        tags: ["User Management"],
        operationId: "updateUser",
        summary: "Update user",
        description: "Update user information",
        responses: {
          "200": {
            description: "User updated successfully",
          },
        },
      },
      delete: {
        tags: ["User Management"],
        operationId: "deleteUser",
        summary: "Delete user",
        description: "Delete a user account",
        responses: {
          "204": {
            description: "User deleted successfully",
          },
        },
      },
    },
    "/orders": {
      get: {
        tags: ["Order Management"],
        operationId: "getOrders",
        summary: "Get all orders",
        description: "Retrieve all orders information",
        responses: {
          "200": {
            description: "Successfully retrieved orders list",
          },
        },
      },
      post: {
        tags: ["Order Management"],
        operationId: "createOrder",
        summary: "Create order",
        description: "Create a new order",
        responses: {
          "201": {
            description: "Order created successfully",
          },
        },
      },
    },
    "/orders/{id}": {
      get: {
        tags: ["Order Management"],
        operationId: "getOrderById",
        summary: "Get order details",
        description: "Get detailed information about a specific order",
        responses: {
          "200": {
            description: "Successfully retrieved order details",
          },
        },
      },
    },
    "/products": {
      get: {
        tags: ["Product Management"],
        operationId: "getProducts",
        summary: "Get all products",
        description: "Retrieve product catalog",
        responses: {
          "200": {
            description: "Successfully retrieved products list",
          },
        },
      },
      post: {
        tags: ["Product Management"],
        operationId: "createProduct",
        summary: "Create product",
        description: "Add a new product to catalog",
        responses: {
          "201": {
            description: "Product created successfully",
          },
        },
      },
    },
  },
  tags: [
    {
      name: "User Management",
      description: "User-related API operations including registration, login, and profile management",
    },
    {
      name: "Order Management",
      description: "Order-related API operations including creation, querying, and updating orders",
    },
    {
      name: "Product Management",
      description: "Product-related API operations including adding, querying, and inventory management",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
        },
      },
      Order: {
        type: "object",
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          amount: { type: "number" },
        },
      },
    },
  },
};

export default function NavigationSidebarDemo() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="w-full h-full flex">
        <NavigationSidebar
          spec={mockSpec}
          activePath="/users"
          activeMethod="get"
          collapsible="none"
          onSelectOperation={(path, method, operation) => {
            console.log("Selected operation:", path, method, operation);
          }}
        />
      </div>
    </SidebarProvider>
  );
}
