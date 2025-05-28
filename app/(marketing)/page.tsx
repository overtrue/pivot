import { ArrowRight, Copy, Github, Moon, Palette, Settings, Smartphone, Zap } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function IndexPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto max-w-5xl text-center">
            <Badge variant="outline" className="mb-4">
              🎉 专为 OpenAPI 设计
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              构建你的
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                组件库
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              一套精美设计、易于访问的组件和代码分发平台。
              适用于你喜爱的框架。开源。开放代码。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/docs"
                className={cn(buttonVariants({ size: "lg" }), "group")}
              >
                开始使用
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/docs/components"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                浏览组件
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">示例</h2>
              <p className="text-lg text-muted-foreground">
                查看一些使用 Pivot 构建的精美界面
              </p>
            </div>

            {/* Example Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-blue-950/50 dark:to-indigo-950/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-700">GET</Badge>
                        <span className="font-mono text-sm">/api/users</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 rounded bg-blue-200"></div>
                        <div className="h-2 w-1/2 rounded bg-blue-200"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">API 文档</h3>
                    <p className="text-sm text-muted-foreground">
                      现代化的 API 文档界面
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-100 p-6 dark:from-green-950/50 dark:to-emerald-950/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-700">POST</Badge>
                        <span className="font-mono text-sm">/api/orders</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-2/3 rounded bg-green-200"></div>
                        <div className="h-2 w-4/5 rounded bg-green-200"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">仪表板</h3>
                    <p className="text-sm text-muted-foreground">
                      功能丰富的管理界面
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-purple-50 to-violet-100 p-6 dark:from-purple-950/50 dark:to-violet-950/50">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">DELETE</Badge>
                        <span className="font-mono text-sm">/api/tasks</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-1/2 rounded bg-purple-200"></div>
                        <div className="h-2 w-3/5 rounded bg-purple-200"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">任务管理</h3>
                    <p className="text-sm text-muted-foreground">
                      直观的任务管理界面
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/docs/components"
                className={cn(buttonVariants({ variant: "outline" }), "group")}
              >
                查看所有示例
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">为什么选择 Pivot？</h2>
              <p className="text-lg text-muted-foreground">
                专为现代开发者设计的组件库
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/50">
                  <Copy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">复制粘贴</h3>
                <p className="text-muted-foreground">
                  无需复杂配置。复制代码，粘贴到你的项目中，立即开始使用。
                </p>
              </div>

              <div className="group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/50">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">快速开发</h3>
                <p className="text-muted-foreground">
                  预构建的组件和模板，让你能够快速构建专业的 API 文档界面。
                </p>
              </div>

              <div className="group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/50">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">现代设计</h3>
                <p className="text-muted-foreground">
                  基于最新的设计趋势，提供美观、一致的用户界面。
                </p>
              </div>

              <div className="group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/50">
                  <Smartphone className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">响应式</h3>
                <p className="text-muted-foreground">
                  完美适配所有设备，从手机到桌面都能提供最佳体验。
                </p>
              </div>

              <div className="group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Moon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">暗色模式</h3>
                <p className="text-muted-foreground">
                  内置暗色模式支持，自动适配用户的系统偏好。
                </p>
              </div>

              <div className="group">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950/50">
                  <Settings className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">高度可定制</h3>
                <p className="text-muted-foreground">
                  灵活的主题系统，支持深度定制以匹配你的品牌风格。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              准备开始了吗？
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              加入数千名开发者，使用 Pivot 构建美观的 API 文档界面。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/docs"
                className={cn(buttonVariants({ size: "lg" }), "group")}
              >
                开始使用
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
