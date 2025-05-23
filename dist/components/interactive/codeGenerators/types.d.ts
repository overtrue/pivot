import { HttpMethod, ParameterObject, RequestBodyObject } from '../../../types/type-script-generator';
import { ReactNode } from 'react';

export interface CodeGeneratorParams {
    endpoint: string;
    method: HttpMethod;
    parameters: ParameterObject[];
    requestBody?: RequestBodyObject;
    requestBodyExample: any;
}
export interface CodeGenerator {
    id: string;
    label: string;
    getIcon(): ReactNode;
    generateCode(params: CodeGeneratorParams): string;
}
