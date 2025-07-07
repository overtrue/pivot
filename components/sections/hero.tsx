import { allDocs } from "content-collections";
import { compareDesc } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import TechStack from "@/components/tech-stack";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default async function Hero() {
  const post = allDocs
    .filter(
      (post) =>
        post.date && post.date <= new Date().toISOString() && post.published,
    )
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return compareDesc(new Date(a.date), new Date(b.date));
    })[0];

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-5 md:py-14">
        <div className="z-10 flex flex-col">
          <div className="mt-10 grid grid-cols-1 md:mt-20">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              {post && (
                <Link
                  href={post.slug}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "rounded-full",
                  )}
                >
                  🎉 <Separator className="mx-2 h-4" orientation="vertical" />
                  最新发布 {post.title}
                  <ChevronRight className="ml-1 size-4 text-muted-foreground" />
                </Link>
              )}
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "text-black dark:text-white",
                    "relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2",
                    "text-balance text-left font-semibold tracking-tighter md:text-center",
                    "text-5xl sm:text-7xl md:text-7xl lg:text-7xl",
                  )}
                >
                  专为 OpenAPI 设计的 UI 组件库
                </h1>
              </div>

              <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg">
                现代化的 React UI 组件库，专门为 <b>OpenAPI</b> 规范设计。 使用{" "}
                <b>React</b>、<b>TypeScript</b>、<b>Tailwind CSS</b> 和{" "}
                <b>Motion</b> 构建。
                <br />
                完美兼容 <b>shadcn/ui</b> 生态系统。
              </p>

              <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                  <Link
                    href="/docs"
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "lg",
                      }),
                      "w-full gap-2",
                    )}
                  >
                    查看文档
                    <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/docs/components"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "outline",
                      }),
                      "w-full gap-2",
                    )}
                  >
                    浏览组件
                    <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-56 items-center justify-center">
            <TechStack
              className="mx-auto flex w-full items-center justify-between"
              technologies={[
                "react",
                "typescript",
                "tailwindcss",
                "motion",
                "shadcn",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
