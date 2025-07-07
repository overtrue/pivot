import { SchemeType } from "@/registry/default/ui/scheme-type";

export default function SchemeTypeDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 密钥认证类型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          最常用的 API 认证方式，简单易用且安全可靠
        </p>
        <SchemeType type="apiKey" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 认证类型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的 HTTP 认证协议，包括 Basic、Bearer、Digest 等方式
        </p>
        <SchemeType type="http" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 认证类型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          现代应用的标准授权框架，支持多种授权流程
        </p>
        <SchemeType type="oauth2" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OpenID Connect 认证类型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 OAuth 2.0 的身份认证层，支持单点登录和身份验证
        </p>
        <SchemeType type="openIdConnect" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级 TLS 认证类型</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业环境中常用的高安全级别认证方案
        </p>
        <SchemeType type="mutualTLS" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级 API 密钥认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级应用中常用的 API 密钥认证方案
        </p>
        <SchemeType type="apiKey" />
      </div>
    </div>
  );
}
