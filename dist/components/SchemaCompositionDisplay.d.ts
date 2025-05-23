import { ComponentsObject, ReferenceObject, SchemaCompositionKeyword, SchemaObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface SchemaCompositionDisplayProps {
    keyword: SchemaCompositionKeyword;
    subschemas: (SchemaObject | ReferenceObject)[];
    components?: ComponentsObject;
    currentDepth: number;
    className?: string;
}
declare const SchemaCompositionDisplay: React.FC<SchemaCompositionDisplayProps>;
export default SchemaCompositionDisplay;
