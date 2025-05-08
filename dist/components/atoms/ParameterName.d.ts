import { default as React } from 'react';

interface ParameterNameProps {
    name: string;
    required?: boolean;
    deprecated?: boolean;
}
declare const ParameterName: React.FC<ParameterNameProps>;
export default ParameterName;
