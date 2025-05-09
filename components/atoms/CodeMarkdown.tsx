import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '../interactive/CopyButton';

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
  className = '',
  disableCopy = false
}) => {
  return (
    <div className={`relative ${className}`}>
      {!disableCopy && (
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code} className="text-gray-300" size="sm" />
        </div>
      )}
      <div className="overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={vs}
          codeTagProps={{
            className: 'font-mono'
          }}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.75rem',
            lineHeight: 1.2,
            border: 'none'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeMarkdown;
