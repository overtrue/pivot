import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fontMono, fontSans } from "@/lib/fonts";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";

import "@/styles/globals.css";

import type { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Pivot - OpenAPI Component Library",
  description:
    "专为 OpenAPI 规范设计的现代化 React UI 组件库。提供可复制粘贴的组件。",
  image: absoluteUrl("/og"),
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "relative flex w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
