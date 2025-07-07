import { Codegen } from "@/registry/default/ui/codegen";
import type { OpenAPIV3 } from "openapi-types";

export default function CodegenDemo() {
  // 真实的 API 示例数据
  const getUserEndpoint = {
    endpoint: "https://api.example.com/v1/users/{userId}",
    method: "get" as const,
    parameters: [
      {
        name: "userId",
        in: "path" as const,
        required: true,
        schema: { type: "string", format: "uuid" } as OpenAPIV3.SchemaObject,
      },
      {
        name: "include",
        in: "query" as const,
        required: false,
        schema: {
          type: "array",
          items: {
            type: "string",
            enum: ["profile", "permissions", "preferences"],
          },
        } as OpenAPIV3.SchemaObject,
      },
      {
        name: "X-API-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" } as OpenAPIV3.SchemaObject,
      },
    ],
  };

  const createUserEndpoint = {
    endpoint: "https://api.example.com/v1/users",
    method: "post" as const,
    parameters: [
      {
        name: "X-API-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" } as OpenAPIV3.SchemaObject,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "name"],
            properties: {
              email: {
                type: "string",
                format: "email",
              },
              name: {
                type: "string",
                minLength: 1,
                maxLength: 100,
              },
              age: {
                type: "integer",
                minimum: 0,
                maximum: 150,
              },
              preferences: {
                type: "object",
                properties: {
                  theme: {
                    type: "string",
                    enum: ["light", "dark"],
                    default: "light",
                  },
                  notifications: {
                    type: "boolean",
                    default: true,
                  },
                },
              },
            },
          } as OpenAPIV3.SchemaObject,
        },
      },
    },
  };

  const updateUserEndpoint = {
    endpoint: "https://api.example.com/v1/users/{userId}",
    method: "patch" as const,
    parameters: [
      {
        name: "userId",
        in: "path" as const,
        required: true,
        schema: { type: "string", format: "uuid" } as OpenAPIV3.SchemaObject,
      },
      {
        name: "X-API-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" } as OpenAPIV3.SchemaObject,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              age: { type: "integer", minimum: 0 },
              status: {
                type: "string",
                enum: ["active", "inactive", "pending"],
              },
            },
          } as OpenAPIV3.SchemaObject,
        },
      },
    },
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">GET 请求示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          获取用户信息的 API 调用代码生成
        </p>
        <Codegen {...getUserEndpoint} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">POST 请求示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          创建新用户的 API 调用代码生成
        </p>
        <Codegen {...createUserEndpoint} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">PATCH 请求示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          更新用户信息的 API 调用代码生成
        </p>
        <Codegen {...updateUserEndpoint} />
      </div>
    </div>
  );
}
