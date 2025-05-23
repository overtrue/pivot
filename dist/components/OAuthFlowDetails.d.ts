import { default as React } from 'react';
import { OAuthFlow } from '../types/type-script-generator';

interface OAuthFlowDetailsProps {
    flowName: string;
    flow: OAuthFlow;
}
declare const OAuthFlowDetails: React.FC<OAuthFlowDetailsProps>;
export default OAuthFlowDetails;
