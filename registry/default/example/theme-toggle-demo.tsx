import { ThemeToggle } from "@/registry/default/ui/theme-toggle";

export default function ThemeToggleDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">标准主题切换器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的明暗主题切换按钮，支持浅色、深色和系统自动模式
        </p>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            点击切换主题模式
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 文档主题切换</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          在 API 文档界面中的主题切换器，提供更好的阅读体验
        </p>
        <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium">API 文档设置</h5>
            <ThemeToggle />
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            选择适合您的主题模式以获得最佳的文档阅读体验。深色模式有助于减少眼部疲劳，特别适合长时间的代码阅读。
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">开发者工具栏主题切换</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          集成在开发者工具栏中的主题切换器
        </p>
        <div className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">开发者工具</span>
            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded">
              v2.1.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">主题:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">响应式布局中的主题切换</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          在不同屏幕尺寸下的主题切换器展示
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border rounded dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm">桌面版</span>
              <ThemeToggle />
            </div>
          </div>
          <div className="p-3 border rounded dark:border-neutral-700">
            <div className="flex items-center justify-between">
              <span className="text-sm">移动版</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户偏好设置中的主题选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          在用户设置页面中的主题切换选项
        </p>
        <div className="p-4 border rounded-lg dark:border-neutral-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">外观主题</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  选择您喜欢的界面主题
                </div>
              </div>
              <ThemeToggle />
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t dark:border-neutral-700">
              💡 提示：系统模式会根据您的设备设置自动切换主题
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
