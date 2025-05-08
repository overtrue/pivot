import { ComponentsObject, ReferenceObject, SchemaObject } from '../types/openapi';
import { default as React } from 'react';

interface SchemaDisplayProps {
    schema: SchemaObject | ReferenceObject;
    components?: ComponentsObject;
    currentDepth?: number;
    maxDepth?: number;
    className?: string;
}
declare const ExportedSchemaDisplay: React.FC<SchemaDisplayProps>;
export default ExportedSchemaDisplay;
