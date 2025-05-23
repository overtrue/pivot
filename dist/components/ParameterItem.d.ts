import {
  ComponentsObject,
  ExampleObject,
  ParameterObject,
  ReferenceObject,
  SchemaObject,
  StyleType,
} from "../types/openapi";
import { default as React } from "react";

interface ParameterItemProps
  extends Omit<ParameterObject, "schema" | "examples" | "style"> {
  schema: SchemaObject;
  style?: StyleType;
  examples?: Record<string, ExampleObject | ReferenceObject>;
  components?: ComponentsObject;
  className?: string;
}
declare const ParameterItem: React.FC<ParameterItemProps>;
export default ParameterItem;
