import { ComponentsObject, PathItemObject } from "../types/openapi";
import { default as React } from "react";

export interface WebhookDisplayProps {
  name: string;
  pathItem: PathItemObject;
  components?: ComponentsObject;
  className?: string;
}
declare const WebhookDisplay: React.FC<WebhookDisplayProps>;
export default WebhookDisplay;
