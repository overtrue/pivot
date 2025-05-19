import { useI18n } from '@/lib/i18n/I18nProvider';
import React from 'react';
import { OAuthFlow } from '../types/openapi';

interface OAuthFlowDetailsProps {
  flowName: string;
  flow: OAuthFlow;
}

const OAuthFlowDetails: React.FC<OAuthFlowDetailsProps> = ({ flowName, flow }) => {
  const { t } = useI18n();

  return (
    <div className="bg-gray-50 dark:bg-gray-800/70 p-3 rounded-md border dark:border-gray-700">
      <h5 className="font-medium text-sm mb-2 dark:text-gray-200">{flowName} {t('Flow')}</h5>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
        {flow.authorizationUrl && (
          <>
            <div className="font-semibold dark:text-gray-300">{t('Authorization URL:')}</div>
            <div className="font-mono break-all dark:text-gray-300">
              {flow.authorizationUrl}
            </div>
          </>
        )}
        {flow.tokenUrl && (
          <>
            <div className="font-semibold dark:text-gray-300">{t('Token URL:')}</div>
            <div className="font-mono break-all dark:text-gray-300">
              {flow.tokenUrl}
            </div>
          </>
        )}
        {flow.refreshUrl && (
          <>
            <div className="font-semibold dark:text-gray-300">{t('Refresh URL:')}</div>
            <div className="font-mono break-all dark:text-gray-300">
              {flow.refreshUrl}
            </div>
          </>
        )}
      </div>

      <div className="mt-2">
        <h6 className="text-xs font-semibold mb-1 dark:text-gray-300">{t('Scopes')}</h6>
        <div className="border dark:border-gray-700 rounded overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('Scope')}</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('Description')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(flow.scopes).map(([scope, description]) => (
                <tr key={scope}>
                  <td className="px-3 py-2 text-xs font-mono whitespace-nowrap dark:text-gray-300">{scope}</td>
                  <td className="px-3 py-2 text-xs dark:text-gray-300">{description}</td>
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
