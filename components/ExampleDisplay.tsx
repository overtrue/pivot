import { cn } from '@/utils/cn';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './interactive/CopyButton';

interface ExampleDisplayProps {
  example: any;
  className?: string;
  language?: string; // 支持指定语言
  title?: string; // 添加标题选项
}

/**
 * 组件用于展示 API 示例数据，带有语法高亮和复制功能
 * 支持多种格式（json, xml, yaml等）
 */
const ExampleDisplay: React.FC<ExampleDisplayProps> = ({
  example,
  className = '',
  language = 'json',
  title
}) => {
  if (!example) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-3 rounded text-sm">
        未提供示例数据
      </div>
    );
  }

  // 根据不同的语言格式化示例数据
  const formatExample = () => {
    // 如果示例已经是字符串，直接返回
    if (typeof example === 'string') {
      return example;
    }

    // 根据语言选择格式化方式
    switch (language) {
      case 'json':
        return JSON.stringify(example, null, 2);
      case 'xml':
        // 如果example是对象但需要显示为XML，尝试转换为XML格式字符串
        try {
          // 简单的对象到XML字符串转换
          const objectToXml = (obj: any, rootName = 'root') => {
            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`;

            for (const key in obj) {
              const value = obj[key];
              if (value === null || value === undefined) {
                xml += `\n  <${key}/>`;
              } else if (typeof value === 'object' && !Array.isArray(value)) {
                xml += `\n  <${key}>${objectToXml(value, '')}</${key}>`;
              } else if (Array.isArray(value)) {
                xml += `\n  <${key}>`;
                value.forEach(item => {
                  if (typeof item === 'object') {
                    xml += `\n    <item>${objectToXml(item, '')}</item>`;
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

          return objectToXml(example, 'pet');
        } catch (error) {
          console.error('XML格式化失败:', error);
          return JSON.stringify(example, null, 2); // 失败时回退到JSON
        }
      default:
        return JSON.stringify(example, null, 2);
    }
  };

  const exampleStr = formatExample();

  return (
    <div className={cn('relative', className)}>
      {title && (
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <CopyButton text={exampleStr} />
      </div>
      <SyntaxHighlighter
        language={language}
        style={vs}
        className="rounded text-xs overflow-x-auto"
        codeTagProps={{
          className: 'font-mono'
        }}
        customStyle={{
          background: 'transparent',
          padding: '12px',
          margin: 0,
          border: 'none',
          fontFamily: 'inherit',
          fontWeight: 'normal',
          lineHeight: '1.4',
        }}
      >
        {exampleStr}
      </SyntaxHighlighter>
    </div>
  );
};

export default ExampleDisplay;
