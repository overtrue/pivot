import { ComponentsObject } from '../types/type-script-generator';
import { default as React } from 'react';
import { ComponentType } from './/type-script-generator';

interface ComponentDetailProps {
    activeType: ComponentType | null;
    selectedItemName: string | null;
    components: ComponentsObject;
}
declare const ComponentDetail: React.FC<ComponentDetailProps>;
export default ComponentDetail;
