import { ComponentsObject, ExampleObject, ReferenceObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ExamplesDisplayProps {
    examples: Record<string, ExampleObject | ReferenceObject>;
    components?: ComponentsObject;
}
declare const ExamplesDisplay: React.FC<ExamplesDisplayProps>;
export default ExamplesDisplay;
