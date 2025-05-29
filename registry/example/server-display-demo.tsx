import { ServerDisplay, type ServerObject } from "@/registry/pivot/server-display";

export default function ServerDisplayDemo() {
  // 生产环境服务器
  const productionServer: ServerObject = {
    url: "https://api.example.com/v1",
    description: "生产环境 API 服务器 - 99.9% SLA 保证，全球 CDN 加速"
  };

  // 带版本变量的服务器
  const versionedServer: ServerObject = {
    url: "https://api.example.com/{version}",
    description: "支持多版本的 API 服务器，可选择不同的 API 版本",
    variables: {
      version: {
        default: "v1",
        description: "API 版本号",
        enum: ["v1", "v2", "v3", "beta"]
      }
    }
  };

  // 多环境服务器
  const multiEnvironmentServer: ServerObject = {
    url: "https://{environment}.api.example.com/{version}",
    description: "多环境部署的 API 服务器，支持开发、测试和生产环境",
    variables: {
      environment: {
        default: "prod",
        description: "部署环境",
        enum: ["prod", "staging", "dev", "test"]
      },
      version: {
        default: "v1",
        description: "API 版本",
        enum: ["v1", "v2", "beta"]
      }
    }
  };

  // 区域化服务器
  const regionalServer: ServerObject = {
    url: "https://{region}.api.example.com/v1",
    description: "全球化部署的区域服务器，自动选择最近的数据中心以获得最佳性能",
    variables: {
      region: {
        default: "us-east",
        description: "服务器区域",
        enum: ["us-east", "us-west", "eu-west", "eu-central", "ap-southeast", "ap-northeast"]
      }
    }
  };

  // 微服务网关
  const microserviceGateway: ServerObject = {
    url: "https://gateway.example.com/api/{service}/{version}",
    description: "微服务 API 网关，统一管理多个微服务的访问入口",
    variables: {
      service: {
        default: "user",
        description: "微服务名称",
        enum: ["user", "product", "order", "payment", "notification", "analytics"]
      },
      version: {
        default: "v1",
        description: "服务版本",
        enum: ["v1", "v2"]
      }
    }
  };

  // 企业私有云服务器
  const enterpriseServer: ServerObject = {
    url: "https://{tenant}.private.example.com/api/v1",
    description: "企业私有云部署，为每个企业客户提供独立的服务实例",
    variables: {
      tenant: {
        default: "demo",
        description: "企业租户标识符，由企业管理员提供"
      }
    }
  };

  // 开发环境服务器
  const developmentServer: ServerObject = {
    url: "http://localhost:{port}/api/v1",
    description: "本地开发服务器，用于开发和调试，支持自定义端口",
    variables: {
      port: {
        default: "3000",
        description: "服务器端口号"
      }
    }
  };

  // WebSocket 服务器
  const websocketServer: ServerObject = {
    url: "wss://ws.example.com/{version}",
    description: "WebSocket 实时通信服务器，支持实时数据推送和双向通信",
    variables: {
      version: {
        default: "v1",
        description: "WebSocket 协议版本",
        enum: ["v1", "v2"]
      }
    }
  };

  // 沙盒测试服务器
  const sandboxServer: ServerObject = {
    url: "https://sandbox.example.com/api/v1",
    description: "沙盒测试环境，提供安全的测试数据和功能，不会影响生产数据"
  };

  // 负载均衡服务器
  const loadBalancedServer: ServerObject = {
    url: "https://lb-{cluster}.api.example.com/v1",
    description: "负载均衡集群服务器，自动分发请求到多个后端实例",
    variables: {
      cluster: {
        default: "primary",
        description: "集群标识",
        enum: ["primary", "secondary", "backup"]
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">生产环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的生产环境 API 服务器配置
        </p>
        <ServerDisplay server={productionServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">版本化 API 服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多个 API 版本的服务器配置，便于版本管理和向后兼容
        </p>
        <ServerDisplay server={versionedServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多环境部署服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持开发、测试、预发布和生产环境的灵活配置
        </p>
        <ServerDisplay server={multiEnvironmentServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">全球化区域服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多区域数据中心部署，为全球用户提供就近访问服务
        </p>
        <ServerDisplay server={regionalServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">微服务 API 网关</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          微服务架构的统一网关入口，管理多个服务的访问
        </p>
        <ServerDisplay server={microserviceGateway} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业私有云服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级私有云部署，支持多租户隔离和定制化配置
        </p>
        <ServerDisplay server={enterpriseServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">本地开发服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          本地开发环境配置，支持自定义端口和开发调试
        </p>
        <ServerDisplay server={developmentServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">WebSocket 实时服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          WebSocket 协议的实时通信服务器，支持双向数据传输
        </p>
        <ServerDisplay server={websocketServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">沙盒测试服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          安全的测试环境，提供模拟数据和功能验证
        </p>
        <ServerDisplay server={sandboxServer} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">负载均衡集群服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          高可用性的负载均衡配置，支持多集群部署
        </p>
        <ServerDisplay server={loadBalancedServer} />
      </div>
    </div>
  );
}
