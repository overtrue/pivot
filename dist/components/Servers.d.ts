import { ServerObject } from "../types/openapi";
import { default as React } from "react";

interface ServersProps {
  servers: ServerObject[];
  className?: string;
}
declare const Servers: React.FC<ServersProps>;
export default Servers;
