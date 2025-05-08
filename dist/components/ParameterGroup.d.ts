import { default as React } from 'react';

interface ParameterGroupProps {
    inType: 'query' | 'path' | 'header' | 'cookie';
    parameters: {
        name: string;
        required: boolean;
        type: string;
    }[];
}
declare const ParameterGroup: React.FC<ParameterGroupProps>;
export default ParameterGroup;
