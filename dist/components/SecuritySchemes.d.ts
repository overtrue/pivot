import { default as React } from 'react';
import { SecuritySchemeObject } from '../types/openapi';

interface SecuritySchemesProps {
    schemes: Record<string, SecuritySchemeObject>;
    className?: string;
}
declare const SecuritySchemes: React.FC<SecuritySchemesProps>;
export default SecuritySchemes;
