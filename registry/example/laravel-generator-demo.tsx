import { LaravelGenerator } from "@/registry/pivot/laravel-generator";

export default function LaravelGeneratorDemo() {
  // 用户资源 API 示例
  const userResourceParams = {
    endpoint: "https://api.laravel-app.com/api/v1/users",
    method: "POST" as const,
    parameters: [
      {
        name: "Accept",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const, enum: ["application/json"] }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      name: "张三",
      email: "zhangsan@example.com",
      password: "SecurePass123",
      password_confirmation: "SecurePass123",
      role: "user",
      profile: {
        phone: "+86-138-0013-8000",
        address: "北京市朝阳区建国路88号",
        avatar: "https://example.com/avatars/zhangsan.jpg"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["name", "email", "password", "password_confirmation"],
            properties: {
              name: { type: "string" as const, maxLength: 255 },
              email: { type: "string" as const, format: "email" as const },
              password: { type: "string" as const, minLength: 8 },
              password_confirmation: { type: "string" as const, minLength: 8 },
              role: { type: "string" as const, enum: ["admin", "user", "moderator"] },
              profile: {
                type: "object" as const,
                properties: {
                  phone: { type: "string" as const },
                  address: { type: "string" as const },
                  avatar: { type: "string" as const, format: "uri" as const }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 文章管理 API 示例
  const articleParams = {
    endpoint: "https://api.laravel-app.com/api/v1/articles",
    method: "GET" as const,
    parameters: [
      {
        name: "page",
        in: "query" as const,
        required: false,
        schema: { type: "integer" as const, minimum: 1, default: 1 }
      },
      {
        name: "per_page",
        in: "query" as const,
        required: false,
        schema: { type: "integer" as const, minimum: 1, maximum: 100, default: 15 }
      },
      {
        name: "status",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, enum: ["published", "draft", "archived"] }
      },
      {
        name: "category_id",
        in: "query" as const,
        required: false,
        schema: { type: "integer" as const }
      },
      {
        name: "search",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const }
      },
      {
        name: "sort",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, enum: ["created_at", "updated_at", "title", "views"] }
      },
      {
        name: "order",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, enum: ["asc", "desc"], default: "desc" }
      },
      {
        name: "with",
        in: "query" as const,
        required: false,
        schema: {
          type: "array" as const,
          items: { type: "string" as const, enum: ["author", "category", "tags", "comments"] }
        }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: null,
    requestBody: undefined
  };

  // 订单处理 API 示例
  const orderParams = {
    endpoint: "https://api.laravel-app.com/api/v1/orders/{orderId}/status",
    method: "PATCH" as const,
    parameters: [
      {
        name: "orderId",
        in: "path" as const,
        required: true,
        schema: { type: "string" as const }
      },
      {
        name: "X-CSRF-TOKEN",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      status: "processing",
      notes: "订单已确认，正在准备发货",
      notify_customer: true,
      tracking_info: {
        carrier: "顺丰速运",
        tracking_number: "SF1234567890",
        estimated_delivery: "2024-01-20"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["status"],
            properties: {
              status: {
                type: "string" as const,
                enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]
              },
              notes: { type: "string" as const, maxLength: 1000 },
              notify_customer: { type: "boolean" as const, default: true },
              tracking_info: {
                type: "object" as const,
                properties: {
                  carrier: { type: "string" as const },
                  tracking_number: { type: "string" as const },
                  estimated_delivery: { type: "string" as const, format: "date" as const }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 文件上传 API 示例
  const uploadParams = {
    endpoint: "https://api.laravel-app.com/api/v1/media/upload",
    method: "POST" as const,
    parameters: [
      {
        name: "disk",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, enum: ["local", "s3", "oss"], default: "local" }
      },
      {
        name: "folder",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const }
      },
      {
        name: "X-CSRF-TOKEN",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      file: "binary_file_data",
      alt_text: "产品展示图片",
      caption: "新款手机产品图",
      metadata: {
        category: "product",
        product_id: "prod_123",
        is_featured: true
      }
    },
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object" as const,
            required: ["file"],
            properties: {
              file: { type: "string" as const, format: "binary" },
              alt_text: { type: "string" as const, maxLength: 255 },
              caption: { type: "string" as const, maxLength: 500 },
              metadata: {
                type: "object" as const,
                properties: {
                  category: { type: "string" as const },
                  product_id: { type: "string" as const },
                  is_featured: { type: "boolean" as const }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 数据导出 API 示例
  const exportParams = {
    endpoint: "https://api.laravel-app.com/api/v1/reports/export",
    method: "POST" as const,
    parameters: [
      {
        name: "format",
        in: "query" as const,
        required: false,
        schema: { type: "string" as const, enum: ["csv", "xlsx", "pdf"], default: "xlsx" }
      },
      {
        name: "async",
        in: "query" as const,
        required: false,
        schema: { type: "boolean" as const, default: true }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" as const }
      }
    ],
    requestBodyExample: {
      report_type: "sales_summary",
      date_range: {
        start_date: "2024-01-01",
        end_date: "2024-01-31"
      },
      filters: {
        status: ["completed", "processing"],
        category_ids: [1, 2, 5],
        min_amount: 100
      },
      columns: [
        "order_id",
        "customer_name",
        "total_amount",
        "status",
        "created_at"
      ],
      options: {
        include_headers: true,
        group_by: "category",
        sort_by: "total_amount",
        sort_order: "desc"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            required: ["report_type", "date_range"],
            properties: {
              report_type: {
                type: "string" as const,
                enum: ["sales_summary", "user_activity", "inventory_report", "financial_summary"]
              },
              date_range: {
                type: "object" as const,
                required: ["start_date", "end_date"],
                properties: {
                  start_date: { type: "string" as const, format: "date" as const },
                  end_date: { type: "string" as const, format: "date" as const }
                }
              },
              filters: {
                type: "object" as const,
                properties: {
                  status: { type: "array" as const, items: { type: "string" as const } },
                  category_ids: { type: "array" as const, items: { type: "integer" as const } },
                  min_amount: { type: "number" as const }
                }
              },
              columns: {
                type: "array" as const,
                items: { type: "string" as const }
              },
              options: {
                type: "object" as const,
                properties: {
                  include_headers: { type: "boolean" as const, default: true },
                  group_by: { type: "string" as const },
                  sort_by: { type: "string" as const },
                  sort_order: { type: "string" as const, enum: ["asc", "desc"] }
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
        <h4 className="text-sm font-medium mb-3">用户资源创建 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Laravel 用户注册接口的 HTTP 客户端代码，包含验证和关联数据
        </p>
        <LaravelGenerator params={userResourceParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文章列表查询 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Laravel 分页查询接口，包含筛选、排序和关联加载
        </p>
        <LaravelGenerator params={articleParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单状态更新 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Laravel 订单管理接口，包含 CSRF 保护和状态流转
        </p>
        <LaravelGenerator params={orderParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Laravel 媒体文件上传接口，支持多种存储驱动和元数据
        </p>
        <LaravelGenerator params={uploadParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据导出 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Laravel 报表导出接口，支持多种格式和异步处理
        </p>
        <LaravelGenerator params={exportParams} />
      </div>
    </div>
  );
}
