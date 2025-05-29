import { OAuthFlowDetails } from "@/registry/pivot/oauth-flow-details";

export default function OAuthFlowDetailsDemo() {
  // 授权码流程（Web 应用）
  const authorizationCodeFlow = {
    authorizationUrl: "https://auth.example.com/oauth/authorize",
    tokenUrl: "https://auth.example.com/oauth/token",
    refreshUrl: "https://auth.example.com/oauth/refresh",
    scopes: {
      "read": "读取用户基本信息",
      "write": "修改用户信息",
      "email": "访问用户邮箱",
      "profile": "访问用户详细资料"
    }
  };

  // 客户端凭证流程（服务端应用）
  const clientCredentialsFlow = {
    tokenUrl: "https://api.example.com/oauth/token",
    refreshUrl: "https://api.example.com/oauth/refresh",
    scopes: {
      "api:read": "读取 API 数据",
      "api:write": "写入 API 数据",
      "admin:manage": "管理系统配置",
      "reports:generate": "生成报表"
    }
  };

  // 隐式流程（单页应用）
  const implicitFlow = {
    authorizationUrl: "https://auth.example.com/oauth/authorize",
    scopes: {
      "openid": "OpenID Connect 身份验证",
      "profile": "用户基本资料",
      "email": "用户邮箱地址",
      "offline_access": "离线访问权限"
    }
  };

  // 密码流程（受信任应用）
  const passwordFlow = {
    tokenUrl: "https://auth.example.com/oauth/token",
    refreshUrl: "https://auth.example.com/oauth/refresh",
    scopes: {
      "user:read": "读取用户信息",
      "user:write": "修改用户信息",
      "user:delete": "删除用户账户",
      "admin:all": "完整管理员权限"
    }
  };

  // 设备授权流程（IoT 设备）
  const deviceCodeFlow = {
    authorizationUrl: "https://auth.example.com/device/authorize",
    tokenUrl: "https://auth.example.com/device/token",
    scopes: {
      "device:register": "设备注册",
      "device:control": "设备控制",
      "telemetry:read": "读取遥测数据",
      "telemetry:write": "写入遥测数据"
    }
  };

  // 企业级 OAuth 流程
  const enterpriseFlow = {
    authorizationUrl: "https://enterprise.example.com/oauth/authorize",
    tokenUrl: "https://enterprise.example.com/oauth/token",
    refreshUrl: "https://enterprise.example.com/oauth/refresh",
    scopes: {
      "enterprise:read": "读取企业数据",
      "enterprise:write": "修改企业数据",
      "audit:read": "读取审计日志",
      "compliance:manage": "合规管理",
      "sso:admin": "单点登录管理"
    }
  };

  // 移动应用 OAuth 流程
  const mobileAppFlow = {
    authorizationUrl: "https://mobile.example.com/oauth/authorize",
    tokenUrl: "https://mobile.example.com/oauth/token",
    refreshUrl: "https://mobile.example.com/oauth/refresh",
    scopes: {
      "mobile:sync": "数据同步",
      "push:notifications": "推送通知",
      "location:access": "位置访问",
      "camera:access": "相机访问",
      "contacts:read": "读取联系人"
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">授权码流程（Web 应用）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          最安全的 OAuth 2.0 流程，适用于有后端服务器的 Web 应用程序
        </p>
        <OAuthFlowDetails
          flowName="Authorization Code"
          flow={authorizationCodeFlow}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">客户端凭证流程（服务端应用）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于服务器到服务器的通信，不涉及用户交互的机器对机器认证
        </p>
        <OAuthFlowDetails
          flowName="Client Credentials"
          flow={clientCredentialsFlow}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">隐式流程（单页应用）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          适用于无法安全存储客户端密钥的单页应用程序（SPA）
        </p>
        <OAuthFlowDetails
          flowName="Implicit"
          flow={implicitFlow}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">密码流程（受信任应用）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          仅适用于高度受信任的第一方应用程序，直接使用用户凭据
        </p>
        <OAuthFlowDetails
          flowName="Resource Owner Password"
          flow={passwordFlow}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">设备授权流程（IoT 设备）</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          专为输入受限的设备设计，如智能电视、IoT 设备等
        </p>
        <OAuthFlowDetails
          flowName="Device Code"
          flow={deviceCodeFlow}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级 OAuth 流程</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级应用的 OAuth 配置，包含审计、合规和 SSO 管理功能
        </p>
        <OAuthFlowDetails
          flowName="Enterprise"
          flow={enterpriseFlow}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">移动应用 OAuth 流程</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          移动应用专用的 OAuth 配置，包含设备特定的权限范围
        </p>
        <OAuthFlowDetails
          flowName="Mobile App"
          flow={mobileAppFlow}
        />
      </div>
    </div>
  );
}
