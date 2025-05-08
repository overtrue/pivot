import { LinkObject } from '../types/openapi';
import { default as React } from 'react';

interface LinkItemProps extends LinkObject {
    name: string;
    className?: string;
}
declare const LinkItem: React.FC<LinkItemProps>;
export default LinkItem;
