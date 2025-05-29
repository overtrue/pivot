import { InfoSection } from "@/registry/pivot/info-section";

export default function InfoSectionDemo() {
  const apiInfo = {
    title: "Pivot API",
    version: "1.0.0",
    description: "这是一个功能强大的 API，提供了完整的用户管理、数据处理和分析功能。支持 RESTful 接口，具有高性能和可扩展性。\n\n## 主要特性\n\n- **用户管理**: 完整的用户注册、登录、权限管理\n- **数据处理**: 支持多种数据格式的导入导出\n- **实时分析**: 提供实时数据分析和报表功能\n- **安全性**: 采用 OAuth2 和 JWT 认证机制",
    termsOfService: "https://example.com/terms",
    contact: {
      name: "API Support Team",
      email: "support@example.com",
      url: "https://example.com/support"
    },
    license: {
      name: "MIT License",
      identifier: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  };

  return (
    <div className="space-y-4 min-w-md">
      <InfoSection info={apiInfo} />
    </div>
  );
}
