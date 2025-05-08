import { ServerObject } from '../../types/openapi';
import { default as React } from 'react';

interface ServerDisplayProps {
    server: ServerObject;
    className?: string;
}
declare const ServerDisplay: React.FC<ServerDisplayProps>;
export default ServerDisplay;
