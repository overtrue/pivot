import { MethodLabel } from "@/registry/pivot/method-label";
import { StatusCode } from "@/registry/pivot/status-code";
import { TypeIndicator } from "@/registry/pivot/type-indicator";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-4">
            Pivot - OpenAPI Component Library
          </h1>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            一个现代化的 React UI 组件库，专门为 OpenAPI 规范设计，基于
            shadcn/ui registry 系统构建。
          </p>

          {/* Component Preview */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
              <MethodLabel method="GET" />
              <span className="text-muted-foreground">/api/users</span>
              <TypeIndicator type="array" />
              <StatusCode code={200} />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-12">
            <a
              href="/docs"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              快速开始
            </a>
            <a
              href="/docs/components"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              查看组件
            </a>
            <a
              href="/test"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              组件演示
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">核心特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-lg bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                🚀
              </div>
              <h3 className="text-lg font-semibold mb-2">现代化设计</h3>
              <p className="text-muted-foreground">
                基于 Tailwind CSS 和 shadcn/ui 设计系统，提供一致的用户体验。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                📦
              </div>
              <h3 className="text-lg font-semibold mb-2">Registry 系统</h3>
              <p className="text-muted-foreground">
                使用 shadcn/ui registry 系统，轻松安装和管理组件。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                🌙
              </div>
              <h3 className="text-lg font-semibold mb-2">暗色模式</h3>
              <p className="text-muted-foreground">
                内置暗色模式支持，自动适配用户偏好。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                🔧
              </div>
              <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
              <p className="text-muted-foreground">
                完整的 TypeScript 支持，提供类型安全和智能补全。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                🎯
              </div>
              <h3 className="text-lg font-semibold mb-2">专为 OpenAPI</h3>
              <p className="text-muted-foreground">
                专门为 OpenAPI 规范设计，完美支持 API 文档展示。
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-lg bg-primary/10 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                📱
              </div>
              <h3 className="text-lg font-semibold mb-2">响应式设计</h3>
              <p className="text-muted-foreground">
                完全响应式设计，在所有设备上都能完美显示。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">快速开始</h2>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. 安装组件</h3>
              <div className="bg-muted p-4 rounded-lg">
                <code className="text-sm">
                  npx shadcn@latest add https://pivot.design/registry.json
                  status-code
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">2. 导入使用</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  {`import { StatusCode } from "@/components/pivot/status-code"

export function MyComponent() {
  return <StatusCode code={200} />
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
