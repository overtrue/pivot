import React from 'react';
import { OAuthFlows, SecuritySchemeObject } from '../types/openapi';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import SchemeType from './atoms/SchemeType';
import OAuthFlowDetails from './OAuthFlowDetails';

interface SecuritySchemeProps {
  name: string;
  scheme: SecuritySchemeObject;
}

const SecurityScheme: React.FC<SecuritySchemeProps> = ({ name, scheme }) => {
  // 从scheme中获取所需属性
  const {
    type,
    description,
    in: paramIn,
    name: apiKeyName,
    scheme: httpScheme,
    bearerFormat,
    flows,
    openIdConnectUrl
  } = scheme;

  // OAuth2流类型的渲染
  const renderOAuth2Flows = (flows?: OAuthFlows) => {
    if (!flows) return null;

    // 获取所有非空的flow
    const availableFlows = Object.entries(flows)
      .filter(([_, flow]) => flow !== undefined)
      .map(([name, flow]) => ({ name, flow: flow! }));

    if (availableFlows.length === 0) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">OAuth2 Flows</h4>
        {availableFlows.map(({ name, flow }) => (
          <OAuthFlowDetails key={name} flowName={name} flow={flow} />
        ))}
      </div>
    );
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <div className="bg-blue-50 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-mono font-medium text-blue-800">{name}</span>
          <SchemeType type={type} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {description && <DescriptionDisplay description={description} />}

        {/* ApiKey 类型 */}
        {type === 'apiKey' && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2">API Key</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold">Name:</div>
              <div className="font-mono">{apiKeyName}</div>
              <div className="font-semibold">In:</div>
              <div>{paramIn}</div>
            </div>
          </div>
        )}

        {/* HTTP 类型 */}
        {type === 'http' && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2">HTTP 认证</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold">Scheme:</div>
              <div className="font-mono">{httpScheme}</div>
              {bearerFormat && (
                <>
                  <div className="font-semibold">Bearer Format:</div>
                  <div>{bearerFormat}</div>
                </>
              )}
            </div>
          </div>
        )}

        {/* OAuth2 类型 */}
        {type === 'oauth2' && renderOAuth2Flows(flows)}

        {/* OpenID Connect 类型 */}
        {type === 'openIdConnect' && openIdConnectUrl && (
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-semibold mb-2">OpenID Connect</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold">OpenID Connect URL:</div>
              <div className="font-mono break-all">
                <a href={openIdConnectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {openIdConnectUrl}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityScheme;
