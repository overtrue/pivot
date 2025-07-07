import {
  ArrowRight,
  Code,
  FileText,
  Github,
  Globe,
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
                    OpenAPI 组件库
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-300">
                  精美设计、易于访问的 OpenAPI 组件
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
                为开发者设计
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                专注于内容创作
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                让我们来处理文档生成的复杂工作，您只需专注于创建优质内容
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {/* Feature 1 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    专注内容
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      只需提供 OpenAPI
                      规范，即可轻松创建美观的文档站点，无需复杂配置
                    </p>
                  </dd>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-600">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    开发体验
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      即时服务器启动、闪电般的热更新，充分利用现代化技术栈
                    </p>
                  </dd>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    定制主题
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      使用组件语法和兼容样式，或构建完全自定义的主题
                    </p>
                  </dd>
                </div>

                {/* Feature 4 */}
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-orange-600">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    快速部署
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">
                      快速的初始加载，客户端路由实现流畅的导航体验
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Example Preview */}
        <section className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                组件预览
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                精美的 OpenAPI 文档界面
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                查看使用 Pivot 构建的现代化文档界面示例
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Preview Card 1 */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-white px-8 pb-8 pt-80 shadow-lg dark:bg-gray-800 sm:pt-48 lg:pt-80">
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-600/80 via-blue-600/40 to-blue-600/20"></div>
                <div className="absolute inset-0 -z-10">
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">GET</Badge>
                      <span className="font-mono text-sm text-white/80">
                        /api/users
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded bg-white/30"></div>
                      <div className="h-2 w-1/2 rounded bg-white/30"></div>
                      <div className="h-2 w-2/3 rounded bg-white/30"></div>
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  API 文档
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  现代化的 API 文档界面，清晰展示接口信息
                </p>
              </article>

              {/* Preview Card 2 */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-white px-8 pb-8 pt-80 shadow-lg dark:bg-gray-800 sm:pt-48 lg:pt-80">
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-600/80 via-green-600/40 to-green-600/20"></div>
                <div className="absolute inset-0 -z-10">
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700">POST</Badge>
                      <span className="font-mono text-sm text-white/80">
                        /api/orders
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-2/3 rounded bg-white/30"></div>
                      <div className="h-2 w-4/5 rounded bg-white/30"></div>
                      <div className="h-2 w-1/2 rounded bg-white/30"></div>
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  交互式界面
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  支持在线测试的交互式 API 文档
                </p>
              </article>

              {/* Preview Card 3 */}
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-white px-8 pb-8 pt-80 shadow-lg dark:bg-gray-800 sm:pt-48 lg:pt-80">
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple-600/80 via-purple-600/40 to-purple-600/20"></div>
                <div className="absolute inset-0 -z-10">
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-700">
                        Schema
                      </Badge>
                      <span className="font-mono text-sm text-white/80">
                        Models
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-1/2 rounded bg-white/30"></div>
                      <div className="h-2 w-3/5 rounded bg-white/30"></div>
                      <div className="h-2 w-3/4 rounded bg-white/30"></div>
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  模型展示
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  清晰的数据模型和组件结构展示
                </p>
              </article>
            </div>

            <div className="mt-16 text-center">
              <Link
                href="/docs/components"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-8 border-gray-300 bg-white hover:bg-gray-50 font-semibold dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800",
                )}
              >
                查看所有组件
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                立即开始构建文档
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                加入数千名开发者，使用 Pivot 将 OpenAPI 规范转换为美观的文档
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <Link
                  href="/docs"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30",
                  )}
                >
                  <Code className="mr-2 h-4 w-4" />
                  开始使用
                </Link>
                <Link
                  href="/viewer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 px-8 border-gray-300 bg-white hover:bg-gray-50 font-semibold dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800",
                  )}
                >
                  在线演示
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
