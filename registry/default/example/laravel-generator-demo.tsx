import { OpenAPIV3 } from "openapi-types";
import { LaravelGenerator } from "../ui/laravel-generator";

const mockParams: OpenAPIV3.ParameterObject[] = [
  {
    name: "id",
    in: "path",
    required: true,
    schema: {
      type: "integer",
      description: "用户ID"
    }
  }
];

const mockRequestBody: OpenAPIV3.RequestBodyObject = {
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" }
        }
      }
    }
  }
};

const mockRequestBodyExample = {
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
};

export default function LaravelGeneratorDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Laravel 代码生成器演示</h2>
        <p className="text-muted-foreground mb-4">
          这个组件演示了如何为 Laravel 应用生成正确的 PHP 代码。
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">POST 请求示例</h3>
        <LaravelGenerator
          params={{
            endpoint: "https://api.laravel-app.com/api/v1/users",
            method: OpenAPIV3.HttpMethods.POST,
            parameters: mockParams,
            requestBody: mockRequestBody,
            requestBodyExample: mockRequestBodyExample
          }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">GET 请求示例</h3>
        <LaravelGenerator
          params={{
            endpoint: "https://api.laravel-app.com/api/v1/users/{id}",
            method: OpenAPIV3.HttpMethods.GET,
            parameters: mockParams,
            requestBodyExample: mockRequestBodyExample
          }}
        />
      </div>
    </div>
  );
}

