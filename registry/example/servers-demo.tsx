import { type ServerObject } from "@/registry/pivot/server";
import { Servers } from "@/registry/pivot/servers";

export default function ServersDemo() {
  // 基础多环境服务器配置
  const basicServers = [
    {
      url: "https://api.example.com/v1",
      description: "生产环境 - 稳定可靠的正式服务"
    },
    {
      url: "https://staging-api.example.com/v1",
      description: "预发布环境 - 最终测试和验证"
    },
    {
      url: "https://dev-api.example.com/v1",
      description: "开发环境 - 功能开发和调试"
    }
  ];

  // 全球化部署服务器配置
  const globalServers = [
    {
      url: "https://us-east.api.example.com/v1",
      description: "美国东部数据中心 - 北美用户优选"
    },
    {
      url: "https://eu-west.api.example.com/v1",
      description: "欧洲西部数据中心 - 欧洲用户优选"
    },
    {
      url: "https://ap-southeast.api.example.com/v1",
      description: "亚太东南数据中心 - 亚洲用户优选"
    },
    {
      url: "https://ap-northeast.api.example.com/v1",
      description: "亚太东北数据中心 - 日韩用户优选"
    }
  ];

  // 可配置变量服务器
  const variableServers: ServerObject[] = [
    {
      url: "https://{environment}.api.example.com/{version}",
      description: "可配置环境和版本的灵活服务器",
      variables: {
        environment: {
          default: "prod",
          enum: ["prod", "staging", "dev", "test"],
          description: "部署环境选择"
        },
        version: {
          default: "v1",
          enum: ["v1", "v2", "beta"],
          description: "API 版本选择"
        }
      }
    },
    {
      url: "https://{region}.api.example.com/v1",
      description: "区域化服务器，自动选择最近的数据中心",
      variables: {
        region: {
          default: "auto",
          enum: ["auto", "us-east", "us-west", "eu-west", "ap-southeast"],
          description: "服务器区域"
        }
      }
    }
  ];

  // 微服务架构服务器
  const microserviceServers = [
    {
      url: "https://gateway.example.com/api/user/v1",
      description: "用户服务 - 用户认证、资料管理"
    },
    {
      url: "https://gateway.example.com/api/product/v1",
      description: "产品服务 - 商品信息、库存管理"
    },
    {
      url: "https://gateway.example.com/api/order/v1",
      description: "订单服务 - 订单处理、状态跟踪"
    },
    {
      url: "https://gateway.example.com/api/payment/v1",
      description: "支付服务 - 支付处理、交易管理"
    },
    {
      url: "https://gateway.example.com/api/notification/v1",
      description: "通知服务 - 消息推送、邮件发送"
    }
  ];

  // 多协议服务器配置
  const multiProtocolServers = [
    {
      url: "https://api.example.com/v1",
      description: "HTTPS REST API - 标准 HTTP 接口"
    },
    {
      url: "wss://ws.example.com/v1",
      description: "WebSocket API - 实时双向通信"
    },
    {
      url: "grpc://grpc.example.com:443",
      description: "gRPC API - 高性能 RPC 调用"
    },
    {
      url: "mqtt://mqtt.example.com:1883",
      description: "MQTT Broker - IoT 设备消息传输"
    }
  ];

  // 企业级服务器配置
  const enterpriseServers = [
    {
      url: "https://api.enterprise.example.com/v1",
      description: "企业生产环境 - 99.9% SLA 保证"
    },
    {
      url: "https://api-backup.enterprise.example.com/v1",
      description: "企业备份环境 - 灾难恢复和故障转移"
    },
    {
      url: "https://{tenant}.private.example.com/api/v1",
      description: "私有云部署 - 企业专属实例",
      variables: {
        tenant: {
          default: "demo",
          description: "企业租户标识符"
        }
      }
    }
  ];

  // 开发测试服务器配置
  const developmentServers = [
    {
      url: "http://localhost:3000/api/v1",
      description: "本地开发服务器 - 开发调试使用"
    },
    {
      url: "https://dev-api.example.com/v1",
      description: "远程开发环境 - 团队协作开发"
    },
    {
      url: "https://sandbox.example.com/v1",
      description: "沙盒测试环境 - 安全的测试数据"
    },
    {
      url: "https://mock.example.com/v1",
      description: "Mock 服务器 - 模拟数据和响应"
    }
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">基础多环境服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的开发、预发布、生产环境服务器配置
        </p>
        <Servers servers={basicServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">全球化部署服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多区域数据中心部署，为全球用户提供就近访问服务
        </p>
        <Servers servers={globalServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">可配置变量服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持动态配置的服务器，可根据需要切换环境和版本
        </p>
        <Servers servers={variableServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">微服务架构服务器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          微服务架构下的各个服务端点，通过网关统一管理
        </p>
        <Servers servers={microserviceServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多协议服务器配置</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多种通信协议的服务器配置，满足不同场景需求
        </p>
        <Servers servers={multiProtocolServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级服务器配置</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级部署方案，包含高可用、灾备和私有云配置
        </p>
        <Servers servers={enterpriseServers} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">开发测试服务器配置</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          开发和测试阶段使用的各种服务器环境配置
        </p>
        <Servers servers={developmentServers} />
      </div>
    </div>
  );
}
