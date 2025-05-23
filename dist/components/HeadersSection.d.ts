import { ComponentsObject, HeaderObject, ReferenceObject } from '../types/openapi';
import { default as React } from 'react';

interface HeadersSectionProps {
    headers: Record<string, HeaderObject | ReferenceObject>;
    components?: ComponentsObject;
}
declare const HeadersSection: React.FC<HeadersSectionProps>;
export default HeadersSection;
