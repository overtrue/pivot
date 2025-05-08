import { SchemaObject } from '../../types/openapi';
import { default as React } from 'react';

interface SchemaConstraintsProps {
    schema: SchemaObject;
    className?: string;
}
declare const SchemaConstraints: React.FC<SchemaConstraintsProps>;
export default SchemaConstraints;
