"use client";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/config/site";
import { useOpenAPILoader } from "@/registry/default/hooks/use-openapi-loader";
import { I18nProvider } from "@/registry/default/lib/i18n";
import { LanguageSwitcher } from "@/registry/default/ui/language-switcher";
import { OperationDetailedLayout } from "@/registry/default/ui/operation-detailed-layout";
import { OperationListLayout } from "@/registry/default/ui/operation-list-layout";
import { Github, Layout, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import type { OpenAPIV3 } from "openapi-types";
import { useEffect, useMemo, useState } from "react";

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

export default function ViewerPage() {
  const [specUrl, setSpecUrl] = useState(
    "https://petstore3.swagger.io/api/v3/openapi.json",
  );
  const [layoutType, setLayoutType] = useState<
    "operationList" | "operationDetail"
  >("operationDetail");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

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

  // 使用 OpenAPI Loader hook 来加载数据
  const dataSource = useMemo(() => {
    if (specUrl) {
      return { type: "url" as const, data: specUrl };
    }
    return undefined;
  }, [specUrl]);

  const { spec } = useOpenAPILoader(dataSource);

  const handleSelectOperation = (
    path: string,
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    operation: OpenAPIV3.OperationObject,
  ) => {
    setSelectedPath(path);
    setSelectedMethod(method.toUpperCase());
  };

  const handleExampleSelect = (exampleUrl: string) => {
    setSpecUrl(exampleUrl);
  };

  return (
    <I18nProvider>
      <div className="min-h-screen flex flex-col">
        {/* 顶部导航栏 */}
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link
                href="/"
                className="relative mr-6 flex items-center space-x-2"
              >
                <Icons.logo className="size-6" />
                <span className="hidden font-bold md:inline-block">
                  {siteConfig.name}
                </span>
              </Link>

              {/* 中间控制区域 */}
              <div className="flex-1 max-w-4xl flex items-center gap-3">
                {/* 示例选择器 */}
                <Select value={specUrl} onValueChange={handleExampleSelect}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="选择示例 API" />
                  </SelectTrigger>
                  <SelectContent>
                    {API_EXAMPLES.map((example) => (
                      <SelectItem key={example.url} value={example.url}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {example.format.toUpperCase()}
                          </Badge>
                          <span>{example.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* URL输入框 */}
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={specUrl}
                    onChange={(e) => setSpecUrl(e.target.value)}
                    placeholder="输入 OpenAPI 规范 URL"
                  />
                </div>

                {/* 布局切换按钮 */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={
                      layoutType === "operationDetail" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setLayoutType("operationDetail")}
                    className="h-8"
                  >
                    <Layout className="w-4 h-4 mr-1" />
                    操作详情
                  </Button>
                  <Button
                    variant={
                      layoutType === "operationList" ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => setLayoutType("operationList")}
                    className="h-8"
                  >
                    <LayoutTemplate className="w-4 h-4 mr-1" />
                    操作列表
                  </Button>
                </div>
              </div>

              {/* 右侧操作区域 */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ModeToggle />
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href="https://github.com/overtrue/pivot"
                    target="_blank"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className="flex-1">
          {layoutType === "operationList" ? (
            <OperationListLayout
              spec={spec}
              selectedPath={selectedPath}
              selectedMethod={selectedMethod}
              onSelectOperation={handleSelectOperation}
            />
          ) : (
            <OperationDetailedLayout
              url={specUrl}
              selectedPath={selectedPath}
              selectedMethod={selectedMethod}
              onSelectOperation={handleSelectOperation}
            />
          )}
        </main>
      </div>
    </I18nProvider>
  );
}
