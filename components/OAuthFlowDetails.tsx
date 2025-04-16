import React from 'react';
import { OAuthFlow } from '../types/openapi';

interface OAuthFlowDetailsProps {
  flowName: string;
  flow: OAuthFlow;
}

const OAuthFlowDetails: React.FC<OAuthFlowDetailsProps> = ({ flowName, flow }) => {
  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <h5 className="font-medium text-sm mb-2">{flowName} Flow</h5>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
        {flow.authorizationUrl && (
          <>
            <div className="font-semibold">Authorization URL:</div>
            <div className="font-mono break-all">
              {flow.authorizationUrl}
            </div>
          </>
        )}
        {flow.tokenUrl && (
          <>
            <div className="font-semibold">Token URL:</div>
            <div className="font-mono break-all">
              {flow.tokenUrl}
            </div>
          </>
        )}
        {flow.refreshUrl && (
          <>
            <div className="font-semibold">Refresh URL:</div>
            <div className="font-mono break-all">
              {flow.refreshUrl}
            </div>
          </>
        )}
      </div>

      <div className="mt-2">
        <h6 className="text-xs font-semibold mb-1">Scopes</h6>
        <div className="border rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scope</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(flow.scopes).map(([scope, description]) => (
                <tr key={scope}>
                  <td className="px-3 py-2 text-xs font-mono whitespace-nowrap">{scope}</td>
                  <td className="px-3 py-2 text-xs">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OAuthFlowDetails;
