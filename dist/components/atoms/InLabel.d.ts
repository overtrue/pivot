import { ParameterLocation } from '../../types/openapi';
import { default as React } from 'react';

interface InLabelProps {
    type: ParameterLocation;
    className?: string;
}
declare const InLabel: React.FC<InLabelProps>;
export default InLabel;
