import { useTheme } from "@/lib/theme/ThemeProvider";
import { cn } from "@/utils/cn";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "../interactive/CopyButton";

interface CodeMarkdownProps {
  code: string;
  language: string;
  className?: string;
  disableCopy?: boolean;
}

/**
 * 代码Markdown组件，用于展示带语法高亮的代码块
 * 支持复制功能
 */
const CodeMarkdown: React.FC<CodeMarkdownProps> = ({
  code,
  language,
  className = "",
  disableCopy = false,
}) => {
  // 尝试使用 ThemeProvider 上下文，如果不可用，则使用本地状态或者获取系统首选配色
  const theme = (() => {
    try {
      return useTheme().theme;
    } catch (e) {
      // 如果不在 ThemeProvider 内部，检查 localStorage 或系统首选
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") return "dark";
      if (savedTheme === "light") return "light";
      // 检查系统首选配色
      if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
      return "light";
    }
  })();

  const codeStyle = theme === "dark" ? atomOneDark : atomOneLight;

  return (
    <div className={cn("relative", className)}>
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
            backgroundColor: theme === "dark" ? "transparent" : undefined,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeMarkdown;
