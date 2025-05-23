import { ComponentsObject, ResponseObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ResponseGroupProps {
    status: string;
    response: ResponseObject;
    components?: ComponentsObject;
}
declare const ResponseGroup: React.FC<ResponseGroupProps>;
export default ResponseGroup;
