"use client";

import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ExampleDisplay } from "@/registry/pivot/example-display";

export default function ExampleDisplayDemo() {
  // 用户信息示例
  const userExample = {
    value: {
      id: "user_123e4567-e89b-12d3-a456-426614174000",
      email: "john.doe@example.com",
      name: "John Doe",
      avatar: "https://cdn.example.com/avatars/john-doe.jpg",
      role: "admin",
      createdAt: "2024-01-15T10:30:00Z",
      lastLoginAt: "2024-03-15T14:22:33Z",
      profile: {
        bio: "资深软件工程师，专注于 API 设计和微服务架构",
        phone: "+86 138-0013-8000",
        address: {
          country: "中国",
          city: "北京",
          street: "中关村大街1号",
          zipCode: "100080"
        },
        preferences: {
          language: "zh-CN",
          timezone: "Asia/Shanghai",
          notifications: true
        }
      }
    },
    summary: "用户完整信息示例",
    description: "包含用户基本信息、资料和偏好设置的完整用户对象"
  };

  // 产品信息示例
  const productExample = {
    value: {
      id: "prod_987fcdeb-51a2-4567-8901-234567890abc",
      name: "iPhone 15 Pro",
      description: "Apple 最新旗舰智能手机，配备 A17 Pro 芯片和钛金属机身",
      price: 7999.00,
      currency: "CNY",
      category: "electronics",
      brand: "Apple",
      sku: "IPHONE15PRO-256GB-BLUE",
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
    },
    summary: "电商产品信息示例",
    description: "包含价格、规格、库存等完整信息的产品对象"
  };

  // 订单信息示例
  const orderExample = {
    value: {
      id: "order_456e7890-a12b-34c5-6789-012345678901",
      customerId: "user_123e4567-e89b-12d3-a456-426614174000",
      orderNumber: "ORD-2024-03-001234",
      status: "confirmed",
      items: [
        {
          productId: "prod_987fcdeb-51a2-4567-8901-234567890abc",
          productName: "iPhone 15 Pro",
          quantity: 1,
          unitPrice: 7999.00,
          totalPrice: 7999.00
        },
        {
          productId: "prod_111e2222-3333-4444-5555-666677778888",
          productName: "AirPods Pro (第2代)",
          quantity: 1,
          unitPrice: 1899.00,
          totalPrice: 1899.00
        }
      ],
      subtotal: 9898.00,
      shipping: 0.00,
      tax: 989.80,
      totalAmount: 10887.80,
      currency: "CNY",
      createdAt: "2024-03-15T09:15:30Z",
      shippingAddress: {
        name: "张三",
        phone: "+86 138-0013-8000",
        address: "北京市海淀区中关村大街1号",
        zipCode: "100080"
      }
    },
    summary: "订单详情示例",
    description: "包含商品、价格、地址等完整信息的订单对象"
  };

  // API 响应示例
  const apiResponseExample = {
    value: {
      success: true,
      data: {
        users: [
          {
            id: "user_001",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "user"
          },
          {
            id: "user_002",
            name: "Bob Smith",
            email: "bob@example.com",
            role: "admin"
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
    },
    summary: "分页列表 API 响应示例",
    description: "标准的分页列表响应格式，包含数据、分页信息和元数据"
  };

  // 错误响应示例
  const errorResponseExample = {
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
      timestamp: "2024-03-15T14:35:00Z",
      requestId: "req_error123-456-789-abc-def012345678"
    },
    summary: "验证错误响应示例",
    description: "参数验证失败时的错误响应格式，包含详细的字段错误信息"
  };

  // 支付信息示例
  const paymentExample = {
    value: {
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
    },
    summary: "支付交易示例",
    description: "信用卡支付的完整交易信息，包含支付方式和卡片信息"
  };

  // 文件上传示例
  const fileUploadExample = {
    value: {
      id: "file_upload789-abc-def-012-345678901234",
      originalName: "产品说明书.pdf",
      fileName: "product-manual-20240315-143000.pdf",
      mimeType: "application/pdf",
      size: 2048576,
      url: "https://cdn.example.com/files/product-manual-20240315-143000.pdf",
      thumbnailUrl: "https://cdn.example.com/thumbnails/product-manual-thumb.jpg",
      uploadedBy: "user_123e4567-e89b-12d3-a456-426614174000",
      uploadedAt: "2024-03-15T14:30:00Z",
      metadata: {
        pages: 24,
        author: "产品团队",
        version: "v2.1"
      }
    },
    summary: "文件上传结果示例",
    description: "文件上传成功后返回的文件信息，包含 URL、元数据等"
  };

  // 数组数据示例
  const arrayExample = {
    value: [
      "electronics",
      "clothing",
      "books",
      "home-garden",
      "sports-outdoors"
    ],
    summary: "产品分类列表示例",
    description: "简单的字符串数组，表示电商平台的产品分类"
  };

  // 基础数据类型示例
  const primitiveExamples = [
    {
      value: "Hello, World!",
      summary: "字符串示例",
      description: "简单的文本字符串"
    },
    {
      value: 42,
      summary: "数字示例",
      description: "整数类型的数值"
    },
    {
      value: 3.14159,
      summary: "浮点数示例",
      description: "小数类型的数值"
    },
    {
      value: true,
      summary: "布尔值示例",
      description: "真值类型的布尔值"
    },
    {
      value: null,
      summary: "空值示例",
      description: "表示空值或不存在的数据"
    }
  ];

  const jsonExample = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    active: true,
    address: {
      street: "123 Main St",
      city: "New York",
      zipCode: "10001"
    },
    hobbies: ["reading", "swimming", "coding"]
  };

  const xmlExample = `<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123</id>
  <name>John Doe</name>
  <email>john@example.com</email>
  <age>30</age>
  <active>true</active>
</user>`;

  const yamlExample = `id: 123
name: John Doe
email: john@example.com
age: 30
active: true
address:
  street: 123 Main St
  city: New York
  zipCode: "10001"
hobbies:
  - reading
  - swimming
  - coding`;

  return (
    <I18nProvider>
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold">Example Display Demo</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">JSON Example with Copy Button</h3>
          <ExampleDisplay
            example={jsonExample}
            language="json"
            title="User Object"
            className="max-w-2xl"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">XML Example with Copy Button</h3>
          <ExampleDisplay
            example={xmlExample}
            language="xml"
            title="User XML"
            className="max-w-2xl"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">YAML Example with Copy Button</h3>
          <ExampleDisplay
            example={yamlExample}
            language="yaml"
            title="User YAML"
            className="max-w-2xl"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Example without Copy Button</h3>
          <ExampleDisplay
            example={jsonExample}
            language="json"
            title="User Object (No Copy)"
            disableCopy={true}
            className="max-w-2xl"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Example without Title</h3>
          <ExampleDisplay
            example={jsonExample}
            language="json"
            className="max-w-2xl"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Empty Example</h3>
          <ExampleDisplay
            example={null}
            language="json"
            title="No Data"
            className="max-w-2xl"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">用户信息示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            完整的用户对象，包含基本信息、资料和偏好设置
          </p>
          <ExampleDisplay example={userExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">产品信息示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            电商产品的详细信息，包含价格、规格、库存等数据
          </p>
          <ExampleDisplay example={productExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">订单信息示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            完整的订单对象，包含商品列表、价格计算和配送信息
          </p>
          <ExampleDisplay example={orderExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">API 响应示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            标准的分页列表 API 响应格式，包含数据和分页信息
          </p>
          <ExampleDisplay example={apiResponseExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">错误响应示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            参数验证失败的错误响应，包含详细的字段错误信息
          </p>
          <ExampleDisplay example={errorResponseExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">支付信息示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            信用卡支付的完整交易记录，包含支付状态和卡片信息
          </p>
          <ExampleDisplay example={paymentExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">文件上传示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            文件上传成功后的响应信息，包含文件 URL 和元数据
          </p>
          <ExampleDisplay example={fileUploadExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">数组数据示例展示</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            简单的字符串数组，展示列表类型数据的格式
          </p>
          <ExampleDisplay example={arrayExample} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">基础数据类型示例</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            各种基础数据类型的示例展示
          </p>
          <div className="space-y-4">
            {primitiveExamples.map((example, index) => (
              <ExampleDisplay key={index} example={example} />
            ))}
          </div>
        </div>
      </div>
    </I18nProvider>
  );
}
