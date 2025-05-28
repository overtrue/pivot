import { LanguageSwitcher } from "@/registry/pivot/language-switcher";

export default function LanguageSwitcherDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">标准语言切换器</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准的多语言切换组件，支持中文、英文、日文等多种语言
        </p>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            选择您的首选语言
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 文档语言切换</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          在 API 文档界面中的语言切换器，提供多语言文档支持
        </p>
        <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium">API 文档语言</h5>
            <LanguageSwitcher />
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            选择您熟悉的语言来阅读 API 文档。我们提供中文、英文、日文等多种语言版本，确保您能够准确理解 API 的使用方法。
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">全球化应用语言选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          面向全球用户的应用程序语言切换器
        </p>
        <div className="p-4 border rounded-lg dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium">🌍 全球化设置</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                选择您的语言和地区
              </div>
            </div>
            <LanguageSwitcher />
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-medium mb-1">支持的语言:</div>
              <ul className="text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>🇨🇳 简体中文</li>
                <li>🇺🇸 English</li>
                <li>🇯🇵 日本語</li>
                <li>🇰🇷 한국어</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1">功能特性:</div>
              <ul className="text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• 实时切换</li>
                <li>• 自动保存偏好</li>
                <li>• 响应式设计</li>
                <li>• 无缝体验</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">开发者控制台语言设置</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          开发者控制台中的语言切换功能
        </p>
        <div className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">开发者控制台</span>
            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded">
              在线
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">语言:</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">移动端语言切换</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          适配移动设备的语言切换器
        </p>
        <div className="max-w-sm mx-auto p-4 border rounded-lg dark:border-neutral-700 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">📱 移动应用设置</div>
            <LanguageSwitcher />
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            语言设置会同步到您的所有设备，确保一致的使用体验。
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级多语言支持</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级应用的多语言切换和本地化设置
        </p>
        <div className="p-4 border rounded-lg dark:border-neutral-700">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">🏢 企业语言设置</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  为您的团队选择合适的语言
                </div>
              </div>
              <LanguageSwitcher />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <div className="font-medium text-blue-800 dark:text-blue-400">本地化</div>
                <div className="text-blue-600 dark:text-blue-300">日期、时间、货币格式</div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <div className="font-medium text-green-800 dark:text-green-400">团队协作</div>
                <div className="text-green-600 dark:text-green-300">多语言团队支持</div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                <div className="font-medium text-purple-800 dark:text-purple-400">合规性</div>
                <div className="text-purple-600 dark:text-purple-300">符合当地法规要求</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
