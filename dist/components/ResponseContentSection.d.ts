import { ComponentsObject, MediaTypeObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ResponseContentSectionProps {
    content: Record<string, MediaTypeObject>;
    components?: ComponentsObject;
    className?: string;
}
declare const ResponseContentSection: React.FC<ResponseContentSectionProps>;
export default ResponseContentSection;
