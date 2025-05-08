import { default as React } from 'react';
import { SecurityRequirementObject } from '../types/openapi';

interface SecurityRequirementsSectionProps {
    security?: SecurityRequirementObject[];
    className?: string;
}
declare const SecurityRequirementsSection: React.FC<SecurityRequirementsSectionProps>;
export default SecurityRequirementsSection;
