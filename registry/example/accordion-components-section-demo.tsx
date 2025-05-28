import { AccordionComponentsSection } from "@/registry/pivot/accordion-components-section";

export default function AccordionComponentsSectionDemo() {
  // 电商 API 组件定义
  const ecommerceComponents = {
    schemas: {
      "Product": {
        type: "object",
        required: ["id", "name", "price"],
        properties: {
          id: { type: "string", description: "产品唯一标识符" },
          name: { type: "string", description: "产品名称" },
          price: { type: "number", description: "产品价格" },
          category: { type: "string", description: "产品分类" },
          description: { type: "string", description: "产品描述" },
          images: {
            type: "array",
            items: { type: "string", format: "uri" },
            description: "产品图片列表"
          },
          inStock: { type: "boolean", description: "是否有库存" },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "产品标签"
          }
        }
      },
      "Order": {
        type: "object",
        required: ["id", "customerId", "items", "totalAmount"],
        properties: {
          id: { type: "string", description: "订单 ID" },
          customerId: { type: "string", description: "客户 ID" },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/OrderItem" },
            description: "订单商品列表"
          },
          totalAmount: { type: "number", description: "订单总金额" },
          status: {
            type: "string",
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            description: "订单状态"
          },
          createdAt: { type: "string", format: "date-time", description: "创建时间" },
          shippingAddress: { $ref: "#/components/schemas/Address" }
        }
      },
      "OrderItem": {
        type: "object",
        required: ["productId", "quantity", "price"],
        properties: {
          productId: { type: "string", description: "产品 ID" },
          quantity: { type: "integer", minimum: 1, description: "购买数量" },
          price: { type: "number", description: "单价" },
          discount: { type: "number", description: "折扣金额" }
        }
      }
    },
    responses: {
      "ProductListResponse": {
        description: "产品列表响应",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" }
                },
                pagination: { $ref: "#/components/schemas/Pagination" }
              }
            }
          }
        }
      },
      "OrderResponse": {
        description: "订单详情响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Order" }
          }
        }
      }
    },
    securitySchemes: {
      "BearerAuth": {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT Bearer Token 认证"
      },
      "ApiKeyAuth": {
        type: "apiKey",
        in: "header",
        name: "X-API-Key",
        description: "API 密钥认证"
      }
    }
  };

  // 用户管理 API 组件定义
  const userManagementComponents = {
    schemas: {
      "User": {
        type: "object",
        required: ["id", "email", "name"],
        properties: {
          id: { type: "string", description: "用户 ID" },
          email: { type: "string", format: "email", description: "邮箱地址" },
          name: { type: "string", description: "用户姓名" },
          avatar: { type: "string", format: "uri", description: "头像 URL" },
          role: {
            type: "string",
            enum: ["admin", "user", "moderator"],
            description: "用户角色"
          },
          createdAt: { type: "string", format: "date-time", description: "注册时间" },
          lastLoginAt: { type: "string", format: "date-time", description: "最后登录时间" }
        }
      },
      "UserProfile": {
        type: "object",
        properties: {
          bio: { type: "string", description: "个人简介" },
          phone: { type: "string", description: "电话号码" },
          address: { $ref: "#/components/schemas/Address" },
          preferences: {
            type: "object",
            properties: {
              language: { type: "string", description: "首选语言" },
              timezone: { type: "string", description: "时区" },
              notifications: { type: "boolean", description: "是否接收通知" }
            }
          }
        }
      }
    },
    responses: {
      "UserResponse": {
        description: "用户信息响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/User" }
          }
        }
      },
      "ValidationError": {
        description: "验证错误响应",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "string", description: "错误信息" },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      field: { type: "string", description: "错误字段" },
                      message: { type: "string", description: "错误描述" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  // 支付系统组件定义
  const paymentComponents = {
    schemas: {
      "Payment": {
        type: "object",
        required: ["id", "amount", "currency", "status"],
        properties: {
          id: { type: "string", description: "支付 ID" },
          amount: { type: "number", description: "支付金额" },
          currency: { type: "string", description: "货币代码" },
          status: {
            type: "string",
            enum: ["pending", "completed", "failed", "refunded"],
            description: "支付状态"
          },
          method: {
            type: "string",
            enum: ["credit_card", "paypal", "bank_transfer"],
            description: "支付方式"
          },
          createdAt: { type: "string", format: "date-time", description: "创建时间" }
        }
      },
      "PaymentMethod": {
        type: "object",
        properties: {
          type: { type: "string", description: "支付方式类型" },
          cardLast4: { type: "string", description: "卡号后四位" },
          expiryMonth: { type: "integer", description: "过期月份" },
          expiryYear: { type: "integer", description: "过期年份" }
        }
      }
    },
    securitySchemes: {
      "PaymentAuth": {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: "https://payment.example.com/oauth/authorize",
            tokenUrl: "https://payment.example.com/oauth/token",
            scopes: {
              "payment:read": "读取支付信息",
              "payment:write": "创建和修改支付",
              "refund:create": "创建退款"
            }
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">电商 API 组件折叠展示</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台 API 的完整组件定义，包含产品、订单和认证相关的数据模型
        </p>
        <AccordionComponentsSection
          components={ecommerceComponents}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 组件折叠展示</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户管理系统的组件定义，包含用户信息、资料和响应模型
        </p>
        <AccordionComponentsSection
          components={userManagementComponents}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付系统 API 组件折叠展示</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理系统的组件定义，包含支付信息、方式和安全认证
        </p>
        <AccordionComponentsSection
          components={paymentComponents}
        />
      </div>
    </div>
  );
}
