import {
  CallbackObject,
  ComponentsObject,
  ReferenceObject,
} from "../types/openapi";
import { default as React } from "react";

interface CallbackDisplayProps {
  name: string;
  callback: CallbackObject | ReferenceObject;
  components?: ComponentsObject;
  className?: string;
}
declare const CallbackDisplay: React.FC<CallbackDisplayProps>;
export default CallbackDisplay;
