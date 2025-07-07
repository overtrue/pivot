"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { I18nProvider, useI18n } from "@/registry/default/lib/i18n";
import { RequiredMarker } from "@/registry/default/ui/required-marker";
import { TryItOutPanel } from "@/registry/default/ui/try-it-out-panel";
import { useState } from "react";

// 演示组件 - 在没有 I18nProvider 的情况下使用
const ComponentWithoutProvider = () => {
  const { t, locale, setLocale } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>组件（无 Provider）</CardTitle>
        <CardDescription>
          这个组件在没有 I18nProvider 包装的情况下使用 useI18n hook
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span>当前语言: {locale}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          >
            切换语言 (会显示警告)
          </Button>
        </div>

        <div className="space-y-2">
          <p>翻译示例:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>{t("Required")}: <RequiredMarker /></li>
            <li>{t("Parameters")}</li>
            <li>{t("Request Body")}</li>
            <li>{t("Send Request")}</li>
            <li>{t("Loading...")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// 演示组件 - 在有 I18nProvider 的情况下使用
const ComponentWithProvider = () => {
  const { t, locale, setLocale } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>组件（有 Provider）</CardTitle>
        <CardDescription>
          这个组件在 I18nProvider 包装下使用 useI18n hook，支持语言切换
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span>当前语言: {locale}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          >
            切换语言
          </Button>
        </div>

        <div className="space-y-2">
          <p>翻译示例:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>{t("Required")}: <RequiredMarker /></li>
            <li>{t("Parameters")}</li>
            <li>{t("Request Body")}</li>
            <li>{t("Send Request")}</li>
            <li>{t("Loading...")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <TryItOutPanel
            method="POST"
            path="/api/users"
            baseUrl="https://api.example.com"
            operation={{
              summary: "Create a new user",
              parameters: [
                {
                  name: "userId",
                  in: "path",
                  required: true,
                  schema: { type: "string" as const },
                  description: "User ID"
                }
              ],
              requestBody: {
                required: true,
                description: "User data",
                content: {
                  "application/json": {
                    schema: {
                      type: "object" as const,
                      properties: {
                        name: { type: "string" as const },
                        email: { type: "string" as const }
                      }
                    }
                  }
                }
              },
              responses: {
                "201": {
                  description: "User created successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object" as const,
                        properties: {
                          id: { type: "string" as const },
                          name: { type: "string" as const },
                          email: { type: "string" as const }
                        }
                      }
                    }
                  }
                }
              }
            }}
            collapsible={true}
            defaultCollapsed={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function I18nDemo() {
  const [showWithProvider, setShowWithProvider] = useState(true);

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">i18n 系统重构演示</h1>
        <p className="text-muted-foreground">
          演示重构后的 i18n 系统如何在有无 Provider 的情况下工作
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={showWithProvider ? "default" : "outline"}
          onClick={() => setShowWithProvider(true)}
        >
          有 Provider
        </Button>
        <Button
          variant={!showWithProvider ? "default" : "outline"}
          onClick={() => setShowWithProvider(false)}
        >
          无 Provider
        </Button>
      </div>

      {showWithProvider ? (
        <I18nProvider>
          <ComponentWithProvider />
        </I18nProvider>
      ) : (
        <ComponentWithoutProvider />
      )}

      <Card>
        <CardHeader>
          <CardTitle>重构说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">主要改进:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>向后兼容</strong>: 现有的 I18nProvider 和 useI18n 继续正常工作</li>
              <li><strong>默认语言支持</strong>: 组件在没有 Provider 时自动使用英文作为默认语言</li>
              <li><strong>优雅降级</strong>: setLocale 在没有 Provider 时会显示警告而不是抛出错误</li>
              <li><strong>独立翻译函数</strong>: 提供 t() 函数可在组件外部使用</li>
              <li><strong>工厂函数</strong>: createTranslator() 可创建指定语言的翻译函数</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">使用方式:</h3>
            <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
              {`// 在组件中使用 (推荐)
const { t } = useI18n();

// 在组件外部使用
import { t } from "@/registry/default/lib/i18n";

// 创建特定语言的翻译函数
import { createTranslator } from "@/registry/default/lib/i18n";
const tZh = createTranslator("zh");`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
