"use client";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { siteConfig } from "@/config/site";
import { I18nProvider } from "@/lib/i18n";
import { LanguageSwitcher } from "@/registry/pivot/language-switcher";
import { NavigationSidebar } from "@/registry/pivot/navigation-sidebar";
import { OperationDetailedLayout } from "@/registry/pivot/operation-detailed-layout";
import { OperationListLayout } from "@/registry/pivot/operation-list-layout";
import { useLocalStorage } from "@uidotdev/usehooks";
import * as yaml from "js-yaml";
import { Github, Layout, LayoutTemplate, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// 预定义的API示例列表
interface ApiExample {
  name: string;
  url: string;
  format: 'json' | 'yaml';
  description: string;
}

const API_EXAMPLES: ApiExample[] = [
  {
    name: 'Swagger Petstore',
    url: 'https://petstore3.swagger.io/api/v3/openapi.json',
    format: 'json',
    description: '经典的宠物商店API示例'
  },
  {
    name: 'Box',
    url: 'https://raw.githubusercontent.com/box/box-openapi/main/openapi.json',
    format: 'json',
    description: 'Box云存储API'
  },
  {
    name: 'GitHub',
    url: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-3.0/ghes-3.0.json',
    format: 'json',
    description: 'GitHub REST API'
  },
  {
    name: 'Netlify',
    url: 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/netlify/openapi.yaml',
    format: 'yaml',
    description: 'Netlify部署平台API'
  },
];

export default function ViewerPage() {
  const [specUrl, setSpecUrl] = useLocalStorage('pivot-openapi-spec-url', 'https://petstore3.swagger.io/api/v3/openapi.json');
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [layoutType, setLayoutType] = useState<'operationList' | 'operationDetail'>('operationDetail');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const prevUrlRef = useRef<string>('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 组件加载时自动加载默认规范
  useEffect(() => {
    if (specUrl) {
      loadSpec();
    }
  }, [specUrl]);

  // 监听 URL 变化，自动加载
  useEffect(() => {
    // 跳过初始加载和相同 URL 的重复加载
    if (specUrl === prevUrlRef.current) {
      return;
    }

    prevUrlRef.current = specUrl;

    // 清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 设置防抖定时器，避免频繁请求
    debounceTimerRef.current = setTimeout(() => {
      loadSpec();
    }, 800);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [specUrl]);

  const loadSpec = async () => {
    if (!specUrl) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(specUrl);

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status} ${response.statusText}`);
      }

      // 获取响应文本
      const text = await response.text();

      // 尝试解析OpenAPI规范
      let parsedSpec;
      try {
        // 尝试解析JSON
        parsedSpec = JSON.parse(text);
      } catch {
        // 如果JSON解析失败，尝试YAML解析
        parsedSpec = yaml.load(text) as any;
      }

      setSpec(parsedSpec);

      // 自动选择第一个路径和方法
      if (parsedSpec && parsedSpec.paths) {
        const paths = Object.keys(parsedSpec.paths);
        if (paths.length > 0) {
          const firstPath = paths[0];
          if (firstPath && parsedSpec.paths[firstPath]) {
            const pathItem = parsedSpec.paths[firstPath];
            if (pathItem) {
              const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
              const firstMethod = methods.find(method => pathItem[method]);

              if (firstMethod) {
                setSelectedPath(firstPath);
                setSelectedMethod(firstMethod.toUpperCase());
              }
            }
          }
        }
      }
    } catch (err) {
      setError(`加载 OpenAPI 规范失败: ${err instanceof Error ? err.message : '未知错误'}`);
      console.error('加载错误:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOperation = (path: string, method: string, operation: any) => {
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
              <Link href="/" className="relative mr-6 flex items-center space-x-2">
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
                    className="pr-10"
                  />
                  {loading && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                </div>

                {/* 布局切换按钮 */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={layoutType === 'operationDetail' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayoutType('operationDetail')}
                    className="h-8"
                  >
                    <Layout className="w-4 h-4 mr-1" />
                    操作详情
                  </Button>
                  <Button
                    variant={layoutType === 'operationList' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayoutType('operationList')}
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
                  <Link href="https://github.com/overtrue/pivot" target="_blank">
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className="flex-1 flex overflow-hidden">
          {error && (
            <div className="w-full p-8">
              <div className="max-w-3xl mx-auto">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-destructive">
                  <h3 className="font-medium mb-2">加载错误</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!spec && !loading && !error && (
            <div className="w-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-medium text-muted-foreground mb-4">
                  输入 OpenAPI 规范 URL
                </h2>
                <p className="text-muted-foreground">
                  您可以使用上方的输入框输入任何有效的 OpenAPI 规范 URL，系统将自动加载。
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="w-full flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>加载中...</span>
              </div>
            </div>
          )}

          {spec && !loading && (
            <div className="w-full relative">
              {/* 固定侧边栏 */}
              <div className="fixed left-0 top-[73px] w-80 h-[calc(100vh-73px)] border-r border-border bg-background z-30">
                <NavigationSidebar
                  openapi={spec}
                  activePath={selectedPath}
                  activeMethod={selectedMethod}
                  onSelectOperation={handleSelectOperation}
                />
              </div>

              {/* 主内容区域 - 添加左边距为侧边栏留出空间 */}
              <div className="ml-80 h-[calc(100vh-73px)] overflow-auto">
                {layoutType === 'operationList' ? (
                  <OperationListLayout
                    spec={spec}
                    selectedPath={selectedPath}
                    selectedMethod={selectedMethod}
                    onSelectOperation={handleSelectOperation}
                  />
                ) : (
                  <OperationDetailedLayout
                    spec={spec}
                    selectedPath={selectedPath}
                    selectedMethod={selectedMethod}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </I18nProvider>
  );
}
