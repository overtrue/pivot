import { default as React } from 'react';
import { OAuthFlow } from '../types/openapi';

interface OAuthFlowDetailsProps {
    flowName: string;
    flow: OAuthFlow;
}
declare const OAuthFlowDetails: React.FC<OAuthFlowDetailsProps>;
export default OAuthFlowDetails;
