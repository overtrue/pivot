import { ServerObject } from '../../types/type-script-generator';
import { default as React } from 'react';

interface ServerDisplayProps {
    server: ServerObject;
    className?: string;
}
declare const ServerDisplay: React.FC<ServerDisplayProps>;
export default ServerDisplay;
