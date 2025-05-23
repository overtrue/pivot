import { ServerObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ServersSectionProps {
    servers: ServerObject[];
    className?: string;
}
declare const ServersSection: React.FC<ServersSectionProps>;
export default ServersSection;
