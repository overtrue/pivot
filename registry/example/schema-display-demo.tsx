import { SchemaDisplay } from "@/registry/pivot/schema-display";

export default function SchemaDisplayDemo() {
  // 用户信息模型
  const userSchema = {
    type: "object",
    title: "User",
    description: "用户信息对象，包含用户的基本信息和偏好设置",
    required: ["id", "email", "name", "createdAt"],
    properties: {
      id: {
        type: "string",
        format: "uuid",
        description: "用户唯一标识符",
        example: "123e4567-e89b-12d3-a456-426614174000"
      },
      email: {
        type: "string",
        format: "email",
        description: "用户邮箱地址",
        example: "john.doe@example.com"
      },
      name: {
        type: "string",
        description: "用户姓名",
        minLength: 1,
        maxLength: 100,
        example: "John Doe"
      },
      avatar: {
        type: "string",
        format: "uri",
        description: "用户头像 URL",
        example: "https://example.com/avatars/john.jpg"
      },
      age: {
        type: "integer",
        description: "用户年龄",
        minimum: 0,
        maximum: 150,
        example: 28
      },
      status: {
        type: "string",
        enum: ["active", "inactive", "pending", "suspended"],
        description: "用户账户状态",
        default: "pending"
      },
      roles: {
        type: "array",
        description: "用户角色列表",
        items: {
          type: "string",
          enum: ["admin", "user", "moderator", "guest"]
        },
        example: ["user"]
      },
      profile: {
        type: "object",
        description: "用户详细资料",
        properties: {
          firstName: {
            type: "string",
            description: "名",
            example: "John"
          },
          lastName: {
            type: "string",
            description: "姓",
            example: "Doe"
          },
          phone: {
            type: "string",
            pattern: "^\\+?[1-9]\\d{1,14}$",
            description: "手机号码",
            example: "+1-555-123-4567"
          },
          address: {
            type: "object",
            description: "地址信息",
            properties: {
              street: { type: "string", example: "123 Main St" },
              city: { type: "string", example: "Anytown" },
              state: { type: "string", example: "CA" },
              zipCode: { type: "string", example: "12345" },
              country: { type: "string", example: "US" }
            }
          }
        }
      },
      preferences: {
        type: "object",
        description: "用户偏好设置",
        properties: {
          theme: {
            type: "string",
            enum: ["light", "dark", "auto"],
            default: "auto",
            description: "界面主题"
          },
          language: {
            type: "string",
            enum: ["zh-CN", "en-US", "ja-JP", "fr-FR"],
            default: "en-US",
            description: "界面语言"
          },
          notifications: {
            type: "object",
            description: "通知设置",
            properties: {
              email: { type: "boolean", default: true },
              push: { type: "boolean", default: false },
              sms: { type: "boolean", default: false }
            }
          },
          timezone: {
            type: "string",
            description: "用户时区",
            example: "America/New_York"
          }
        }
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "账户创建时间",
        example: "2024-01-15T10:30:00Z"
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "最后更新时间",
        example: "2024-01-20T14:45:00Z"
      },
      lastLoginAt: {
        type: "string",
        format: "date-time",
        description: "最后登录时间",
        example: "2024-01-22T09:15:00Z"
      }
    }
  };

  // API 响应模型
  const apiResponseSchema = {
    type: "object",
    title: "ApiResponse",
    description: "标准 API 响应格式",
    required: ["success", "data"],
    properties: {
      success: {
        type: "boolean",
        description: "请求是否成功",
        example: true
      },
      data: {
        type: "object",
        description: "响应数据",
        additionalProperties: true
      },
      message: {
        type: "string",
        description: "响应消息",
        example: "操作成功"
      },
      errors: {
        type: "array",
        description: "错误信息列表",
        items: {
          type: "object",
          properties: {
            field: { type: "string", description: "错误字段" },
            code: { type: "string", description: "错误代码" },
            message: { type: "string", description: "错误描述" }
          }
        }
      },
      pagination: {
        type: "object",
        description: "分页信息",
        properties: {
          page: { type: "integer", minimum: 1, example: 1 },
          limit: { type: "integer", minimum: 1, maximum: 100, example: 20 },
          total: { type: "integer", minimum: 0, example: 150 },
          totalPages: { type: "integer", minimum: 0, example: 8 }
        }
      }
    }
  };

  // 产品模型
  const productSchema = {
    type: "object",
    title: "Product",
    description: "电商产品信息模型",
    required: ["id", "name", "price", "category"],
    properties: {
      id: {
        type: "string",
        description: "产品 ID",
        example: "prod_abc123"
      },
      name: {
        type: "string",
        description: "产品名称",
        minLength: 1,
        maxLength: 200,
        example: "iPhone 15 Pro"
      },
      description: {
        type: "string",
        description: "产品描述",
        example: "最新款 iPhone，配备 A17 Pro 芯片"
      },
      price: {
        type: "number",
        multipleOf: 0.01,
        minimum: 0,
        description: "产品价格（美元）",
        example: 999.99
      },
      currency: {
        type: "string",
        enum: ["USD", "EUR", "CNY", "JPY"],
        default: "USD",
        description: "价格货币"
      },
      category: {
        type: "string",
        description: "产品分类",
        example: "Electronics"
      },
      tags: {
        type: "array",
        description: "产品标签",
        items: { type: "string" },
        example: ["smartphone", "apple", "5g"]
      },
      inStock: {
        type: "boolean",
        description: "是否有库存",
        example: true
      },
      stockQuantity: {
        type: "integer",
        minimum: 0,
        description: "库存数量",
        example: 50
      },
      images: {
        type: "array",
        description: "产品图片 URL 列表",
        items: {
          type: "string",
          format: "uri"
        },
        example: ["https://example.com/images/iphone1.jpg"]
      },
      specifications: {
        type: "object",
        description: "产品规格",
        additionalProperties: { type: "string" },
        example: {
          "screen_size": "6.1 inches",
          "storage": "128GB",
          "color": "Natural Titanium"
        }
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户信息模型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          完整的用户数据结构，包含个人信息、偏好设置等
        </p>
        <SchemaDisplay schema={userSchema} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 响应模型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准化的 API 响应格式，包含数据、错误信息和分页
        </p>
        <SchemaDisplay schema={apiResponseSchema} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品信息模型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商产品数据结构，包含价格、库存、规格等信息
        </p>
        <SchemaDisplay schema={productSchema} />
      </div>
    </div>
  );
}
