import { OperationBox } from "@/registry/pivot/operation-box";
import type { DataType, OperationObject, ParameterLocation } from "@/types/openapi";

export default function OperationBoxDemo() {
  // 示例 OpenAPI 操作数据
  const getUserOperation: OperationObject = {
    summary: "获取用户信息",
    description: "根据用户 ID 获取用户的详细信息，包括基本资料、权限等。",
    parameters: [
      {
        name: "userId",
        in: "path" as ParameterLocation,
        required: true,
        description: "用户的唯一标识符",
        schema: {
          type: "string" as const as DataType,
          format: "uuid" as const,
          example: "123e4567-e89b-12d3-a456-426614174000"
        }
      },
      {
        name: "include",
        in: "query" as ParameterLocation,
        required: false,
        description: "指定要包含的额外信息",
        schema: {
          type: "array" as const as DataType,
          items: {
            type: "string" as const as DataType,
            enum: ["profile", "permissions", "preferences"]
          },
          example: ["profile", "permissions"]
        }
      }
    ],
    responses: {
      "200": {
        description: "成功获取用户信息",
        content: {
          "application/json": {
            schema: {
              type: "object" as const as DataType,
              properties: {
                id: { type: "string" as const as DataType, format: "uuid" as const },
                username: { type: "string" as const as DataType },
                email: { type: "string" as const as DataType, format: "email" as const },
                profile: {
                  type: "object" as const as DataType,
                  properties: {
                    firstName: { type: "string" as const as DataType },
                    lastName: { type: "string" as const as DataType },
                    avatar: { type: "string" as const as DataType, format: "uri" as const }
                  }
                }
              }
            },
            example: {
              id: "123e4567-e89b-12d3-a456-426614174000",
              username: "john_doe",
              email: "john@example.com",
              profile: {
                firstName: "John",
                lastName: "Doe",
                avatar: "https://example.com/avatar.jpg"
              }
            }
          }
        }
      },
      "404": {
        description: "用户不存在",
        content: {
          "application/json": {
            schema: {
              type: "object" as const as DataType,
              properties: {
                error: { type: "string" as const as DataType },
                message: { type: "string" as const as DataType }
              }
            },
            example: {
              error: "USER_NOT_FOUND",
              message: "指定的用户不存在"
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    externalDocs: {
      description: "用户管理 API 文档",
      url: "https://docs.example.com/users"
    }
  };

  const createUserOperation: OperationObject = {
    summary: "创建新用户",
    description: "创建一个新的用户账户。需要管理员权限。",
    requestBody: {
      required: true,
      description: "用户创建信息",
      content: {
        "application/json": {
          schema: {
            type: "object" as const as DataType,
            required: ["username", "email", "password"],
            properties: {
              username: {
                type: "string" as const as DataType,
                minLength: 3,
                maxLength: 50,
                pattern: "^[a-zA-Z0-9_]+$"
              },
              email: {
                type: "string" as const as DataType,
                format: "email" as const
              },
              password: {
                type: "string" as const as DataType,
                minLength: 8,
                description: "密码必须至少包含 8 个字符"
              },
              profile: {
                type: "object" as const as DataType,
                properties: {
                  firstName: { type: "string" as const as DataType },
                  lastName: { type: "string" as const as DataType }
                }
              }
            }
          },
          example: {
            username: "new_user",
            email: "newuser@example.com",
            password: "securePassword123",
            profile: {
              firstName: "New",
              lastName: "User"
            }
          }
        }
      }
    },
    responses: {
      "201": {
        description: "用户创建成功",
        content: {
          "application/json": {
            schema: {
              type: "object" as const as DataType,
              properties: {
                id: { type: "string" as const as DataType, format: "uuid" as const },
                username: { type: "string" as const as DataType },
                email: { type: "string" as const as DataType },
                createdAt: { type: "string" as const as DataType, format: "date-time" as const }
              }
            }
          }
        }
      },
      "400": {
        description: "请求参数错误",
        content: {
          "application/json": {
            schema: {
              type: "object" as const as DataType,
              properties: {
                error: { type: "string" as const as DataType },
                details: {
                  type: "array" as const as DataType,
                  items: { type: "string" as const as DataType }
                }
              }
            }
          }
        }
      },
      "409": {
        description: "用户名或邮箱已存在"
      }
    },
    security: [
      {
        bearerAuth: ["admin"]
      }
    ]
  };

  const deprecatedOperation: OperationObject = {
    summary: "获取用户列表（已弃用）",
    description: "此接口已弃用，请使用新的分页接口 `/api/v2/users`。",
    deprecated: true,
    parameters: [
      {
        name: "limit",
        in: "query" as ParameterLocation,
        schema: { type: "integer" as const as DataType, maximum: 100 }
      }
    ],
    responses: {
      "200": {
        description: "用户列表",
        content: {
          "application/json": {
            schema: {
              type: "array" as const as DataType,
              items: {
                type: "object" as const as DataType,
                properties: {
                  id: { type: "string" as const as DataType },
                  username: { type: "string" as const as DataType }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">GET 操作示例</h4>
        <OperationBox
          path="/api/users/{userId}"
          method="GET"
          operation={getUserOperation}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">POST 操作示例</h4>
        <OperationBox
          path="/api/users"
          method="POST"
          operation={createUserOperation}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的操作</h4>
        <OperationBox
          path="/api/v1/users"
          method="GET"
          operation={deprecatedOperation}
        />
      </div>
    </div>
  );
}
