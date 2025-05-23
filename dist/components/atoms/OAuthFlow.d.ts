import { OAuthFlowType } from "../../types/openapi";
import { default as React } from "react";

interface OAuthFlowProps {
  flow: OAuthFlowType;
  className?: string;
}
declare const OAuthFlow: React.FC<OAuthFlowProps>;
export default OAuthFlow;
