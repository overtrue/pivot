import { SecuritySchemeDisplay } from "@/registry/default/ui/security-scheme-display";

export default function SecuritySchemeDisplayDemo() {
  // API 密钥认证（Header）
  const apiKeyHeaderScheme = {
    type: "apiKey" as const,
    name: "X-API-Key",
    in: "header" as const,
    description:
      "API 密钥认证，将密钥放在请求头中。请在开发者控制台获取您的 API 密钥。",
  };

  // API 密钥认证（Query）
  const apiKeyQueryScheme = {
    type: "apiKey" as const,
    name: "api_key",
    in: "query" as const,
    description:
      "API 密钥认证，将密钥作为查询参数传递。适用于无法设置请求头的场景。",
  };

  // Bearer Token 认证
  const bearerTokenScheme = {
    type: "http" as const,
    scheme: "bearer",
    bearerFormat: "JWT",
    description:
      "JWT Bearer Token 认证。在 Authorization 头中使用 'Bearer <token>' 格式。",
  };

  // HTTP 基本认证
  const basicAuthScheme = {
    type: "http" as const,
    scheme: "basic",
    description:
      "HTTP 基本认证，使用用户名和密码进行身份验证。凭据会被 Base64 编码。",
  };

  // OAuth 2.0 认证
  const oauth2Scheme = {
    type: "oauth2" as const,
    description: "OAuth 2.0 授权框架，支持多种授权流程。适用于第三方应用集成。",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://auth.example.com/oauth/authorize",
        tokenUrl: "https://auth.example.com/oauth/token",
        refreshUrl: "https://auth.example.com/oauth/refresh",
        scopes: {
          read: "读取用户数据",
          write: "修改用户数据",
          admin: "管理员权限",
        },
      },
      clientCredentials: {
        tokenUrl: "https://auth.example.com/oauth/token",
        scopes: {
          "api:read": "读取 API 数据",
          "api:write": "写入 API 数据",
        },
      },
    },
  };

  // OpenID Connect 认证
  const openIdConnectScheme = {
    type: "openIdConnect" as const,
    openIdConnectUrl:
      "https://auth.example.com/.well-known/openid_configuration",
    description:
      "OpenID Connect 身份认证，基于 OAuth 2.0 构建的身份层。支持单点登录（SSO）。",
  };

  // Cookie 会话认证
  const cookieAuthScheme = {
    type: "apiKey" as const,
    name: "sessionId",
    in: "cookie" as const,
    description: "基于 Cookie 的会话认证。适用于 Web 应用程序的用户会话管理。",
  };

  // 自定义认证头
  const customHeaderScheme = {
    type: "apiKey" as const,
    name: "X-Custom-Auth",
    in: "header" as const,
    description:
      "自定义认证头，用于特殊的认证需求。请联系技术支持获取认证令牌。",
  };

  // 多重认证方案
  const multiFactorScheme = {
    type: "http" as const,
    scheme: "bearer",
    bearerFormat: "JWT",
    description:
      "多重认证方案，需要同时提供 JWT Token 和 API 密钥。用于高安全级别的操作。",
  };

  // 企业级认证
  const enterpriseScheme = {
    type: "oauth2" as const,
    description: "企业级 OAuth 2.0 认证，支持 SAML、LDAP 集成和单点登录。",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://enterprise.example.com/oauth/authorize",
        tokenUrl: "https://enterprise.example.com/oauth/token",
        scopes: {
          "enterprise:read": "读取企业数据",
          "enterprise:write": "修改企业数据",
          "audit:access": "访问审计日志",
          "admin:full": "完整管理员权限",
        },
      },
    },
  };

  // 移动应用认证
  const mobileAppScheme = {
    type: "oauth2" as const,
    description: "移动应用专用的 OAuth 2.0 认证，支持 PKCE 扩展以增强安全性。",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://mobile.example.com/oauth/authorize",
        tokenUrl: "https://mobile.example.com/oauth/token",
        scopes: {
          "mobile:sync": "数据同步",
          "push:send": "发送推送通知",
          "location:access": "访问位置信息",
        },
      },
    },
  };

  // 第三方集成认证
  const webhookAuthScheme = {
    type: "apiKey" as const,
    name: "X-Webhook-Signature",
    in: "header" as const,
    description: "Webhook 签名验证，用于验证第三方系统发送的回调请求的真实性。",
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 密钥认证（Header）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          最常用的 API 认证方式，将密钥放在请求头中传递
        </p>
        <SecuritySchemeDisplay
          name="ApiKeyHeader"
          scheme={apiKeyHeaderScheme}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 密钥认证（Query）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          将 API 密钥作为查询参数传递，适用于无法设置请求头的场景
        </p>
        <SecuritySchemeDisplay name="ApiKeyQuery" scheme={apiKeyQueryScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Bearer Token 认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          JWT Bearer Token 认证，现代 API 的标准认证方式
        </p>
        <SecuritySchemeDisplay name="BearerToken" scheme={bearerTokenScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 基本认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          传统的 HTTP 基本认证，使用用户名和密码进行身份验证
        </p>
        <SecuritySchemeDisplay name="BasicAuth" scheme={basicAuthScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的 OAuth 2.0 授权框架，支持多种授权流程
        </p>
        <SecuritySchemeDisplay name="OAuth2" scheme={oauth2Scheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OpenID Connect 认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 OAuth 2.0 的身份认证层，支持单点登录功能
        </p>
        <SecuritySchemeDisplay
          name="OpenIdConnect"
          scheme={openIdConnectScheme}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Cookie 会话认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 Cookie 的会话认证，适用于 Web 应用程序
        </p>
        <SecuritySchemeDisplay name="CookieAuth" scheme={cookieAuthScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义认证头</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          自定义的认证头方案，用于特殊的认证需求
        </p>
        <SecuritySchemeDisplay
          name="CustomHeader"
          scheme={customHeaderScheme}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多重认证方案</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          高安全级别的多重认证，结合多种认证方式
        </p>
        <SecuritySchemeDisplay name="MultiFactor" scheme={multiFactorScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级 OAuth 认证，支持 SAML、LDAP 集成
        </p>
        <SecuritySchemeDisplay name="Enterprise" scheme={enterpriseScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">移动应用认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          移动应用专用认证，支持 PKCE 扩展增强安全性
        </p>
        <SecuritySchemeDisplay name="MobileApp" scheme={mobileAppScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Webhook 签名认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于验证第三方系统 Webhook 回调请求的真实性
        </p>
        <SecuritySchemeDisplay name="WebhookAuth" scheme={webhookAuthScheme} />
      </div>
    </div>
  );
}
