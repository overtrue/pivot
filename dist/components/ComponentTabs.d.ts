import { ComponentsObject } from "../types/openapi";
import { default as React } from "react";

export type ComponentType = keyof ComponentsObject;
interface ComponentTabsProps {
  availableTypes: ComponentType[];
  activeType: ComponentType | null;
  onSelectType: (type: ComponentType) => void;
}
declare const ComponentTabs: React.FC<ComponentTabsProps>;
export default ComponentTabs;
