"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyButton } from "./copy-button";

interface CodeMarkdownProps {
  code: string;
  language: string;
  className?: string;
  disableCopy?: boolean;
}

/**
 * 代码Markdown组件，用于展示带语法高亮的代码块
 * 支持复制功能和主题切换
 */
const CodeMarkdown = React.forwardRef<HTMLDivElement, CodeMarkdownProps>(
  ({ code, language, className = "", disableCopy = false }, ref) => {
    const { theme, systemTheme } = useTheme();

    // 确定当前主题
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    const codeStyle = isDark ? atomOneDark : atomOneLight;

    return (
      <div ref={ref} className={cn("relative", className)}>
        {!disableCopy && (
          <div className="absolute top-3 right-3 z-10">
            <CopyButton text={code} size="sm" />
          </div>
        )}
        <div className="overflow-hidden dark:bg-neutral-800">
          <SyntaxHighlighter
            language={language}
            style={codeStyle}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.75rem",
              lineHeight: 1.2,
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: isDark ? "transparent" : undefined,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
);

CodeMarkdown.displayName = "CodeMarkdown";

export { CodeMarkdown, type CodeMarkdownProps };
