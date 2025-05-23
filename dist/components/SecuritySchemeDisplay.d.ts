import { SecuritySchemeObject } from '../types/openapi';
import { default as React } from 'react';

interface SecuritySchemeDisplayProps {
    name: string;
    scheme: SecuritySchemeObject;
    className?: string;
}
declare const SecuritySchemeDisplay: React.FC<SecuritySchemeDisplayProps>;
export default SecuritySchemeDisplay;
