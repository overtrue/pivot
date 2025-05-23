import { ComponentsObject, HeaderObject } from "../types/openapi";
import { default as React } from "react";

interface HeaderItemProps extends HeaderObject {
  name: string;
  components?: ComponentsObject;
  className?: string;
}
declare const HeaderItem: React.FC<HeaderItemProps>;
export default HeaderItem;
