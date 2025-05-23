import { ComponentsObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface AccordionComponentsSectionProps {
    components: ComponentsObject;
    selectedSchema?: string | null;
    className?: string;
}
declare const AccordionComponentsSection: React.FC<AccordionComponentsSectionProps>;
export default AccordionComponentsSection;
