import { ComponentsObject, PathItemObject } from '../types/type-script-generator';
import { default as React } from 'react';

export interface PathItemDisplayProps {
    path: string;
    pathItem: PathItemObject;
    components?: ComponentsObject;
    className?: string;
}
declare const PathItemDisplay: React.FC<PathItemDisplayProps>;
export default PathItemDisplay;
