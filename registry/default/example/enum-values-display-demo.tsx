import { EnumValuesDisplay } from "@/registry/default/ui/enum-values-display";

export default function EnumValuesDisplayDemo() {
  // 订单状态枚举
  const orderStatusEnum = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ];

  // 用户角色枚举
  const userRoleEnum = ["admin", "moderator", "user", "guest"];

  // 支付方式枚举
  const paymentMethodEnum = [
    "credit_card",
    "debit_card",
    "paypal",
    "apple_pay",
    "google_pay",
    "bank_transfer",
    "cash_on_delivery",
  ];

  // 产品分类枚举
  const productCategoryEnum = [
    "electronics",
    "clothing",
    "books",
    "home_garden",
    "sports_outdoors",
    "health_beauty",
    "toys_games",
  ];

  // 文件类型枚举
  const fileTypeEnum = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/plain",
    "application/json",
    "application/xml",
  ];

  // 优先级枚举
  const priorityEnum = ["low", "medium", "high", "urgent", "critical"];

  // 语言代码枚举
  const languageEnum = [
    "zh-CN",
    "en-US",
    "ja-JP",
    "ko-KR",
    "fr-FR",
    "de-DE",
    "es-ES",
    "pt-BR",
  ];

  // 货币代码枚举
  const currencyEnum = ["USD", "EUR", "GBP", "JPY", "CNY", "KRW", "CAD", "AUD"];

  // 时区枚举
  const timezoneEnum = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Asia/Seoul",
  ];

  // HTTP 方法枚举
  const httpMethodEnum = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "HEAD",
    "OPTIONS",
  ];

  // 数据格式枚举
  const dataFormatEnum = ["json", "xml", "csv", "xlsx", "pdf", "html", "yaml"];

  // 通知类型枚举
  const notificationTypeEnum = [
    "email",
    "sms",
    "push_notification",
    "in_app",
    "webhook",
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">订单状态枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商系统中订单的各种状态值，从创建到完成的完整生命周期
        </p>
        <EnumValuesDisplay values={orderStatusEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户角色枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统中不同用户角色的权限级别定义
        </p>
        <EnumValuesDisplay values={userRoleEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付方式枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支持的各种支付方式选项，包含线上和线下支付
        </p>
        <EnumValuesDisplay values={paymentMethodEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品分类枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台的主要产品分类标识符
        </p>
        <EnumValuesDisplay values={productCategoryEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件类型枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传接口支持的 MIME 类型列表
        </p>
        <EnumValuesDisplay values={fileTypeEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">优先级枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          任务或工单的优先级级别定义
        </p>
        <EnumValuesDisplay values={priorityEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">语言代码枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          国际化支持的语言和地区代码标准
        </p>
        <EnumValuesDisplay values={languageEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">货币代码枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付系统支持的国际货币代码（ISO 4217）
        </p>
        <EnumValuesDisplay values={currencyEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">时区枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统支持的时区标识符（IANA 时区数据库）
        </p>
        <EnumValuesDisplay values={timezoneEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 方法枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          RESTful API 支持的 HTTP 请求方法
        </p>
        <EnumValuesDisplay values={httpMethodEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据格式枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据导出和导入支持的文件格式
        </p>
        <EnumValuesDisplay values={dataFormatEnum} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知类型枚举</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统通知的各种发送渠道和方式
        </p>
        <EnumValuesDisplay values={notificationTypeEnum} />
      </div>
    </div>
  );
}
