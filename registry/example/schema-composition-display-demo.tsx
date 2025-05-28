import { SchemaCompositionDisplay } from "@/registry/pivot/schema-composition-display";

export default function SchemaCompositionDisplayDemo() {
  // allOf 组合 - 用户完整信息
  const userAllOfSchema = {
    allOf: [
      {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "用户唯一标识符",
            example: "user_123e4567-e89b-12d3-a456-426614174000"
          },
          email: {
            type: "string",
            format: "email",
            description: "用户邮箱地址",
            example: "john.doe@example.com"
          },
          name: {
            type: "string",
            description: "用户姓名",
            example: "John Doe"
          }
        }
      },
      {
        type: "object",
        properties: {
          profile: {
            type: "object",
            properties: {
              bio: {
                type: "string",
                description: "个人简介",
                example: "资深软件工程师"
              },
              avatar: {
                type: "string",
                format: "uri",
                description: "头像 URL",
                example: "https://cdn.example.com/avatars/john-doe.jpg"
              }
            }
          },
          preferences: {
            type: "object",
            properties: {
              language: {
                type: "string",
                description: "首选语言",
                example: "zh-CN"
              },
              timezone: {
                type: "string",
                description: "时区设置",
                example: "Asia/Shanghai"
              }
            }
          }
        }
      }
    ]
  };

  // oneOf 组合 - 支付方式
  const paymentMethodOneOfSchema = {
    oneOf: [
      {
        type: "object",
        title: "信用卡支付",
        required: ["type", "cardNumber", "expiryDate", "cvv"],
        properties: {
          type: {
            type: "string",
            enum: ["credit_card"],
            example: "credit_card"
          },
          cardNumber: {
            type: "string",
            pattern: "^[0-9]{16}$",
            description: "16位信用卡号",
            example: "4242424242424242"
          },
          expiryDate: {
            type: "string",
            pattern: "^(0[1-9]|1[0-2])/[0-9]{2}$",
            description: "过期日期 MM/YY",
            example: "12/27"
          },
          cvv: {
            type: "string",
            pattern: "^[0-9]{3,4}$",
            description: "安全码",
            example: "123"
          },
          holderName: {
            type: "string",
            description: "持卡人姓名",
            example: "John Doe"
          }
        }
      },
      {
        type: "object",
        title: "支付宝支付",
        required: ["type", "alipayAccount"],
        properties: {
          type: {
            type: "string",
            enum: ["alipay"],
            example: "alipay"
          },
          alipayAccount: {
            type: "string",
            description: "支付宝账号",
            example: "john.doe@example.com"
          },
          returnUrl: {
            type: "string",
            format: "uri",
            description: "支付完成后的回调 URL",
            example: "https://example.com/payment/callback"
          }
        }
      },
      {
        type: "object",
        title: "微信支付",
        required: ["type", "openId"],
        properties: {
          type: {
            type: "string",
            enum: ["wechat_pay"],
            example: "wechat_pay"
          },
          openId: {
            type: "string",
            description: "微信用户 OpenID",
            example: "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o"
          },
          appId: {
            type: "string",
            description: "微信应用 ID",
            example: "wx1234567890abcdef"
          }
        }
      }
    ]
  };

  // anyOf 组合 - 联系方式
  const contactAnyOfSchema = {
    anyOf: [
      {
        type: "object",
        title: "邮箱联系",
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "邮箱地址",
            example: "contact@example.com"
          },
          emailVerified: {
            type: "boolean",
            description: "邮箱是否已验证",
            example: true
          }
        }
      },
      {
        type: "object",
        title: "电话联系",
        properties: {
          phone: {
            type: "string",
            pattern: "^\\+?[1-9]\\d{1,14}$",
            description: "电话号码",
            example: "+86 138-0013-8000"
          },
          phoneVerified: {
            type: "boolean",
            description: "电话是否已验证",
            example: true
          }
        }
      },
      {
        type: "object",
        title: "地址联系",
        properties: {
          address: {
            type: "object",
            properties: {
              street: {
                type: "string",
                description: "街道地址",
                example: "中关村大街1号"
              },
              city: {
                type: "string",
                description: "城市",
                example: "北京"
              },
              country: {
                type: "string",
                description: "国家",
                example: "中国"
              },
              zipCode: {
                type: "string",
                description: "邮政编码",
                example: "100080"
              }
            }
          }
        }
      }
    ]
  };

  // 复杂组合 - 产品变体
  const productVariantComplexSchema = {
    allOf: [
      {
        type: "object",
        title: "基础产品信息",
        required: ["id", "name", "price"],
        properties: {
          id: {
            type: "string",
            description: "产品 ID",
            example: "prod_987fcdeb-51a2-4567"
          },
          name: {
            type: "string",
            description: "产品名称",
            example: "iPhone 15 Pro"
          },
          price: {
            type: "number",
            description: "基础价格",
            example: 7999.00
          },
          currency: {
            type: "string",
            description: "货币代码",
            example: "CNY"
          }
        }
      },
      {
        oneOf: [
          {
            type: "object",
            title: "电子产品变体",
            properties: {
              category: {
                type: "string",
                enum: ["electronics"],
                example: "electronics"
              },
              specifications: {
                type: "object",
                properties: {
                  display: {
                    type: "string",
                    description: "显示屏规格",
                    example: "6.1英寸 Super Retina XDR"
                  },
                  storage: {
                    type: "string",
                    description: "存储容量",
                    example: "256GB"
                  },
                  color: {
                    type: "string",
                    description: "颜色",
                    example: "天然钛金属色"
                  }
                }
              },
              warranty: {
                type: "object",
                properties: {
                  duration: {
                    type: "integer",
                    description: "保修期（月）",
                    example: 12
                  },
                  type: {
                    type: "string",
                    description: "保修类型",
                    example: "manufacturer"
                  }
                }
              }
            }
          },
          {
            type: "object",
            title: "服装产品变体",
            properties: {
              category: {
                type: "string",
                enum: ["clothing"],
                example: "clothing"
              },
              specifications: {
                type: "object",
                properties: {
                  size: {
                    type: "string",
                    enum: ["XS", "S", "M", "L", "XL", "XXL"],
                    description: "尺码",
                    example: "M"
                  },
                  color: {
                    type: "string",
                    description: "颜色",
                    example: "黑色"
                  },
                  material: {
                    type: "string",
                    description: "材质",
                    example: "100% 纯棉"
                  }
                }
              },
              careInstructions: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "护理说明",
                example: ["机洗", "低温烘干", "不可漂白"]
              }
            }
          }
        ]
      }
    ]
  };

  // 嵌套组合 - API 响应
  const apiResponseNestedSchema = {
    allOf: [
      {
        type: "object",
        title: "基础响应结构",
        required: ["success", "timestamp"],
        properties: {
          success: {
            type: "boolean",
            description: "请求是否成功",
            example: true
          },
          timestamp: {
            type: "string",
            format: "date-time",
            description: "响应时间戳",
            example: "2024-03-15T14:30:00Z"
          },
          requestId: {
            type: "string",
            description: "请求追踪 ID",
            example: "req_789abc12-def3-4567"
          }
        }
      },
      {
        oneOf: [
          {
            type: "object",
            title: "成功响应",
            properties: {
              data: {
                anyOf: [
                  {
                    type: "object",
                    title: "单个对象",
                    description: "返回单个数据对象"
                  },
                  {
                    type: "array",
                    title: "对象数组",
                    description: "返回数据对象数组",
                    items: {
                      type: "object"
                    }
                  }
                ]
              },
              message: {
                type: "string",
                description: "成功消息",
                example: "操作完成"
              }
            }
          },
          {
            type: "object",
            title: "错误响应",
            properties: {
              error: {
                type: "object",
                required: ["code", "message"],
                properties: {
                  code: {
                    type: "string",
                    description: "错误代码",
                    example: "VALIDATION_ERROR"
                  },
                  message: {
                    type: "string",
                    description: "错误描述",
                    example: "请求参数验证失败"
                  },
                  details: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        field: {
                          type: "string",
                          description: "错误字段",
                          example: "email"
                        },
                        message: {
                          type: "string",
                          description: "字段错误描述",
                          example: "邮箱格式不正确"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      }
    ]
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
          多层嵌套的 Schema 组合，定义灵活的 API 响应格式，支持成功和错误两种情况
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
