import { VersionBadge } from "@/registry/default/ui/version-badge";

export default function VersionBadgeDemo() {
  const versions = [
    "1.0.0",
    "2.1.3",
    "3.0.0-beta.1",
    "1.2.3-alpha",
    "4.5.6-rc.2",
  ];

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">不同版本号</h4>
        <div className="flex flex-wrap gap-2">
          {versions.map((version) => (
            <VersionBadge key={version} version={version} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义样式</h4>
        <div className="flex flex-wrap gap-2">
          <VersionBadge
            version="1.0.0"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
          />
          <VersionBadge
            version="2.0.0"
            className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
          />
          <VersionBadge
            version="3.0.0"
            className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">在文本中使用</h4>
        <div className="space-y-2">
          <p className="text-sm">
            当前 API 版本: <VersionBadge version="1.2.3" />
          </p>
          <p className="text-sm">
            最新稳定版: <VersionBadge version="2.0.0" />
            <span className="ml-2">
              测试版: <VersionBadge version="2.1.0-beta.1" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
