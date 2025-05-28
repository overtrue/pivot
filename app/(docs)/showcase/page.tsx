import { ComponentPreview } from "@/components/component-preview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pivot UI Showcase",
  description: "展示 Pivot UI 组件库的所有 OpenAPI 组件",
};

export default function ShowcasePage() {
  return (
    <div className="container mx-auto py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Pivot UI Showcase</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          探索我们完整的 OpenAPI 组件库，包含 85+ 个高质量组件，专为现代 API 文档而设计。
        </p>
      </div>

      <div className="grid gap-8">
        {/* 基础组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">基础组件</h2>
            <p className="text-muted-foreground">
              用于构建 API 文档的基础 UI 组件
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">状态和标签</h3>
              <ComponentPreview name="status-code-demo" />
              <ComponentPreview name="method-label-demo" />
              <ComponentPreview name="required-badge-demo" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">类型和格式</h3>
              <ComponentPreview name="type-indicator-demo" />
              <ComponentPreview name="format-badge-demo" />
              <ComponentPreview name="style-badge-demo" />
            </div>
          </div>
        </section>

        {/* 参数组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">参数组件</h2>
            <p className="text-muted-foreground">
              用于显示和管理 API 参数的组件
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentPreview name="parameter-item-demo" />
            <ComponentPreview name="parameter-group-demo" />
          </div>
        </section>

        {/* Schema 组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Schema 组件</h2>
            <p className="text-muted-foreground">
              用于显示数据结构和模式的组件
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentPreview name="schema-display-demo" />
            <ComponentPreview name="schema-with-example-viewer-demo" />
          </div>
        </section>

        {/* 响应组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">响应组件</h2>
            <p className="text-muted-foreground">
              用于显示 API 响应和状态的组件
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentPreview name="response-item-demo" />
            <ComponentPreview name="responses-section-demo" />
          </div>
        </section>

        {/* 安全组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">安全组件</h2>
            <p className="text-muted-foreground">
              用于显示 API 安全配置的组件
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentPreview name="security-scheme-display-demo" />
            <ComponentPreview name="security-requirements-section-demo" />
          </div>
        </section>

        {/* 代码生成器展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">代码生成器</h2>
            <p className="text-muted-foreground">
              为不同编程语言生成 API 调用代码
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentPreview name="curl-generator-demo" />
            <ComponentPreview name="python-generator-demo" />
            <ComponentPreview name="php-generator-demo" />
            <ComponentPreview name="laravel-generator-demo" />
          </div>
        </section>

        {/* 交互组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">交互组件</h2>
            <p className="text-muted-foreground">
              提供交互功能的高级组件
            </p>
          </div>

          <div className="space-y-6">
            <ComponentPreview name="try-it-out-panel-demo" />
            <ComponentPreview name="expand-collapse-demo" />
          </div>
        </section>

        {/* 布局组件展示 */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">布局组件</h2>
            <p className="text-muted-foreground">
              用于构建完整 API 文档页面的布局组件
            </p>
          </div>

          <div className="space-y-6">
            <ComponentPreview name="all-in-one-layout-demo" />
          </div>
        </section>
      </div>

      {/* 统计信息 */}
      <section className="border-t pt-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">组件统计</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85+</div>
              <div className="text-sm text-muted-foreground">组件总数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98.8%</div>
              <div className="text-sm text-muted-foreground">成功率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">运行时错误</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
