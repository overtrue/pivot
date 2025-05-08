import { OpenApiSpec, OperationObject, ParameterObject, ReferenceObject, RequestBodyObject, ResponseObject, SchemaObject, ServerObject } from '../types/openapi';

/**
 * 自定义钩子，简化OpenAPI结构的处理
 * @param spec OpenAPI规范对象
 * @returns 一组处理OpenAPI结构的工具函数
 */
export declare function useOpenApi(spec: OpenApiSpec): {
    spec: OpenApiSpec;
    components: import('../types/openapi').ComponentsObject | undefined;
    resolve: <T>(obj: T | ReferenceObject | undefined, category?: string) => T | null;
    getSchemaType: (schema: SchemaObject | ReferenceObject | undefined) => string;
    getRequestBodySchema: (requestBody: RequestBodyObject | ReferenceObject | undefined) => SchemaObject | null;
    getSchemaProperties: (schema: SchemaObject | ReferenceObject | undefined) => Record<string, ReferenceObject | SchemaObject>;
    processParameters: (parameters: (ParameterObject | ReferenceObject)[] | undefined) => {
        [key: string]: (ReferenceObject | ParameterObject)[];
    };
    processResponse: (response: ResponseObject | ReferenceObject | undefined) => {
        description: string;
        contentType: string;
        schema: SchemaObject | null;
    } | null;
    getSchemaConstraints: (schema: SchemaObject | ReferenceObject | undefined) => Record<string, any>;
    getOperation: (path: string, method: string) => OperationObject | null;
    getServers: () => ServerObject[];
    getOperationsByTag: () => Record<string, {
        path: string;
        method: string;
        operation: OperationObject;
    }[]>;
};
