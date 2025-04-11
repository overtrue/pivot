import React from 'react';

interface OAuthFlowObject {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

interface SecuritySchemeProps {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  name?: string;  // 对于 apiKey 必须
  in?: 'query' | 'header' | 'cookie';  // 对于 apiKey 必须
  scheme?: string;  // 对于 http 必须
  bearerFormat?: string;  // 对于 http bearer 类型
  flows?: {  // 对于 oauth2 必须
    implicit?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
  };
  openIdConnectUrl?: string;  // 对于 openIdConnect 必须
  description?: string;
}

interface SecuritySchemesProps {
  schemes: Record<string, SecuritySchemeProps>;
  className?: string;
}

const SecuritySchemes: React.FC<SecuritySchemesProps> = ({ schemes, className }) => {
  if (!schemes || Object.keys(schemes).length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <h3 className="text-lg font-semibold">安全方案</h3>
      <div className="space-y-6">
        {Object.entries(schemes).map(([key, scheme]) => (
          <div key={key} className="border rounded-md overflow-hidden shadow-sm">
            <div className="bg-blue-50 p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-medium text-blue-800">{key}</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                  {scheme.type}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {scheme.description && (
                <div className="mb-3">
                  <p className="text-sm text-gray-700">{scheme.description}</p>
                </div>
              )}

              {/* ApiKey 类型 */}
              {scheme.type === 'apiKey' && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold mb-2">API Key</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-semibold">Name:</div>
                    <div className="font-mono">{scheme.name}</div>
                    <div className="font-semibold">In:</div>
                    <div>{scheme.in}</div>
                  </div>
                </div>
              )}

              {/* HTTP 类型 */}
              {scheme.type === 'http' && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold mb-2">HTTP 认证</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-semibold">Scheme:</div>
                    <div className="font-mono">{scheme.scheme}</div>
                    {scheme.bearerFormat && (
                      <>
                        <div className="font-semibold">Bearer Format:</div>
                        <div>{scheme.bearerFormat}</div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* OAuth2 类型 */}
              {scheme.type === 'oauth2' && scheme.flows && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">OAuth2 Flows</h4>

                  {/* Implicit Flow */}
                  {scheme.flows.implicit && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="font-medium text-sm mb-2">Implicit Flow</h5>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
                        <div className="font-semibold">Authorization URL:</div>
                        <div className="font-mono break-all">
                          {scheme.flows.implicit.authorizationUrl}
                        </div>
                        {scheme.flows.implicit.refreshUrl && (
                          <>
                            <div className="font-semibold">Refresh URL:</div>
                            <div className="font-mono break-all">
                              {scheme.flows.implicit.refreshUrl}
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
                              {Object.entries(scheme.flows.implicit.scopes).map(([scope, description]) => (
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
                  )}

                  {/* Password Flow */}
                  {scheme.flows.password && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="font-medium text-sm mb-2">Password Flow</h5>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
                        <div className="font-semibold">Token URL:</div>
                        <div className="font-mono break-all">
                          {scheme.flows.password.tokenUrl}
                        </div>
                        {scheme.flows.password.refreshUrl && (
                          <>
                            <div className="font-semibold">Refresh URL:</div>
                            <div className="font-mono break-all">
                              {scheme.flows.password.refreshUrl}
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
                              {Object.entries(scheme.flows.password.scopes).map(([scope, description]) => (
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
                  )}

                  {/* Client Credentials Flow */}
                  {scheme.flows.clientCredentials && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="font-medium text-sm mb-2">Client Credentials Flow</h5>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
                        <div className="font-semibold">Token URL:</div>
                        <div className="font-mono break-all">
                          {scheme.flows.clientCredentials.tokenUrl}
                        </div>
                        {scheme.flows.clientCredentials.refreshUrl && (
                          <>
                            <div className="font-semibold">Refresh URL:</div>
                            <div className="font-mono break-all">
                              {scheme.flows.clientCredentials.refreshUrl}
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
                              {Object.entries(scheme.flows.clientCredentials.scopes).map(([scope, description]) => (
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
                  )}

                  {/* Authorization Code Flow */}
                  {scheme.flows.authorizationCode && (
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h5 className="font-medium text-sm mb-2">Authorization Code Flow</h5>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
                        <div className="font-semibold">Authorization URL:</div>
                        <div className="font-mono break-all">
                          {scheme.flows.authorizationCode.authorizationUrl}
                        </div>
                        <div className="font-semibold">Token URL:</div>
                        <div className="font-mono break-all">
                          {scheme.flows.authorizationCode.tokenUrl}
                        </div>
                        {scheme.flows.authorizationCode.refreshUrl && (
                          <>
                            <div className="font-semibold">Refresh URL:</div>
                            <div className="font-mono break-all">
                              {scheme.flows.authorizationCode.refreshUrl}
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
                              {Object.entries(scheme.flows.authorizationCode.scopes).map(([scope, description]) => (
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
                  )}
                </div>
              )}

              {/* OpenID Connect 类型 */}
              {scheme.type === 'openIdConnect' && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="text-sm font-semibold mb-2">OpenID Connect</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-semibold">OpenID Connect URL:</div>
                    <div className="font-mono break-all">
                      <a href={scheme.openIdConnectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {scheme.openIdConnectUrl}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecuritySchemes;
