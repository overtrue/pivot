import { RequestBodySection } from "@/registry/pivot/request-body-section";

export default function RequestBodySectionDemo() {
  // 用户创建请求体示例
  const createUserRequestBody = {
    required: true,
    description: "创建新用户所需的信息",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "name"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "用户邮箱地址，必须唯一"
            },
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              description: "用户姓名"
            },
            password: {
              type: "string",
              minLength: 8,
              pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
              description: "密码，至少8位，包含大小写字母和数字"
            },
            age: {
              type: "integer",
              minimum: 0,
              maximum: 150,
              description: "用户年龄"
            },
            phone: {
              type: "string",
              pattern: "^\\+?[1-9]\\d{1,14}$",
              description: "手机号码"
            },
            address: {
              type: "object",
              description: "用户地址信息",
              properties: {
                street: { type: "string", description: "街道地址" },
                city: { type: "string", description: "城市" },
                state: { type: "string", description: "州/省" },
                zipCode: { type: "string", description: "邮政编码" },
                country: { type: "string", description: "国家" }
              }
            },
            preferences: {
              type: "object",
              description: "用户偏好设置",
              properties: {
                theme: {
                  type: "string",
                  enum: ["light", "dark", "auto"],
                  default: "auto",
                  description: "界面主题"
                },
                language: {
                  type: "string",
                  enum: ["zh-CN", "en-US", "ja-JP", "fr-FR"],
                  default: "en-US",
                  description: "界面语言"
                },
                notifications: {
                  type: "object",
                  description: "通知设置",
                  properties: {
                    email: { type: "boolean", default: true },
                    push: { type: "boolean", default: false },
                    sms: { type: "boolean", default: false }
                  }
                }
              }
            }
          }
        },
        example: {
          email: "john.doe@example.com",
          name: "John Doe",
          password: "SecurePass123",
          age: 28,
          phone: "+1-555-123-4567",
          address: {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zipCode: "12345",
            country: "US"
          },
          preferences: {
            theme: "dark",
            language: "en-US",
            notifications: {
              email: true,
              push: false,
              sms: false
            }
          }
        }
      }
    }
  };

  // 文件上传请求体示例
  const fileUploadRequestBody = {
    required: true,
    description: "文件上传数据",
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          required: ["file"],
          properties: {
            file: {
              type: "string",
              format: "binary",
              description: "要上传的文件"
            },
            title: {
              type: "string",
              maxLength: 200,
              description: "文件标题"
            },
            description: {
              type: "string",
              maxLength: 1000,
              description: "文件描述"
            },
            tags: {
              type: "array",
              items: { type: "string" },
              maxItems: 10,
              description: "文件标签"
            },
            isPublic: {
              type: "boolean",
              default: false,
              description: "是否公开"
            },
            category: {
              type: "string",
              enum: ["document", "image", "video", "audio", "other"],
              description: "文件分类"
            }
          }
        }
      },
      "application/json": {
        schema: {
          type: "object",
          required: ["url"],
          properties: {
            url: {
              type: "string",
              format: "uri",
              description: "远程文件 URL"
            },
            title: {
              type: "string",
              maxLength: 200,
              description: "文件标题"
            },
            description: {
              type: "string",
              maxLength: 1000,
              description: "文件描述"
            }
          }
        },
        example: {
          url: "https://example.com/files/document.pdf",
          title: "重要文档",
          description: "这是一个重要的业务文档"
        }
      }
    }
  };

  // 产品更新请求体示例
  const updateProductRequestBody = {
    required: false,
    description: "更新产品信息，只需提供要修改的字段",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 200,
              description: "产品名称"
            },
            description: {
              type: "string",
              maxLength: 2000,
              description: "产品描述"
            },
            price: {
              type: "number",
              multipleOf: 0.01,
              minimum: 0,
              description: "产品价格"
            },
            currency: {
              type: "string",
              enum: ["USD", "EUR", "CNY", "JPY"],
              description: "价格货币"
            },
            category: {
              type: "string",
              description: "产品分类"
            },
            tags: {
              type: "array",
              items: { type: "string" },
              maxItems: 20,
              description: "产品标签"
            },
            specifications: {
              type: "object",
              additionalProperties: { type: "string" },
              description: "产品规格"
            },
            inventory: {
              type: "object",
              description: "库存信息",
              properties: {
                quantity: {
                  type: "integer",
                  minimum: 0,
                  description: "库存数量"
                },
                lowStockThreshold: {
                  type: "integer",
                  minimum: 0,
                  description: "低库存阈值"
                },
                trackInventory: {
                  type: "boolean",
                  description: "是否跟踪库存"
                }
              }
            },
            status: {
              type: "string",
              enum: ["draft", "active", "inactive", "discontinued"],
              description: "产品状态"
            }
          }
        },
        example: {
          name: "iPhone 15 Pro Max",
          description: "最新款 iPhone，配备 A17 Pro 芯片和钛金属设计",
          price: 1199.99,
          currency: "USD",
          category: "Electronics",
          tags: ["smartphone", "apple", "5g", "premium"],
          specifications: {
            "screen_size": "6.7 inches",
            "storage": "256GB",
            "color": "Natural Titanium",
            "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
          },
          inventory: {
            quantity: 100,
            lowStockThreshold: 10,
            trackInventory: true
          },
          status: "active"
        }
      }
    }
  };

  // 批量操作请求体示例
  const batchOperationRequestBody = {
    required: true,
    description: "批量操作请求数据",
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["operation", "items"],
          properties: {
            operation: {
              type: "string",
              enum: ["create", "update", "delete", "archive"],
              description: "操作类型"
            },
            items: {
              type: "array",
              minItems: 1,
              maxItems: 100,
              description: "操作项目列表",
              items: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string", description: "项目 ID" },
                  data: {
                    type: "object",
                    description: "项目数据（仅用于创建和更新操作）"
                  }
                }
              }
            },
            options: {
              type: "object",
              description: "操作选项",
              properties: {
                skipValidation: {
                  type: "boolean",
                  default: false,
                  description: "跳过验证"
                },
                continueOnError: {
                  type: "boolean",
                  default: false,
                  description: "遇到错误时继续执行"
                },
                dryRun: {
                  type: "boolean",
                  default: false,
                  description: "仅验证不执行"
                }
              }
            }
          }
        },
        example: {
          operation: "update",
          items: [
            {
              id: "item_001",
              data: { status: "active", priority: "high" }
            },
            {
              id: "item_002",
              data: { status: "inactive", priority: "low" }
            }
          ],
          options: {
            skipValidation: false,
            continueOnError: true,
            dryRun: false
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户创建请求体</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含完整用户信息的 JSON 请求体，包含验证规则和嵌套对象
        </p>
        <RequestBodySection requestBody={createUserRequestBody} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传请求体</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多种内容类型的文件上传，包含 multipart/form-data 和 JSON 格式
        </p>
        <RequestBodySection requestBody={fileUploadRequestBody} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品更新请求体</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          可选的 PATCH 请求体，支持部分字段更新和复杂的嵌套结构
        </p>
        <RequestBodySection requestBody={updateProductRequestBody} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">批量操作请求体</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          批量处理多个项目的请求体，包含操作类型和选项配置
        </p>
        <RequestBodySection requestBody={batchOperationRequestBody} />
      </div>
    </div>
  );
}
