import { HeaderItem } from "@/registry/default/ui/header-item";

export default function HeaderItemDemo() {
  // 认证相关头部
  const authorizationHeader = {
    name: "Authorization",
    description: "Bearer Token 认证头，用于 API 访问授权",
    required: true,
    schema: {
      type: "string" as const,
      pattern: "^Bearer [A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_.+/=]*$"
    },
    example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  };

  // API 密钥头部
  const apiKeyHeader = {
    name: "X-API-Key",
    description: "API 密钥，用于识别和认证客户端应用",
    required: true,
    schema: {
      type: "string" as const,
      minLength: 32,
      maxLength: 64
    },
    example: "ak_live_1234567890abcdef1234567890abcdef"
  };

  // 内容类型头部
  const contentTypeHeader = {
    name: "Content-Type",
    description: "请求体的媒体类型，指定数据格式",
    required: true,
    schema: {
      type: "string" as const,
      enum: ["application/json", "application/xml", "multipart/form-data", "text/plain"]
    },
    example: "application/json"
  };

  // 接受头部
  const acceptHeader = {
    name: "Accept",
    description: "客户端可接受的响应媒体类型",
    required: false,
    schema: {
      type: "string" as const
    },
    example: "application/json, application/xml;q=0.9, */*;q=0.8"
  };

  // 用户代理头部
  const userAgentHeader = {
    name: "User-Agent",
    description: "客户端应用信息，用于统计和兼容性处理",
    required: false,
    schema: {
      type: "string" as const
    },
    example: "MyApp/1.0.0 (iOS 15.0; iPhone13,2)"
  };

  // 请求 ID 头部
  const requestIdHeader = {
    name: "X-Request-ID",
    description: "请求唯一标识符，用于请求追踪和调试",
    required: false,
    schema: {
      type: "string" as const,
      format: "uuid" as const
    },
    example: "123e4567-e89b-12d3-a456-426614174000"
  };

  // 客户端版本头部
  const clientVersionHeader = {
    name: "X-Client-Version",
    description: "客户端应用版本号，用于版本兼容性控制",
    required: false,
    schema: {
      type: "string" as const,
      pattern: "^\\d+\\.\\d+\\.\\d+$"
    },
    example: "2.1.0"
  };

  // 语言偏好头部
  const acceptLanguageHeader = {
    name: "Accept-Language",
    description: "客户端首选语言，用于国际化响应",
    required: false,
    schema: {
      type: "string" as const
    },
    example: "zh-CN,zh;q=0.9,en;q=0.8"
  };

  // 时区头部
  const timezoneHeader = {
    name: "X-Timezone",
    description: "客户端时区，用于时间相关数据的本地化",
    required: false,
    schema: {
      type: "string" as const
    },
    example: "Asia/Shanghai"
  };

  // 设备 ID 头部
  const deviceIdHeader = {
    name: "X-Device-ID",
    description: "设备唯一标识符，用于设备管理和安全控制",
    required: false,
    schema: {
      type: "string" as const,
      format: "uuid" as const
    },
    example: "device_987fcdeb-51a2-4567-8901-234567890abc"
  };

  // 幂等性头部
  const idempotencyKeyHeader = {
    name: "Idempotency-Key",
    description: "幂等性密钥，确保重复请求的安全性",
    required: false,
    schema: {
      type: "string" as const,
      format: "uuid" as const
    },
    example: "idem_456e7890-a12b-34c5-6789-012345678901"
  };

  // 已弃用的头部
  const deprecatedHeader = {
    name: "X-Legacy-Token",
    description: "旧版认证令牌（已弃用，请使用 Authorization 头部）",
    required: false,
    deprecated: true,
    schema: {
      type: "string" as const
    },
    example: "legacy_token_abc123def456"
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">认证授权头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Bearer Token 认证头部，用于 JWT 令牌验证
        </p>
        <HeaderItem
          name={authorizationHeader.name}
          description={authorizationHeader.description}
          required={authorizationHeader.required}
          schema={authorizationHeader.schema}
          example={authorizationHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 密钥头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 密钥认证头部，用于应用级别的访问控制
        </p>
        <HeaderItem
          name={apiKeyHeader.name}
          description={apiKeyHeader.description}
          required={apiKeyHeader.required}
          schema={apiKeyHeader.schema}
          example={apiKeyHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容类型头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          指定请求体数据格式的必需头部
        </p>
        <HeaderItem
          name={contentTypeHeader.name}
          description={contentTypeHeader.description}
          required={contentTypeHeader.required}
          schema={contentTypeHeader.schema}
          example={contentTypeHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">接受类型头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          客户端可接受的响应格式，支持质量值排序
        </p>
        <HeaderItem
          name={acceptHeader.name}
          description={acceptHeader.description}
          required={acceptHeader.required}
          schema={acceptHeader.schema}
          example={acceptHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户代理头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          客户端应用和设备信息，用于统计分析
        </p>
        <HeaderItem
          name={userAgentHeader.name}
          description={userAgentHeader.description}
          required={userAgentHeader.required}
          schema={userAgentHeader.schema}
          example={userAgentHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">请求追踪头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          请求唯一标识符，便于日志追踪和问题排查
        </p>
        <HeaderItem
          name={requestIdHeader.name}
          description={requestIdHeader.description}
          required={requestIdHeader.required}
          schema={requestIdHeader.schema}
          example={requestIdHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">客户端版本头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          客户端版本信息，用于 API 兼容性控制
        </p>
        <HeaderItem
          name={clientVersionHeader.name}
          description={clientVersionHeader.description}
          required={clientVersionHeader.required}
          schema={clientVersionHeader.schema}
          example={clientVersionHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">语言偏好头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          客户端语言偏好，支持国际化响应
        </p>
        <HeaderItem
          name={acceptLanguageHeader.name}
          description={acceptLanguageHeader.description}
          required={acceptLanguageHeader.required}
          schema={acceptLanguageHeader.schema}
          example={acceptLanguageHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">时区信息头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          客户端时区信息，用于时间数据本地化
        </p>
        <HeaderItem
          name={timezoneHeader.name}
          description={timezoneHeader.description}
          required={timezoneHeader.required}
          schema={timezoneHeader.schema}
          example={timezoneHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">设备标识头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          设备唯一标识符，用于设备管理和安全策略
        </p>
        <HeaderItem
          name={deviceIdHeader.name}
          description={deviceIdHeader.description}
          required={deviceIdHeader.required}
          schema={deviceIdHeader.schema}
          example={deviceIdHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">幂等性控制头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          幂等性密钥，防止重复操作造成的副作用
        </p>
        <HeaderItem
          name={idempotencyKeyHeader.name}
          description={idempotencyKeyHeader.description}
          required={idempotencyKeyHeader.required}
          schema={idempotencyKeyHeader.schema}
          example={idempotencyKeyHeader.example}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用头部</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          旧版认证头部示例，展示已弃用字段的处理方式
        </p>
        <HeaderItem
          name={deprecatedHeader.name}
          description={deprecatedHeader.description}
          required={deprecatedHeader.required}
          deprecated={deprecatedHeader.deprecated}
          schema={deprecatedHeader.schema}
          example={deprecatedHeader.example}
        />
      </div>
    </div>
  );
}
