import { HeadersSection } from "@/registry/pivot/headers-section";

export default function HeadersSectionDemo() {
  // API 响应头示例
  const apiResponseHeaders = {
    "X-Rate-Limit-Limit": {
      description: "每小时允许的最大请求数",
      schema: {
        type: "integer",
        example: 1000
      }
    },
    "X-Rate-Limit-Remaining": {
      description: "当前小时内剩余的请求数",
      schema: {
        type: "integer",
        example: 999
      }
    },
    "X-Rate-Limit-Reset": {
      description: "速率限制重置的时间戳",
      schema: {
        type: "integer",
        format: "int64",
        example: 1640995200
      }
    },
    "X-Request-ID": {
      description: "请求的唯一标识符，用于追踪和调试",
      schema: {
        type: "string",
        format: "uuid",
        example: "123e4567-e89b-12d3-a456-426614174000"
      }
    },
    "X-Response-Time": {
      description: "服务器处理请求的时间（毫秒）",
      schema: {
        type: "integer",
        example: 245
      }
    }
  };

  // 缓存控制头示例
  const cacheControlHeaders = {
    "Cache-Control": {
      description: "缓存控制指令",
      schema: {
        type: "string",
        enum: ["no-cache", "no-store", "max-age=3600", "public", "private"],
        example: "max-age=3600, public"
      }
    },
    "ETag": {
      description: "资源的实体标签，用于缓存验证",
      schema: {
        type: "string",
        example: "\"33a64df551425fcc55e4d42a148795d9f25f89d4\""
      }
    },
    "Last-Modified": {
      description: "资源最后修改时间",
      schema: {
        type: "string",
        format: "date-time",
        example: "Wed, 21 Oct 2015 07:28:00 GMT"
      }
    },
    "Expires": {
      description: "资源过期时间",
      schema: {
        type: "string",
        format: "date-time",
        example: "Thu, 01 Dec 2024 16:00:00 GMT"
      }
    }
  };

  // 安全相关头示例
  const securityHeaders = {
    "X-Content-Type-Options": {
      description: "防止 MIME 类型嗅探",
      schema: {
        type: "string",
        enum: ["nosniff"],
        example: "nosniff"
      }
    },
    "X-Frame-Options": {
      description: "控制页面是否可以在 frame 中显示",
      schema: {
        type: "string",
        enum: ["DENY", "SAMEORIGIN", "ALLOW-FROM"],
        example: "SAMEORIGIN"
      }
    },
    "X-XSS-Protection": {
      description: "启用跨站脚本攻击保护",
      schema: {
        type: "string",
        example: "1; mode=block"
      }
    },
    "Strict-Transport-Security": {
      description: "强制使用 HTTPS 连接",
      schema: {
        type: "string",
        example: "max-age=31536000; includeSubDomains"
      }
    },
    "Content-Security-Policy": {
      description: "内容安全策略",
      schema: {
        type: "string",
        example: "default-src 'self'; script-src 'self' 'unsafe-inline'"
      }
    }
  };

  // 分页相关头示例
  const paginationHeaders = {
    "X-Total-Count": {
      description: "总记录数",
      schema: {
        type: "integer",
        example: 1500
      }
    },
    "X-Page-Count": {
      description: "总页数",
      schema: {
        type: "integer",
        example: 75
      }
    },
    "X-Current-Page": {
      description: "当前页码",
      schema: {
        type: "integer",
        example: 1
      }
    },
    "X-Per-Page": {
      description: "每页记录数",
      schema: {
        type: "integer",
        example: 20
      }
    },
    "Link": {
      description: "分页链接，包含 first、prev、next、last",
      schema: {
        type: "string",
        example: "<https://api.example.com/users?page=1>; rel=\"first\", <https://api.example.com/users?page=2>; rel=\"next\", <https://api.example.com/users?page=75>; rel=\"last\""
      }
    }
  };

  // 文件下载头示例
  const fileDownloadHeaders = {
    "Content-Disposition": {
      description: "指示内容应该如何显示",
      schema: {
        type: "string",
        example: "attachment; filename=\"report.pdf\""
      }
    },
    "Content-Length": {
      description: "响应体的字节长度",
      schema: {
        type: "integer",
        example: 1048576
      }
    },
    "Content-Type": {
      description: "响应内容的 MIME 类型",
      schema: {
        type: "string",
        example: "application/pdf"
      }
    },
    "Content-Encoding": {
      description: "内容编码方式",
      schema: {
        type: "string",
        enum: ["gzip", "deflate", "br"],
        example: "gzip"
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 响应头</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含速率限制、请求追踪等 API 相关的响应头
        </p>
        <HeadersSection headers={apiResponseHeaders} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">缓存控制头</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于控制客户端和代理服务器缓存行为的响应头
        </p>
        <HeadersSection headers={cacheControlHeaders} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">安全相关头</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          提高应用安全性的 HTTP 安全头
        </p>
        <HeadersSection headers={securityHeaders} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">分页相关头</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于分页列表 API 的响应头信息
        </p>
        <HeadersSection headers={paginationHeaders} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件下载头</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件下载接口的响应头，包含文件信息和编码
        </p>
        <HeadersSection headers={fileDownloadHeaders} />
      </div>
    </div>
  );
}
