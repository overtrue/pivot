import { InLabel } from "@/registry/default/ui/in-label";

export default function InLabelDemo() {
  const parameterLocations = [
    { type: "query", description: "查询参数" },
    { type: "path", description: "路径参数" },
    { type: "header", description: "请求头参数" },
    { type: "cookie", description: "Cookie 参数" }
  ] as const;

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">参数位置标签</h4>
        <div className="space-y-3">
          {parameterLocations.map((location) => (
            <div key={location.type} className="flex items-center gap-3">
              <InLabel type={location.type} />
              <span className="text-sm text-muted-foreground">
                {location.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">在参数列表中使用</h4>
        <div className="space-y-2 p-3 border rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono">userId</code>
            <InLabel type="path" />
            <span className="text-xs text-muted-foreground">用户ID</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono">limit</code>
            <InLabel type="query" />
            <span className="text-xs text-muted-foreground">返回数量限制</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono">Authorization</code>
            <InLabel type="header" />
            <span className="text-xs text-muted-foreground">认证令牌</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono">sessionId</code>
            <InLabel type="cookie" />
            <span className="text-xs text-muted-foreground">会话标识</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义样式</h4>
        <div className="flex flex-wrap gap-2">
          <InLabel
            type="query"
            className="border border-blue-300"
          />
          <InLabel
            type="path"
            className="rounded-full"
          />
          <InLabel
            type="header"
            className="font-bold"
          />
        </div>
      </div>
    </div>
  );
}
