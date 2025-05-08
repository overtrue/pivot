
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { xml } from '@codemirror/lang-xml';
import { EditorView } from '@codemirror/view';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  value,
  onChange,
  language = 'json',
  height = '200px',
  placeholder = '请输入内容...',
  readOnly = false,
  className = '',
}) => {
  // 根据语言选择扩展
  const getLanguageExtension = () => {
    switch (language.toLowerCase()) {
      case 'json':
        return json();
      case 'javascript':
      case 'js':
        return javascript();
      case 'xml':
        return xml();
      case 'css':
        return css();
      case 'html':
        return html();
      case 'markdown':
      case 'md':
        return markdown();
      default:
        return json(); // 默认使用JSON
    }
  };

  // 编辑器主题和基本配置
  const baseTheme = EditorView.theme({
    '&': {
      height,
      fontSize: '14px',
    },
    '.cm-content': {
      fontFamily: 'monospace',
    },
    '.cm-placeholder': {
      color: '#888',
    },
  });

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={[getLanguageExtension(), baseTheme]}
      theme="light"
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full ${className}`}
    />
  );
};
