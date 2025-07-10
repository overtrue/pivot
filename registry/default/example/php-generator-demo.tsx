import { PhpGenerator } from "@/registry/default/ui/php-generator";
import { OpenAPIV3 } from "openapi-types";

export default function PhpGeneratorDemo() {
  // 电商产品 API 示例
  const productParams = {
    endpoint: "https://api.shop.example.com/v1/products",
    method: OpenAPIV3.HttpMethods.POST,
    parameters: [
      {
        name: "X-Shop-Token",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const },
      },
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
        trackInventory: true,
      },
      specifications: {
        brand: "Sony",
        color: "Black",
        weight: "254g",
        batteryLife: "30 hours",
      },
      tags: ["wireless", "noise-cancelling", "premium"],
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["name", "price", "category"],
            properties: {
              name: { type: "string" as const, maxLength: 200 },
              description: { type: "string" as const, maxLength: 2000 },
              price: { type: "number" as const, minimum: 0 },
              currency: {
                type: "string" as const,
                enum: ["USD", "EUR", "CNY"],
              },
              category: { type: "string" as const },
              sku: { type: "string" as const },
              inventory: {
                type: "object" as const,
                properties: {
                  quantity: { type: "integer" as const, minimum: 0 },
                  trackInventory: { type: "boolean" as const },
                },
              },
              specifications: {
                type: "object" as const,
                additionalProperties: { type: "string" as const },
              },
              tags: {
                type: "array" as const,
                items: { type: "string" as const },
              },
            },
          },
        },
      },
      required: true,
    },
  };

  // 订单查询 API 示例
  const orderParams = {
    endpoint: "https://api.shop.example.com/v1/orders",
    method: OpenAPIV3.HttpMethods.GET,
    parameters: [
      {
        name: "status",
        in: "query" as const,
        required: false,
        schema: {
          type: "array" as const,
          items: {
            type: "string" as const,
            enum: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
            ],
          },
        },
      },
      {
        name: "customerId",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const },
      },
      {
        name: "dateFrom",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, format: "date" as const },
      },
      {
        name: "dateTo",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, format: "date" as const },
      },
      {
        name: "page",
        in: "query" as const,
        required: false,
        schema: { type: "integer" as const, minimum: 1, default: 1 },
      },
      {
        name: "limit",
        in: "query" as const,
        required: false,
        schema: {
          type: "integer" as const,
          minimum: 1,
          maximum: 100,
          default: 20,
        },
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const },
      },
    ],
    requestBodyExample: null,
    requestBody: undefined,
  };

  // 支付处理 API 示例
  const paymentParams = {
    endpoint: "https://api.payment.example.com/v1/charges",
    method: OpenAPIV3.HttpMethods.POST,
    parameters: [
      {
        name: "Idempotency-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const, format: "uuid" as const },
      },
      {
        name: "X-Payment-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const },
      },
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
          cvc: "123",
        },
      },
      customer: {
        email: "customer@example.com",
        name: "John Doe",
      },
      description: "Payment for order #12345",
      metadata: {
        orderId: "order_12345",
        customerId: "cust_abc123",
      },
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["amount", "currency", "paymentMethod"],
            properties: {
              amount: { type: "integer" as const, minimum: 1 },
              currency: {
                type: "string" as const,
                enum: ["usd", "eur", "cny"],
              },
              paymentMethod: {
                type: "object" as const,
                properties: {
                  type: {
                    type: "string" as const,
                    enum: ["card", "bank_transfer", "wallet"],
                  },
                  card: {
                    type: "object" as const,
                    properties: {
                      number: { type: "string" as const },
                      expMonth: {
                        type: "integer" as const,
                        minimum: 1,
                        maximum: 12,
                      },
                      expYear: { type: "integer" as const },
                      cvc: { type: "string" as const },
                    },
                  },
                },
              },
              customer: {
                type: "object" as const,
                properties: {
                  email: { type: "string" as const, format: "email" as const },
                  name: { type: "string" as const },
                },
              },
              description: { type: "string" as const },
              metadata: {
                type: "object" as const,
                additionalProperties: { type: "string" as const },
              },
            },
          },
        },
      },
      required: true,
    },
  };

  // 内容管理 API 示例
  const cmsParams = {
    endpoint: "https://api.cms.example.com/v1/articles",
    method: OpenAPIV3.HttpMethods.PUT,
    parameters: [
      {
        name: "articleId",
        in: "path" as const,
        required: true,
        schema: { type: "string" as const },
      },
      {
        name: "publish",
        in: "query" as const,
        required: false,
        schema: { type: "boolean" as const, default: false },
      },
      {
        name: "X-CMS-Token",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const },
      },
    ],
    requestBodyExample: {
      title: "如何构建现代化的 Web 应用",
      content: "在这篇文章中，我们将探讨现代 Web 应用开发的最佳实践...",
      excerpt: "探讨现代 Web 应用开发的最佳实践和技术栈选择",
      author: {
        id: "author_123",
        name: "张三",
        email: "zhangsan@example.com",
      },
      categories: ["技术", "Web开发", "前端"],
      tags: ["React", "Next.js", "TypeScript"],
      seo: {
        metaTitle: "现代化 Web 应用开发指南",
        metaDescription: "学习如何使用最新技术构建高性能的 Web 应用",
        keywords: ["Web开发", "React", "性能优化"],
      },
      publishedAt: "2024-01-15T10:00:00Z",
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["title", "content"],
            properties: {
              title: { type: "string" as const, maxLength: 200 },
              content: { type: "string" as const },
              excerpt: { type: "string" as const, maxLength: 500 },
              author: {
                type: "object" as const,
                properties: {
                  id: { type: "string" as const },
                  name: { type: "string" as const },
                  email: { type: "string" as const, format: "email" as const },
                },
              },
              categories: {
                type: "array" as const,
                items: { type: "string" as const },
              },
              tags: {
                type: "array" as const,
                items: { type: "string" as const },
              },
              seo: {
                type: "object" as const,
                properties: {
                  metaTitle: { type: "string" as const },
                  metaDescription: { type: "string" as const },
                  keywords: {
                    type: "array" as const,
                    items: { type: "string" as const },
                  },
                },
              },
              publishedAt: {
                type: "string" as const,
                format: "date-time" as const,
              },
            },
          },
        },
      },
      required: true,
    },
  };

  // 邮件发送 API 示例
  const emailParams = {
    endpoint: "https://api.mail.example.com/v1/send",
    method: OpenAPIV3.HttpMethods.POST,
    parameters: [
      {
        name: "X-Mail-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const },
      },
    ],
    requestBodyExample: {
      from: {
        email: "noreply@example.com",
        name: "Example Corp",
      },
      to: [
        {
          email: "user@example.com",
          name: "John Doe",
        },
      ],
      cc: [],
      bcc: [],
      subject: "欢迎加入我们的服务",
      content: {
        text: "感谢您注册我们的服务！",
        html: "<h1>欢迎！</h1><p>感谢您注册我们的服务！</p>",
      },
      attachments: [
        {
          filename: "welcome.pdf",
          content: "base64_encoded_content",
          type: "application/pdf",
        },
      ],
      options: {
        trackOpens: true,
        trackClicks: true,
        priority: "normal",
      },
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["from", "to", "subject", "content"],
            properties: {
              from: {
                type: "object" as const,
                properties: {
                  email: { type: "string" as const, format: "email" as const },
                  name: { type: "string" as const },
                },
              },
              to: {
                type: "array" as const,
                items: {
                  type: "object" as const,
                  properties: {
                    email: {
                      type: "string" as const,
                      format: "email" as const,
                    },
                    name: { type: "string" as const },
                  },
                },
              },
              cc: {
                type: "array" as const,
                items: { type: "object" as const },
              },
              bcc: {
                type: "array" as const,
                items: { type: "object" as const },
              },
              subject: { type: "string" as const },
              content: {
                type: "object" as const,
                properties: {
                  text: { type: "string" as const },
                  html: { type: "string" as const },
                },
              },
              attachments: {
                type: "array" as const,
                items: {
                  type: "object" as const,
                  properties: {
                    filename: { type: "string" as const },
                    content: { type: "string" as const },
                    type: { type: "string" as const },
                  },
                },
              },
              options: {
                type: "object" as const,
                properties: {
                  trackOpens: { type: "boolean" as const },
                  trackClicks: { type: "boolean" as const },
                  priority: {
                    type: "string" as const,
                    enum: ["low", "normal", "high"],
                  },
                },
              },
            },
          },
        },
      },
      required: true,
    },
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
