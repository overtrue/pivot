import {
  ComponentsObject,
  OpenApiSpec,
  ReferenceObject,
  RequestBodyObject,
} from "../types/openapi";
import { default as React } from "react";

interface RequestBodySectionProps {
  requestBody: RequestBodyObject | ReferenceObject;
  components?: ComponentsObject;
  spec?: OpenApiSpec;
  className?: string;
  titleClassName?: string;
}
declare const RequestBodySection: React.FC<RequestBodySectionProps>;
export default RequestBodySection;
