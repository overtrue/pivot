
import { SecuritySchemeObject } from '@/types/openapi'; // Adjust path
import React from 'react';
import DescriptionDisplay from './atoms/DescriptionDisplay';

interface SecuritySchemeDisplayProps {
  name: string;
  scheme: SecuritySchemeObject;
  className?: string;
}

const SecuritySchemeDisplay: React.FC<SecuritySchemeDisplayProps> = ({ name, scheme, className }) => {

  const renderDetails = () => {
    switch (scheme.type) {
      case 'apiKey':
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-gray-600">In:</span> <span>{scheme.in}</span>
            <span className="text-gray-600">Name:</span> <span>{scheme.name}</span>
          </div>
        );
      case 'http':
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-gray-600">Scheme:</span> <span>{scheme.scheme}</span>
            {scheme.bearerFormat && <><span className="text-gray-600">Bearer Format:</span> <span>{scheme.bearerFormat}</span></>}
          </div>
        );
      case 'oauth2':
        return (
          <div>
            <h5 className="text-xs font-semibold mb-1 uppercase text-gray-500">Flows:</h5>
            <div className="space-y-2">
              {scheme.flows && Object.entries(scheme.flows).map(([flowType, flow]) => (
                <div key={flowType} className="p-2 border rounded bg-gray-100">
                  <h6 className="font-semibold capitalize mb-1">{flowType}</h6>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs">
                    {flow?.authorizationUrl && <><span className="text-gray-600">Authorization URL:</span> <code className="break-all">{flow.authorizationUrl}</code></>}
                    {flow?.tokenUrl && <><span className="text-gray-600">Token URL:</span> <code className="break-all">{flow.tokenUrl}</code></>}
                    {flow?.refreshUrl && <><span className="text-gray-600">Refresh URL:</span> <code className="break-all">{flow.refreshUrl}</code></>}
                    {flow?.scopes && Object.keys(flow.scopes).length > 0 && (
                      <><span className="text-gray-600 self-start">Scopes:</span>
                        <div className="space-y-0.5">
                          {Object.entries(flow.scopes).map(([scope, description]) => (
                            <div key={scope}><code className="font-mono bg-gray-200 px-1 rounded">{scope}:</code> {description as string}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'openIdConnect':
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-gray-600">OpenID Connect URL:</span>
            <a href={scheme.openIdConnectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{scheme.openIdConnectUrl}</a>
          </div>
        );
      case 'mutualTLS':
        return <p className="text-gray-600 italic">Details for mutualTLS not specifically rendered.</p>;
      default:
        return <p className="text-red-500">Unknown security scheme type: {scheme.type}</p>;
    }
  };

  return (
    <div className={`p-3 border rounded ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono font-semibold">{name}</span>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded capitalize">{scheme.type}</span>
      </div>
      {scheme.description && (
        <DescriptionDisplay description={scheme.description} className="text-sm mb-3" />
      )}
      <div className="text-sm">
        {renderDetails()}
      </div>
    </div>
  );
};

export default SecuritySchemeDisplay;
