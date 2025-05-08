import { OpenApiSpec as OpenApiObject } from '../../types/openapi';
import { default as React } from 'react';

interface OpenApiLayoutProps {
    spec: OpenApiObject;
    className?: string;
}
declare const OpenApiLayout: React.FC<OpenApiLayoutProps>;
export default OpenApiLayout;
