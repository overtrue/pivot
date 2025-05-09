import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './interactive/CopyButton';

interface ExampleDisplayProps {
  example: any;
  className?: string;
  language?: string; // 支持指定语言
}

/**
 * 组件用于展示 API 示例数据，带有语法高亮和复制功能
 * 支持多种格式（json, xml, yaml等）
 */
const ExampleDisplay: React.FC<ExampleDisplayProps> = ({
  example,
  className = '',
  language = 'json'
}) => {
  if (!example) {
    return (
      <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm">
        未提供示例数据
      </div>
    );
  }

  const exampleStr = typeof example === 'string'
    ? example
    : JSON.stringify(example, null, 2);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-2 right-2 z-10">
        <CopyButton text={exampleStr} />
      </div>
      <SyntaxHighlighter
        language={language}
        style={vs}
        className="rounded p-3 text-xs overflow-x-auto"
        customStyle={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
      >
        {exampleStr}
      </SyntaxHighlighter>
    </div>
  );
};

export default ExampleDisplay;
