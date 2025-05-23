import { SecurityRequirementObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface SecurityRequirementItemProps {
    requirement: SecurityRequirementObject;
}
declare const SecurityRequirementItem: React.FC<SecurityRequirementItemProps>;
export default SecurityRequirementItem;
