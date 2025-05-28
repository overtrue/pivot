import { AllInOneLayout } from "@/registry/pivot/all-in-one-layout";

export default function AllInOneLayoutDemo() {
  // 电商 API 文档示例
  const ecommerceApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "电商平台 API",
      version: "2.1.0",
      description: "现代化电商平台的 RESTful API，提供完整的商品管理、订单处理、用户认证等功能。",
      contact: {
        name: "API 支持团队",
        email: "api-support@ecommerce.example.com",
        url: "https://docs.ecommerce.example.com"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      },
      termsOfService: "https://ecommerce.example.com/terms"
    },
    servers: [
      {
        url: "https://api.ecommerce.example.com/v2",
        description: "生产环境"
      },
      {
        url: "https://staging-api.ecommerce.example.com/v2",
        description: "预发布环境"
      }
    ],
    paths: {
      "/products": {
        get: {
          summary: "获取商品列表",
          description: "分页获取商品列表，支持多种筛选和排序选项",
          tags: ["商品管理"],
          parameters: [
            {
              name: "page",
              in: "query" as const,
              schema: { type: "integer", minimum: 1, default: 1 },
              description: "页码"
            },
            {
              name: "limit",
              in: "query" as const,
              schema: { type: "integer", minimum: 1, maximum: 100, default: 20 },
              description: "每页数量"
            },
            {
              name: "category",
              in: "query" as const,
              schema: { type: "string" },
              description: "商品分类"
            },
            {
              name: "search",
              in: "query" as const,
              schema: { type: "string" },
              description: "搜索关键词"
            }
          ],
          responses: {
            "200": {
              description: "成功获取商品列表",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            price: { type: "number" },
                            category: { type: "string" },
                            inStock: { type: "boolean" }
                          }
                        }
                      },
                      pagination: {
                        type: "object",
                        properties: {
                          page: { type: "integer" },
                          limit: { type: "integer" },
                          total: { type: "integer" },
                          totalPages: { type: "integer" }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          security: [{ "BearerAuth": [] }]
        },
        post: {
          summary: "创建新商品",
          description: "添加新商品到商品库",
          tags: ["商品管理"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "price", "category"],
                  properties: {
                    name: { type: "string", maxLength: 200 },
                    description: { type: "string" },
                    price: { type: "number", minimum: 0 },
                    category: { type: "string" },
                    images: {
                      type: "array",
                      items: { type: "string", format: "uri" }
                    },
                    specifications: {
                      type: "object",
                      additionalProperties: { type: "string" }
                    }
                  }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "商品创建成功",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      price: { type: "number" },
                      createdAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            },
            "400": {
              description: "请求参数错误"
            },
            "401": {
              description: "未授权访问"
            }
          },
          security: [{ "BearerAuth": [] }]
        }
      },
      "/orders/{orderId}": {
        get: {
          summary: "获取订单详情",
          description: "根据订单 ID 获取订单的详细信息",
          tags: ["订单管理"],
          parameters: [
            {
              name: "orderId",
              in: "path" as const,
              required: true,
              schema: { type: "string" },
              description: "订单唯一标识符"
            }
          ],
          responses: {
            "200": {
              description: "成功获取订单详情",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      customerId: { type: "string" },
                      items: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            productId: { type: "string" },
                            quantity: { type: "integer" },
                            price: { type: "number" }
                          }
                        }
                      },
                      totalAmount: { type: "number" },
                      status: {
                        type: "string",
                        enum: ["pending", "confirmed", "shipped", "delivered"]
                      },
                      createdAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            },
            "404": {
              description: "订单不存在"
            }
          },
          security: [{ "BearerAuth": [] }]
        }
      }
    },
    components: {
      securitySchemes: {
        "BearerAuth": {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT Bearer Token 认证"
        },
        "ApiKeyAuth": {
          type: "apiKey",
          in: "header" as const,
          name: "X-API-Key",
          description: "API 密钥认证"
        }
      },
      schemas: {
        "Product": {
          type: "object",
          properties: {
            id: { type: "string", description: "商品 ID" },
            name: { type: "string", description: "商品名称" },
            price: { type: "number", description: "商品价格" },
            category: { type: "string", description: "商品分类" },
            inStock: { type: "boolean", description: "是否有库存" }
          }
        },
        "Order": {
          type: "object",
          properties: {
            id: { type: "string", description: "订单 ID" },
            customerId: { type: "string", description: "客户 ID" },
            totalAmount: { type: "number", description: "订单总金额" },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "shipped", "delivered"],
              description: "订单状态"
            }
          }
        }
      }
    },
    tags: [
      {
        name: "商品管理",
        description: "商品相关的 API 操作"
      },
      {
        name: "订单管理",
        description: "订单相关的 API 操作"
      },
      {
        name: "用户管理",
        description: "用户账户和认证相关的 API"
      }
    ]
  };

  // 金融 API 文档示例
  const financeApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "金融服务 API",
      version: "1.0.0",
      description: "安全可靠的金融服务 API，提供账户管理、交易处理、风险控制等核心功能。",
      contact: {
        name: "金融 API 团队",
        email: "fintech@example.com"
      }
    },
    servers: [
      {
        url: "https://api.finance.example.com/v1",
        description: "生产环境"
      }
    ],
    paths: {
      "/accounts/{accountId}/balance": {
        get: {
          summary: "查询账户余额",
          description: "获取指定账户的当前余额信息",
          tags: ["账户管理"],
          parameters: [
            {
              name: "accountId",
              in: "path" as const,
              required: true,
              schema: { type: "string" },
              description: "账户 ID"
            }
          ],
          responses: {
            "200": {
              description: "成功获取账户余额",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      accountId: { type: "string" },
                      balance: { type: "number", format: "decimal" },
                      currency: { type: "string" },
                      lastUpdated: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          },
          security: [{ "OAuth2": ["account:read"] }]
        }
      },
      "/transactions": {
        post: {
          summary: "创建交易",
          description: "发起新的金融交易",
          tags: ["交易管理"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fromAccount", "toAccount", "amount"],
                  properties: {
                    fromAccount: { type: "string" },
                    toAccount: { type: "string" },
                    amount: { type: "number", format: "decimal" },
                    currency: { type: "string", default: "USD" },
                    description: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "交易创建成功"
            },
            "400": {
              description: "交易参数错误"
            },
            "403": {
              description: "余额不足或权限不够"
            }
          },
          security: [{ "OAuth2": ["transaction:create"] }]
        }
      }
    },
    components: {
      securitySchemes: {
        "OAuth2": {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "https://auth.finance.example.com/oauth/authorize",
              tokenUrl: "https://auth.finance.example.com/oauth/token",
              scopes: {
                "account:read": "读取账户信息",
                "account:write": "修改账户信息",
                "transaction:create": "创建交易",
                "transaction:read": "查看交易记录"
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: "账户管理",
        description: "账户相关操作"
      },
      {
        name: "交易管理",
        description: "交易相关操作"
      }
    ]
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">电商平台 API 文档</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          完整的电商平台 API 文档布局，包含商品管理、订单处理等核心功能
        </p>
        <div className="border rounded-lg overflow-hidden">
          <AllInOneLayout spec={ecommerceApiSpec} />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">金融服务 API 文档</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          高安全级别的金融服务 API 文档，包含账户管理和交易处理功能
        </p>
        <div className="border rounded-lg overflow-hidden">
          <AllInOneLayout spec={financeApiSpec} />
        </div>
      </div>
    </div>
  );
}
