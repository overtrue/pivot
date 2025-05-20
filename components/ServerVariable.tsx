import DescriptionDisplay from '@/components/atoms/DescriptionDisplay';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { ServerVariableObject } from '@/types/openapi';
import React from 'react';

interface ServerVariableProps {
  name: string;
  variable: ServerVariableObject;
}

const ServerVariable: React.FC<ServerVariableProps> = ({ name, variable }) => {
  const { t } = useI18n();
  const { description, default: defaultValue, enum: enumValues } = variable;

  return (
    <div className="rounded p-3 bg-neutral-50 dark:bg-neutral-800/70">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-medium dark:text-neutral-200">{name}</span>
        <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded">
          {t('Default value:')} {defaultValue}
        </span>
      </div>

      {description && (
        <DescriptionDisplay description={description} />
      )}

      {enumValues && enumValues.length > 0 && (
        <div>
          <h5 className="text-xs font-medium mb-1 dark:text-neutral-300">{t('Available values:')}</h5>
          <div className="flex flex-wrap gap-1">
            {enumValues.map((value) => (
              <span key={value} className="text-xs bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded">
                {value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerVariable;
