import { ComponentsObject, HttpMethod, ParameterObject, ReferenceObject, RequestBodyObject } from '../../types/type-script-generator';
import { default as React } from 'react';

interface CodegenProps {
    endpoint: string;
    method: HttpMethod;
    parameters?: (ParameterObject | ReferenceObject)[];
    requestBody?: RequestBodyObject | ReferenceObject;
    components?: ComponentsObject;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
declare const Codegen: React.FC<CodegenProps>;
export default Codegen;
