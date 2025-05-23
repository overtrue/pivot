import { SchemaObject } from '../../types/type-script-generator';
import { default as React } from 'react';

interface SchemaConstraintsProps {
    schema: SchemaObject;
    className?: string;
}
declare const SchemaConstraints: React.FC<SchemaConstraintsProps>;
export default SchemaConstraints;
