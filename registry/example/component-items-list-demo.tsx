"use client";

import { ComponentItemsList } from "@/registry/pivot/component-items-list";
import { useState } from "react";

export default function ComponentItemsListDemo() {
  const [selectedItems, setSelectedItems] = useState<Record<string, string | null>>({
    userManagement: null,
    ecommerce: null,
    payment: null,
    notification: null,
    fileManagement: null,
  });
  // 用户管理 API 组件列表
  const userManagementComponents = {
    schemas: {
      "User": {
        type: "object",
        required: ["id", "email", "name"],
        properties: {
          id: { type: "string", description: "用户唯一标识符" },
          email: { type: "string", format: "email", description: "用户邮箱地址" },
          name: { type: "string", description: "用户姓名" },
          avatar: { type: "string", format: "uri", description: "用户头像 URL" },
          role: {
            type: "string",
            enum: ["admin", "user", "moderator"],
            description: "用户角色"
          },
          createdAt: { type: "string", format: "date-time", description: "注册时间" }
        }
      },
      "UserProfile": {
        type: "object",
        properties: {
          bio: { type: "string", description: "个人简介" },
          phone: { type: "string", description: "电话号码" },
          address: { $ref: "#/components/schemas/Address" },
          preferences: {
            type: "object",
            properties: {
              language: { type: "string", description: "首选语言" },
              timezone: { type: "string", description: "时区设置" }
            }
          }
        }
      },
      "Address": {
        type: "object",
        properties: {
          country: { type: "string", description: "国家" },
          city: { type: "string", description: "城市" },
          street: { type: "string", description: "街道地址" },
          zipCode: { type: "string", description: "邮政编码" }
        }
      }
    },
    responses: {
      "UserResponse": {
        description: "用户信息响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/User" }
          }
        }
      },
      "UserListResponse": {
        description: "用户列表响应",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" }
                },
                pagination: { $ref: "#/components/schemas/Pagination" }
              }
            }
          }
        }
      }
    }
  };

  // 电商产品 API 组件列表
  const ecommerceComponents = {
    schemas: {
      "Product": {
        type: "object",
        required: ["id", "name", "price"],
        properties: {
          id: { type: "string", description: "产品 ID" },
          name: { type: "string", description: "产品名称" },
          description: { type: "string", description: "产品描述" },
          price: { type: "number", description: "产品价格" },
          currency: { type: "string", description: "货币代码" },
          category: { type: "string", description: "产品分类" },
          brand: { type: "string", description: "品牌名称" },
          images: {
            type: "array",
            items: { type: "string", format: "uri" },
            description: "产品图片列表"
          },
          inStock: { type: "boolean", description: "是否有库存" },
          stockQuantity: { type: "integer", description: "库存数量" }
        }
      },
      "Category": {
        type: "object",
        properties: {
          id: { type: "string", description: "分类 ID" },
          name: { type: "string", description: "分类名称" },
          description: { type: "string", description: "分类描述" },
          parentId: { type: "string", description: "父分类 ID" },
          level: { type: "integer", description: "分类层级" }
        }
      },
      "Review": {
        type: "object",
        properties: {
          id: { type: "string", description: "评价 ID" },
          productId: { type: "string", description: "产品 ID" },
          userId: { type: "string", description: "用户 ID" },
          rating: { type: "integer", minimum: 1, maximum: 5, description: "评分" },
          comment: { type: "string", description: "评价内容" },
          createdAt: { type: "string", format: "date-time", description: "评价时间" }
        }
      }
    },
    responses: {
      "ProductResponse": {
        description: "产品详情响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Product" }
          }
        }
      },
      "ProductListResponse": {
        description: "产品列表响应",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" }
                },
                filters: {
                  type: "object",
                  properties: {
                    category: { type: "string" },
                    priceRange: { type: "object" },
                    brand: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    parameters: {
      "ProductId": {
        name: "productId",
        in: "path",
        required: true,
        schema: { type: "string" },
        description: "产品唯一标识符"
      },
      "CategoryFilter": {
        name: "category",
        in: "query",
        schema: { type: "string" },
        description: "按分类筛选产品"
      }
    }
  };

  // 支付系统组件列表
  const paymentComponents = {
    schemas: {
      "Payment": {
        type: "object",
        required: ["id", "amount", "currency", "status"],
        properties: {
          id: { type: "string", description: "支付 ID" },
          orderId: { type: "string", description: "订单 ID" },
          amount: { type: "number", description: "支付金额" },
          currency: { type: "string", description: "货币代码" },
          method: {
            type: "string",
            enum: ["credit_card", "paypal", "bank_transfer", "alipay", "wechat_pay"],
            description: "支付方式"
          },
          status: {
            type: "string",
            enum: ["pending", "processing", "completed", "failed", "refunded"],
            description: "支付状态"
          },
          gateway: { type: "string", description: "支付网关" },
          transactionId: { type: "string", description: "交易 ID" },
          createdAt: { type: "string", format: "date-time", description: "创建时间" }
        }
      },
      "PaymentMethod": {
        type: "object",
        properties: {
          id: { type: "string", description: "支付方式 ID" },
          type: { type: "string", description: "支付类型" },
          cardLast4: { type: "string", description: "卡号后四位" },
          expiryMonth: { type: "integer", description: "过期月份" },
          expiryYear: { type: "integer", description: "过期年份" },
          isDefault: { type: "boolean", description: "是否为默认支付方式" }
        }
      },
      "Refund": {
        type: "object",
        properties: {
          id: { type: "string", description: "退款 ID" },
          paymentId: { type: "string", description: "原支付 ID" },
          amount: { type: "number", description: "退款金额" },
          reason: { type: "string", description: "退款原因" },
          status: {
            type: "string",
            enum: ["pending", "processing", "completed", "failed"],
            description: "退款状态"
          }
        }
      }
    },
    securitySchemes: {
      "PaymentAuth": {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: "https://payment.example.com/oauth/authorize",
            tokenUrl: "https://payment.example.com/oauth/token",
            scopes: {
              "payment:read": "读取支付信息",
              "payment:write": "创建和修改支付",
              "refund:create": "创建退款"
            }
          }
        }
      }
    }
  };

  // 通知系统组件列表
  const notificationComponents = {
    schemas: {
      "Notification": {
        type: "object",
        properties: {
          id: { type: "string", description: "通知 ID" },
          userId: { type: "string", description: "接收用户 ID" },
          title: { type: "string", description: "通知标题" },
          message: { type: "string", description: "通知内容" },
          type: {
            type: "string",
            enum: ["info", "warning", "error", "success"],
            description: "通知类型"
          },
          channel: {
            type: "string",
            enum: ["email", "sms", "push", "in_app"],
            description: "发送渠道"
          },
          isRead: { type: "boolean", description: "是否已读" },
          createdAt: { type: "string", format: "date-time", description: "创建时间" }
        }
      },
      "NotificationTemplate": {
        type: "object",
        properties: {
          id: { type: "string", description: "模板 ID" },
          name: { type: "string", description: "模板名称" },
          subject: { type: "string", description: "邮件主题" },
          content: { type: "string", description: "模板内容" },
          variables: {
            type: "array",
            items: { type: "string" },
            description: "模板变量"
          }
        }
      }
    },
    responses: {
      "NotificationResponse": {
        description: "通知详情响应",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Notification" }
          }
        }
      }
    }
  };

  // 文件管理组件列表
  const fileManagementComponents = {
    schemas: {
      "File": {
        type: "object",
        properties: {
          id: { type: "string", description: "文件 ID" },
          originalName: { type: "string", description: "原始文件名" },
          fileName: { type: "string", description: "存储文件名" },
          mimeType: { type: "string", description: "文件 MIME 类型" },
          size: { type: "integer", description: "文件大小（字节）" },
          url: { type: "string", format: "uri", description: "文件访问 URL" },
          thumbnailUrl: { type: "string", format: "uri", description: "缩略图 URL" },
          uploadedBy: { type: "string", description: "上传用户 ID" },
          uploadedAt: { type: "string", format: "date-time", description: "上传时间" },
          metadata: {
            type: "object",
            description: "文件元数据"
          }
        }
      },
      "UploadSession": {
        type: "object",
        properties: {
          id: { type: "string", description: "上传会话 ID" },
          status: {
            type: "string",
            enum: ["pending", "uploading", "completed", "failed"],
            description: "上传状态"
          },
          progress: { type: "number", description: "上传进度（0-100）" },
          totalSize: { type: "integer", description: "总文件大小" },
          uploadedSize: { type: "integer", description: "已上传大小" }
        }
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 组件列表</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户管理系统的完整组件定义，包含用户、资料和地址等数据模型
        </p>
        <ComponentItemsList
          items={Object.keys(userManagementComponents.schemas || {})}
          selectedItem={selectedItems.userManagement || null}
          onSelectItem={(item) => setSelectedItems(prev => ({ ...prev, userManagement: item }))}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">电商产品 API 组件列表</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台的产品管理组件，包含产品、分类、评价等完整数据结构
        </p>
        <ComponentItemsList
          items={Object.keys(ecommerceComponents.schemas || {})}
          selectedItem={selectedItems.ecommerce || null}
          onSelectItem={(item) => setSelectedItems(prev => ({ ...prev, ecommerce: item }))}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付系统组件列表</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理系统的组件定义，包含支付、退款和安全认证等功能
        </p>
        <ComponentItemsList
          items={Object.keys(paymentComponents.schemas || {})}
          selectedItem={selectedItems.payment || null}
          onSelectItem={(item) => setSelectedItems(prev => ({ ...prev, payment: item }))}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知系统组件列表</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          消息通知系统的组件定义，支持多种通知类型和发送渠道
        </p>
        <ComponentItemsList
          items={Object.keys(notificationComponents.schemas || {})}
          selectedItem={selectedItems.notification || null}
          onSelectItem={(item) => setSelectedItems(prev => ({ ...prev, notification: item }))}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件管理组件列表</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传和管理系统的组件定义，包含文件信息和上传会话
        </p>
        <ComponentItemsList
          items={Object.keys(fileManagementComponents.schemas || {})}
          selectedItem={selectedItems.fileManagement || null}
          onSelectItem={(item) => setSelectedItems(prev => ({ ...prev, fileManagement: item }))}
        />
      </div>
    </div>
  );
}
