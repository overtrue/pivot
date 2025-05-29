import { TypeScriptGenerator } from "@/registry/pivot/typescript-generator";

export default function TypescriptGeneratorDemo() {
  // 用户创建 API 示例
  const createUserParams = {
    endpoint: "https://api.example.com/v1/users",
    method: "POST" as const,
    parameters: [
      {
        name: "X-API-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      email: "john.doe@example.com",
      name: "John Doe",
      age: 28,
      preferences: {
        theme: "dark",
        notifications: true
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["email", "name"],
            properties: {
              email: { type: "string" as const, format: "email" as const },
              name: { type: "string" as const },
              age: { type: "integer" as const, minimum: 0 },
              preferences: {
                type: "object" as const,
                properties: {
                  theme: { type: "string" as const, enum: ["light", "dark"] },
                  notifications: { type: "boolean" as const }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 用户列表查询 API 示例
  const getUsersParams = {
    endpoint: "https://api.example.com/v1/users",
    method: "GET" as const,
    parameters: [
      {
        name: "page",
        in: "query" as const,
        required: false,
        schema: { type: "integer" as const, minimum: 1, default: 1 }
      },
      {
        name: "limit",
        in: "query" as const,
        required: false,
        schema: { type: "integer" as const, minimum: 1, maximum: 100, default: 20 }
      },
      {
        name: "search",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const }
      },
      {
        name: "status",
        in: "query" as const,
        required: false,
        schema: {
          type: "array" as const,
          items: { type: "string" as const, enum: ["active", "inactive", "pending"] }
        }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: null,
    requestBody: undefined
  };

  // 文件上传 API 示例
  const uploadFileParams = {
    endpoint: "https://api.example.com/v1/files",
    method: "POST" as const,
    parameters: [
      {
        name: "folderId",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const }
      },
      {
        name: "X-Upload-Token",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      file: "binary_data_here",
      title: "Important Document",
      description: "This is an important business document",
      tags: ["business", "important"],
      isPublic: false
    },
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object" as const,
            required: ["file"],
            properties: {
              file: { type: "string" as const, format: "binary" },
              title: { type: "string" as const },
              description: { type: "string" as const },
              tags: { type: "array" as const, items: { type: "string" as const } },
              isPublic: { type: "boolean" as const, default: false }
            }
          }
        }
      },
      required: true
    }
  };

  // 用户更新 API 示例
  const updateUserParams = {
    endpoint: "https://api.example.com/v1/users/{userId}",
    method: "PATCH" as const,
    parameters: [
      {
        name: "userId",
        in: "path" as const,
        required: true,
        schema: { type: "string" as const, format: "uuid" as const }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      name: "John Smith",
      age: 29,
      status: "active"
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              name: { type: "string" as const },
              age: { type: "integer" as const, minimum: 0 },
              status: { type: "string" as const, enum: ["active", "inactive", "pending"] }
            }
          }
        }
      },
      required: true
    }
  };

  // 批量删除 API 示例
  const batchDeleteParams = {
    endpoint: "https://api.example.com/v1/users/batch",
    method: "DELETE" as const,
    parameters: [
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      userIds: [
        "123e4567-e89b-12d3-a456-426614174000",
        "987fcdeb-51d2-43a8-b456-426614174001"
      ],
      reason: "Account cleanup"
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["userIds"],
            properties: {
              userIds: {
                type: "array" as const,
                items: { type: "string" as const, format: "uuid" as const },
                minItems: 1,
                maxItems: 100
              },
              reason: { type: "string" as const }
            }
          }
        }
      },
      required: true
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">POST 请求 - 创建用户</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含请求头、复杂请求体和嵌套对象的 TypeScript 代码生成
        </p>
        <TypeScriptGenerator params={createUserParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">GET 请求 - 查询用户列表</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含多个查询参数和认证头的 TypeScript 代码生成
        </p>
        <TypeScriptGenerator params={getUsersParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">POST 请求 - 文件上传</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          multipart/form-data 格式的文件上传 TypeScript 代码
        </p>
        <TypeScriptGenerator params={uploadFileParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">PATCH 请求 - 更新用户</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含路径参数的部分更新 TypeScript 代码生成
        </p>
        <TypeScriptGenerator params={updateUserParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">DELETE 请求 - 批量删除</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          批量操作的 TypeScript 代码生成示例
        </p>
        <TypeScriptGenerator params={batchDeleteParams} />
      </div>
    </div>
  );
}
