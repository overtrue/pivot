import { ComponentsObject, LinkObject, ReferenceObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface LinksSectionProps {
    links: Record<string, LinkObject | ReferenceObject>;
    components?: ComponentsObject;
}
declare const LinksSection: React.FC<LinksSectionProps>;
export default LinksSection;
