import { default as React } from "react";
import { SecuritySchemeObject } from "../types/openapi";

interface SecuritySchemeProps {
  name: string;
  scheme: SecuritySchemeObject;
}
declare const SecurityScheme: React.FC<SecuritySchemeProps>;
export default SecurityScheme;
