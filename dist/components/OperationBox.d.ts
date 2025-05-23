import { ComponentsObject, OpenApiSpec, OperationObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface OperationBoxProps {
    path: string;
    method: string;
    operation: OperationObject;
    components?: ComponentsObject;
    className?: string;
    onSelectOperation?: () => void;
    spec?: OpenApiSpec;
}
declare const OperationBox: React.FC<OperationBoxProps>;
export default OperationBox;
