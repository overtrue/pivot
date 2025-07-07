import { ServerVariable } from "@/registry/default/ui/server-variable";

export default function ServerVariableDemo() {
  // API 版本变量
  const apiVersionVariable = {
    name: "version",
    variable: {
      default: "v1",
      description: "API 版本号，支持多个版本并行",
      enum: ["v1", "v2", "v3", "beta"],
    },
  };

  // 环境变量
  const environmentVariable = {
    name: "environment",
    variable: {
      default: "prod",
      description: "部署环境标识符，用于区分不同的运行环境",
      enum: ["prod", "staging", "dev", "test"],
    },
  };

  // 区域变量
  const regionVariable = {
    name: "region",
    variable: {
      default: "us-east",
      description: "服务器区域，自动选择最近的数据中心以获得最佳性能",
      enum: [
        "us-east",
        "us-west",
        "eu-west",
        "eu-central",
        "ap-southeast",
        "ap-northeast",
      ],
    },
  };

  // 服务名称变量
  const serviceVariable = {
    name: "service",
    variable: {
      default: "user",
      description: "微服务名称，用于微服务架构中的服务路由",
      enum: [
        "user",
        "product",
        "order",
        "payment",
        "notification",
        "analytics",
      ],
    },
  };

  // 端口变量
  const portVariable = {
    name: "port",
    variable: {
      default: "3000",
      description: "服务器端口号，可根据部署环境进行配置",
    },
  };

  // 租户变量
  const tenantVariable = {
    name: "tenant",
    variable: {
      default: "demo",
      description: "企业租户标识符，用于多租户 SaaS 平台的租户隔离",
    },
  };

  // 协议变量
  const protocolVariable = {
    name: "protocol",
    variable: {
      default: "https",
      description: "通信协议，生产环境建议使用 HTTPS",
      enum: ["http", "https", "ws", "wss"],
    },
  };

  // 集群变量
  const clusterVariable = {
    name: "cluster",
    variable: {
      default: "primary",
      description: "集群标识符，用于负载均衡和高可用部署",
      enum: ["primary", "secondary", "backup"],
    },
  };

  // 数据中心变量
  const datacenterVariable = {
    name: "datacenter",
    variable: {
      default: "dc1",
      description: "数据中心标识符，用于多数据中心部署和灾备",
      enum: ["dc1", "dc2", "dc3"],
    },
  };

  // 子域名变量
  const subdomainVariable = {
    name: "subdomain",
    variable: {
      default: "api",
      description: "子域名前缀，用于不同服务的域名区分",
      enum: ["api", "admin", "cdn", "ws", "static"],
    },
  };

  // 语言变量
  const languageVariable = {
    name: "lang",
    variable: {
      default: "en",
      description: "API 响应语言，支持国际化多语言响应",
      enum: ["en", "zh", "ja", "ko", "es", "fr", "de"],
    },
  };

  // 格式变量
  const formatVariable = {
    name: "format",
    variable: {
      default: "json",
      description: "响应数据格式，支持多种数据交换格式",
      enum: ["json", "xml", "yaml", "csv"],
    },
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 版本变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 版本控制变量，支持多版本并行和向后兼容
        </p>
        <ServerVariable {...apiVersionVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">部署环境变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          部署环境标识符，用于区分开发、测试、预发布和生产环境
        </p>
        <ServerVariable {...environmentVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">服务器区域变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          全球化部署的区域选择，自动路由到最近的数据中心
        </p>
        <ServerVariable {...regionVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">微服务名称变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          微服务架构中的服务标识符，用于服务发现和路由
        </p>
        <ServerVariable {...serviceVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">服务器端口变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          可配置的服务器端口号，适用于本地开发和容器化部署
        </p>
        <ServerVariable {...portVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业租户变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多租户 SaaS 平台的租户标识符，实现数据和服务隔离
        </p>
        <ServerVariable {...tenantVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通信协议变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持多种通信协议，包含 HTTP、HTTPS 和 WebSocket
        </p>
        <ServerVariable {...protocolVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">集群标识变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          负载均衡集群的标识符，支持主备集群和故障转移
        </p>
        <ServerVariable {...clusterVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据中心变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多数据中心部署的标识符，支持灾备和就近访问
        </p>
        <ServerVariable {...datacenterVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">子域名变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          不同服务的子域名前缀，实现服务的域名级别隔离
        </p>
        <ServerVariable {...subdomainVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">响应语言变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          国际化多语言支持，API 响应内容的语言选择
        </p>
        <ServerVariable {...languageVariable} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据格式变量</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          响应数据格式选择，支持多种数据交换和序列化格式
        </p>
        <ServerVariable {...formatVariable} />
      </div>
    </div>
  );
}
