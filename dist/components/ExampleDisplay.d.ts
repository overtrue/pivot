import { default as React } from 'react';

interface ExampleDisplayProps {
    example: any;
    className?: string;
    language?: string;
    title?: string;
}
/**
 * 组件用于展示 API 示例数据，带有语法高亮和复制功能
 * 支持多种格式（json, xml, yaml等）
 */
declare const ExampleDisplay: React.FC<ExampleDisplayProps>;
export default ExampleDisplay;
