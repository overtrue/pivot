"use client";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site";
import { OpenAPIErrorBoundary } from "@/registry/default/components/error-boundary";
import { I18nProvider } from "@/registry/default/lib/i18n";
import { LanguageSwitcher } from "@/registry/default/ui/language-switcher";
import { OperationDetailedLayoutOptimized } from "@/registry/default/ui/operation-detailed-layout-optimized";
import { OperationListLayout } from "@/registry/default/ui/operation-list-layout";
import { Github, Layout, LayoutTemplate, Settings, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// 预定义的API示例列表
interface ApiExample {
  name: string;
  url: string;
  format: "json" | "yaml";
  description: string;
}

const API_EXAMPLES: ApiExample[] = [
  {
    name: "Swagger Petstore",
    url: "https://petstore3.swagger.io/api/v3/openapi.json",
    format: "json",
    description: "经典的宠物商店API示例",
  },
  {
    name: "Box",
    url: "https://raw.githubusercontent.com/box/box-openapi/main/openapi.json",
    format: "json",
    description: "Box云存储API",
  },
  {
    name: "GitHub",
    url: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-3.0/ghes-3.0.json",
    format: "json",
    description: "GitHub REST API",
  },
  {
    name: "Netlify",
    url: "https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/netlify/openapi.yaml",
    format: "yaml",
    description: "Netlify部署平台API",
  },
];

export default function OptimizedViewerPage() {
  const [specUrl, setSpecUrl] = useState(
    "https://petstore3.swagger.io/api/v3/openapi.json",
  );
  const [layoutType, setLayoutType] = useState<
    "operationList" | "operationDetail"
  >("operationDetail");
  const [isClient, setIsClient] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 客户端初始化：从 localStorage 加载保存的 URL
  useEffect(() => {
    setIsClient(true);
    const savedUrl = localStorage.getItem("pivot-openapi-spec-url");
    if (savedUrl) {
      setSpecUrl(savedUrl);
    }
  }, []);

  // 保存 URL 到 localStorage
  useEffect(() => {
    if (isClient && specUrl) {
      localStorage.setItem("pivot-openapi-spec-url", specUrl);
    }
  }, [specUrl, isClient]);

  const handleExampleSelect = (exampleUrl: string) => {
    setSpecUrl(exampleUrl);
  };

  return (
    <I18nProvider>
      <OpenAPIErrorBoundary>
        <div className="min-h-screen flex flex-col relative">
          {/* 浮动设置按钮 */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed bottom-12 right-12 z-50 shadow-lg bg-background/95 backdrop-blur-sm border-border hover:bg-accent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="h-[85vh] max-w-md ml-auto mr-0 mt-0 rounded-l-lg rounded-r-none">
              <DrawerHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icons.logo className="size-5" />
                    <DrawerTitle className="text-lg font-semibold">
                      {siteConfig.name} (优化版)
                    </DrawerTitle>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* API 示例选择 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">API 示例</h3>
                  <Select value={specUrl} onValueChange={handleExampleSelect}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择示例 API" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      align="start"
                      sideOffset={4}
                    >
                      {API_EXAMPLES.map((example) => (
                        <SelectItem key={example.url} value={example.url}>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {example.format.toUpperCase()}
                              </Badge>
                              <span className="font-medium">{example.name}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 自定义 URL */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">自定义 URL</h3>
                  <Input
                    type="text"
                    value={specUrl}
                    onChange={(e) => setSpecUrl(e.target.value)}
                    placeholder="输入 OpenAPI 规范 URL"
                    className="w-full"
                  />
                </div>

                {/* 布局选择 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">布局模式</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={layoutType === "operationDetail" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setLayoutType("operationDetail")}
                    >
                      <Layout className="w-4 h-4 mr-2" />
                      操作详情模式
                    </Button>
                    <Button
                      variant={layoutType === "operationList" ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setLayoutType("operationList")}
                    >
                      <LayoutTemplate className="w-4 h-4 mr-2" />
                      操作列表模式
                    </Button>
                  </div>
                </div>

                {/* 优化信息 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">优化特性</h3>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>引用解析缓存机制</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>统一的状态管理 (Context + Jotai)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>错误边界保护</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>类型安全增强</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>修复 Response 引用解析 Bug</span>
                    </div>
                  </div>
                </div>

                {/* 设置选项 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">设置</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">语言</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">主题</span>
                      <ModeToggle />
                    </div>
                  </div>
                </div>

                {/* 链接 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">链接</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/viewer">
                        <Icons.logo className="w-4 h-4 mr-2" />
                        原版查看器
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/">
                        <Icons.logo className="w-4 h-4 mr-2" />
                        返回主页
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="https://github.com/overtrue/pivot" target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub 仓库
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {/* 主要内容区域 */}
          <main className="h-screen">
            {layoutType === "operationList" ? (
              <OperationListLayout
                spec={specUrl}
                selectedPath={null}
                selectedMethod={null}
                onSelectOperation={() => {}}
              />
            ) : (
              <OperationDetailedLayoutOptimized
                spec={specUrl}
                showCodegen={true}
                showTryPanel={true}
              />
            )}
          </main>
        </div>
      </OpenAPIErrorBoundary>
    </I18nProvider>
  );
}