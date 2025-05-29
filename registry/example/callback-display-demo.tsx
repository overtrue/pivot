import { CallbackDisplay } from "@/registry/pivot/callback-display";
import type { CallbackObject, DataType } from "@/types/openapi";

export default function CallbackDisplayDemo() {
  // 支付成功回调
  const paymentSuccessCallback: CallbackObject = {
    "{$request.body#/callbackUrl}": {
      post: {
        summary: "支付成功通知",
        description: "当支付完成时，系统会向指定的回调URL发送支付结果通知",
        requestBody: {
          description: "支付成功通知数据",
          content: {
            "application/json": {
              schema: {
                type: "object" as const as DataType,
                required: ["paymentId", "orderId", "status", "amount"],
                properties: {
                  paymentId: {
                    type: "string" as const as DataType,
                    description: "支付订单号",
                    example: "pay_1234567890"
                  },
                  orderId: {
                    type: "string" as const as DataType,
                    description: "商户订单号",
                    example: "order_abc123"
                  },
                  status: {
                    type: "string" as const as DataType,
                    enum: ["success", "failed", "pending"],
                    description: "支付状态",
                    example: "success"
                  },
                  amount: {
                    type: "number" as const as DataType,
                    description: "支付金额（分）",
                    example: 9999
                  },
                  currency: {
                    type: "string" as const as DataType,
                    description: "货币代码",
                    example: "CNY"
                  },
                  timestamp: {
                    type: "string" as const as DataType,
                    format: "date-time" as const,
                    description: "支付完成时间",
                    example: "2024-03-15T14:30:00Z"
                  },
                  signature: {
                    type: "string" as const as DataType,
                    description: "数字签名，用于验证请求的真实性",
                    example: "a1b2c3d4e5f6..."
                  }
                }
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
  const orderStatusCallback: CallbackObject = {
    "{$request.body#/statusUpdateUrl}": {
      post: {
        summary: "订单状态更新通知",
        description: "当订单状态发生变更时，系统会发送状态更新通知",
        requestBody: {
          description: "订单状态更新数据",
          content: {
            "application/json": {
              schema: {
                type: "object" as const as DataType,
                required: ["orderId", "status", "updatedAt"],
                properties: {
                  orderId: {
                    type: "string" as const as DataType,
                    description: "订单 ID",
                    example: "order_abc123"
                  },
                  previousStatus: {
                    type: "string" as const as DataType,
                    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
                    description: "变更前状态",
                    example: "processing"
                  },
                  status: {
                    type: "string" as const as DataType,
                    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
                    description: "当前状态",
                    example: "shipped"
                  },
                  trackingNumber: {
                    type: "string" as const as DataType,
                    description: "物流追踪号（如果适用）",
                    example: "SF1234567890"
                  },
                  carrier: {
                    type: "string" as const as DataType,
                    description: "承运商",
                    example: "顺丰速运"
                  },
                  updatedAt: {
                    type: "string" as const as DataType,
                    format: "date-time" as const,
                    description: "状态更新时间",
                    example: "2024-03-16T10:15:00Z"
                  },
                  estimatedDelivery: {
                    type: "string" as const as DataType,
                    format: "date-time" as const,
                    description: "预计送达时间",
                    example: "2024-03-17T18:00:00Z"
                  }
                }
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
  const userRegistrationCallback: CallbackObject = {
    "{$request.body#/notificationUrl}": {
      post: {
        summary: "用户注册完成通知",
        description: "当新用户完成注册流程时，系统会发送用户注册完成的通知",
        requestBody: {
          description: "用户注册通知数据",
          content: {
            "application/json": {
              schema: {
                type: "object" as const as DataType,
                required: ["userId", "email", "registrationTime"],
                properties: {
                  userId: {
                    type: "string" as const as DataType,
                    description: "新注册用户的 ID",
                    example: "user_new123456"
                  },
                  email: {
                    type: "string" as const as DataType,
                    format: "email" as const,
                    description: "用户邮箱地址",
                    example: "newuser@example.com"
                  },
                  name: {
                    type: "string" as const as DataType,
                    description: "用户姓名",
                    example: "张三"
                  },
                  registrationTime: {
                    type: "string" as const as DataType,
                    format: "date-time" as const,
                    description: "注册完成时间",
                    example: "2024-03-15T10:30:00Z"
                  },
                  source: {
                    type: "string" as const as DataType,
                    enum: ["web", "mobile", "api"],
                    description: "注册来源",
                    example: "web"
                  },
                  emailVerified: {
                    type: "boolean" as const as DataType,
                    description: "邮箱是否已验证",
                    example: true
                  }
                }
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
  const dataSyncCallback: CallbackObject = {
    "{$request.body#/syncEndpoint}": {
      post: {
        summary: "数据同步完成通知",
        description: "当数据同步任务完成时，系统会发送同步结果通知",
        requestBody: {
          description: "数据同步结果通知",
          content: {
            "application/json": {
              schema: {
                type: "object" as const as DataType,
                required: ["syncId", "status", "completedAt"],
                properties: {
                  syncId: {
                    type: "string" as const as DataType,
                    description: "同步任务 ID",
                    example: "sync_task_789"
                  },
                  dataType: {
                    type: "string" as const as DataType,
                    enum: ["users", "products", "orders", "inventory"],
                    description: "同步的数据类型",
                    example: "products"
                  },
                  status: {
                    type: "string" as const as DataType,
                    enum: ["success", "failed", "partial"],
                    description: "同步状态",
                    example: "success"
                  },
                  recordsProcessed: {
                    type: "integer" as const as DataType,
                    description: "处理的记录数",
                    example: 1250
                  },
                  recordsSucceeded: {
                    type: "integer" as const as DataType,
                    description: "成功处理的记录数",
                    example: 1248
                  },
                  recordsFailed: {
                    type: "integer" as const as DataType,
                    description: "处理失败的记录数",
                    example: 2
                  },
                  startedAt: {
                    type: "string" as const as DataType,
                    format: "date-time" as const,
                    description: "同步开始时间",
                    example: "2024-03-15T02:00:00Z"
                  },
                  completedAt: {
                    type: "string" as const as DataType,
                    format: "date-time" as const,
                    description: "同步完成时间",
                    example: "2024-03-15T02:15:30Z"
                  },
                  errors: {
                    type: "array" as const as DataType,
                    description: "错误详情列表",
                    items: {
                      type: "object" as const as DataType,
                      properties: {
                        recordId: { type: "string" as const as DataType },
                        error: { type: "string" as const as DataType }
                      }
                    }
                  }
                }
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
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">支付成功回调通知</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付完成后的 Webhook 回调，包含支付结果和签名验证
        </p>
        <CallbackDisplay name="PaymentSuccess" callback={paymentSuccessCallback} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单状态变更回调</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          订单状态变更时的通知回调，包含物流跟踪信息
        </p>
        <CallbackDisplay name="OrderStatusUpdate" callback={orderStatusCallback} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户注册完成回调</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          新用户注册完成后的通知回调，包含用户基本信息
        </p>
        <CallbackDisplay name="UserRegistration" callback={userRegistrationCallback} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据同步完成回调</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          批量数据同步任务完成后的结果通知回调
        </p>
        <CallbackDisplay name="DataSyncComplete" callback={dataSyncCallback} />
      </div>
    </div>
  );
}
