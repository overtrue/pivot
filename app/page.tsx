import { Github } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function IndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Pivot
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                为 React 应用快速构建 OpenAPI 文档界面
              </p>
            </div>

            {/* Core Features */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-700 dark:text-gray-300">
              <div>组件库</div>
              <div>React Hooks</div>
              <div>代码生成</div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "px-8 bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                )}
              >
                文档
              </Link>
              <Link
                href="/viewer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-8"
                )}
              >
                体验
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "px-8"
                )}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
