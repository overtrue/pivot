import { TypeIndicator } from "@/registry/default/ui/type-indicator";

export default function TypeIndicatorDemo() {
  const dataTypes = [
    "string",
    "number",
    "integer",
    "boolean",
    "array",
    "object",
    "null",
  ] as const;

  const themes = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
    "neutral",
  ] as const;

  return (
    <div className="space-y-6 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">自动主题（根据数据类型）</h4>
        <div className="flex flex-wrap gap-2">
          {dataTypes.map((type) => (
            <div
              key={type}
              className="flex items-center gap-2 p-2 border rounded"
            >
              <TypeIndicator type={type} />
              <span className="text-xs text-muted-foreground">({type})</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义主题</h4>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <div
              key={theme}
              className="flex items-center gap-2 p-2 border rounded"
            >
              <TypeIndicator type="string" theme={theme} />
              <span className="text-xs text-muted-foreground">({theme})</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义内容</h4>
        <div className="flex flex-wrap gap-2">
          <TypeIndicator type="string">String[]</TypeIndicator>
          <TypeIndicator type="object">User</TypeIndicator>
          <TypeIndicator type="array">Array&lt;number&gt;</TypeIndicator>
        </div>
      </div>
    </div>
  );
}
