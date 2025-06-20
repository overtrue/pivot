"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import React from "react";
import { CodeMarkdown } from "@/registry/pivot/code-markdown";

interface ExampleDisplayProps {
  example: any;
  className?: string;
  language?: string; // 支持指定语言
  title?: string; // 添加标题选项
  disableCopy?: boolean; // 是否禁用复制功能
}

/**
 * 组件用于展示 API 示例数据，带有语法高亮和复制功能
 * 支持多种格式（json, xml, yaml等）
 */
const ExampleDisplay = React.forwardRef<HTMLDivElement, ExampleDisplayProps>(
  ({ example, className = "", language = "json", title, disableCopy = false }, ref) => {
    const { t } = useI18n();

    if (!example) {
      return (
        <div
          ref={ref}
          className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-3 rounded text-sm"
        >
          {t('No example data provided')}
        </div>
      );
    }

    // 根据不同的语言格式化示例数据
    const formatExample = () => {
      // 如果示例已经是字符串，直接返回
      if (typeof example === "string") {
        return example;
      }

      // 根据语言选择格式化方式
      switch (language) {
        case "json":
          return JSON.stringify(example, null, 2);
        case "xml":
          // 如果example是对象但需要显示为XML，尝试转换为XML格式字符串
          try {
            // 简单的对象到XML字符串转换
            const objectToXml = (obj: any, rootName = "root") => {
              let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`;

              for (const key in obj) {
                const value = obj[key];
                if (value === null || value === undefined) {
                  xml += `\n  <${key}/>`;
                } else if (typeof value === "object" && !Array.isArray(value)) {
                  xml += `\n  <${key}>${objectToXml(value, "")}</${key}>`;
                } else if (Array.isArray(value)) {
                  xml += `\n  <${key}>`;
                  value.forEach((item) => {
                    if (typeof item === "object") {
                      xml += `\n    <item>${objectToXml(item, "")}</item>`;
                    } else {
                      xml += `\n    <item>${item}</item>`;
                    }
                  });
                  xml += `\n  </${key}>`;
                } else {
                  xml += `\n  <${key}>${value}</${key}>`;
                }
              }

              return rootName ? `${xml}\n</${rootName}>` : xml;
            };

            return objectToXml(example, "data");
          } catch (error) {
            console.error(t('XML formatting failed:'), error);
            return JSON.stringify(example, null, 2); // 失败时回退到JSON
          }
        default:
          return JSON.stringify(example, null, 2);
      }
    };

    const exampleStr = formatExample();

    return (
      <div ref={ref} className={cn("relative", className)}>
        {title && (
          <div className="bg-neutral-50 dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 rounded-t-lg">
            {title}
          </div>
        )}

        <CodeMarkdown
          code={exampleStr}
          language={language}
          disableCopy={disableCopy}
          className={title ? "rounded-t-none" : ""}
        />
      </div>
    );
  },
);

ExampleDisplay.displayName = "ExampleDisplay";

export { ExampleDisplay, type ExampleDisplayProps };
