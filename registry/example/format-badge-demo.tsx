import { FormatBadge } from "@/registry/pivot/format-badge";

export default function FormatBadgeDemo() {
  const numberFormats = ["int32", "int64", "float", "double"];
  const dateFormats = ["date", "date-time"];
  const identifierFormats = ["email", "uuid", "uri", "hostname", "ipv4", "ipv6"];
  const binaryFormats = ["byte", "binary"];
  const sensitiveFormats = ["password"];

  const themes = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "neutral"
  ] as const;

  return (
    <div className="space-y-6 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">数字格式</h4>
        <div className="flex flex-wrap gap-2">
          {numberFormats.map((format) => (
            <FormatBadge key={format} format={format} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">日期格式</h4>
        <div className="flex flex-wrap gap-2">
          {dateFormats.map((format) => (
            <FormatBadge key={format} format={format} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">标识符格式</h4>
        <div className="flex flex-wrap gap-2">
          {identifierFormats.map((format) => (
            <FormatBadge key={format} format={format} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">二进制格式</h4>
        <div className="flex flex-wrap gap-2">
          {binaryFormats.map((format) => (
            <FormatBadge key={format} format={format} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">敏感格式</h4>
        <div className="flex flex-wrap gap-2">
          {sensitiveFormats.map((format) => (
            <FormatBadge key={format} format={format} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义主题</h4>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <div key={theme} className="flex items-center gap-2 p-2 border rounded">
              <FormatBadge format="string" theme={theme} />
              <span className="text-xs text-muted-foreground">({theme})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
