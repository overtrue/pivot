import { I18nProvider } from "@/registry/default/lib/i18n";
import { ResponsesSection } from "@/registry/default/ui/responses-section";

export default function ResponsesSectionDemo() {
  // 用户管理 API 的响应示例
  const userApiResponses = {
    "200": {
      description: "成功获取用户信息",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: {
                type: "string" as const,
                format: "uuid" as const,
                description: "用户唯一标识符",
              },
              email: {
                type: "string" as const,
                format: "email" as const,
                description: "用户邮箱",
              },
              name: {
                type: "string" as const,
                description: "用户姓名",
              },
              status: {
                type: "string" as const,
                enum: ["active", "inactive", "pending"],
                description: "用户状态",
              },
              createdAt: {
                type: "string" as const,
                format: "date-time" as const,
                description: "创建时间",
              },
            },
          },
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            email: "john.doe@example.com",
            name: "John Doe",
            status: "active",
            createdAt: "2024-01-15T10:30:00Z",
          },
        },
      },
      headers: {
        "X-Rate-Limit-Remaining": {
          description: "剩余请求次数",
          schema: { type: "integer" as const },
        },
        "X-Request-ID": {
          description: "请求追踪 ID",
          schema: { type: "string" as const, format: "uuid" as const },
        },
      },
    },
    "400": {
      description: "请求参数错误",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              error: {
                type: "string" as const,
                description: "错误类型",
              },
              message: {
                type: "string" as const,
                description: "错误描述",
              },
              details: {
                type: "array" as const,
                description: "详细错误信息",
                items: {
                  type: "object" as const,
                  properties: {
                    field: { type: "string" as const },
                    code: { type: "string" as const },
                    message: { type: "string" as const },
                  },
                },
              },
            },
          },
          example: {
            error: "VALIDATION_ERROR",
            message: "请求参数验证失败",
            details: [
              {
                field: "email",
                code: "INVALID_FORMAT",
                message: "邮箱格式不正确",
              },
            ],
          },
        },
      },
    },
    "401": {
      description: "未授权访问",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              error: { type: "string" as const },
              message: { type: "string" as const },
            },
          },
          example: {
            error: "UNAUTHORIZED",
            message: "访问令牌无效或已过期",
          },
        },
      },
    },
    "404": {
      description: "用户不存在",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              error: { type: "string" as const },
              message: { type: "string" as const },
            },
          },
          example: {
            error: "USER_NOT_FOUND",
            message: "指定的用户不存在",
          },
        },
      },
    },
    "500": {
      description: "服务器内部错误",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              error: { type: "string" as const },
              message: { type: "string" as const },
              requestId: { type: "string" as const },
            },
          },
          example: {
            error: "INTERNAL_SERVER_ERROR",
            message: "服务器遇到了一个意外的情况",
            requestId: "req_abc123def456",
          },
        },
      },
    },
  };

  // 文件上传 API 的响应示例
  const fileUploadResponses = {
    "201": {
      description: "文件上传成功",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              id: { type: "string" as const, description: "文件 ID" },
              filename: { type: "string" as const, description: "文件名" },
              size: {
                type: "integer" as const,
                description: "文件大小（字节）",
              },
              mimeType: { type: "string" as const, description: "MIME 类型" },
              url: {
                type: "string" as const,
                format: "uri" as const,
                description: "文件访问 URL",
              },
              uploadedAt: {
                type: "string" as const,
                format: "date-time" as const,
                description: "上传时间",
              },
            },
          },
          example: {
            id: "file_xyz789",
            filename: "document.pdf",
            size: 1048576,
            mimeType: "application/pdf",
            url: "https://cdn.example.com/files/document.pdf",
            uploadedAt: "2024-01-15T10:30:00Z",
          },
        },
      },
    },
    "413": {
      description: "文件过大",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              error: { type: "string" as const },
              message: { type: "string" as const },
              maxSize: {
                type: "integer" as const,
                description: "最大允许大小（字节）",
              },
            },
          },
          example: {
            error: "FILE_TOO_LARGE",
            message: "文件大小超过限制",
            maxSize: 10485760,
          },
        },
      },
    },
    "415": {
      description: "不支持的文件类型",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              error: { type: "string" as const },
              message: { type: "string" as const },
              allowedTypes: {
                type: "array" as const,
                items: { type: "string" as const },
                description: "允许的文件类型",
              },
            },
          },
          example: {
            error: "UNSUPPORTED_MEDIA_TYPE",
            message: "不支持的文件类型",
            allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
          },
        },
      },
    },
  };

  // 分页列表 API 的响应示例
  const paginatedListResponses = {
    "200": {
      description: "成功获取列表数据",
      content: {
        "application/json": {
          schema: {
            type: "object" as const,
            properties: {
              data: {
                type: "array" as const,
                description: "数据列表",
                items: {
                  type: "object" as const,
                  properties: {
                    id: { type: "string" as const },
                    title: { type: "string" as const },
                    status: { type: "string" as const },
                    createdAt: {
                      type: "string" as const,
                      format: "date-time" as const,
                    },
                  },
                },
              },
              pagination: {
                type: "object" as const,
                description: "分页信息",
                properties: {
                  page: { type: "integer" as const, description: "当前页码" },
                  limit: { type: "integer" as const, description: "每页数量" },
                  total: { type: "integer" as const, description: "总记录数" },
                  totalPages: {
                    type: "integer" as const,
                    description: "总页数",
                  },
                  hasNext: {
                    type: "boolean" as const,
                    description: "是否有下一页",
                  },
                  hasPrev: {
                    type: "boolean" as const,
                    description: "是否有上一页",
                  },
                },
              },
            },
          },
          example: {
            data: [
              {
                id: "item_001",
                title: "示例项目 1",
                status: "active",
                createdAt: "2024-01-15T10:30:00Z",
              },
              {
                id: "item_002",
                title: "示例项目 2",
                status: "pending",
                createdAt: "2024-01-14T15:20:00Z",
              },
            ],
            pagination: {
              page: 1,
              limit: 20,
              total: 150,
              totalPages: 8,
              hasNext: true,
              hasPrev: false,
            },
          },
        },
      },
    },
  };

  return (
    <I18nProvider>
      <div className="space-y-8 min-w-md">
        <div>
          <h4 className="text-sm font-medium mb-3">用户管理 API 响应</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            包含成功响应和各种错误情况的完整响应定义
          </p>
          <ResponsesSection responses={userApiResponses as any} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">文件上传 API 响应</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            文件上传接口的响应，包含文件信息和错误处理
          </p>
          <ResponsesSection responses={fileUploadResponses as any} />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">分页列表 API 响应</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
            带分页信息的列表数据响应格式
          </p>
          <ResponsesSection responses={paginatedListResponses as any} />
        </div>
      </div>
    </I18nProvider>
  );
}
