import { useI18n } from '@/lib/i18n/I18nProvider';
import { ServerObject } from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import React from 'react';
import DescriptionDisplay from './DescriptionDisplay';

interface ServerDisplayProps {
  server: ServerObject;
  className?: string;
}

const ServerDisplay: React.FC<ServerDisplayProps> = ({ server, className }) => {
  const { t } = useI18n();

  return (
    <div className={cn('bg-neutral-50 dark:bg-neutral-800 p-2 rounded', className)}>
      <div className="text-xs font-semibold mb-1 font-mono break-all dark:text-neutral-200">{server.url}</div>
      {server.description && (
        <DescriptionDisplay description={server.description} className="text-xs mb-2" />
      )}

      {server.variables && Object.keys(server.variables).length > 0 && (
        <div className="mt-2">
          <h5 className="text-xs font-medium mb-1">{t('Variables')}</h5>
          <div className="space-y-2">
            {Object.entries(server.variables).map(([varName, variable]) => (
              <div key={varName} className="border border-neutral-200 dark:border-neutral-700 p-1.5 rounded bg-white dark:bg-neutral-900 text-xs dark:text-neutral-200">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono font-medium">{varName}</span>
                  <span className="bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300">{t('Default:')} {variable.default}</span>
                </div>
                {variable.description && (
                  <DescriptionDisplay description={variable.description} className="text-xs mt-1 text-neutral-600 dark:text-neutral-400" />
                )}
                {variable.enum && variable.enum.length > 0 && (
                  <div className="mt-1">
                    <span className="font-medium">{t('Enum:')}</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {variable.enum.map((value) => (
                        <span key={value} className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono dark:text-neutral-300">{value}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerDisplay;
