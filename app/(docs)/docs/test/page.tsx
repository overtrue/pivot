export default function TestPage() {
  return (
    <main className="relative py-6 lg:py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            测试页面
          </h1>
          <p className="text-balance text-lg text-muted-foreground">
            这是一个测试页面，用于验证 Pivot 项目是否正常工作。
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">功能特性</h2>
            <ul className="mt-4 space-y-2">
              <li>✅ Next.js 15 + App Router</li>
              <li>✅ TypeScript 支持</li>
              <li>✅ Tailwind CSS v4</li>
              <li>✅ 基础 UI 组件</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">项目状态</h2>
            <div className="mt-4 rounded-lg bg-green-50 p-4 dark:bg-green-950">
              <p className="text-green-800 dark:text-green-200">
                🎉 如果您能看到这个页面，说明基础架构已经正常工作了！
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">下一步</h2>
            <p className="mt-4 text-muted-foreground">
              现在可以开始开发 OpenAPI 专用组件，或者重新配置 MDX 文档系统。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
