'use client';

import React, { useState } from 'react';
import OAuthFlow from '../atoms/security/OAuthFlow';
import SchemeType from '../atoms/security/SchemeType';
import ExpandCollapse from '../interactive/ExpandCollapse';

interface SecuritySchemeProps {
  name: string;
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  description?: string;
  in?: string;
  scheme?: string;
  bearerFormat?: string;
  flows?: {
    implicit?: { authorizationUrl: string; scopes: Record<string, string> };
    password?: { tokenUrl: string; scopes: Record<string, string> };
    clientCredentials?: { tokenUrl: string; scopes: Record<string, string> };
    authorizationCode?: { authorizationUrl: string; tokenUrl: string; scopes: Record<string, string> };
  };
  openIdConnectUrl?: string;
}

const SecurityScheme: React.FC<SecuritySchemeProps> = ({
  name,
  type,
  description,
  in: paramIn,
  scheme,
  bearerFormat,
  flows,
  openIdConnectUrl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded mb-4 overflow-hidden">
      <div className="p-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-mono">{name}</span>
          <SchemeType type={type} />
        </div>
        <ExpandCollapse
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
          label={isExpanded ? "Hide details" : "Show details"}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t">
          {description && (
            <div className="mb-3">
              <p className="text-sm text-gray-700">{description}</p>
            </div>
          )}

          {/* API Key specific */}
          {type === 'apiKey' && paramIn && (
            <div className="mb-3">
              <span className="text-sm font-semibold">In: </span>
              <span className="text-sm">{paramIn}</span>
            </div>
          )}

          {/* HTTP specific */}
          {type === 'http' && scheme && (
            <div className="mb-3">
              <span className="text-sm font-semibold">Scheme: </span>
              <span className="text-sm">{scheme}</span>
              {bearerFormat && (
                <>
                  <span className="text-sm font-semibold ml-3">Format: </span>
                  <span className="text-sm">{bearerFormat}</span>
                </>
              )}
            </div>
          )}

          {/* OAuth2 specific */}
          {type === 'oauth2' && flows && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-2">OAuth2 Flows:</h4>

              {flows.implicit && (
                <div className="ml-3 mb-2">
                  <div className="flex items-center mb-1">
                    <OAuthFlow flow="implicit" />
                    <span className="ml-2 text-xs">Auth URL: {flows.implicit.authorizationUrl}</span>
                  </div>
                  <div className="text-xs">
                    Scopes: {Object.keys(flows.implicit.scopes).join(', ')}
                  </div>
                </div>
              )}

              {flows.password && (
                <div className="ml-3 mb-2">
                  <div className="flex items-center mb-1">
                    <OAuthFlow flow="password" />
                    <span className="ml-2 text-xs">Token URL: {flows.password.tokenUrl}</span>
                  </div>
                  <div className="text-xs">
                    Scopes: {Object.keys(flows.password.scopes).join(', ')}
                  </div>
                </div>
              )}

              {flows.clientCredentials && (
                <div className="ml-3 mb-2">
                  <div className="flex items-center mb-1">
                    <OAuthFlow flow="clientCredentials" />
                    <span className="ml-2 text-xs">Token URL: {flows.clientCredentials.tokenUrl}</span>
                  </div>
                  <div className="text-xs">
                    Scopes: {Object.keys(flows.clientCredentials.scopes).join(', ')}
                  </div>
                </div>
              )}

              {flows.authorizationCode && (
                <div className="ml-3 mb-2">
                  <div className="flex items-center mb-1">
                    <OAuthFlow flow="authorizationCode" />
                    <span className="ml-2 text-xs">
                      Auth URL: {flows.authorizationCode.authorizationUrl}
                    </span>
                  </div>
                  <div className="text-xs mb-1">
                    Token URL: {flows.authorizationCode.tokenUrl}
                  </div>
                  <div className="text-xs">
                    Scopes: {Object.keys(flows.authorizationCode.scopes).join(', ')}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OpenID Connect specific */}
          {type === 'openIdConnect' && openIdConnectUrl && (
            <div className="mb-3">
              <span className="text-sm font-semibold">OpenID Connect URL: </span>
              <a href={openIdConnectUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                {openIdConnectUrl}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// SecuritySchemes component to display multiple security schemes
interface SecuritySchemesProps {
  schemes: SecuritySchemeProps[];
}

const SecuritySchemes: React.FC<SecuritySchemesProps> = ({ schemes }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Security Schemes</h3>
      {schemes.map((scheme, index) => (
        <SecurityScheme key={index} {...scheme} />
      ))}
    </div>
  );
};

export default SecuritySchemes;
