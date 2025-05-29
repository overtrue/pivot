import { OAuthFlow } from "@/registry/pivot/oauth-flow";

export default function OauthFlowDemo() {
  // 授权码流程 - 适用于 Web 应用
  const authorizationCodeFlow = {
    authorizationUrl: "https://auth.example.com/oauth/authorize",
    tokenUrl: "https://auth.example.com/oauth/token",
    refreshUrl: "https://auth.example.com/oauth/refresh",
    scopes: {
      "read": "读取用户基本信息和资源",
      "write": "创建和修改用户资源",
      "profile": "访问用户详细资料",
      "email": "访问用户邮箱地址",
      "orders": "管理用户订单",
      "payments": "处理支付相关操作",
      "admin": "管理员权限，包含所有操作"
    }
  };

  // 客户端凭证流程 - 适用于服务器到服务器
  const clientCredentialsFlow = {
    tokenUrl: "https://auth.example.com/oauth/token",
    scopes: {
      "api:read": "API 读取权限",
      "api:write": "API 写入权限",
      "api:admin": "API 管理权限",
      "webhook:manage": "Webhook 管理权限",
      "analytics:read": "分析数据读取权限",
      "reports:generate": "报表生成权限"
    }
  };

  // 隐式流程 - 适用于单页应用（已不推荐）
  const implicitFlow = {
    authorizationUrl: "https://auth.example.com/oauth/authorize",
    scopes: {
      "profile": "用户基本信息",
      "email": "用户邮箱",
      "read_only": "只读访问权限"
    }
  };

  // 密码流程 - 适用于受信任的应用（已不推荐）
  const passwordFlow = {
    tokenUrl: "https://auth.example.com/oauth/token",
    scopes: {
      "full_access": "完全访问权限",
      "user_management": "用户管理权限"
    }
  };

  // 设备授权流程 - 适用于输入受限的设备
  const deviceCodeFlow = {
    deviceAuthorizationUrl: "https://auth.example.com/device/authorize",
    tokenUrl: "https://auth.example.com/device/token",
    scopes: {
      "device:control": "设备控制权限",
      "device:status": "设备状态读取权限",
      "device:config": "设备配置权限",
      "device:logs": "设备日志访问权限",
      "remote_access": "远程访问权限"
    }
  };

  // 企业级 OAuth 流程 - 包含多种权限范围
  const enterpriseFlow = {
    authorizationUrl: "https://enterprise-auth.example.com/oauth/authorize",
    tokenUrl: "https://enterprise-auth.example.com/oauth/token",
    refreshUrl: "https://enterprise-auth.example.com/oauth/refresh",
    scopes: {
      "employee:read": "读取员工信息",
      "employee:write": "管理员工信息",
      "department:manage": "部门管理权限",
      "payroll:read": "薪资信息读取",
      "payroll:write": "薪资信息管理",
      "hr:admin": "人力资源管理员权限",
      "finance:read": "财务数据读取",
      "finance:write": "财务数据管理",
      "audit:read": "审计日志读取",
      "system:admin": "系统管理员权限"
    }
  };

  // 移动应用 OAuth 流程 - 支持 PKCE
  const mobileAppFlow = {
    authorizationUrl: "https://mobile-auth.example.com/oauth/authorize",
    tokenUrl: "https://mobile-auth.example.com/oauth/token",
    refreshUrl: "https://mobile-auth.example.com/oauth/refresh",
    scopes: {
      "offline_access": "离线访问权限",
      "push_notifications": "推送通知权限",
      "location": "位置信息访问",
      "camera": "相机访问权限",
      "contacts": "通讯录访问权限",
      "storage": "设备存储访问",
      "biometric": "生物识别认证",
      "background_sync": "后台同步权限"
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">授权码流程（Authorization Code）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          最安全的 OAuth 2.0 流程，适用于 Web 应用。支持刷新令牌和完整的权限控制
        </p>
        <OAuthFlow flow="authorizationCode" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">客户端凭证流程（Client Credentials）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          适用于服务器到服务器的通信，无需用户参与的后台服务认证
        </p>
        <OAuthFlow flow="clientCredentials" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">隐式流程（Implicit）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          简化的流程，直接返回访问令牌。已不推荐使用，建议使用授权码 + PKCE
        </p>
        <OAuthFlow flow="implicit" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">密码流程（Resource Owner Password）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用用户名密码直接获取令牌。仅适用于高度受信任的应用，已不推荐
        </p>
        <OAuthFlow flow="password" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">设备授权流程（Device Code）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          适用于输入受限的设备（如智能电视、IoT 设备），通过其他设备完成授权
        </p>
        <OAuthFlow flow="authorizationCode" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级 OAuth 流程</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业内部系统的 OAuth 认证，包含细粒度的权限控制和部门级别的访问管理
        </p>
        <OAuthFlow flow="authorizationCode" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">移动应用 OAuth 流程</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          移动应用的 OAuth 认证，支持 PKCE 扩展和移动设备特有的权限范围
        </p>
        <OAuthFlow flow="authorizationCode" />
      </div>
    </div>
  );
}
