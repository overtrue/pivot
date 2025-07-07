import { SecurityRequirementItem } from "@/registry/default/ui/security-requirement-item";

export default function SecurityRequirementItemDemo() {
  // API 密钥认证要求
  const apiKeyRequirement = {
    "ApiKeyAuth": []
  };

  // Bearer Token 认证要求
  const bearerTokenRequirement = {
    "BearerAuth": []
  };

  // OAuth 2.0 读权限要求
  const oauthReadRequirement = {
    "OAuth2": ["read"]
  };

  // OAuth 2.0 写权限要求
  const oauthWriteRequirement = {
    "OAuth2": ["write"]
  };

  // OAuth 2.0 多权限要求
  const oauthMultiScopeRequirement = {
    "OAuth2": ["read", "write", "admin"]
  };

  // 用户管理权限要求
  const userManagementRequirement = {
    "OAuth2": ["user:read", "user:write", "user:delete"]
  };

  // 支付处理权限要求
  const paymentRequirement = {
    "OAuth2": ["payment:read", "payment:write", "refund:create"]
  };

  // 管理员权限要求
  const adminRequirement = {
    "OAuth2": ["admin:read", "admin:write", "system:manage"]
  };

  // 文件上传权限要求
  const fileUploadRequirement = {
    "OAuth2": ["file:upload", "file:read"]
  };

  // 数据分析权限要求
  const analyticsRequirement = {
    "OAuth2": ["analytics:read", "reports:generate"]
  };

  // 第三方集成权限要求
  const integrationRequirement = {
    "OAuth2": ["integration:read", "integration:write", "webhook:manage"]
  };

  // HTTP 基本认证要求
  const basicAuthRequirement = {
    "BasicAuth": []
  };

  // Cookie 会话认证要求
  const cookieAuthRequirement = {
    "CookieAuth": []
  };

  // 多重认证要求
  const multiAuthRequirement = {
    "MultiAuth": ["mfa:required"]
  };

  // 企业级认证要求
  const enterpriseAuthRequirement = {
    "EnterpriseAuth": ["enterprise:access", "sso:enabled"]
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 密钥认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          简单的 API 密钥认证，适用于服务器到服务器的通信
        </p>
        <SecurityRequirementItem requirement={apiKeyRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Bearer Token 认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          JWT Bearer Token 认证，适用于无状态的 API 访问
        </p>
        <SecurityRequirementItem requirement={bearerTokenRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 读权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          OAuth 2.0 授权，仅需要读取权限的操作
        </p>
        <SecurityRequirementItem requirement={oauthReadRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 写权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          OAuth 2.0 授权，需要写入权限的操作
        </p>
        <SecurityRequirementItem requirement={oauthWriteRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">OAuth 2.0 多权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          OAuth 2.0 授权，需要多种权限的复杂操作
        </p>
        <SecurityRequirementItem requirement={oauthMultiScopeRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户管理权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户管理操作需要的完整用户权限集合
        </p>
        <SecurityRequirementItem requirement={userManagementRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付处理权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付和退款操作需要的特殊权限
        </p>
        <SecurityRequirementItem requirement={paymentRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">管理员权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统管理操作需要的高级权限
        </p>
        <SecurityRequirementItem requirement={adminRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传和管理操作需要的权限
        </p>
        <SecurityRequirementItem requirement={fileUploadRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据分析和报表生成需要的权限
        </p>
        <SecurityRequirementItem requirement={analyticsRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">第三方集成权限要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          第三方服务集成和 Webhook 管理权限
        </p>
        <SecurityRequirementItem requirement={integrationRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 基本认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          传统的 HTTP 基本认证方式
        </p>
        <SecurityRequirementItem requirement={basicAuthRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Cookie 会话认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          基于 Cookie 的会话认证方式
        </p>
        <SecurityRequirementItem requirement={cookieAuthRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多重认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          高安全级别操作需要的多重身份验证
        </p>
        <SecurityRequirementItem requirement={multiAuthRequirement} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级认证要求</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业环境中的 SSO 单点登录认证
        </p>
        <SecurityRequirementItem requirement={enterpriseAuthRequirement} />
      </div>
    </div>
  );
}
