import { ComponentsObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ComponentsSectionProps {
    components: ComponentsObject;
    className?: string;
}
declare const ComponentsSection: React.FC<ComponentsSectionProps>;
export default ComponentsSection;
