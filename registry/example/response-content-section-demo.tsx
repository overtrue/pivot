import { ResponseContentSection } from "@/registry/pivot/response-content-section";

export default function ResponseContentSectionDemo() {
  // 用户信息响应内容
  const userResponseContent = {
    "application/json": {
      schema: {
        type: "object",
        required: ["success", "data"],
        properties: {
          success: {
            type: "boolean",
            description: "请求是否成功",
            example: true
          },
          data: {
            type: "object",
            description: "用户信息",
            properties: {
              id: {
                type: "string",
                description: "用户 ID",
                example: "user_123e4567-e89b-12d3-a456-426614174000"
              },
              email: {
                type: "string",
                format: "email",
                description: "用户邮箱",
                example: "john.doe@example.com"
              },
              name: {
                type: "string",
                description: "用户姓名",
                example: "John Doe"
              },
              role: {
                type: "string",
                enum: ["admin", "user", "moderator"],
                description: "用户角色",
                example: "admin"
              }
            }
          },
          message: {
            type: "string",
            description: "响应消息",
            example: "用户信息获取成功"
          }
        }
      },
      example: {
        success: true,
        data: {
          id: "user_123e4567-e89b-12d3-a456-426614174000",
          email: "john.doe@example.com",
          name: "John Doe",
          role: "admin"
        },
        message: "用户信息获取成功"
      }
    }
  };

  // 产品列表响应内容
  const productListResponseContent = {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true
          },
          data: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "prod_987fcdeb" },
                    name: { type: "string", example: "iPhone 15 Pro" },
                    price: { type: "number", example: 7999.00 },
                    currency: { type: "string", example: "CNY" },
                    inStock: { type: "boolean", example: true }
                  }
                }
              },
              pagination: {
                type: "object",
                properties: {
                  page: { type: "integer", example: 1 },
                  pageSize: { type: "integer", example: 20 },
                  total: { type: "integer", example: 156 },
                  totalPages: { type: "integer", example: 8 }
                }
              }
            }
          }
        }
      },
      examples: {
        "success_response": {
          summary: "成功响应示例",
          description: "产品列表获取成功的响应",
          value: {
            success: true,
            data: {
              products: [
                {
                  id: "prod_987fcdeb",
                  name: "iPhone 15 Pro",
                  price: 7999.00,
                  currency: "CNY",
                  inStock: true
                },
                {
                  id: "prod_111e2222",
                  name: "AirPods Pro",
                  price: 1899.00,
                  currency: "CNY",
                  inStock: true
                }
              ],
              pagination: {
                page: 1,
                pageSize: 20,
                total: 156,
                totalPages: 8
              }
            }
          }
        }
      }
    },
    "application/xml": {
      schema: {
        type: "object",
        xml: {
          name: "ProductListResponse"
        }
      },
      example: `<?xml version="1.0" encoding="UTF-8"?>
<ProductListResponse>
  <success>true</success>
  <data>
    <products>
      <product>
        <id>prod_987fcdeb</id>
        <name>iPhone 15 Pro</name>
        <price>7999.00</price>
        <currency>CNY</currency>
      </product>
    </products>
  </data>
</ProductListResponse>`
    }
  };

  // 文件上传响应内容
  const fileUploadResponseContent = {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true
          },
          data: {
            type: "object",
            properties: {
              fileId: {
                type: "string",
                description: "文件 ID",
                example: "file_upload789-abc-def"
              },
              originalName: {
                type: "string",
                description: "原始文件名",
                example: "产品说明书.pdf"
              },
              fileName: {
                type: "string",
                description: "存储文件名",
                example: "product-manual-20240315.pdf"
              },
              size: {
                type: "integer",
                description: "文件大小（字节）",
                example: 2048576
              },
              url: {
                type: "string",
                format: "uri",
                description: "文件访问 URL",
                example: "https://cdn.example.com/files/product-manual-20240315.pdf"
              },
              uploadedAt: {
                type: "string",
                format: "date-time",
                description: "上传时间",
                example: "2024-03-15T14:30:00Z"
              }
            }
          }
        }
      }
    }
  };

  // 错误响应内容
  const errorResponseContent = {
    "application/json": {
      schema: {
        type: "object",
        required: ["success", "error"],
        properties: {
          success: {
            type: "boolean",
            enum: [false],
            example: false
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
                enum: ["VALIDATION_ERROR", "NOT_FOUND", "UNAUTHORIZED", "INTERNAL_ERROR"],
                example: "VALIDATION_ERROR"
              },
              message: {
                type: "string",
                example: "请求参数验证失败"
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    field: { type: "string", example: "email" },
                    message: { type: "string", example: "邮箱格式不正确" }
                  }
                }
              }
            }
          },
          timestamp: {
            type: "string",
            format: "date-time",
            example: "2024-03-15T14:35:00Z"
          }
        }
      },
      examples: {
        "validation_error": {
          summary: "参数验证错误",
          description: "请求参数格式不正确时的错误响应",
          value: {
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
            timestamp: "2024-03-15T14:35:00Z"
          }
        },
        "not_found": {
          summary: "资源未找到",
          description: "请求的资源不存在时的错误响应",
          value: {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "用户不存在"
            },
            timestamp: "2024-03-15T14:35:00Z"
          }
        }
      }
    },
    "application/problem+json": {
      schema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            format: "uri",
            example: "https://example.com/problems/validation-error"
          },
          title: {
            type: "string",
            example: "参数验证失败"
          },
          status: {
            type: "integer",
            example: 400
          },
          detail: {
            type: "string",
            example: "提交的数据包含无效字段"
          },
          instance: {
            type: "string",
            format: "uri",
            example: "/api/users/123"
          }
        }
      }
    }
  };

  // 支付响应内容
  const paymentResponseContent = {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true
          },
          data: {
            type: "object",
            properties: {
              paymentId: {
                type: "string",
                example: "pay_abc123def456"
              },
              orderId: {
                type: "string",
                example: "order_456e7890"
              },
              amount: {
                type: "number",
                example: 10887.80
              },
              currency: {
                type: "string",
                example: "CNY"
              },
              status: {
                type: "string",
                enum: ["pending", "processing", "completed", "failed"],
                example: "completed"
              },
              paymentUrl: {
                type: "string",
                format: "uri",
                description: "支付页面 URL（仅在状态为 pending 时返回）",
                example: "https://payment.example.com/pay/abc123def456"
              }
            }
          }
        }
      }
    }
  };

  // 数据导出响应内容
  const exportResponseContent = {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "object",
            properties: {
              exportId: { type: "string", example: "export_789xyz123" },
              status: { type: "string", example: "processing" },
              estimatedTime: { type: "integer", example: 300 }
            }
          }
        }
      }
    },
    "text/csv": {
      schema: {
        type: "string",
        format: "binary"
      },
      example: `id,name,email,role,created_at
user_001,Alice Johnson,alice@example.com,admin,2024-01-15T10:30:00Z
user_002,Bob Smith,bob@example.com,user,2024-01-16T11:45:00Z`
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      schema: {
        type: "string",
        format: "binary"
      },
      example: "[Excel 文件二进制数据]"
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户信息响应内容</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          单个用户信息的 API 响应格式，包含完整的用户数据结构
        </p>
        <ResponseContentSection content={userResponseContent} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品列表响应内容</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          分页产品列表的响应格式，支持 JSON 和 XML 两种格式，包含多个示例
        </p>
        <ResponseContentSection content={productListResponseContent} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传响应内容</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传成功后的响应格式，包含文件信息和访问 URL
        </p>
        <ResponseContentSection content={fileUploadResponseContent} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">错误响应内容</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的错误响应格式，支持多种错误类型和 RFC 7807 Problem Details
        </p>
        <ResponseContentSection content={errorResponseContent} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付响应内容</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理的响应格式，包含支付状态和相关信息
        </p>
        <ResponseContentSection content={paymentResponseContent} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据导出响应内容</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据导出功能的响应格式，支持 JSON、CSV 和 Excel 多种格式
        </p>
        <ResponseContentSection content={exportResponseContent} />
      </div>
    </div>
  );
}
