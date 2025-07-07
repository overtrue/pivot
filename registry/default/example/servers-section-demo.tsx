import { type ServerObject } from "@/registry/default/ui/server";
import { ServersSection } from "@/registry/default/ui/servers-section";

export default function ServersSectionDemo() {
  // 生产环境服务器配置
  const productionServers = [
    {
      url: "https://api.example.com/v1",
      description: "生产环境 API 服务器",
    },
    {
      url: "https://api-eu.example.com/v1",
      description: "欧洲区域 API 服务器",
    },
    {
      url: "https://api-asia.example.com/v1",
      description: "亚洲区域 API 服务器",
    },
  ];

  // 开发环境服务器配置
  const developmentServers = [
    {
      url: "https://dev-api.example.com/v1",
      description: "开发环境 API 服务器",
    },
    {
      url: "https://staging-api.example.com/v1",
      description: "预发布环境 API 服务器",
    },
    {
      url: "http://localhost:3000/api/v1",
      description: "本地开发服务器",
    },
  ];

  // 带变量的服务器配置
  const variableServers: ServerObject[] = [
    {
      url: "https://{environment}.example.com/{version}",
      description: "可配置环境的 API 服务器",
      variables: {
        environment: {
          default: "api",
          enum: ["api", "dev-api", "staging-api"],
          description: "API 环境",
        },
        version: {
          default: "v1",
          enum: ["v1", "v2", "beta"],
          description: "API 版本",
        },
      },
    },
    {
      url: "https://{region}.api.example.com/v1",
      description: "多区域 API 服务器",
      variables: {
        region: {
          default: "us",
          enum: ["us", "eu", "asia"],
          description: "服务器区域",
        },
      },
    },
  ];

  // 不同协议的服务器配置
  const protocolServers = [
    {
      url: "https://api.example.com/v1",
      description: "HTTPS REST API 服务器",
    },
    {
      url: "wss://ws.example.com/v1",
      description: "WebSocket 服务器",
    },
    {
      url: "grpc://grpc.example.com:443",
      description: "gRPC 服务器",
    },
    {
      url: "mqtt://mqtt.example.com:1883",
      description: "MQTT 消息服务器",
    },
  ];

  // 微服务架构服务器配置
  const microserviceServers = [
    {
      url: "https://user-service.example.com/v1",
      description: "用户管理服务",
    },
    {
      url: "https://order-service.example.com/v1",
      description: "订单管理服务",
    },
    {
      url: "https://payment-service.example.com/v1",
      description: "支付处理服务",
    },
    {
      url: "https://notification-service.example.com/v1",
      description: "通知服务",
    },
    {
      url: "https://analytics-service.example.com/v1",
      description: "数据分析服务",
    },
  ];

  // 负载均衡服务器配置
  const loadBalancedServers = [
    {
      url: "https://api-lb.example.com/v1",
      description: "主负载均衡器",
    },
    {
      url: "https://api-backup.example.com/v1",
      description: "备用负载均衡器",
    },
    {
      url: "https://api-1.example.com/v1",
      description: "API 服务器 1",
    },
    {
      url: "https://api-2.example.com/v1",
      description: "API 服务器 2",
    },
    {
      url: "https://api-3.example.com/v1",
      description: "API 服务器 3",
    },
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">生产环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多区域部署的生产环境 API 服务器
        </p>
        <ServersSection servers={productionServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">开发环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于开发和测试的服务器环境
        </p>
        <ServersSection servers={developmentServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">可配置服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          使用变量支持多环境和多版本的服务器配置
        </p>
        <ServersSection servers={variableServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多协议服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持不同通信协议的服务器配置
        </p>
        <ServersSection servers={protocolServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">微服务架构</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          按功能拆分的微服务 API 端点
        </p>
        <ServersSection servers={microserviceServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">负载均衡配置</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含主备和多实例的负载均衡服务器配置
        </p>
        <ServersSection servers={loadBalancedServers} />
      </div>
    </div>
  );
}
