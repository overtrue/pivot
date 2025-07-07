import { MethodLabel } from "@/registry/default/ui/method-label";

export default function MethodLabelDemo() {
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"] as const;

  return (
    <div className="space-y-6 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">HTTP 方法标签</h4>
        <div className="flex flex-wrap gap-2">
          {methods.map((method) => (
            <MethodLabel key={method} method={method} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">紧凑样式</h4>
        <div className="flex flex-wrap gap-3">
          {methods.map((method) => (
            <MethodLabel key={method} method={method} variant="compact" />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">在 API 端点中使用</h4>
        <div className="space-y-2 p-3 border rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <MethodLabel method="GET" />
            <code className="text-sm font-mono">/api/users</code>
            <span className="text-sm text-muted-foreground">获取用户列表</span>
          </div>
          <div className="flex items-center gap-3">
            <MethodLabel method="POST" />
            <code className="text-sm font-mono">/api/users</code>
            <span className="text-sm text-muted-foreground">创建新用户</span>
          </div>
          <div className="flex items-center gap-3">
            <MethodLabel method="PUT" />
            <code className="text-sm font-mono">/api/users/{"{id}"}</code>
            <span className="text-sm text-muted-foreground">更新用户信息</span>
          </div>
          <div className="flex items-center gap-3">
            <MethodLabel method="DELETE" />
            <code className="text-sm font-mono">/api/users/{"{id}"}</code>
            <span className="text-sm text-muted-foreground">删除用户</span>
          </div>
          <div className="flex items-center gap-3">
            <MethodLabel method="PATCH" />
            <code className="text-sm font-mono">/api/users/{"{id}"}</code>
            <span className="text-sm text-muted-foreground">部分更新用户</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义样式</h4>
        <div className="flex flex-wrap gap-2">
          <MethodLabel
            method="GET"
            className="border border-green-300"
          />
          <MethodLabel
            method="POST"
            className="rounded-full"
          />
          <MethodLabel
            method="DELETE"
            className="font-bold"
          />
        </div>
      </div>
    </div>
  );
}
