import { ServerObject } from '../types/openapi';
import { default as React } from 'react';

interface ServerProps {
    server: ServerObject;
}
declare const Server: React.FC<ServerProps>;
export default Server;
