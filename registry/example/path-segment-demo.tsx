import { PathSegment } from "@/registry/pivot/path-segment";

export default function PathSegmentDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户管理相关的 API 路径段，包含静态路径和动态参数
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="users" />
          <PathSegment path="{userId}" isParameter />
          <PathSegment path="profile" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">电商产品 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台产品管理的 API 路径结构，展示层级关系
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v2" />
          <PathSegment path="products" />
          <PathSegment path="{productId}" isParameter />
          <PathSegment path="reviews" />
          <PathSegment path="{reviewId}" isParameter />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单处理 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          订单管理系统的 API 路径，包含嵌套资源和操作
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="orders" />
          <PathSegment path="{orderId}" isParameter />
          <PathSegment path="items" />
          <PathSegment path="{itemId}" isParameter />
          <PathSegment path="cancel" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付系统 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理系统的 API 路径结构，包含支付方式和交易操作
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="payments" />
          <PathSegment path="{paymentId}" isParameter />
          <PathSegment path="refund" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件管理 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传和管理的 API 路径，支持文件操作和元数据管理
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="files" />
          <PathSegment path="{fileId}" isParameter />
          <PathSegment path="download" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          内容管理系统的 API 路径，包含文章、分类和评论管理
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="articles" />
          <PathSegment path="{articleId}" isParameter />
          <PathSegment path="comments" />
          <PathSegment path="{commentId}" isParameter />
          <PathSegment path="approve" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知系统 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          消息通知系统的 API 路径，支持多种通知类型和渠道
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="notifications" />
          <PathSegment path="{notificationId}" isParameter />
          <PathSegment path="mark-read" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据分析和报表系统的 API 路径，支持多维度数据查询
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="analytics" />
          <PathSegment path="reports" />
          <PathSegment path="{reportId}" isParameter />
          <PathSegment path="export" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">系统管理 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统配置和管理的 API 路径，包含设置和监控功能
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="admin" />
          <PathSegment path="settings" />
          <PathSegment path="{settingKey}" isParameter />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">第三方集成 API 路径段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          第三方服务集成的 API 路径，支持 Webhook 和回调处理
        </p>
        <div className="space-y-2">
          <PathSegment path="api" />
          <PathSegment path="v1" />
          <PathSegment path="integrations" />
          <PathSegment path="{integrationId}" isParameter />
          <PathSegment path="webhooks" />
          <PathSegment path="{webhookId}" isParameter />
          <PathSegment path="test" />
        </div>
      </div>
    </div>
  );
}
