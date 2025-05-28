import { DeprecatedBadge } from "@/registry/pivot/deprecated-badge";

export default function DeprecatedBadgeDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的 API 端点</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记即将废弃的 API 端点，提醒开发者迁移到新版本
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">GET /api/v1/users</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 /api/v2/users</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">POST /api/v1/auth/login</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 OAuth 2.0 认证</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">GET /api/v1/products/search</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 /api/v2/search/products</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的请求参数</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记不再推荐使用的请求参数，引导使用新的参数格式
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">user_id</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 userId（驼峰命名）</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">api_key</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 Authorization 头部</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">format=xml</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">XML 格式将不再支持</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的响应字段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记响应中即将移除的字段，帮助开发者提前适配
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">legacy_id</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">将在 v3.0 中移除</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">old_status</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 status 字段</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">created_time</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 createdAt（ISO 8601 格式）</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的认证方式</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记不再推荐的认证方式，推广更安全的认证机制
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm">HTTP Basic Auth</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 Bearer Token</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">Session Cookie</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 JWT Token</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">API Key in URL</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 Header 传递</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的 HTTP 方法</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记不再支持的 HTTP 方法，引导使用标准的 RESTful 方法
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">PATCH /api/v1/users/delete</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 DELETE 方法</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">GET /api/v1/users/create</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 POST 方法</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的数据格式</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记不再支持的数据格式，推广标准化的数据交换格式
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm">application/x-www-form-urlencoded</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 application/json</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">text/xml</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">XML 支持将在 2024 年底结束</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的功能特性</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记即将移除的功能特性，提供替代方案指导
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm">批量删除用户</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">出于安全考虑，请逐个删除</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">明文密码传输</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用加密传输</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">无限制文件上传</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">现已限制文件大小和类型</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">已弃用的配置选项</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标记不再推荐的配置选项，引导使用新的配置方式
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">debug=true</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">请使用 log_level=debug</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">cache_enabled=false</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">缓存现在默认启用</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono">ssl_verify=false</span>
            <DeprecatedBadge />
            <span className="text-xs text-neutral-500">出于安全考虑，SSL 验证强制启用</span>
          </div>
        </div>
      </div>
    </div>
  );
}
