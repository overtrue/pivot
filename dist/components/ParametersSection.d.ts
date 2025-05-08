import { ComponentsObject, ParameterObject, ReferenceObject } from '../types/openapi';
import { default as React } from 'react';

interface ParametersSectionProps {
    parameters: (ParameterObject | ReferenceObject)[];
    components?: ComponentsObject;
    className?: string;
}
declare const ParametersSection: React.FC<ParametersSectionProps>;
export default ParametersSection;
