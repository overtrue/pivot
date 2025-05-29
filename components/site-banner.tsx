"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

export function ProBanner() {
  return (
    <div className="group relative top-0 bg-indigo-600 py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="/pro"
          target="_blank"
          className="inline-flex text-xs leading-normal md:text-sm"
        >
          🎉{" "}
          <Separator className="mx-2 h-4" orientation="vertical" />{" "}
          <span className="font-medium">
            专业版组件现已发布！查看更多高级组件和模板。
          </span>{" "}
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}

export function ProductHuntBanner() {
  return (
    <div className="group relative top-0 bg-[#ff6154] py-3 text-white transition-all duration-300 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
        <Link
          href="https://www.producthunt.com/posts/pivot-ui?utm_source=site-banner&utm_medium=banner&utm_campaign=product-hunt-banner"
          onClick={() => posthog.capture("product_hunt_banner_clicked")}
          target="_blank"
          className="inline-flex text-xs leading-normal md:text-sm"
        >
          ✨{" "}
          <span className="ml-1 font-[580] dark:font-[550]">
            {" "}
            Pivot is live on Product Hunt Today! Show your support and vote
            for us.
          </span>{" "}
          <ChevronRight className="ml-1 mt-[3px] hidden size-4 transition-all duration-300 ease-out group-hover:translate-x-1 lg:inline-block" />
        </Link>
      </div>
      <hr className="absolute bottom-0 m-0 h-px w-full bg-neutral-200/30" />
    </div>
  );
}

export function SiteBanner() {
  return <ProBanner />;
}
