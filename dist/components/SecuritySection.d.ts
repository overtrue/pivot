import { ComponentsObject, ReferenceObject, SecurityRequirementObject, SecuritySchemeObject } from '../types/openapi';
import { default as React } from 'react';

interface SecuritySectionProps {
    security?: SecurityRequirementObject[];
    securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
    components?: ComponentsObject;
    className?: string;
}
declare const SecuritySection: React.FC<SecuritySectionProps>;
export default SecuritySection;
