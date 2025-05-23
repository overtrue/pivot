import { ComponentsObject } from "../types/openapi";
import { default as React } from "react";
import { ComponentType } from ".//ComponentTabs";

interface ComponentDetailProps {
  activeType: ComponentType | null;
  selectedItemName: string | null;
  components: ComponentsObject;
}
declare const ComponentDetail: React.FC<ComponentDetailProps>;
export default ComponentDetail;
