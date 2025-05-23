import { default as React } from "react";

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
declare const CodeMarkdown: React.FC<CodeMarkdownProps>;
export default CodeMarkdown;
