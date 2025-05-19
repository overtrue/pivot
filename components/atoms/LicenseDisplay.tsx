
import { useI18n } from '@/lib/i18n/I18nProvider';
import { LicenseObject } from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import React from 'react';

interface LicenseDisplayProps {
  license: LicenseObject;
  className?: string;
}

const LicenseDisplay: React.FC<LicenseDisplayProps> = ({ license, className }) => {
  const { t } = useI18n();

  return (
    <div className={cn('text-sm', className)}>
      <div className="font-semibold dark:text-gray-200">{license.name}</div>
      {license.identifier && <div className="text-xs text-gray-600 dark:text-gray-400">{t('Identifier')}: {license.identifier}</div>}
      {license.url && (
        <div>
          <a href={license.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">{license.url}</a>
        </div>
      )}
    </div>
  );
};

export default LicenseDisplay;
