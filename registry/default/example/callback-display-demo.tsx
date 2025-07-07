import { CallbackDisplay } from "@/registry/default/ui/callback-display";
import { OpenAPIV3 } from "openapi-types";

export default function CallbackDisplayDemo() {
  // 支付完成回调
  const paymentCallback: OpenAPIV3.CallbackObject = {
    "{$request.body#/notifyUrl}": {
      post: {
        summary: "支付完成通知",
        description: "当支付完成时，第三方支付服务会向指定的 URL 发送支付完成通知",
        requestBody: {
          description: "支付通知数据",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["paymentId", "orderId", "status", "amount"],
                properties: {
                  paymentId: {
                    type: "string",
                    description: "支付订单号",
                    example: "pay_1234567890"
                  },
                  orderId: {
                    type: "string",
                    description: "商户订单号",
                    example: "order_abc123"
                  },
                  status: {
                    type: "string",
                    enum: ["success", "failed", "pending"],
                    description: "支付状态",
                    example: "success"
                  },
                  amount: {
                    type: "number",
                    description: "支付金额（分）",
                    example: 9999
                  },
                  currency: {
                    type: "string",
                    description: "货币代码",
                    example: "CNY"
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                    description: "支付完成时间",
                    example: "2024-03-15T14:30:00Z"
                  },
                  signature: {
                    type: "string",
                    description: "数字签名，用于验证请求的真实性",
                    example: "a1b2c3d4e5f6..."
                  }
                } as Record<string, OpenAPIV3.SchemaObject>
              }
            }
          }
        },
        responses: {
          "200": {
            description: "支付通知处理成功"
          }
        }
      }
    }
  };

  // 订单状态变更回调
  const orderStatusCallback: OpenAPIV3.CallbackObject = {
    "{$request.body#/statusUpdateUrl}": {
      post: {
        summary: "订单状态更新通知",
        description: "当订单状态发生变更时，系统会发送状态更新通知",
        requestBody: {
          description: "订单状态更新数据",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["orderId", "status", "updatedAt"],
                properties: {
                  orderId: {
                    type: "string",
                    description: "订单 ID",
                    example: "order_abc123"
                  },
                  previousStatus: {
                    type: "string",
                    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
                    description: "变更前状态",
                    example: "processing"
                  },
                  status: {
                    type: "string",
                    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
                    description: "当前状态",
                    example: "shipped"
                  },
                  trackingNumber: {
                    type: "string",
                    description: "物流追踪号（如果适用）",
                    example: "SF1234567890"
                  },
                  carrier: {
                    type: "string",
                    description: "承运商",
                    example: "顺丰速运"
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "状态更新时间",
                    example: "2024-03-16T10:15:00Z"
                  },
                  estimatedDelivery: {
                    type: "string",
                    format: "date-time",
                    description: "预计送达时间",
                    example: "2024-03-17T18:00:00Z"
                  }
                } as Record<string, OpenAPIV3.SchemaObject>
              }
            }
          }
        },
        responses: {
          "200": {
            description: "状态更新处理成功"
          }
        }
      }
    }
  };

  // 用户注册回调
  const userRegistrationCallback: OpenAPIV3.CallbackObject = {
    "{$request.body#/notificationUrl}": {
      post: {
        summary: "用户注册完成通知",
        description: "当新用户完成注册流程时，系统会发送用户注册完成的通知",
        requestBody: {
          description: "用户注册通知数据",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["userId", "email", "registrationTime"],
                properties: {
                  userId: {
                    type: "string",
                    description: "新注册用户的 ID",
                    example: "user_new123456"
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "用户邮箱地址",
                    example: "newuser@example.com"
                  },
                  name: {
                    type: "string",
                    description: "用户姓名",
                    example: "张三"
                  },
                  registrationTime: {
                    type: "string",
                    format: "date-time",
                    description: "注册完成时间",
                    example: "2024-03-15T10:30:00Z"
                  },
                  source: {
                    type: "string",
                    enum: ["web", "mobile", "api"],
                    description: "注册来源",
                    example: "web"
                  },
                  emailVerified: {
                    type: "boolean",
                    description: "邮箱是否已验证",
                    example: true
                  }
                } as Record<string, OpenAPIV3.SchemaObject>
              }
            }
          }
        },
        responses: {
          "200": {
            description: "注册通知处理成功"
          }
        }
      }
    }
  };

  // 数据同步回调
  const dataSyncCallback: OpenAPIV3.CallbackObject = {
    "{$request.body#/syncEndpoint}": {
      post: {
        summary: "数据同步完成通知",
        description: "当数据同步任务完成时，系统会发送同步结果通知",
        requestBody: {
          description: "数据同步结果通知",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["syncId", "status", "completedAt"],
                properties: {
                  syncId: {
                    type: "string",
                    description: "同步任务 ID",
                    example: "sync_task_789"
                  },
                  dataType: {
                    type: "string",
                    enum: ["users", "products", "orders", "inventory"],
                    description: "同步的数据类型",
                    example: "products"
                  },
                  status: {
                    type: "string",
                    enum: ["success", "failed", "partial"],
                    description: "同步状态",
                    example: "success"
                  },
                  recordsProcessed: {
                    type: "integer",
                    description: "处理的记录数",
                    example: 1250
                  },
                  recordsSucceeded: {
                    type: "integer",
                    description: "成功处理的记录数",
                    example: 1248
                  },
                  recordsFailed: {
                    type: "integer",
                    description: "处理失败的记录数",
                    example: 2
                  },
                  startedAt: {
                    type: "string",
                    format: "date-time",
                    description: "同步开始时间",
                    example: "2024-03-15T02:00:00Z"
                  },
                  completedAt: {
                    type: "string",
                    format: "date-time",
                    description: "同步完成时间",
                    example: "2024-03-15T02:15:30Z"
                  },
                  errors: {
                    type: "array",
                    description: "错误详情列表",
                    items: {
                      type: "object",
                      properties: {
                        recordId: { type: "string" },
                        error: { type: "string" }
                      } as Record<string, OpenAPIV3.SchemaObject>
                    }
                  }
                } as Record<string, OpenAPIV3.SchemaObject>
              }
            }
          }
        },
        responses: {
          "200": {
            description: "同步通知处理成功"
          }
        }
      }
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">回调函数展示组件</h2>
        <p className="text-muted-foreground">
          展示不同类型的回调函数定义，包括支付通知、订单状态更新、用户注册和数据同步等回调场景。
        </p>
      </div>

      <div className="space-y-6">
        <CallbackDisplay
          name="PaymentNotification"
          callback={paymentCallback}
        />

        <CallbackDisplay
          name="OrderStatusUpdate"
          callback={orderStatusCallback}
        />

        <CallbackDisplay
          name="UserRegistration"
          callback={userRegistrationCallback}
        />

        <CallbackDisplay
          name="DataSync"
          callback={dataSyncCallback}
        />
      </div>
    </div>
  );
}
