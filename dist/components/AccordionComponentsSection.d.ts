import { ComponentsObject } from "../types/openapi";
import { default as React } from "react";

interface AccordionComponentsSectionProps {
  components: ComponentsObject;
  selectedSchema?: string | null;
  className?: string;
}
declare const AccordionComponentsSection: React.FC<AccordionComponentsSectionProps>;
export default AccordionComponentsSection;
