import { CallbackDisplay } from "@/registry/pivot/callback-display";

export default function CallbackDisplayDemo() {
  // 支付成功回调
  const paymentSuccessCallback = {
    "{$request.body#/callbackUrl}": {
      post: {
        summary: "支付成功通知回调",
        description: "当支付成功完成时，系统会向商户指定的回调 URL 发送支付结果通知",
        requestBody: {
          description: "支付成功通知数据",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["paymentId", "orderId", "status", "amount", "timestamp"],
                properties: {
                  paymentId: {
                    type: "string",
                    description: "支付交易 ID",
                    example: "pay_abc123def456"
                  },
                  orderId: {
                    type: "string",
                    description: "商户订单号",
                    example: "order_456e7890"
                  },
                  status: {
                    type: "string",
                    enum: ["success"],
                    description: "支付状态",
                    example: "success"
                  },
                  amount: {
                    type: "number",
                    description: "支付金额",
                    example: 99.99
                  },
                  currency: {
                    type: "string",
                    description: "货币代码",
                    example: "USD"
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                    description: "支付完成时间",
                    example: "2024-03-15T14:30:00Z"
                  },
                  signature: {
                    type: "string",
                    description: "回调签名，用于验证请求真实性",
                    example: "sha256=abc123def456..."
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "回调处理成功",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    received: {
                      type: "boolean",
                      example: true
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "回调数据格式错误"
          },
          "401": {
            description: "签名验证失败"
          }
        }
      }
    }
  };

  // 订单状态变更回调
  const orderStatusCallback = {
    "{$request.body#/webhookUrl}": {
      post: {
        summary: "订单状态变更通知",
        description: "当订单状态发生变更时（如发货、配送、签收等），系统会发送状态更新通知",
        requestBody: {
          description: "订单状态变更通知",
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["orderId", "status", "timestamp"],
                properties: {
                  orderId: {
                    type: "string",
                    description: "订单 ID",
                    example: "order_789xyz123"
                  },
                  customerId: {
                    type: "string",
                    description: "客户 ID",
                    example: "user_456abc789"
                  },
                  status: {
                    type: "string",
                    enum: ["confirmed", "processing", "shipped", "delivered", "cancelled"],
                    description: "订单状态",
                    example: "shipped"
                  },
                  previousStatus: {
                    type: "string",
                    description: "之前的订单状态",
                    example: "processing"
                  },
                  trackingNumber: {
                    type: "string",
                    description: "物流跟踪号（仅在发货时提供）",
                    example: "SF1234567890"
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                    description: "状态变更时间",
                    example: "2024-03-15T16:45:00Z"
                  },
                  estimatedDelivery: {
                    type: "string",
                    format: "date-time",
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
  const userRegistrationCallback = {
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
  const dataSyncCallback = {
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
