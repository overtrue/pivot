import { default as React } from 'react';
import { SecurityRequirementObject } from '../types/type-script-generator';

interface SecurityRequirementsSectionProps {
    security?: SecurityRequirementObject[];
    className?: string;
}
declare const SecurityRequirementsSection: React.FC<SecurityRequirementsSectionProps>;
export default SecurityRequirementsSection;
