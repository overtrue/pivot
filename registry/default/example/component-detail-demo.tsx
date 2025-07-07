import { ComponentDetail } from "@/registry/default/ui/component-detail";

export default function ComponentDetailDemo() {
  // 用户 Schema 组件详情
  const userSchemaDetail = {
    name: "User",
    type: "schema",
    component: {
      type: "object" as const,
      required: ["id", "email", "name"],
      properties: {
        id: {
          type: "string" as const,
          description: "用户唯一标识符",
          format: "uuid" as const,
          example: "user_123e4567-e89b-12d3-a456-426614174000",
        },
        email: {
          type: "string" as const,
          description: "用户邮箱地址",
          format: "email" as const,
          example: "john.doe@example.com",
        },
        name: {
          type: "string" as const,
          description: "用户姓名",
          minLength: 1,
          maxLength: 100,
          example: "John Doe",
        },
        avatar: {
          type: "string" as const,
          description: "用户头像 URL",
          format: "uri" as const,
          example: "https://cdn.example.com/avatars/john-doe.jpg",
        },
        role: {
          type: "string" as const,
          description: "用户角色",
          enum: ["admin", "user", "moderator"],
          default: "user",
          example: "admin",
        },
        profile: {
          type: "object" as const,
          description: "用户详细资料",
          properties: {
            bio: {
              type: "string" as const,
              description: "个人简介",
              example: "资深软件工程师，专注于 API 设计",
            },
            phone: {
              type: "string" as const,
              description: "电话号码",
              example: "+86 138-0013-8000",
            },
          },
        },
        createdAt: {
          type: "string" as const,
          description: "注册时间",
          format: "date-time" as const,
          example: "2024-01-15T10:30:00Z",
        },
      },
    },
  };

  // 产品响应组件详情
  const productResponseDetail = {
    name: "ProductResponse",
    type: "response",
    component: {
      description: "产品详情响应",
      headers: {
        "X-RateLimit-Remaining": {
          description: "剩余请求次数",
          schema: {
            type: "integer" as const,
            example: 99,
          },
        },
        "X-Request-ID": {
          description: "请求追踪 ID",
          schema: {
            type: "string" as const,
            example: "req_123abc456def",
          },
        },
      },
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              success: {
                type: "boolean" as const,
                description: "请求是否成功",
                example: true,
              },
              data: {
                type: "object" as const,
                description: "产品信息",
                properties: {
                  id: {
                    type: "string" as const,
                    description: "产品 ID",
                    example: "prod_987fcdeb-51a2-4567",
                  },
                  name: {
                    type: "string" as const,
                    description: "产品名称",
                    example: "iPhone 15 Pro",
                  },
                  price: {
                    type: "number" as const,
                    description: "产品价格",
                    example: 7999.0,
                  },
                  currency: {
                    type: "string" as const,
                    description: "货币代码",
                    example: "CNY",
                  },
                },
              },
              message: {
                type: "string" as const,
                description: "响应消息",
                example: "产品信息获取成功",
              },
            },
          },
          example: {
            success: true,
            data: {
              id: "prod_987fcdeb-51a2-4567",
              name: "iPhone 15 Pro",
              price: 7999.0,
              currency: "CNY",
            },
            message: "产品信息获取成功",
          },
        },
      },
    },
  };

  // 用户 ID 参数组件详情
  const userIdParameterDetail = {
    name: "UserId",
    type: "parameter",
    component: {
      name: "userId",
      in: "path" as const,
      required: true,
      description: "用户唯一标识符，用于指定要操作的用户",
      schema: {
        type: "string" as const,
        format: "uuid" as const,
        pattern: "^user_[a-f0-9-]+$",
        example: "user_123e4567-e89b-12d3-a456-426614174000",
      },
      examples: {
        admin_user: {
          summary: "管理员用户",
          description: "系统管理员用户的 ID 示例",
          value: "user_admin_123456789",
        },
        regular_user: {
          summary: "普通用户",
          description: "普通用户的 ID 示例",
          value: "user_regular_987654321",
        },
      },
    },
  };

  // OAuth 2.0 安全方案组件详情
  const oauthSecurityDetail = {
    name: "OAuth2",
    type: "securityScheme",
    component: {
      type: "oauth2" as const,
      description:
        "OAuth 2.0 授权框架，支持多种授权流程。适用于第三方应用集成和用户授权。",
      flows: {
        authorizationCode: {
          authorizationUrl: "https://auth.example.com/oauth/authorize",
          tokenUrl: "https://auth.example.com/oauth/token",
          refreshUrl: "https://auth.example.com/oauth/refresh",
          scopes: {
            read: "读取用户基本信息和公开数据",
            write: "修改用户信息和创建内容",
            admin: "管理员权限，可访问所有功能",
            "user:profile": "访问用户详细资料",
            "user:email": "访问用户邮箱地址",
          },
        },
        clientCredentials: {
          tokenUrl: "https://auth.example.com/oauth/token",
          scopes: {
            "api:read": "读取 API 数据",
            "api:write": "写入 API 数据",
            "system:monitor": "系统监控权限",
          },
        },
      },
    },
  };

  // 文件上传请求体组件详情
  const fileUploadRequestDetail = {
    name: "FileUpload",
    type: "requestBody",
    component: {
      description: "文件上传请求，支持多种文件格式和元数据",
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object" as const,
            required: ["file"],
            properties: {
              file: {
                type: "string" as const,
                format: "binary" as const,
                description: "要上传的文件，支持图片、文档等格式",
              },
              description: {
                type: "string" as const,
                description: "文件描述信息",
                maxLength: 500,
                example: "产品说明书 PDF 文档",
              },
              category: {
                type: "string" as const,
                description: "文件分类",
                enum: ["document", "image", "video", "audio", "other"],
                example: "document",
              },
              tags: {
                type: "array" as const,
                description: "文件标签",
                items: {
                  type: "string" as const,
                },
                example: ["manual", "product", "pdf"],
              },
            },
          },
          encoding: {
            file: {
              contentType: "application/pdf, image/*, video/*",
            },
          },
        },
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              url: {
                type: "string" as const,
                format: "uri" as const,
                description: "文件 URL，用于从外部链接导入文件",
                example: "https://example.com/files/document.pdf",
              },
              description: {
                type: "string" as const,
                description: "文件描述",
                example: "从外部链接导入的文档",
              },
            },
          },
        },
      },
    },
  };

  // 支付回调组件详情
  const paymentCallbackDetail = {
    name: "PaymentCallback",
    type: "callback",
    component: {
      "{$request.body#/callbackUrl}": {
        post: {
          summary: "支付状态变更回调",
          description: "当支付状态发生变更时，系统会向指定的回调 URL 发送通知",
          requestBody: {
            description: "支付状态变更通知",
            content: {
              "application/json": {
                schema: {
                  type: "object" as const,
                  required: ["paymentId", "status", "timestamp"],
                  properties: {
                    paymentId: {
                      type: "string" as const,
                      description: "支付 ID",
                      example: "pay_abc123def456",
                    },
                    orderId: {
                      type: "string" as const,
                      description: "订单 ID",
                      example: "order_456e7890",
                    },
                    status: {
                      type: "string" as const,
                      description: "支付状态",
                      enum: ["completed", "failed", "refunded"],
                      example: "completed",
                    },
                    amount: {
                      type: "number" as const,
                      description: "支付金额",
                      example: 99.99,
                    },
                    timestamp: {
                      type: "string" as const,
                      format: "date-time" as const,
                      description: "状态变更时间",
                      example: "2024-03-15T14:30:00Z",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "回调处理成功",
              content: {
                "application/json": {
                  schema: {
                    type: "object" as const,
                    properties: {
                      received: {
                        type: "boolean" as const,
                        example: true,
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "回调数据格式错误",
            },
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户 Schema 组件详情</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          完整的用户数据模型定义，包含所有字段的类型、约束和示例
        </p>
        <ComponentDetail
          activeType="schemas"
          selectedItemName="User"
          components={{
            schemas: {
              User: userSchemaDetail.component,
            },
          }}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品响应组件详情</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          产品 API 的响应定义，包含响应头、内容格式和示例数据
        </p>
        <ComponentDetail
          activeType="responses"
          selectedItemName="ProductResponse"
          components={{
            responses: {
              ProductResponse: productResponseDetail.component,
            },
          }}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户 ID 参数组件详情</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          路径参数的详细定义，包含验证规则和多个使用示例
        </p>
        <ComponentDetail
          activeType="parameters"
          selectedItemName="userId"
          components={{
            parameters: {
              userId: userIdParameterDetail.component,
            },
          }}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 安全方案详情</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          OAuth 2.0 认证方案的完整配置，包含多种授权流程和权限范围
        </p>
        <ComponentDetail
          activeType="securitySchemes"
          selectedItemName="OAuth2"
          components={{
            securitySchemes: {
              OAuth2: oauthSecurityDetail.component,
            },
          }}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传请求体详情</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传的请求体定义，支持多种内容类型和编码方式
        </p>
        <ComponentDetail
          activeType="requestBodies"
          selectedItemName="FileUpload"
          components={{
            requestBodies: {
              FileUpload: fileUploadRequestDetail.component,
            },
          }}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付回调组件详情</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付状态变更的回调定义，包含请求格式和响应处理
        </p>
        <ComponentDetail
          activeType="callbacks"
          selectedItemName="PaymentCallback"
          components={{
            callbacks: {
              PaymentCallback: paymentCallbackDetail.component,
            },
          }}
        />
      </div>
    </div>
  );
}
