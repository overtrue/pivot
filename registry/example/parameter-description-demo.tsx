import { ParameterDescription } from "@/registry/pivot/parameter-description";

export default function ParameterDescriptionDemo() {
  // 用户 ID 参数描述
  const userIdDescription = {
    description: "用户的唯一标识符，用于识别特定用户账户。必须是有效的 UUID 格式。",
    example: "123e4567-e89b-12d3-a456-426614174000"
  };

  // 分页参数描述
  const pageDescription = {
    description: "分页页码，从 1 开始计数。用于控制返回结果的分页显示。",
    example: 1,
    minimum: 1,
    maximum: 1000
  };

  // 搜索关键词参数描述
  const searchDescription = {
    description: "搜索关键词，支持模糊匹配。可以搜索产品名称、描述或标签。最少 2 个字符，最多 100 个字符。",
    example: "iPhone 手机",
    minLength: 2,
    maxLength: 100
  };

  // 日期范围参数描述
  const dateRangeDescription = {
    description: "查询的开始日期，格式为 ISO 8601 标准（YYYY-MM-DD）。用于筛选指定日期范围内的数据。",
    example: "2024-01-01",
    format: "date"
  };

  // 排序参数描述
  const sortDescription = {
    description: "排序字段，指定结果集的排序方式。支持多个字段组合排序，用逗号分隔。",
    example: "created_at,name",
    enum: ["created_at", "updated_at", "name", "price", "popularity"]
  };

  // 文件类型参数描述
  const fileTypeDescription = {
    description: "上传文件的 MIME 类型限制。只允许上传指定类型的文件，确保系统安全性。",
    example: "image/jpeg",
    enum: ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/plain"]
  };

  // API 版本参数描述
  const versionDescription = {
    description: "API 版本号，用于向后兼容。建议使用最新版本以获得最佳功能和性能。",
    example: "v2",
    enum: ["v1", "v2", "beta"],
    deprecated: false
  };

  // 地理位置参数描述
  const locationDescription = {
    description: "地理位置坐标，格式为 '纬度,经度'。用于基于位置的服务和搜索功能。",
    example: "39.9042,116.4074",
    pattern: "^-?\\d+\\.\\d+,-?\\d+\\.\\d+$"
  };

  // 权限范围参数描述
  const scopeDescription = {
    description: "权限范围列表，用空格分隔。定义客户端应用可以访问的资源和操作权限。",
    example: "read write profile",
    pattern: "^[a-z_]+(\\s+[a-z_]+)*$"
  };

  // 语言代码参数描述
  const languageDescription = {
    description: "语言代码，遵循 ISO 639-1 标准。用于国际化和本地化功能。",
    example: "zh-CN",
    enum: ["zh-CN", "en-US", "ja-JP", "ko-KR", "fr-FR", "de-DE", "es-ES"]
  };

  // 货币代码参数描述
  const currencyDescription = {
    description: "货币代码，遵循 ISO 4217 标准。用于价格显示和支付处理。",
    example: "USD",
    enum: ["USD", "EUR", "GBP", "JPY", "CNY", "KRW"],
    pattern: "^[A-Z]{3}$"
  };

  // 批量操作参数描述
  const batchDescription = {
    description: "批量操作的项目 ID 列表，用逗号分隔。单次操作最多支持 100 个项目。",
    example: "id1,id2,id3",
    maxItems: 100
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户 ID 参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户标识符的详细说明，包含格式要求和示例
        </p>
        <ParameterDescription description={userIdDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">分页参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          分页控制参数，包含取值范围和使用说明
        </p>
        <ParameterDescription description={pageDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">搜索关键词参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          搜索功能参数，包含长度限制和使用场景
        </p>
        <ParameterDescription description={searchDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">日期范围参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          日期筛选参数，包含格式要求和标准说明
        </p>
        <ParameterDescription description={dateRangeDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">排序参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          结果排序参数，包含可选字段和组合方式
        </p>
        <ParameterDescription description={sortDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件类型参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传类型限制，包含安全性考虑
        </p>
        <ParameterDescription description={fileTypeDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 版本参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 版本控制参数，包含兼容性说明
        </p>
        <ParameterDescription description={versionDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">地理位置参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          地理坐标参数，包含格式验证和使用场景
        </p>
        <ParameterDescription description={locationDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">权限范围参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          OAuth 权限范围参数，包含格式要求和权限说明
        </p>
        <ParameterDescription description={scopeDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">语言代码参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          国际化语言参数，遵循国际标准
        </p>
        <ParameterDescription description={languageDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">货币代码参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          货币标识参数，用于支付和价格显示
        </p>
        <ParameterDescription description={currencyDescription.description} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">批量操作参数描述</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          批量处理参数，包含数量限制和格式要求
        </p>
        <ParameterDescription description={batchDescription.description} />
      </div>
    </div>
  );
}
