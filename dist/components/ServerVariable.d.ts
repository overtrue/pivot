import { ServerVariableObject } from '../types/openapi';
import { default as React } from 'react';

interface ServerVariableProps {
    name: string;
    variable: ServerVariableObject;
}
declare const ServerVariable: React.FC<ServerVariableProps>;
export default ServerVariable;
