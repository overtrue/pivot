import { ServerObject } from '../types/type-script-generator';
import { default as React } from 'react';

interface ServerProps {
    server: ServerObject;
}
declare const Server: React.FC<ServerProps>;
export default Server;
