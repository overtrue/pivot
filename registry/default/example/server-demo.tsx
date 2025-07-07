import { Server } from "@/registry/default/ui/server";

export default function ServerDemo() {
  // 生产环境服务器
  const productionServer = {
    url: "https://api.example.com/v1",
    description: "生产环境 API 服务器，提供稳定可靠的服务"
  };

  // 预发布环境服务器
  const stagingServer = {
    url: "https://staging-api.example.com/v1",
    description: "预发布环境，用于最终测试和验证"
  };

  // 开发环境服务器
  const developmentServer = {
    url: "https://dev-api.example.com/v1",
    description: "开发环境，用于功能开发和调试"
  };

  // 本地开发服务器
  const localServer = {
    url: "http://localhost:3000/api/v1",
    description: "本地开发服务器，用于本地开发和测试"
  };

  // 带变量的服务器配置
  const variableServer = {
    url: "https://{environment}.api.example.com/{version}",
    description: "可配置的服务器环境，支持多环境部署",
    variables: {
      environment: {
        default: "prod",
        enum: ["prod", "staging", "dev"],
        description: "部署环境"
      },
      version: {
        default: "v1",
        enum: ["v1", "v2", "beta"],
        description: "API 版本"
      }
    }
  };

  // 区域化服务器
  const regionalServer = {
    url: "https://{region}.api.example.com/v1",
    description: "区域化 API 服务器，提供就近访问服务",
    variables: {
      region: {
        default: "us-east",
        enum: ["us-east", "us-west", "eu-west", "ap-southeast"],
        description: "服务器区域"
      }
    }
  };

  // 微服务架构服务器
  const microserviceServer = {
    url: "https://gateway.example.com/api/{service}/v1",
    description: "微服务网关，统一管理多个微服务的访问入口",
    variables: {
      service: {
        default: "user",
        enum: ["user", "product", "order", "payment", "notification"],
        description: "微服务名称"
      }
    }
  };

  // CDN 加速服务器
  const cdnServer = {
    url: "https://cdn.example.com/api/v1",
    description: "CDN 加速的 API 服务器，提供全球加速访问"
  };

  // WebSocket 服务器
  const websocketServer = {
    url: "wss://ws.example.com/v1",
    description: "WebSocket 实时通信服务器，支持实时数据推送"
  };

  // 负载均衡服务器
  const loadBalancedServer = {
    url: "https://lb.api.example.com/v1",
    description: "负载均衡服务器，自动分发请求到多个后端实例"
  };

  // 测试沙盒服务器
  const sandboxServer = {
    url: "https://sandbox.api.example.com/v1",
    description: "测试沙盒环境，提供安全的测试数据和功能"
  };

  // 企业私有云服务器
  const privateCloudServer = {
    url: "https://{tenant}.private.example.com/api/v1",
    description: "企业私有云部署，为企业客户提供独立的服务实例",
    variables: {
      tenant: {
        default: "demo",
        description: "租户标识符"
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">生产环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          正式生产环境的 API 服务器配置
        </p>
        <Server server={productionServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">预发布环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于最终测试和验证的预发布环境
        </p>
        <Server server={stagingServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">开发环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          开发团队使用的开发环境配置
        </p>
        <Server server={developmentServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">本地开发服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          本地开发和调试使用的服务器配置
        </p>
        <Server server={localServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">可配置环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多环境和版本切换的灵活服务器配置
        </p>
        <Server server={variableServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">区域化服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多区域部署的全球化服务器配置
        </p>
        <Server server={regionalServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">微服务架构服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          微服务网关统一入口的服务器配置
        </p>
        <Server server={microserviceServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">CDN 加速服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用 CDN 加速的全球分发服务器
        </p>
        <Server server={cdnServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">WebSocket 服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          实时通信和数据推送的 WebSocket 服务器
        </p>
        <Server server={websocketServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">负载均衡服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          高可用性的负载均衡服务器配置
        </p>
        <Server server={loadBalancedServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">测试沙盒服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          安全的测试环境和沙盒服务器
        </p>
        <Server server={sandboxServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业私有云服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级私有云部署的多租户服务器
        </p>
        <Server server={privateCloudServer} />
      </div>
    </div>
  );
}
