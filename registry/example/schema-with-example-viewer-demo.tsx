import { SchemaWithExampleViewer } from "@/registry/pivot/schema-with-example-viewer";

export default function SchemaWithExampleViewerDemo() {
  // 用户信息 Schema 和示例
  const userSchemaWithExample = {
    schema: {
      type: "object" as const,
      required: ["id", "email", "name"],
      properties: {
        id: {
          type: "string" as const,
          description: "用户唯一标识符",
          format: "uuid" as const
        },
        email: {
          type: "string" as const,
          description: "用户邮箱地址",
          format: "email" as const
        },
        name: {
          type: "string" as const,
          description: "用户姓名",
          minLength: 1,
          maxLength: 100
        },
        avatar: {
          type: "string" as const,
          description: "用户头像 URL",
          format: "uri" as const
        },
        role: {
          type: "string" as const,
          description: "用户角色",
          enum: ["admin", "user", "moderator"],
          default: "user"
        },
        profile: {
          type: "object" as const,
          description: "用户详细资料",
          properties: {
            bio: {
              type: "string" as const,
              description: "个人简介"
            },
            phone: {
              type: "string" as const,
              description: "电话号码"
            },
            address: {
              type: "object" as const,
              properties: {
                country: { type: "string" as const, description: "国家" },
                city: { type: "string" as const, description: "城市" },
                street: { type: "string" as const, description: "街道地址" }
              }
            }
          }
        },
        createdAt: {
          type: "string" as const,
          description: "注册时间",
          format: "date-time" as const
        }
      }
    },
    example: {
      id: "user_123e4567-e89b-12d3-a456-426614174000",
      email: "john.doe@example.com",
      name: "John Doe",
      avatar: "https://cdn.example.com/avatars/john-doe.jpg",
      role: "admin",
      profile: {
        bio: "资深软件工程师，专注于 API 设计和微服务架构",
        phone: "+86 138-0013-8000",
        address: {
          country: "中国",
          city: "北京",
          street: "中关村大街1号"
        }
      },
      createdAt: "2024-01-15T10:30:00Z"
    }
  };

  // 产品信息 Schema 和示例
  const productSchemaWithExample = {
    schema: {
      type: "object" as const,
      required: ["id", "name", "price"],
      properties: {
        id: {
          type: "string" as const,
          description: "产品唯一标识符"
        },
        name: {
          type: "string" as const,
          description: "产品名称",
          minLength: 1,
          maxLength: 200
        },
        description: {
          type: "string" as const,
          description: "产品描述"
        },
        price: {
          type: "number" as const,
          description: "产品价格",
          minimum: 0
        },
        currency: {
          type: "string" as const,
          description: "货币代码",
          pattern: "^[A-Z]{3}$",
          default: "CNY"
        },
        category: {
          type: "string" as const,
          description: "产品分类",
          enum: ["electronics", "clothing", "books", "home", "sports"]
        },
        images: {
          type: "array" as const,
          description: "产品图片列表",
          items: {
            type: "string" as const,
            format: "uri" as const
          },
          maxItems: 10
        },
        specifications: {
          type: "object" as const,
          description: "产品规格",
          additionalProperties: {
            type: "string" as const
          }
        },
        inStock: {
          type: "boolean" as const,
          description: "是否有库存",
          default: true
        },
        stockQuantity: {
          type: "integer" as const,
          description: "库存数量",
          minimum: 0
        },
        tags: {
          type: "array" as const,
          description: "产品标签",
          items: {
            type: "string" as const
          }
        }
      }
    },
    example: {
      id: "prod_987fcdeb-51a2-4567-8901-234567890abc",
      name: "iPhone 15 Pro",
      description: "Apple 最新旗舰智能手机，配备 A17 Pro 芯片和钛金属机身",
      price: 7999.00,
      currency: "CNY",
      category: "electronics",
      images: [
        "https://cdn.example.com/products/iphone15pro-front.jpg",
        "https://cdn.example.com/products/iphone15pro-back.jpg"
      ],
      specifications: {
        display: "6.1英寸 Super Retina XDR",
        storage: "256GB",
        color: "天然钛金属色",
        weight: "187g"
      },
      inStock: true,
      stockQuantity: 150,
      tags: ["smartphone", "premium", "5g", "titanium"]
    }
  };

  // API 响应 Schema 和示例
  const apiResponseSchemaWithExample = {
    schema: {
      type: "object" as const,
      required: ["success", "data"],
      properties: {
        success: {
          type: "boolean" as const,
          description: "请求是否成功"
        },
        data: {
          type: "object" as const,
          description: "响应数据",
          properties: {
            users: {
              type: "array" as const,
              description: "用户列表",
              items: {
                type: "object" as const,
                properties: {
                  id: { type: "string" as const, description: "用户 ID" },
                  name: { type: "string" as const, description: "用户姓名" },
                  email: { type: "string" as const, format: "email" as const, description: "邮箱" }
                }
              }
            },
            pagination: {
              type: "object" as const,
              description: "分页信息",
              properties: {
                page: { type: "integer" as const, description: "当前页码" },
                pageSize: { type: "integer" as const, description: "每页数量" },
                total: { type: "integer" as const, description: "总记录数" },
                totalPages: { type: "integer" as const, description: "总页数" }
              }
            }
          }
        },
        message: {
          type: "string" as const,
          description: "响应消息"
        },
        timestamp: {
          type: "string" as const,
          description: "响应时间戳",
          format: "date-time" as const
        },
        requestId: {
          type: "string" as const,
          description: "请求追踪 ID"
        }
      }
    },
    example: {
      success: true,
      data: {
        users: [
          {
            id: "user_001",
            name: "Alice Johnson",
            email: "alice@example.com"
          },
          {
            id: "user_002",
            name: "Bob Smith",
            email: "bob@example.com"
          }
        ],
        pagination: {
          page: 1,
          pageSize: 20,
          total: 156,
          totalPages: 8
        }
      },
      message: "用户列表获取成功",
      timestamp: "2024-03-15T14:30:00Z",
      requestId: "req_789abc12-def3-4567-8901-234567890def"
    }
  };

  // 错误响应 Schema 和示例
  const errorResponseSchemaWithExample = {
    schema: {
      type: "object" as const,
      required: ["success", "error"],
      properties: {
        success: {
          type: "boolean" as const,
          description: "请求是否成功",
          enum: [false]
        },
        error: {
          type: "object" as const,
          description: "错误信息",
          required: ["code", "message"],
          properties: {
            code: {
              type: "string" as const,
              description: "错误代码",
              enum: ["VALIDATION_ERROR", "NOT_FOUND", "UNAUTHORIZED", "INTERNAL_ERROR"]
            },
            message: {
              type: "string" as const,
              description: "错误描述"
            },
            details: {
              type: "array" as const,
              description: "详细错误信息",
              items: {
                type: "object" as const,
                properties: {
                  field: { type: "string" as const, description: "错误字段" },
                  message: { type: "string" as const, description: "字段错误描述" }
                }
              }
            }
          }
        },
        timestamp: {
          type: "string" as const,
          description: "错误发生时间",
          format: "date-time" as const
        },
        requestId: {
          type: "string" as const,
          description: "请求追踪 ID"
        }
      }
    },
    example: {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "请求参数验证失败",
        details: [
          {
            field: "email",
            message: "邮箱格式不正确"
          },
          {
            field: "password",
            message: "密码长度至少8位"
          }
        ]
      },
      timestamp: "2024-03-15T14:35:00Z",
      requestId: "req_error123-456-789-abc-def012345678"
    }
  };

  // 支付信息 Schema 和示例
  const paymentSchemaWithExample = {
    schema: {
      type: "object" as const,
      required: ["id", "amount", "currency", "status"],
      properties: {
        id: {
          type: "string" as const,
          description: "支付唯一标识符"
        },
        orderId: {
          type: "string" as const,
          description: "关联订单 ID"
        },
        amount: {
          type: "number" as const,
          description: "支付金额",
          minimum: 0.01
        },
        currency: {
          type: "string" as const,
          description: "货币代码",
          pattern: "^[A-Z]{3}$"
        },
        method: {
          type: "string" as const,
          description: "支付方式",
          enum: ["credit_card", "paypal", "bank_transfer", "alipay", "wechat_pay"]
        },
        status: {
          type: "string" as const,
          description: "支付状态",
          enum: ["pending", "processing", "completed", "failed", "refunded"]
        },
        gateway: {
          type: "string" as const,
          description: "支付网关"
        },
        transactionId: {
          type: "string" as const,
          description: "第三方交易 ID"
        },
        cardInfo: {
          type: "object" as const,
          description: "信用卡信息（脱敏）",
          properties: {
            last4: { type: "string" as const, description: "卡号后四位" },
            brand: { type: "string" as const, description: "卡片品牌" },
            expiryMonth: { type: "integer" as const, description: "过期月份" },
            expiryYear: { type: "integer" as const, description: "过期年份" }
          }
        },
        createdAt: {
          type: "string" as const,
          description: "创建时间",
          format: "date-time" as const
        },
        completedAt: {
          type: "string" as const,
          description: "完成时间",
          format: "date-time" as const
        }
      }
    },
    example: {
      id: "pay_abc123def456-789-012-345-678901234567",
      orderId: "order_456e7890-a12b-34c5-6789-012345678901",
      amount: 10887.80,
      currency: "CNY",
      method: "credit_card",
      status: "completed",
      gateway: "stripe",
      transactionId: "txn_stripe_ch_1234567890abcdef",
      cardInfo: {
        last4: "4242",
        brand: "visa",
        expiryMonth: 12,
        expiryYear: 2027
      },
      createdAt: "2024-03-15T09:20:15Z",
      completedAt: "2024-03-15T09:20:18Z"
    }
  };

  // 数组数据 Schema 和示例
  const arraySchemaWithExample = {
    schema: {
      type: "array" as const,
      description: "产品分类列表",
      items: {
        type: "object" as const,
        required: ["id", "name"],
        properties: {
          id: {
            type: "string" as const,
            description: "分类 ID"
          },
          name: {
            type: "string" as const,
            description: "分类名称"
          },
          description: {
            type: "string" as const,
            description: "分类描述"
          },
          parentId: {
            type: "string" as const,
            description: "父分类 ID",
            nullable: true
          },
          level: {
            type: "integer" as const,
            description: "分类层级",
            minimum: 1
          }
        }
      },
      maxItems: 100
    },
    example: [
      {
        id: "cat_electronics",
        name: "电子产品",
        description: "各类电子设备和数码产品",
        parentId: null,
        level: 1
      },
      {
        id: "cat_smartphones",
        name: "智能手机",
        description: "各品牌智能手机",
        parentId: "cat_electronics",
        level: 2
      },
      {
        id: "cat_laptops",
        name: "笔记本电脑",
        description: "便携式电脑设备",
        parentId: "cat_electronics",
        level: 2
      }
    ]
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户信息 Schema 和示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          完整的用户数据模型，包含基本信息、资料和嵌套对象结构
        </p>
        <SchemaWithExampleViewer
          content={{
            "application/json": {
              schema: userSchemaWithExample.schema,
              example: userSchemaWithExample.example
            }
          }}
          contentType="mediaTypes"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品信息 Schema 和示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商产品的完整数据结构，包含价格、规格、库存等信息
        </p>
        <SchemaWithExampleViewer
          content={{
            "application/json": {
              schema: productSchemaWithExample.schema,
              example: productSchemaWithExample.example
            }
          }}
          contentType="mediaTypes"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 响应 Schema 和示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的 API 响应格式，包含数据、分页信息和元数据
        </p>
        <SchemaWithExampleViewer
          content={{
            "application/json": {
              schema: apiResponseSchemaWithExample.schema,
              example: apiResponseSchemaWithExample.example
            }
          }}
          contentType="mediaTypes"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">错误响应 Schema 和示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 错误响应的标准格式，包含错误代码和详细信息
        </p>
        <SchemaWithExampleViewer
          content={{
            "application/json": {
              schema: errorResponseSchemaWithExample.schema,
              example: errorResponseSchemaWithExample.example
            }
          }}
          contentType="mediaTypes"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付信息 Schema 和示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付交易的完整数据结构，包含支付方式和卡片信息
        </p>
        <SchemaWithExampleViewer
          content={{
            "application/json": {
              schema: paymentSchemaWithExample.schema,
              example: paymentSchemaWithExample.example
            }
          }}
          contentType="mediaTypes"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数组数据 Schema 和示例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数组类型的数据结构，展示分类列表的层级关系
        </p>
        <SchemaWithExampleViewer
          content={{
            "application/json": {
              schema: arraySchemaWithExample.schema,
              example: arraySchemaWithExample.example
            }
          }}
          contentType="mediaTypes"
        />
      </div>
    </div>
  );
}
