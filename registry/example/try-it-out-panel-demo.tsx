import { TryItOutPanel } from "@/registry/pivot/try-it-out-panel";
import type { ParameterLocation } from "@/types/project";
import type { OpenAPIV3 } from 'openapi-types';

export default function TryItOutPanelDemo() {
  // 真实的 API 操作示例
  const createUserOperation: OpenAPIV3.OperationObject = {
    operationId: "createUser",
    summary: "创建新用户",
    description: "在系统中创建一个新的用户账户。需要提供用户的基本信息。",
    parameters: [
      {
        name: "X-API-Key",
        in: "header" as ParameterLocation,
        required: true,
        description: "API 访问密钥",
        schema: {
          type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
          pattern: "^[a-zA-Z0-9]{32}$"
        }
      },
      {
        name: "X-Request-ID",
        in: "header" as ParameterLocation,
        required: false,
        description: "请求追踪 ID",
        schema: {
          type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
          format: "uuid" as const
        }
      }
    ],
    requestBody: {
      required: true,
      description: "用户创建信息",
      content: {
        "application/json": {
          schema: {
            type: "object" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
            required: ["email", "name"],
            properties: {
              email: {
                type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                format: "email" as const,
                description: "用户邮箱地址"
              },
              name: {
                type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                minLength: 1,
                maxLength: 100,
                description: "用户姓名"
              },
              age: {
                type: "integer" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                minimum: 0,
                maximum: 150,
                description: "用户年龄"
              },
              phone: {
                type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                pattern: "^\\+?[1-9]\\d{1,14}$",
                description: "手机号码"
              },
              preferences: {
                type: "object" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                description: "用户偏好设置",
                properties: {
                  theme: {
                    type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                    enum: ["light", "dark", "auto"],
                    default: "auto",
                    description: "界面主题"
                  },
                  language: {
                    type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                    enum: ["zh-CN", "en-US", "ja-JP"],
                    default: "zh-CN",
                    description: "界面语言"
                  },
                  notifications: {
                    type: "boolean" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                    default: true,
                    description: "是否接收通知"
                  }
                }
              }
            }
          },
          example: {
            email: "john.doe@example.com",
            name: "John Doe",
            age: 28,
            phone: "+1-555-123-4567",
            preferences: {
              theme: "dark",
              language: "en-US",
              notifications: true
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
              type: "object" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
              properties: {
                id: {
                  type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                  format: "uuid" as const
                },
                email: {
                  type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                  format: "email" as const
                },
                name: {
                  type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType
                },
                createdAt: {
                  type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                  format: "date-time" as const
                },
                status: {
                  type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
                  enum: ["active", "pending"]
                }
              }
            }
          }
        }
      },
      "400": {
        description: "请求参数错误"
      },
      "409": {
        description: "邮箱已存在"
      }
    },
    security: [
      {
        apiKey: []
      }
    ]
  };

  const getUserOperation: OpenAPIV3.OperationObject = {
    operationId: "getUser",
    summary: "获取用户信息",
    description: "根据用户 ID 获取用户的详细信息",
    parameters: [
      {
        name: "userId",
        in: "path" as ParameterLocation,
        required: true,
        description: "用户 ID",
        schema: {
          type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
          format: "uuid" as const
        }
      },
      {
        name: "include",
        in: "query" as ParameterLocation,
        required: false,
        description: "包含的额外信息",
        schema: {
          type: "array" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
          items: {
            type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
            enum: ["profile", "preferences", "permissions"]
          }
        }
      },
      {
        name: "X-API-Key",
        in: "header" as ParameterLocation,
        required: true,
        description: "API 访问密钥",
        schema: {
          type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType
        }
      }
    ],
    responses: {
      "200": {
        description: "成功获取用户信息"
      },
      "404": {
        description: "用户不存在"
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">POST 请求测试</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          测试创建用户的 API 接口
        </p>
        <TryItOutPanel
          operation={createUserOperation}
          method="POST"
          path="/api/v1/users"
          baseUrl="https://api.example.com"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">GET 请求测试</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          测试获取用户信息的 API 接口
        </p>
        <TryItOutPanel
          operation={getUserOperation}
          method="GET"
          path="/api/v1/users/{userId}"
          baseUrl="https://api.example.com"
        />
      </div>
    </div>
  );
}
