import { SecurityRequirementsSection } from "@/registry/default/ui/security-requirements-section";

export default function SecurityRequirementsSectionDemo() {
  // 基础 API 密钥认证
  const basicApiKeyRequirements = [
    {
      ApiKeyAuth: [],
    },
  ];

  // OAuth 2.0 读写权限
  const oauthReadWriteRequirements = [
    {
      OAuth2: ["read", "write"],
    },
  ];

  // 用户管理权限
  const userManagementRequirements = [
    {
      OAuth2: ["user:read", "user:write", "user:delete"],
    },
  ];

  // 支付处理权限
  const paymentRequirements = [
    {
      OAuth2: ["payment:read", "payment:write"],
      ApiKeyAuth: [],
    },
  ];

  // 管理员权限
  const adminRequirements = [
    {
      OAuth2: ["admin:read", "admin:write", "admin:delete", "system:manage"],
    },
  ];

  // 文件上传权限
  const fileUploadRequirements = [
    {
      BearerAuth: [],
      OAuth2: ["file:upload", "file:read"],
    },
  ];

  // 数据分析权限
  const analyticsRequirements = [
    {
      OAuth2: ["analytics:read", "reports:generate", "data:export"],
    },
  ];

  // 第三方集成权限
  const integrationRequirements = [
    {
      OAuth2: ["integration:read", "integration:write"],
      WebhookAuth: [],
    },
  ];

  // HTTP 基本认证
  const basicAuthRequirements = [
    {
      BasicAuth: [],
    },
  ];

  // Cookie 会话认证
  const sessionRequirements = [
    {
      SessionAuth: [],
    },
  ];

  // 多重认证要求
  const multiFactorRequirements = [
    {
      BearerAuth: [],
      ApiKeyAuth: [],
      OAuth2: ["mfa:verify"],
    },
  ];

  // 企业级认证
  const enterpriseRequirements = [
    {
      OAuth2: ["enterprise:read", "enterprise:write", "audit:log"],
      CertificateAuth: [],
    },
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">基础 API 密钥认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          最简单的 API 访问认证方式，适用于基础的 API 调用
        </p>
        <SecurityRequirementsSection security={basicApiKeyRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 读写权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的 OAuth 2.0 授权，支持读取和写入操作权限
        </p>
        <SecurityRequirementsSection security={oauthReadWriteRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户管理权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户管理系统的完整权限配置，包含增删改查操作
        </p>
        <SecurityRequirementsSection security={userManagementRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付处理权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付系统的双重认证要求，结合 OAuth 和 API 密钥
        </p>
        <SecurityRequirementsSection security={paymentRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">管理员权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统管理员的高级权限配置，包含系统管理功能
        </p>
        <SecurityRequirementsSection security={adminRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件管理系统的认证要求，支持 Bearer Token 和 OAuth
        </p>
        <SecurityRequirementsSection security={fileUploadRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据分析和报表系统的权限配置，支持数据导出功能
        </p>
        <SecurityRequirementsSection security={analyticsRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">第三方集成权限</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          第三方系统集成的认证配置，包含 Webhook 认证
        </p>
        <SecurityRequirementsSection security={integrationRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 基本认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          传统的 HTTP Basic Authentication，适用于简单的认证场景
        </p>
        <SecurityRequirementsSection security={basicAuthRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Cookie 会话认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 Cookie 的会话认证，适用于 Web 应用程序
        </p>
        <SecurityRequirementsSection security={sessionRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多重认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          高安全级别的多重认证配置，结合多种认证方式
        </p>
        <SecurityRequirementsSection security={multiFactorRequirements} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级认证</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级安全认证配置，包含证书认证和审计日志
        </p>
        <SecurityRequirementsSection security={enterpriseRequirements} />
      </div>
    </div>
  );
}
