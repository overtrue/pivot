import { SecuritySchemes } from "@/registry/default/ui/security-schemes";

export default function SecuritySchemesDemo() {
  // 企业级 API 安全方案
  const enterpriseSecuritySchemes = {
    ApiKeyAuth: {
      type: "apiKey" as const,
      description:
        "API 密钥认证，适用于服务器到服务器的通信。密钥通过 X-API-Key 请求头传递，具有访问速率限制和 IP 白名单保护。",
      name: "X-API-Key",
      in: "header" as const,
    },
    BearerAuth: {
      type: "http" as const,
      description:
        "JWT Bearer Token 认证，用于用户会话管理。令牌包含用户身份和权限信息，支持自动刷新和撤销机制。",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    OAuth2: {
      type: "oauth2" as const,
      description:
        "OAuth 2.0 授权框架，支持多种授权流程。适用于第三方应用集成和细粒度权限控制。",
      flows: {
        authorizationCode: {
          authorizationUrl: "https://auth.example.com/oauth/authorize",
          tokenUrl: "https://auth.example.com/oauth/token",
          refreshUrl: "https://auth.example.com/oauth/refresh",
          scopes: {
            read: "读取用户数据和资源",
            write: "创建和修改资源",
            delete: "删除资源",
            admin: "管理员权限，包含所有操作",
            profile: "访问用户基本信息",
            email: "访问用户邮箱地址",
            orders: "管理用户订单",
            payments: "处理支付相关操作",
          },
        },
        clientCredentials: {
          tokenUrl: "https://auth.example.com/oauth/token",
          scopes: {
            "api:read": "API 读取权限",
            "api:write": "API 写入权限",
            "api:admin": "API 管理权限",
            "webhook:manage": "Webhook 管理权限",
          },
        },
        implicit: {
          authorizationUrl: "https://auth.example.com/oauth/authorize",
          scopes: {
            profile: "用户基本信息",
            email: "用户邮箱",
          },
        },
      },
    },
    OpenIdConnect: {
      type: "openIdConnect" as const,
      description:
        "OpenID Connect 身份认证，基于 OAuth 2.0 构建。提供标准化的身份验证和用户信息获取。",
      openIdConnectUrl:
        "https://auth.example.com/.well-known/openid-configuration",
    },
  };

  // 基础 Web 应用安全方案
  const webAppSecuritySchemes = {
    SessionAuth: {
      type: "apiKey" as const,
      description:
        "基于 Cookie 的会话认证，适用于传统 Web 应用。包含 CSRF 保护和会话超时机制。",
      name: "sessionId",
      in: "cookie" as const,
    },
    BasicAuth: {
      type: "http" as const,
      description:
        "HTTP 基本认证，使用用户名和密码。仅建议在 HTTPS 环境下使用，适用于简单的内部工具。",
      scheme: "basic",
    },
    DigestAuth: {
      type: "http" as const,
      description:
        "HTTP 摘要认证，比基本认证更安全。密码经过哈希处理，防止明文传输。",
      scheme: "digest",
    },
  };

  // 微服务架构安全方案
  const microserviceSecuritySchemes = {
    ServiceToken: {
      type: "http" as const,
      description:
        "服务间通信令牌，用于微服务架构中的服务认证。支持服务发现和负载均衡。",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    MutualTLS: {
      type: "http" as const,
      description:
        "双向 TLS 认证（客户端证书），提供最高级别的安全保护。客户端和服务器都需要验证证书。",
      scheme: "bearer",
      bearerFormat: "X.509",
    },
    InternalApiKey: {
      type: "apiKey" as const,
      description:
        "内部 API 密钥，用于内网服务间的快速认证。包含服务标识和权限范围。",
      name: "X-Service-Key",
      in: "header" as const,
    },
  };

  // 移动应用安全方案
  const mobileAppSecuritySchemes = {
    MobileOAuth: {
      type: "oauth2" as const,
      description:
        "移动应用 OAuth 2.0 认证，支持 PKCE 扩展以增强安全性。适用于原生移动应用。",
      flows: {
        authorizationCode: {
          authorizationUrl: "https://mobile-auth.example.com/oauth/authorize",
          tokenUrl: "https://mobile-auth.example.com/oauth/token",
          refreshUrl: "https://mobile-auth.example.com/oauth/refresh",
          scopes: {
            offline_access: "离线访问权限",
            push_notifications: "推送通知权限",
            location: "位置信息访问",
            camera: "相机访问权限",
            contacts: "通讯录访问权限",
          },
        },
      },
    },
    DeviceAuth: {
      type: "oauth2" as const,
      description:
        "设备授权流程，适用于输入受限的设备（如智能电视、IoT 设备）。",
      flows: {
        clientCredentials: {
          authorizationUrl: "https://auth.example.com/device/authorize",
          tokenUrl: "https://auth.example.com/device/token",
          scopes: {
            "device:control": "控制设备",
            "device:status": "查看设备状态",
            "device:config": "配置设备",
          },
        },
      },
    },
    BiometricAuth: {
      type: "apiKey" as const,
      description:
        "生物识别认证令牌，结合设备本地生物识别（指纹、面部识别）生成的安全令牌。",
      name: "X-Biometric-Token",
      in: "header" as const,
    },
  };

  // 第三方集成安全方案
  const thirdPartySecuritySchemes = {
    WebhookSignature: {
      type: "apiKey" as const,
      description:
        "Webhook 签名验证，确保 Webhook 请求的真实性和完整性。使用 HMAC-SHA256 算法。",
      name: "X-Webhook-Signature",
      in: "header" as const,
    },
    PartnerApiKey: {
      type: "apiKey" as const,
      description:
        "合作伙伴 API 密钥，用于第三方服务集成。包含合作伙伴标识和权限级别。",
      name: "X-Partner-Key",
      in: "header" as const,
    },
    SamlAuth: {
      type: "http" as const,
      description:
        "SAML 2.0 单点登录认证，适用于企业级身份提供商集成。支持属性映射和角色继承。",
      scheme: "bearer",
      bearerFormat: "SAML",
    },
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">企业级 API 安全方案</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          适用于大型企业的完整安全认证方案，包含多种认证方式和细粒度权限控制
        </p>
        <SecuritySchemes schemes={enterpriseSecuritySchemes} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Web 应用安全方案</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          传统 Web 应用的安全认证方案，包含会话管理和基础认证
        </p>
        <SecuritySchemes schemes={webAppSecuritySchemes} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">微服务架构安全方案</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          微服务间通信的安全认证方案，支持服务发现和高安全级别的双向认证
        </p>
        <SecuritySchemes schemes={microserviceSecuritySchemes} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">移动应用安全方案</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          移动应用和 IoT 设备的安全认证方案，包含生物识别和设备授权
        </p>
        <SecuritySchemes schemes={mobileAppSecuritySchemes} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">第三方集成安全方案</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          第三方服务集成的安全认证方案，包含 Webhook 验证和合作伙伴认证
        </p>
        <SecuritySchemes schemes={thirdPartySecuritySchemes} />
      </div>
    </div>
  );
}
