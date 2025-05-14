import { ComponentsObject, MediaTypeObject, ReferenceObject, RequestBodyObject, ResponseObject } from '../types/openapi';
import { default as React } from 'react';

interface SchemaExampleViewProps {
    mediaType: MediaTypeObject;
    mediaTypeName?: string;
    components?: ComponentsObject;
    className?: string;
    buttonClassName?: string;
    contentClassName?: string;
}
/**
 * 通用的 Schema 和示例数据视图组件
 * 可以显示 schema 和其对应的 example 数据，并支持在两者间切换
 */
declare const SchemaExampleView: React.FC<SchemaExampleViewProps>;
interface SchemaWithExampleViewerProps {
    content: RequestBodyObject | ReferenceObject | ResponseObject | Record<string, MediaTypeObject>;
    components?: ComponentsObject;
    className?: string;
    title?: string;
    showTitle?: boolean;
    contentType?: 'requestBody' | 'response' | 'mediaTypes';
    renderHeader?: () => React.ReactNode;
    renderFooter?: (mediaType: MediaTypeObject) => React.ReactNode;
}
/**
 * Schema与示例查看器组件
 * 用于展示 schema 和它的示例数据，支持切换不同的媒体类型格式
 */
declare const SchemaWithExampleViewer: React.FC<SchemaWithExampleViewerProps>;
export { SchemaExampleView };
export default SchemaWithExampleViewer;
