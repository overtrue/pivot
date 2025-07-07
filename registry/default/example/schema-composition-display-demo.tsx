import { SchemaCompositionDisplay } from "@/registry/default/ui/schema-composition-display";
import type { OpenAPIV3 } from "openapi-types";

export default function SchemaCompositionDisplayDemo() {
  // allOf 组合 - 用户完整信息
  const userAllOfSchema = {
    allOf: [
      {
        type: "object" as const,
        properties: {
          id: {
            type: "string" as const,
            description: "用户唯一标识符",
            example: "user_123e4567-e89b-12d3-a456-426614174000",
          },
          email: {
            type: "string" as const,
            format: "email" as const,
            description: "用户邮箱地址",
            example: "john.doe@example.com",
          },
          name: {
            type: "string" as const,
            description: "用户姓名",
            example: "John Doe",
          },
        },
      },
      {
        type: "object" as const,
        properties: {
          profile: {
            type: "object" as const,
            properties: {
              bio: {
                type: "string" as const,
                description: "个人简介",
                example: "资深软件工程师",
              },
              avatar: {
                type: "string" as const,
                format: "uri" as const,
                description: "头像 URL",
                example: "https://cdn.example.com/avatars/john-doe.jpg",
              },
            },
          },
          preferences: {
            type: "object" as const,
            properties: {
              language: {
                type: "string" as const,
                description: "首选语言",
                example: "zh-CN",
              },
              timezone: {
                type: "string" as const,
                description: "时区设置",
                example: "Asia/Shanghai",
              },
            },
          },
        },
      },
    ] as OpenAPIV3.SchemaObject[],
  };

  // oneOf 组合 - 支付方式
  const paymentMethodOneOfSchema = {
    oneOf: [
      {
        type: "object" as const,
        title: "信用卡支付",
        required: ["type", "cardNumber", "expiryDate", "cvv"],
        properties: {
          type: {
            type: "string" as const,
            enum: ["credit_card"],
            example: "credit_card",
          },
          cardNumber: {
            type: "string" as const,
            pattern: "^[0-9]{16}$",
            description: "16位信用卡号",
            example: "4242424242424242",
          },
          expiryDate: {
            type: "string" as const,
            pattern: "^(0[1-9]|1[0-2])/[0-9]{2}$",
            description: "过期日期 MM/YY",
            example: "12/27",
          },
          cvv: {
            type: "string" as const,
            pattern: "^[0-9]{3,4}$",
            description: "安全码",
            example: "123",
          },
          holderName: {
            type: "string" as const,
            description: "持卡人姓名",
            example: "John Doe",
          },
        },
      },
      {
        type: "object" as const,
        title: "支付宝支付",
        required: ["type", "alipayAccount"],
        properties: {
          type: {
            type: "string" as const,
            enum: ["alipay"],
            example: "alipay",
          },
          alipayAccount: {
            type: "string" as const,
            description: "支付宝账号",
            example: "john.doe@example.com",
          },
          returnUrl: {
            type: "string" as const,
            format: "uri" as const,
            description: "支付完成后的回调 URL",
            example: "https://example.com/payment/callback",
          },
        },
      },
      {
        type: "object" as const,
        title: "微信支付",
        required: ["type", "openId"],
        properties: {
          type: {
            type: "string" as const,
            enum: ["wechat_pay"],
            example: "wechat_pay",
          },
          openId: {
            type: "string" as const,
            description: "微信用户 OpenID",
            example: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
          },
          appId: {
            type: "string" as const,
            description: "微信应用 ID",
            example: "wx1234567890abcdef",
          },
        },
      },
    ] as OpenAPIV3.SchemaObject[],
  };

  // anyOf 组合 - 联系方式
  const contactAnyOfSchema = {
    anyOf: [
      {
        type: "object" as const,
        title: "邮箱联系",
        properties: {
          email: {
            type: "string" as const,
            format: "email" as const,
            description: "邮箱地址",
            example: "contact@example.com",
          },
          emailVerified: {
            type: "boolean" as const,
            description: "邮箱是否已验证",
            example: true,
          },
        },
      },
      {
        type: "object" as const,
        title: "电话联系",
        properties: {
          phone: {
            type: "string" as const,
            pattern: "^\\+?[1-9]\\d{1,14}$",
            description: "电话号码",
            example: "+86 138-0013-8000",
          },
          phoneVerified: {
            type: "boolean" as const,
            description: "电话是否已验证",
            example: true,
          },
        },
      },
      {
        type: "object" as const,
        title: "地址联系",
        properties: {
          address: {
            type: "object" as const,
            properties: {
              street: {
                type: "string" as const,
                description: "街道地址",
                example: "中关村大街1号",
              },
              city: {
                type: "string" as const,
                description: "城市",
                example: "北京市",
              },
              postalCode: {
                type: "string" as const,
                description: "邮政编码",
                example: "100080",
              },
            },
          },
        },
      },
    ] as OpenAPIV3.SchemaObject[],
  };

  // 复杂组合 - 产品变体
  const productVariantComplexSchema = {
    allOf: [
      {
        type: "object" as const,
        title: "基础产品信息",
        required: ["id", "name", "price"],
        properties: {
          id: {
            type: "string" as const,
            description: "产品 ID",
            example: "prod_clothing_001",
          },
          name: {
            type: "string" as const,
            description: "产品名称",
            example: "经典棉质 T 恤",
          },
          description: {
            type: "string" as const,
            description: "产品描述",
            example: "100% 纯棉材质，舒适透气，适合日常穿着",
          },
          price: {
            type: "number" as const,
            description: "产品价格（分）",
            example: 9900,
          },
          currency: {
            type: "string" as const,
            description: "货币代码",
            example: "CNY",
          },
        },
      },
      {
        oneOf: [
          {
            type: "object" as const,
            title: "服装变体",
            properties: {
              category: {
                type: "string" as const,
                enum: ["clothing"],
                example: "clothing",
              },
              size: {
                type: "string" as const,
                enum: ["XS", "S", "M", "L", "XL", "XXL"],
                description: "尺码",
                example: "M",
              },
              color: {
                type: "string" as const,
                description: "颜色",
                example: "黑色",
              },
              material: {
                type: "string" as const,
                description: "材质",
                example: "100% 纯棉",
              },
              careInstructions: {
                type: "array" as const,
                items: {
                  type: "string" as const,
                },
                description: "护理说明",
                example: ["机洗", "低温烘干", "不可漂白"],
              },
            },
          },
          {
            type: "object" as const,
            title: "电子产品变体",
            properties: {
              category: {
                type: "string" as const,
                enum: ["electronics"],
                example: "electronics",
              },
              model: {
                type: "string" as const,
                description: "型号",
                example: "iPhone 15 Pro",
              },
              storage: {
                type: "string" as const,
                enum: ["128GB", "256GB", "512GB", "1TB"],
                description: "存储容量",
                example: "256GB",
              },
              color: {
                type: "string" as const,
                description: "颜色",
                example: "深空黑色",
              },
              warranty: {
                type: "object" as const,
                properties: {
                  duration: {
                    type: "integer" as const,
                    description: "保修期（月）",
                    example: 12,
                  },
                  type: {
                    type: "string" as const,
                    enum: ["standard", "extended"],
                    description: "保修类型",
                    example: "standard",
                  },
                },
              },
            },
          },
          {
            type: "object" as const,
            title: "图书变体",
            properties: {
              category: {
                type: "string" as const,
                enum: ["books"],
                example: "books",
              },
              isbn: {
                type: "string" as const,
                pattern:
                  "^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$",
                description: "ISBN 编号",
                example: "978-0-13-601970-1",
              },
              author: {
                type: "string" as const,
                description: "作者",
                example: "Robert C. Martin",
              },
              publisher: {
                type: "string" as const,
                description: "出版社",
                example: "Prentice Hall",
              },
              language: {
                type: "string" as const,
                description: "语言",
                example: "中文",
              },
              format: {
                type: "string" as const,
                enum: ["hardcover", "paperback", "ebook"],
                description: "版本格式",
                example: "paperback",
              },
            },
          },
        ],
      },
    ] as OpenAPIV3.SchemaObject[],
  };

  // 嵌套组合 - API 响应
  const apiResponseNestedSchema = {
    allOf: [
      {
        type: "object" as const,
        title: "基础响应结构",
        required: ["success", "timestamp"],
        properties: {
          success: {
            type: "boolean" as const,
            description: "请求是否成功",
            example: true,
          },
          timestamp: {
            type: "string" as const,
            format: "date-time" as const,
            description: "响应时间戳",
            example: "2024-03-15T14:30:00Z",
          },
          requestId: {
            type: "string" as const,
            description: "请求追踪 ID",
            example: "req_789abc12-def3-4567",
          },
        },
      },
      {
        oneOf: [
          {
            type: "object" as const,
            title: "成功响应",
            properties: {
              data: {
                anyOf: [
                  {
                    type: "object" as const,
                    title: "单个对象",
                    description: "返回单个数据对象",
                  },
                  {
                    type: "array" as const,
                    title: "对象数组",
                    description: "返回数据对象数组",
                    items: {
                      type: "object" as const,
                    },
                  },
                ],
              },
              message: {
                type: "string" as const,
                description: "成功消息",
                example: "操作完成",
              },
            },
          },
          {
            type: "object" as const,
            title: "错误响应",
            properties: {
              error: {
                type: "object" as const,
                required: ["code", "message"],
                properties: {
                  code: {
                    type: "string" as const,
                    description: "错误代码",
                    example: "VALIDATION_ERROR",
                  },
                  message: {
                    type: "string" as const,
                    description: "错误描述",
                    example: "请求参数验证失败",
                  },
                  details: {
                    type: "array" as const,
                    items: {
                      type: "object" as const,
                      properties: {
                        field: {
                          type: "string" as const,
                          description: "错误字段",
                          example: "email",
                        },
                        message: {
                          type: "string" as const,
                          description: "字段错误描述",
                          example: "邮箱格式不正确",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    ] as OpenAPIV3.SchemaObject[],
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">allOf 组合 - 用户完整信息</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用 allOf 组合多个 Schema，创建包含基础信息和扩展信息的完整用户模型
        </p>
        <SchemaCompositionDisplay
          keyword="allOf"
          subschemas={userAllOfSchema.allOf}
          currentDepth={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">oneOf 组合 - 支付方式选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用 oneOf 定义多种互斥的支付方式，每种方式有不同的必需字段
        </p>
        <SchemaCompositionDisplay
          keyword="oneOf"
          subschemas={paymentMethodOneOfSchema.oneOf}
          currentDepth={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">anyOf 组合 - 联系方式</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用 anyOf 定义多种可选的联系方式，可以同时提供多种联系方式
        </p>
        <SchemaCompositionDisplay
          keyword="anyOf"
          subschemas={contactAnyOfSchema.anyOf}
          currentDepth={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">复杂组合 - 产品变体</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          结合 allOf 和 oneOf 创建复杂的产品变体模型，支持不同类别的产品规格
        </p>
        <SchemaCompositionDisplay
          keyword="allOf"
          subschemas={productVariantComplexSchema.allOf}
          currentDepth={0}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">嵌套组合 - API 响应结构</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多层嵌套的 Schema 组合，定义灵活的 API
          响应格式，支持成功和错误两种情况
        </p>
        <SchemaCompositionDisplay
          keyword="allOf"
          subschemas={apiResponseNestedSchema.allOf}
          currentDepth={0}
        />
      </div>
    </div>
  );
}
