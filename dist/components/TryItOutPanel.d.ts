import { ComponentsObject, OperationObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface TryItOutPanelProps {
    operation: OperationObject;
    method: string;
    path: string;
    baseUrl?: string;
    components?: ComponentsObject;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
declare const TryItOutPanel: React.FC<TryItOutPanelProps>;
export default TryItOutPanel;
