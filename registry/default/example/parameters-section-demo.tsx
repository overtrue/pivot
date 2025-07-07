import { ParametersSection } from "@/registry/default/ui/parameters-section";

export default function ParametersSectionDemo() {
  // 用户列表 API 的参数示例
  const userListParameters = [
    {
      name: "page",
      in: "query" as const,
      required: false,
      description: "页码，从 1 开始",
      schema: {
        type: "integer" as const,
        minimum: 1,
        default: 1
      }
    },
    {
      name: "limit",
      in: "query" as const,
      required: false,
      description: "每页返回的记录数",
      schema: {
        type: "integer" as const,
        minimum: 1,
        maximum: 100,
        default: 20
      }
    },
    {
      name: "search",
      in: "query" as const,
      required: false,
      description: "搜索关键词，支持姓名和邮箱搜索",
      schema: {
        type: "string" as const,
        maxLength: 100
      }
    },
    {
      name: "status",
      in: "query" as const,
      required: false,
      description: "用户状态筛选",
      schema: {
        type: "array" as const,
        items: {
          type: "string" as const,
          enum: ["active", "inactive", "pending", "suspended"]
        }
      }
    },
    {
      name: "role",
      in: "query" as const,
      required: false,
      description: "用户角色筛选",
      schema: {
        type: "string" as const,
        enum: ["admin", "user", "moderator", "guest"]
      }
    },
    {
      name: "createdAfter",
      in: "query" as const,
      required: false,
      description: "创建时间筛选（起始时间）",
      schema: {
        type: "string" as const,
        format: "date-time" as const
      }
    },
    {
      name: "createdBefore",
      in: "query" as const,
      required: false,
      description: "创建时间筛选（结束时间）",
      schema: {
        type: "string" as const,
        format: "date-time" as const
      }
    },
    {
      name: "sortBy",
      in: "query" as const,
      required: false,
      description: "排序字段",
      schema: {
        type: "string" as const,
        enum: ["name", "email", "createdAt", "lastLoginAt"],
        default: "createdAt"
      }
    },
    {
      name: "sortOrder",
      in: "query" as const,
      required: false,
      description: "排序方向",
      schema: {
        type: "string" as const,
        enum: ["asc", "desc"],
        default: "desc"
      }
    },
    {
      name: "include",
      in: "query" as const,
      required: false,
      description: "包含的关联数据",
      schema: {
        type: "array" as const,
        items: {
          type: "string" as const,
          enum: ["profile", "permissions", "preferences", "statistics"]
        }
      }
    },
    {
      name: "X-API-Key",
      in: "header" as const,
      required: true,
      description: "API 访问密钥",
      schema: {
        type: "string" as const,
        pattern: "^[a-zA-Z0-9]{32}$"
      }
    },
    {
      name: "Authorization",
      in: "header" as const,
      required: false,
      description: "Bearer 令牌认证",
      schema: {
        type: "string" as const,
        pattern: "^Bearer [a-zA-Z0-9\\-\\._~\\+\\/]+=*$"
      }
    },
    {
      name: "X-Request-ID",
      in: "header" as const,
      required: false,
      description: "请求追踪 ID",
      schema: {
        type: "string" as const,
        format: "uuid" as const
      }
    }
  ];

  // 用户详情 API 的参数示例
  const userDetailParameters = [
    {
      name: "userId",
      in: "path" as const,
      required: true,
      description: "用户的唯一标识符",
      schema: {
        type: "string" as const,
        format: "uuid" as const
      }
    },
    {
      name: "include",
      in: "query" as const,
      required: false,
      description: "包含的额外信息",
      schema: {
        type: "array" as const,
        items: {
          type: "string" as const,
          enum: ["profile", "permissions", "preferences", "activity", "statistics"]
        }
      }
    },
    {
      name: "fields",
      in: "query" as const,
      required: false,
      description: "指定返回的字段，用逗号分隔",
      schema: {
        type: "string" as const,
        pattern: "^[a-zA-Z0-9,_]+$"
      }
    },
    {
      name: "X-API-Key",
      in: "header" as const,
      required: true,
      description: "API 访问密钥",
      schema: {
        type: "string" as const,
        pattern: "^[a-zA-Z0-9]{32}$"
      }
    },
    {
      name: "If-None-Match",
      in: "header" as const,
      required: false,
      description: "条件请求头，用于缓存控制",
      schema: {
        type: "string" as const
      }
    }
  ];

  // 文件上传 API 的参数示例
  const fileUploadParameters = [
    {
      name: "folderId",
      in: "path" as const,
      required: true,
      description: "目标文件夹 ID",
      schema: {
        type: "string" as const,
        pattern: "^folder_[a-zA-Z0-9]+$"
      }
    },
    {
      name: "overwrite",
      in: "query" as const,
      required: false,
      description: "是否覆盖同名文件",
      schema: {
        type: "boolean" as const,
        default: false
      }
    },
    {
      name: "generateThumbnail",
      in: "query" as const,
      required: false,
      description: "是否生成缩略图（仅适用于图片）",
      schema: {
        type: "boolean" as const,
        default: true
      }
    },
    {
      name: "maxSize",
      in: "query" as const,
      required: false,
      description: "最大文件大小（字节）",
      schema: {
        type: "integer" as const,
        minimum: 1,
        maximum: 104857600,
        default: 10485760
      }
    },
    {
      name: "allowedTypes",
      in: "query" as const,
      required: false,
      description: "允许的文件类型",
      schema: {
        type: "array" as const,
        items: {
          type: "string" as const,
          enum: ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/plain"]
        }
      }
    },
    {
      name: "X-Upload-Token",
      in: "header" as const,
      required: true,
      description: "上传令牌",
      schema: {
        type: "string" as const,
        pattern: "^upload_[a-zA-Z0-9]{40}$"
      }
    },
    {
      name: "Content-Type",
      in: "header" as const,
      required: true,
      description: "内容类型",
      schema: {
        type: "string" as const,
        enum: ["multipart/form-data"]
      }
    },
    {
      name: "X-Client-Version",
      in: "header" as const,
      required: false,
      description: "客户端版本号",
      schema: {
        type: "string" as const,
        pattern: "^\\d+\\.\\d+\\.\\d+$"
      }
    }
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户列表 API 参数</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含分页、搜索、筛选、排序等完整的查询参数
        </p>
        <ParametersSection parameters={userListParameters} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户详情 API 参数</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          路径参数和查询参数的组合，包含条件请求头
        </p>
        <ParametersSection parameters={userDetailParameters} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传 API 参数</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传接口的参数，包含上传配置和验证规则
        </p>
        <ParametersSection parameters={fileUploadParameters} />
      </div>
    </div>
  );
}
