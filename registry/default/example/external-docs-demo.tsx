import { ExternalDocs } from "@/registry/default/ui/external-docs";

export default function ExternalDocsDemo() {
  // API 开发者指南
  const developerGuide = {
    description: "完整的 API 开发者指南，包含快速入门、最佳实践和常见问题解答",
    url: "https://docs.example.com/developer-guide"
  };

  // SDK 和工具文档
  const sdkDocumentation = {
    description: "官方 SDK 文档和代码示例，支持 JavaScript、Python、PHP、Java 等多种语言",
    url: "https://docs.example.com/sdks"
  };

  // API 变更日志
  const changelog = {
    description: "API 版本更新记录和重大变更通知，帮助开发者了解最新功能和兼容性信息",
    url: "https://docs.example.com/changelog"
  };

  // 认证和安全指南
  const securityGuide = {
    description: "API 安全最佳实践，包含认证方式、权限管理、数据加密和安全合规指导",
    url: "https://docs.example.com/security"
  };

  // 错误处理指南
  const errorHandling = {
    description: "详细的错误代码说明和处理建议，帮助开发者快速定位和解决问题",
    url: "https://docs.example.com/error-handling"
  };

  // 速率限制说明
  const rateLimiting = {
    description: "API 调用频率限制说明，包含限制规则、配额管理和优化建议",
    url: "https://docs.example.com/rate-limits"
  };

  // Webhook 集成指南
  const webhookGuide = {
    description: "Webhook 事件订阅和处理指南，包含事件类型、签名验证和重试机制",
    url: "https://docs.example.com/webhooks"
  };

  // 测试环境说明
  const testingGuide = {
    description: "测试环境使用指南，包含沙盒环境、测试数据和调试工具的使用方法",
    url: "https://docs.example.com/testing"
  };

  // 迁移指南
  const migrationGuide = {
    description: "API 版本迁移指南，帮助开发者从旧版本平滑升级到新版本",
    url: "https://docs.example.com/migration"
  };

  // 社区和支持
  const communitySupport = {
    description: "开发者社区论坛、技术支持渠道和常见问题解答",
    url: "https://community.example.com"
  };

  // 第三方集成案例
  const integrationExamples = {
    description: "第三方平台集成案例和最佳实践，包含电商、CRM、支付等常见场景",
    url: "https://docs.example.com/integrations"
  };

  // 性能优化指南
  const performanceGuide = {
    description: "API 性能优化建议，包含缓存策略、批量操作和并发处理最佳实践",
    url: "https://docs.example.com/performance"
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 开发者指南</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          新手入门必读，包含完整的开发流程和最佳实践
        </p>
        <ExternalDocs
          url={developerGuide.url}
          description={developerGuide.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">SDK 和工具文档</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多语言 SDK 文档和开发工具使用指南
        </p>
        <ExternalDocs
          url={sdkDocumentation.url}
          description={sdkDocumentation.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 变更日志</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          版本更新记录和重大变更通知
        </p>
        <ExternalDocs
          url={changelog.url}
          description={changelog.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">认证和安全指南</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 安全最佳实践和合规指导
        </p>
        <ExternalDocs
          url={securityGuide.url}
          description={securityGuide.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">错误处理指南</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          详细的错误代码说明和处理建议
        </p>
        <ExternalDocs
          url={errorHandling.url}
          description={errorHandling.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">速率限制说明</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 调用频率限制和配额管理
        </p>
        <ExternalDocs
          url={rateLimiting.url}
          description={rateLimiting.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Webhook 集成指南</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          事件订阅和 Webhook 处理最佳实践
        </p>
        <ExternalDocs
          url={webhookGuide.url}
          description={webhookGuide.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">测试环境说明</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          沙盒环境和测试工具使用指南
        </p>
        <ExternalDocs
          url={testingGuide.url}
          description={testingGuide.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">迁移指南</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 版本升级和迁移最佳实践
        </p>
        <ExternalDocs
          url={migrationGuide.url}
          description={migrationGuide.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">社区和支持</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          开发者社区、技术支持和问题反馈渠道
        </p>
        <ExternalDocs
          url={communitySupport.url}
          description={communitySupport.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">第三方集成案例</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          常见平台集成案例和实现方案
        </p>
        <ExternalDocs
          url={integrationExamples.url}
          description={integrationExamples.description}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">性能优化指南</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 性能优化和高并发处理建议
        </p>
        <ExternalDocs
          url={performanceGuide.url}
          description={performanceGuide.description}
        />
      </div>
    </div>
  );
}
