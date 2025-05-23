import { ComponentsObject, ReferenceObject, ResponseObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ResponseItemProps {
    code: string;
    response: ResponseObject | ReferenceObject;
    components?: ComponentsObject;
}
declare const ResponseItem: React.FC<ResponseItemProps>;
export default ResponseItem;
