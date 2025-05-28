import { OperationPath } from "@/registry/pivot/operation-path";

export default function OperationPathDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户相关的 RESTful API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/users" />
          <OperationPath path="/api/v1/users/{userId}" />
          <OperationPath path="/api/v1/users/{userId}/profile" />
          <OperationPath path="/api/v1/users/{userId}/avatar" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">电商产品 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台产品管理的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/products" />
          <OperationPath path="/api/v1/products/{productId}" />
          <OperationPath path="/api/v1/products/{productId}/reviews" />
          <OperationPath path="/api/v1/products/{productId}/inventory" />
          <OperationPath path="/api/v1/categories/{categoryId}/products" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单处理 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          订单管理和处理流程的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/orders" />
          <OperationPath path="/api/v1/orders/{orderId}" />
          <OperationPath path="/api/v1/orders/{orderId}/items" />
          <OperationPath path="/api/v1/orders/{orderId}/items/{itemId}" />
          <OperationPath path="/api/v1/orders/{orderId}/status" />
          <OperationPath path="/api/v1/orders/{orderId}/tracking" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付系统 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理和交易管理的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/payments" />
          <OperationPath path="/api/v1/payments/{paymentId}" />
          <OperationPath path="/api/v1/payments/{paymentId}/refund" />
          <OperationPath path="/api/v1/payment-methods" />
          <OperationPath path="/api/v1/payment-methods/{methodId}" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件管理 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传、下载和管理的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/files" />
          <OperationPath path="/api/v1/files/{fileId}" />
          <OperationPath path="/api/v1/files/{fileId}/download" />
          <OperationPath path="/api/v1/files/{fileId}/metadata" />
          <OperationPath path="/api/v1/uploads/{uploadId}/status" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          CMS 内容管理系统的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/articles" />
          <OperationPath path="/api/v1/articles/{articleId}" />
          <OperationPath path="/api/v1/articles/{articleId}/comments" />
          <OperationPath path="/api/v1/articles/{articleId}/comments/{commentId}" />
          <OperationPath path="/api/v1/categories/{categoryId}/articles" />
          <OperationPath path="/api/v1/authors/{authorId}/articles" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知系统 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          消息推送和通知管理的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/notifications" />
          <OperationPath path="/api/v1/notifications/{notificationId}" />
          <OperationPath path="/api/v1/notifications/{notificationId}/read" />
          <OperationPath path="/api/v1/users/{userId}/notifications" />
          <OperationPath path="/api/v1/push-tokens" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据统计和分析报表的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/analytics/users" />
          <OperationPath path="/api/v1/analytics/sales" />
          <OperationPath path="/api/v1/analytics/products/{productId}/performance" />
          <OperationPath path="/api/v1/reports/{reportId}" />
          <OperationPath path="/api/v1/dashboards/{dashboardId}/widgets" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">系统管理 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统配置和管理功能的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/admin/users" />
          <OperationPath path="/api/v1/admin/users/{userId}/permissions" />
          <OperationPath path="/api/v1/admin/system/health" />
          <OperationPath path="/api/v1/admin/system/metrics" />
          <OperationPath path="/api/v1/admin/logs/{logId}" />
          <OperationPath path="/api/v1/admin/settings/{settingKey}" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">第三方集成 API 路径</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          第三方服务集成和 Webhook 的 API 端点路径
        </p>
        <div className="space-y-3">
          <OperationPath path="/api/v1/integrations" />
          <OperationPath path="/api/v1/integrations/{integrationId}" />
          <OperationPath path="/api/v1/webhooks" />
          <OperationPath path="/api/v1/webhooks/{webhookId}" />
          <OperationPath path="/api/v1/webhooks/{webhookId}/test" />
          <OperationPath path="/api/v1/oauth/{provider}/callback" />
        </div>
      </div>
    </div>
  );
}
