import { ExamplesDisplay } from "@/registry/pivot/examples-display";

export default function ExamplesDisplayDemo() {
  const examples = {
    "user-example": {
      summary: "用户对象示例",
      description: "一个标准的用户对象，包含基本信息",
      value: {
        id: 1,
        name: "张三",
        email: "zhangsan@example.com",
        age: 30,
        active: true
      }
    },
    "product-example": {
      summary: "产品对象示例",
      description: "电商产品的基本信息结构",
      value: {
        id: "prod-001",
        name: "智能手机",
        price: 2999.99,
        category: "electronics",
        inStock: true,
        tags: ["smartphone", "android", "5G"]
      }
    },
    "error-example": {
      summary: "错误响应示例",
      description: "API 错误响应的标准格式",
      value: {
        error: {
          code: "VALIDATION_ERROR",
          message: "请求参数验证失败",
          details: [
            {
              field: "email",
              message: "邮箱格式不正确"
            }
          ]
        }
      }
    }
  };

  return (
    <div className="space-y-4 min-w-md">
      <ExamplesDisplay examples={examples} />
    </div>
  );
}
