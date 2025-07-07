import { ComponentsSection } from "@/registry/default/ui/components-section";

export default function ComponentsSectionDemo() {
  // 用户管理系统组件
  const userManagementComponents = {
    schemas: {
      User: {
        type: "object" as const,
        required: ["id", "email", "name"],
        properties: {
          id: { type: "string" as const, description: "用户唯一标识符" },
          email: {
            type: "string" as const,
            format: "email" as const,
            description: "用户邮箱地址",
          },
          name: { type: "string" as const, description: "用户姓名" },
          avatar: {
            type: "string" as const,
            format: "uri" as const,
            description: "用户头像 URL",
          },
          role: {
            type: "string" as const,
            enum: ["admin", "user", "moderator"],
            description: "用户角色",
          },
          createdAt: {
            type: "string" as const,
            format: "date-time" as const,
            description: "注册时间",
          },
        },
      },
      UserProfile: {
        type: "object" as const,
        properties: {
          bio: { type: "string" as const, description: "个人简介" },
          phone: { type: "string" as const, description: "电话号码" },
          address: { $ref: "#/components/schemas/Address" },
        },
      },
      Address: {
        type: "object" as const,
        properties: {
          country: { type: "string" as const, description: "国家" },
          city: { type: "string" as const, description: "城市" },
          street: { type: "string" as const, description: "街道地址" },
        },
      },
    },
    responses: {
      UserResponse: {
        description: "用户信息响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/User" },
          },
        },
      },
      UserListResponse: {
        description: "用户列表响应",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                data: {
                  type: "array" as const,
                  items: { $ref: "#/components/schemas/User" },
                },
                pagination: { $ref: "#/components/schemas/Pagination" },
              },
            },
          },
        },
      },
    },
    parameters: {
      UserId: {
        name: "userId",
        in: "path",
        required: true,
        schema: { type: "string" as const },
        description: "用户唯一标识符",
      },
      UserFilter: {
        name: "role",
        in: "query",
        schema: {
          type: "string" as const,
          enum: ["admin", "user", "moderator"],
        },
        description: "按角色筛选用户",
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: "http" as const,
        scheme: "bearer" as const,
        bearerFormat: "JWT" as const,
      },
    },
  };

  // 电商产品系统组件
  const ecommerceComponents = {
    schemas: {
      Product: {
        type: "object" as const,
        required: ["id", "name", "price"],
        properties: {
          id: { type: "string" as const, description: "产品 ID" },
          name: { type: "string" as const, description: "产品名称" },
          description: { type: "string" as const, description: "产品描述" },
          price: { type: "number" as const, description: "产品价格" },
          currency: { type: "string" as const, description: "货币代码" },
          category: { $ref: "#/components/schemas/Category" },
          images: {
            type: "array" as const,
            items: { type: "string" as const, format: "uri" as const },
            description: "产品图片列表",
          },
          inStock: { type: "boolean" as const, description: "是否有库存" },
        },
      },
      Category: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "分类 ID" },
          name: { type: "string" as const, description: "分类名称" },
          parentId: { type: "string" as const, description: "父分类 ID" },
        },
      },
      Order: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "订单 ID" },
          customerId: { type: "string" as const, description: "客户 ID" },
          items: {
            type: "array" as const,
            items: { $ref: "#/components/schemas/OrderItem" },
          },
          totalAmount: { type: "number" as const, description: "订单总金额" },
          status: {
            type: "string" as const,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
          },
        },
      },
      OrderItem: {
        type: "object" as const,
        properties: {
          productId: { type: "string" as const, description: "产品 ID" },
          quantity: { type: "integer" as const, description: "购买数量" },
          unitPrice: { type: "number" as const, description: "单价" },
        },
      },
    },
    responses: {
      ProductResponse: {
        description: "产品详情响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Product" },
          },
        },
      },
      OrderResponse: {
        description: "订单详情响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Order" },
          },
        },
      },
    },
    parameters: {
      ProductId: {
        name: "productId",
        in: "path",
        required: true,
        schema: { type: "string" as const },
        description: "产品唯一标识符",
      },
      CategoryFilter: {
        name: "category",
        in: "query",
        schema: { type: "string" as const },
        description: "按分类筛选产品",
      },
    },
  };

  // 支付系统组件
  const paymentComponents = {
    schemas: {
      Payment: {
        type: "object" as const,
        required: ["id", "amount", "currency", "status"],
        properties: {
          id: { type: "string" as const, description: "支付 ID" },
          orderId: { type: "string" as const, description: "订单 ID" },
          amount: { type: "number" as const, description: "支付金额" },
          currency: { type: "string" as const, description: "货币代码" },
          method: {
            type: "string" as const,
            enum: [
              "credit_card",
              "paypal",
              "bank_transfer",
              "alipay",
              "wechat_pay",
            ],
          },
          status: {
            type: "string" as const,
            enum: ["pending", "processing", "completed", "failed", "refunded"],
          },
          gateway: { type: "string" as const, description: "支付网关" },
        },
      },
      PaymentMethod: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "支付方式 ID" },
          type: { type: "string" as const, description: "支付类型" },
          cardLast4: { type: "string" as const, description: "卡号后四位" },
          isDefault: {
            type: "boolean" as const,
            description: "是否为默认支付方式",
          },
        },
      },
    },
    responses: {
      PaymentResponse: {
        description: "支付详情响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Payment" },
          },
        },
      },
    },
    securitySchemes: {
      PaymentAuth: {
        type: "oauth2" as const,
        flows: {
          authorizationCode: {
            authorizationUrl: "https://payment.example.com/oauth/authorize",
            tokenUrl: "https://payment.example.com/oauth/token",
            scopes: {
              "payment:read": "读取支付信息",
              "payment:write": "创建和修改支付",
            },
          },
        },
      },
    },
  };

  // 通知系统组件
  const notificationComponents = {
    schemas: {
      Notification: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "通知 ID" },
          userId: { type: "string" as const, description: "接收用户 ID" },
          title: { type: "string" as const, description: "通知标题" },
          message: { type: "string" as const, description: "通知内容" },
          type: {
            type: "string" as const,
            enum: ["info", "warning", "error", "success"],
          },
          channel: {
            type: "string" as const,
            enum: ["email", "sms", "push", "in_app"],
          },
          isRead: { type: "boolean" as const, description: "是否已读" },
        },
      },
      NotificationTemplate: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "模板 ID" },
          name: { type: "string" as const, description: "模板名称" },
          content: { type: "string" as const, description: "模板内容" },
        },
      },
    },
    callbacks: {
      NotificationCallback: {
        "{$request.body#/callbackUrl}": {
          post: {
            requestBody: {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Notification" },
                },
              },
            },
            responses: {
              "200": {
                description: "回调处理成功",
              },
            },
          },
        },
      },
    },
  };

  // 文件管理系统组件
  const fileManagementComponents = {
    schemas: {
      File: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "文件 ID" },
          originalName: { type: "string" as const, description: "原始文件名" },
          fileName: { type: "string" as const, description: "存储文件名" },
          mimeType: { type: "string" as const, description: "文件 MIME 类型" },
          size: { type: "integer" as const, description: "文件大小（字节）" },
          url: {
            type: "string" as const,
            format: "uri" as const,
            description: "文件访问 URL",
          },
          uploadedBy: { type: "string" as const, description: "上传用户 ID" },
          uploadedAt: {
            type: "string" as const,
            format: "date-time" as const,
            description: "上传时间",
          },
        },
      },
      UploadSession: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const, description: "上传会话 ID" },
          status: {
            type: "string" as const,
            enum: ["pending", "uploading", "completed", "failed"],
          },
          progress: {
            type: "number" as const,
            description: "上传进度（0-100）",
          },
        },
      },
    },
    requestBodies: {
      FileUpload: {
        description: "文件上传请求",
        content: {
          "multipart/form-data": {
            schema: {
              type: "object" as const,
              properties: {
                file: {
                  type: "string" as const,
                  format: "binary",
                  description: "要上传的文件",
                },
                description: {
                  type: "string" as const,
                  description: "文件描述",
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户管理系统组件</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          完整的用户管理系统组件定义，包含用户、资料、地址等数据模型和相关响应
        </p>
        <ComponentsSection components={userManagementComponents} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">电商产品系统组件</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台的产品管理组件，包含产品、分类、订单等完整的业务数据结构
        </p>
        <ComponentsSection components={ecommerceComponents} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付系统组件</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理系统的组件定义，包含支付信息、支付方式和 OAuth 安全认证
        </p>
        <ComponentsSection components={paymentComponents} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知系统组件</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          消息通知系统的组件定义，支持多种通知类型、发送渠道和回调机制
        </p>
        <ComponentsSection components={notificationComponents} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件管理系统组件</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传和管理系统的组件定义，包含文件信息、上传会话和请求体定义
        </p>
        <ComponentsSection components={fileManagementComponents} />
      </div>
    </div>
  );
}
