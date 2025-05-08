import { ComponentsObject, OpenApiSpec, ResponsesObjectMap } from '../types/openapi';
import { default as React } from 'react';

interface ResponsesSectionProps {
    responses: ResponsesObjectMap;
    components?: ComponentsObject;
    spec?: OpenApiSpec;
    className?: string;
}
declare const ResponsesSection: React.FC<ResponsesSectionProps>;
export default ResponsesSection;
