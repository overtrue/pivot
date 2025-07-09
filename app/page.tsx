import {
  ArrowRight,
  Code,
  Github,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function IndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/10 dark:via-gray-950 dark:to-gray-950">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>

          <div className="relative">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
              <div className="mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="mb-10">
                  <Badge
                    variant="secondary"
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20"
                  >
                    <Sparkles className="h-3 w-3" />
                    专为 OpenAPI 设计的组件库
                  </Badge>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                    Pivot
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">
                    OpenAPI 组件库
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600 dark:text-gray-300">
                  <strong>89+ 专业组件</strong> · <strong>5+ React Hooks</strong> · <strong>多语言代码生成</strong>
                </p>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-7 text-gray-900 dark:text-white font-medium">
                  将 OpenAPI 规范转换为精美文档，只需几分钟
                </p>

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
                  <Link
                    href="/docs"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30",
                    )}
                  >
                    开始使用
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/viewer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-12 px-8 border-gray-300 bg-white hover:bg-gray-50 font-semibold dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800",
                    )}
                  >
                    在线体验
                  </Link>
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "h-12 px-8 text-gray-700 hover:text-gray-900 font-semibold dark:text-gray-300 dark:hover:text-white",
                    )}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                核心特性
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                专为 OpenAPI 设计
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                快速构建美观、功能强大的 API 文档界面
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    89+ 专业组件
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      从状态标识到代码生成，涵盖 OpenAPI 规范的各个方面，原子化设计，灵活组合
                    </p>
                  </dd>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-600">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    强大的 Hooks
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      useOpenApi、useOpenApiLoader、useOperation、useSchema 等专业 hooks，简化 OpenAPI 数据处理
                    </p>
                  </dd>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    多语言代码生成
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      支持 cURL、Python、PHP、Laravel、TypeScript 等多种语言的代码生成
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                强大的组件生态
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                从原子组件到完整布局，满足各种 API 文档需求
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {/* Stat 1 */}
              <div className="relative isolate flex flex-col justify-center overflow-hidden rounded-2xl bg-white px-8 py-8 shadow-lg dark:bg-gray-800">
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">89+</div>
                  <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">UI 组件</div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">状态标识、数据展示、交互功能</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="relative isolate flex flex-col justify-center overflow-hidden rounded-2xl bg-white px-8 py-8 shadow-lg dark:bg-gray-800">
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-400">5+</div>
                  <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">React Hooks</div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">OpenAPI 数据处理专用</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="relative isolate flex flex-col justify-center overflow-hidden rounded-2xl bg-white px-8 py-8 shadow-lg dark:bg-gray-800">
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-purple-600 dark:text-purple-400">6+</div>
                  <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">代码生成器</div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">多种编程语言支持</div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="relative isolate flex flex-col justify-center overflow-hidden rounded-2xl bg-white px-8 py-8 shadow-lg dark:bg-gray-800">
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-orange-600 dark:text-orange-400">8+</div>
                  <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">工具函数</div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">引用解析、示例生成</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                快速开始
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                几行命令即可开始使用 Pivot 构建 API 文档
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <div className="overflow-hidden rounded-xl bg-gray-900 shadow-xl dark:bg-gray-800">
                <div className="p-6">
                  <div className="text-sm text-gray-300 mb-4">安装组件</div>
                  <pre className="text-green-400 text-sm">
                    <code>{`# 安装单个组件
npx shadcn@latest add https://pivotkit.vercel.app/r/status-code.json

# 安装所有组件
npx shadcn@latest add https://pivotkit.vercel.app/r/index.json

# 安装 Hooks 和工具
npx shadcn@latest add https://pivotkit.vercel.app/r/hooks.json`}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl bg-gray-900 shadow-xl dark:bg-gray-800">
                <div className="p-6">
                  <div className="text-sm text-gray-300 mb-4">使用组件</div>
                  <pre className="text-blue-400 text-sm">
                    <code>{`import { OperationDetailedLayout } from "@/components/ui/operation-detailed-layout";

function ApiDocs() {
  return (
    <OperationDetailedLayout
      url="https://api.example.com/openapi.json"
      showCodegen={true}
      showTryPanel={true}
    />
  );
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
