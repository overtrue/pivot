import { ComponentsObject, ExampleObject, ReferenceObject } from '../types/openapi';
import { default as React } from 'react';

interface ExamplesDisplayProps {
    examples: Record<string, ExampleObject | ReferenceObject>;
    components?: ComponentsObject;
}
declare const ExamplesDisplay: React.FC<ExamplesDisplayProps>;
export default ExamplesDisplay;
