import { useI18n } from '@/lib/i18n/I18nProvider';
import { SecuritySchemeObject } from '@/types/openapi'; // Adjust path
import React from 'react';
import DescriptionDisplay from './atoms/DescriptionDisplay';

interface SecuritySchemeDisplayProps {
  name: string;
  scheme: SecuritySchemeObject;
  className?: string;
}

const SecuritySchemeDisplay: React.FC<SecuritySchemeDisplayProps> = ({ name, scheme, className }) => {
  const { t } = useI18n();

  const renderDetails = () => {
    switch (scheme.type) {
      case 'apiKey':
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-gray-600 dark:text-gray-400">{t('In:')}</span> <span className="dark:text-gray-300">{scheme.in}</span>
            <span className="text-gray-600 dark:text-gray-400">{t('Name:')}</span> <span className="dark:text-gray-300">{scheme.name}</span>
          </div>
        );
      case 'http':
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-gray-600 dark:text-gray-400">{t('Scheme:')}</span> <span className="dark:text-gray-300">{scheme.scheme}</span>
            {scheme.bearerFormat && <><span className="text-gray-600 dark:text-gray-400">{t('Bearer Format:')}</span> <span className="dark:text-gray-300">{scheme.bearerFormat}</span></>}
          </div>
        );
      case 'oauth2':
        return (
          <div>
            <div className="space-y-2">
              {scheme.flows && Object.entries(scheme.flows).map(([flowType, flow]) => (
                <div key={flowType} className="p-2 rounded bg-gray-100 dark:bg-gray-800/70">
                  <h6 className="font-semibold capitalize mb-1 dark:text-gray-200">{flowType}</h6>
                  <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs dark:text-gray-300">
                    {flow?.authorizationUrl && <><span className="text-gray-600 dark:text-gray-400">{t('Authorization URL:')}</span> <code className="break-all">{flow.authorizationUrl}</code></>}
                    {flow?.tokenUrl && <><span className="text-gray-600 dark:text-gray-400">{t('Token URL:')}</span> <code className="break-all">{flow.tokenUrl}</code></>}
                    {flow?.refreshUrl && <><span className="text-gray-600 dark:text-gray-400">{t('Refresh URL:')}</span> <code className="break-all">{flow.refreshUrl}</code></>}
                    {flow?.scopes && Object.keys(flow.scopes).length > 0 && (
                      <><span className="text-gray-600 dark:text-gray-400 self-start">{t('Scopes:')}</span>
                        <div className="space-y-0.5">
                          {Object.entries(flow.scopes).map(([scope, description]) => (
                            <div key={scope}><code className="font-mono px-1 rounded">{scope}:</code> <span className="dark:text-gray-300">{description as string}</span></div>
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
            <span className="text-gray-600 dark:text-gray-400">{t('OpenID Connect URL:')}</span>
            <a href={scheme.openIdConnectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">{scheme.openIdConnectUrl}</a>
          </div>
        );
      case 'mutualTLS':
        return <p className="text-gray-600 dark:text-gray-400 italic">{t('Details for mutualTLS not specifically rendered.')}</p>;
      default:
        return <p className="text-red-500 dark:text-red-400">{t('Unknown security scheme type:')} {scheme.type}</p>;
    }
  };

  return (
    <div className={`p-3 rounded ${className} dark:bg-gray-800/30`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono font-semibold dark:text-gray-200">{name}</span>
        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded capitalize dark:text-gray-300">{t(scheme.type)}</span>
      </div>
      {scheme.description && (
        <DescriptionDisplay description={scheme.description} className="text-sm mb-3 dark:text-gray-300" />
      )}
      <div className="text-sm">
        {renderDetails()}
      </div>
    </div>
  );
};

export default SecuritySchemeDisplay;
