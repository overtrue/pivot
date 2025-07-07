import { WebhookLabel } from "@/registry/default/ui/webhook-label";

export default function WebhookLabelDemo() {
  const webhookEvents = [
    "user.created",
    "user.updated",
    "user.deleted",
    "order.placed",
    "order.completed",
    "payment.success",
    "payment.failed",
  ];

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">Webhook 事件标签</h4>
        <div className="flex flex-wrap gap-2">
          {webhookEvents.map((event) => (
            <WebhookLabel key={event}>{event}</WebhookLabel>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">在 Webhook 文档中使用</h4>
        <div className="space-y-2 p-3 border rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <WebhookLabel children="user.created" />
            <span className="text-sm text-muted-foreground">
              用户创建时触发
            </span>
          </div>
          <div className="flex items-center gap-3">
            <WebhookLabel children="order.placed" />
            <span className="text-sm text-muted-foreground">
              订单下单时触发
            </span>
          </div>
          <div className="flex items-center gap-3">
            <WebhookLabel children="payment.success" />
            <span className="text-sm text-muted-foreground">
              支付成功时触发
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义样式</h4>
        <div className="flex flex-wrap gap-2">
          <WebhookLabel
            children="custom.event"
            className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
          />
        </div>
      </div>
    </div>
  );
}
