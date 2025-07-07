import type { OpenAPIV3 } from 'openapi-types';
import { SecuritySection } from "@/registry/default/ui/security-section";

export default function SecuritySectionDemo() {
  // API 密钥认证示例
  const apiKeyOnlySecurity = [
    {
      "ApiKeyAuth": []
    }
  ];

  // Bearer Token 认证示例
  const bearerTokenSecurity = [
    {
      "BearerAuth": []
    }
  ];

  // OAuth2 认证示例
  const oauth2Security = [
    {
      "OAuth2": ["read", "write"]
    }
  ];

  // 多重认证示例（API Key + Bearer Token）
  const multiAuthSecurity = [
    {
      "ApiKeyAuth": [],
      "BearerAuth": []
    }
  ];

  // 可选认证示例（API Key 或 OAuth2）
  const optionalAuthSecurity: OpenAPIV3.SecurityRequirementObject[] = [
    {
      "ApiKeyAuth": []
    },
    {
      "OAuth2": ["read", "write", "admin"]
    }
  ];

  // 完整的安全方案定义
  const securitySchemes = {
    "ApiKeyAuth": {
      type: "apiKey" as const,
      description: "API 密钥认证，通过 X-API-Key 请求头传递。适用于服务器到服务器的通信。",
      name: "X-API-Key",
      in: "header" as const
    },
    "BearerAuth": {
      type: "http" as const,
      description: "Bearer Token 认证，使用 JWT 令牌。适用于用户会话认证。",
      scheme: "bearer",
      bearerFormat: "JWT"
    },
    "OAuth2": {
      type: "oauth2" as const,
      description: "OAuth 2.0 认证，支持授权码流程。适用于第三方应用集成。",
      flows: {
        authorizationCode: {
          authorizationUrl: "https://api.example.com/oauth/authorize",
          tokenUrl: "https://api.example.com/oauth/token",
          refreshUrl: "https://api.example.com/oauth/refresh",
          scopes: {
            "read": "读取用户数据和资源",
            "write": "创建和修改资源",
            "admin": "管理员权限，包含所有操作",
            "profile": "访问用户基本信息",
            "email": "访问用户邮箱地址"
          }
        },
        clientCredentials: {
          tokenUrl: "https://api.example.com/oauth/token",
          scopes: {
            "api:read": "API 读取权限",
            "api:write": "API 写入权限"
          }
        }
      }
    },
    "BasicAuth": {
      type: "http" as const,
      description: "HTTP 基本认证，使用用户名和密码。仅用于开发和测试环境。",
      scheme: "basic"
    },
    "CookieAuth": {
      type: "apiKey" as const,
      description: "基于 Cookie 的会话认证，适用于 Web 应用。",
      name: "sessionId",
      in: "cookie" as const
    },
    "OpenIdConnect": {
      type: "openIdConnect" as const,
      description: "OpenID Connect 认证，基于 OAuth 2.0 的身份认证层。",
      openIdConnectUrl: "https://api.example.com/.well-known/openid-configuration"
    }
  };

  // 基本认证示例
  const basicAuthSecurity = [
    {
      "BasicAuth": []
    }
  ];

  // Cookie 认证示例
  const cookieAuthSecurity = [
    {
      "CookieAuth": []
    }
  ];

  // OpenID Connect 认证示例
  const openIdConnectSecurity = [
    {
      "OpenIdConnect": []
    }
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 密钥认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          适用于服务器到服务器的通信，通过请求头传递 API 密钥
        </p>
        <SecuritySection
          security={apiKeyOnlySecurity}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Bearer Token 认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用 JWT 令牌进行用户会话认证
        </p>
        <SecuritySection
          security={bearerTokenSecurity}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多种授权流程和权限范围的 OAuth 2.0 认证
        </p>
        <SecuritySection
          security={oauth2Security}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多重认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          同时需要 API 密钥和 Bearer Token 的双重认证
        </p>
        <SecuritySection
          security={multiAuthSecurity}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">可选认证方式</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多种认证方式，客户端可以选择其中一种
        </p>
        <SecuritySection
          security={optionalAuthSecurity}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 基本认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          传统的用户名密码认证方式，适用于开发环境
        </p>
        <SecuritySection
          security={basicAuthSecurity}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Cookie 会话认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 Cookie 的会话认证，适用于 Web 应用
        </p>
        <SecuritySection
          security={cookieAuthSecurity}
          securitySchemes={securitySchemes}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OpenID Connect 认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 OAuth 2.0 的身份认证层，提供用户身份信息
        </p>
        <SecuritySection
          security={openIdConnectSecurity}
          securitySchemes={securitySchemes}
        />
      </div>
    </div>
  );
}
