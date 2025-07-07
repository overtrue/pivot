import {
  ParameterItem,
  type ParameterItemProps,
} from "@/registry/default/ui/parameter-item";

export default function ParameterItemDemo() {
  // 真实的 API 参数示例
  const userIdParam: ParameterItemProps = {
    name: "userId",
    in: "path" as const,
    required: true,
    description: "用户的唯一标识符",
    schema: {
      type: "string" as const,
      format: "uuid" as const,
      example: "123e4567-e89b-12d3-a456-426614174000",
    },
  };

  const limitParam: ParameterItemProps = {
    name: "limit",
    in: "query" as const,
    required: false,
    description: "返回结果的最大数量",
    schema: {
      type: "number" as const,
      minimum: 1,
      maximum: 100,
      default: 20,
    },
  };

  const apiKeyParam: ParameterItemProps = {
    name: "X-API-Key",
    in: "header" as const,
    required: true,
    description: "API 访问密钥",
    schema: {
      type: "string" as const,
      pattern: "^[a-zA-Z0-9]{32}$",
    },
  };

  const statusParam: ParameterItemProps = {
    name: "status",
    in: "query" as const,
    required: false,
    description: "用户状态筛选",
    schema: {
      type: "string" as const,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  };

  const deprecatedParam: ParameterItemProps = {
    name: "oldFormat",
    in: "query" as const,
    required: false,
    deprecated: true,
    description: "旧版本的格式参数，请使用 format 参数代替",
    schema: {
      type: "boolean" as const,
      default: false,
    },
  };

  return (
    <div className="space-y-6 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">路径参数</h4>
        <ParameterItem {...userIdParam} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">查询参数</h4>
        <div className="space-y-3">
          <ParameterItem {...limitParam} />
          <ParameterItem {...statusParam} />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">请求头参数</h4>
        <ParameterItem {...apiKeyParam} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用参数</h4>
        <ParameterItem {...deprecatedParam} />
      </div>
    </div>
  );
}
