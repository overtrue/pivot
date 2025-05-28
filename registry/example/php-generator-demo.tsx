import { PhpGenerator } from "@/registry/pivot/php-generator";

export default function PhpGeneratorDemo() {
  // 电商产品 API 示例
  const productParams = {
    endpoint: "https://api.shop.example.com/v1/products",
    method: "POST" as const,
    parameters: [
      {
        name: "X-Shop-Token",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 299.99,
      currency: "USD",
      category: "Electronics",
      sku: "WH-1000XM4",
      inventory: {
        quantity: 50,
        trackInventory: true
      },
      specifications: {
        brand: "Sony",
        color: "Black",
        weight: "254g",
        batteryLife: "30 hours"
      },
      tags: ["wireless", "noise-cancelling", "premium"]
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "price", "category"],
            properties: {
              name: { type: "string", maxLength: 200 },
              description: { type: "string", maxLength: 2000 },
              price: { type: "number", minimum: 0 },
              currency: { type: "string", enum: ["USD", "EUR", "CNY"] },
              category: { type: "string" },
              sku: { type: "string" },
              inventory: {
                type: "object",
                properties: {
                  quantity: { type: "integer", minimum: 0 },
                  trackInventory: { type: "boolean" }
                }
              },
              specifications: {
                type: "object",
                additionalProperties: { type: "string" }
              },
              tags: {
                type: "array",
                items: { type: "string" }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 订单查询 API 示例
  const orderParams = {
    endpoint: "https://api.shop.example.com/v1/orders",
    method: "GET" as const,
    parameters: [
      {
        name: "status",
        in: "query" as const,
        required: false,
        schema: {
          type: "array",
          items: { type: "string", enum: ["pending", "processing", "shipped", "delivered", "cancelled"] }
        }
      },
      {
        name: "customerId",
        in: "query" as const,
        required: false,
        schema: { type: "string" }
      },
      {
        name: "dateFrom",
        in: "query" as const,
        required: false,
        schema: { type: "string", format: "date" }
      },
      {
        name: "dateTo",
        in: "query" as const,
        required: false,
        schema: { type: "string", format: "date" }
      },
      {
        name: "page",
        in: "query" as const,
        required: false,
        schema: { type: "integer", minimum: 1, default: 1 }
      },
      {
        name: "limit",
        in: "query" as const,
        required: false,
        schema: { type: "integer", minimum: 1, maximum: 100, default: 20 }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: null,
    requestBody: undefined
  };

  // 支付处理 API 示例
  const paymentParams = {
    endpoint: "https://api.payment.example.com/v1/charges",
    method: "POST" as const,
    parameters: [
      {
        name: "Idempotency-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string", format: "uuid" }
      },
      {
        name: "X-Payment-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      amount: 2999,
      currency: "usd",
      paymentMethod: {
        type: "card",
        card: {
          number: "4242424242424242",
          expMonth: 12,
          expYear: 2025,
          cvc: "123"
        }
      },
      customer: {
        email: "customer@example.com",
        name: "John Doe"
      },
      description: "Payment for order #12345",
      metadata: {
        orderId: "order_12345",
        customerId: "cust_abc123"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["amount", "currency", "paymentMethod"],
            properties: {
              amount: { type: "integer", minimum: 1 },
              currency: { type: "string", enum: ["usd", "eur", "cny"] },
              paymentMethod: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["card", "bank_transfer", "wallet"] },
                  card: {
                    type: "object",
                    properties: {
                      number: { type: "string" },
                      expMonth: { type: "integer", minimum: 1, maximum: 12 },
                      expYear: { type: "integer" },
                      cvc: { type: "string" }
                    }
                  }
                }
              },
              customer: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  name: { type: "string" }
                }
              },
              description: { type: "string" },
              metadata: {
                type: "object",
                additionalProperties: { type: "string" }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 内容管理 API 示例
  const cmsParams = {
    endpoint: "https://api.cms.example.com/v1/articles",
    method: "PUT" as const,
    parameters: [
      {
        name: "articleId",
        in: "path" as const,
        required: true,
        schema: { type: "string" }
      },
      {
        name: "publish",
        in: "query" as const,
        required: false,
        schema: { type: "boolean", default: false }
      },
      {
        name: "X-CMS-Token",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      title: "如何构建现代化的 Web 应用",
      content: "在这篇文章中，我们将探讨现代 Web 应用开发的最佳实践...",
      excerpt: "探讨现代 Web 应用开发的最佳实践和技术栈选择",
      author: {
        id: "author_123",
        name: "张三",
        email: "zhangsan@example.com"
      },
      categories: ["技术", "Web开发", "前端"],
      tags: ["React", "Next.js", "TypeScript"],
      seo: {
        metaTitle: "现代化 Web 应用开发指南",
        metaDescription: "学习如何使用最新技术构建高性能的 Web 应用",
        keywords: ["Web开发", "React", "性能优化"]
      },
      publishedAt: "2024-01-15T10:00:00Z"
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["title", "content"],
            properties: {
              title: { type: "string", maxLength: 200 },
              content: { type: "string" },
              excerpt: { type: "string", maxLength: 500 },
              author: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string", format: "email" }
                }
              },
              categories: {
                type: "array",
                items: { type: "string" }
              },
              tags: {
                type: "array",
                items: { type: "string" }
              },
              seo: {
                type: "object",
                properties: {
                  metaTitle: { type: "string" },
                  metaDescription: { type: "string" },
                  keywords: {
                    type: "array",
                    items: { type: "string" }
                  }
                }
              },
              publishedAt: { type: "string", format: "date-time" }
            }
          }
        }
      },
      required: true
    }
  };

  // 邮件发送 API 示例
  const emailParams = {
    endpoint: "https://api.mail.example.com/v1/send",
    method: "POST" as const,
    parameters: [
      {
        name: "X-Mail-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      from: {
        email: "noreply@example.com",
        name: "Example Corp"
      },
      to: [
        {
          email: "user@example.com",
          name: "John Doe"
        }
      ],
      cc: [],
      bcc: [],
      subject: "欢迎加入我们的服务",
      content: {
        text: "感谢您注册我们的服务！",
        html: "<h1>欢迎！</h1><p>感谢您注册我们的服务！</p>"
      },
      attachments: [
        {
          filename: "welcome.pdf",
          content: "base64_encoded_content",
          type: "application/pdf"
        }
      ],
      options: {
        trackOpens: true,
        trackClicks: true,
        priority: "normal"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["from", "to", "subject", "content"],
            properties: {
              from: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  name: { type: "string" }
                }
              },
              to: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    email: { type: "string", format: "email" },
                    name: { type: "string" }
                  }
                }
              },
              cc: { type: "array", items: { type: "object" } },
              bcc: { type: "array", items: { type: "object" } },
              subject: { type: "string" },
              content: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  html: { type: "string" }
                }
              },
              attachments: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    filename: { type: "string" },
                    content: { type: "string" },
                    type: { type: "string" }
                  }
                }
              },
              options: {
                type: "object",
                properties: {
                  trackOpens: { type: "boolean" },
                  trackClicks: { type: "boolean" },
                  priority: { type: "string", enum: ["low", "normal", "high"] }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">电商产品创建 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台产品创建接口的 PHP cURL 代码生成
        </p>
        <PhpGenerator params={productParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单查询 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含多个筛选条件的订单查询接口 PHP 代码
        </p>
        <PhpGenerator params={orderParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付处理 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          信用卡支付处理接口的 PHP 代码，包含幂等性处理
        </p>
        <PhpGenerator params={paymentParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          CMS 文章更新接口的 PHP 代码，包含 SEO 和作者信息
        </p>
        <PhpGenerator params={cmsParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">邮件发送 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          邮件发送服务接口的 PHP 代码，支持附件和追踪
        </p>
        <PhpGenerator params={emailParams} />
      </div>
    </div>
  );
}
