
import { useI18n } from '@/lib/i18n/i18n-provider';
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
      <div className="font-semibold dark:text-neutral-200">{license.name}</div>
      {license.identifier && <div className="text-xs text-neutral-600 dark:text-neutral-400">{t('Identifier')}: {license.identifier}</div>}
      {license.url && (
        <div>
          <a href={license.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">{license.url}</a>
        </div>
      )}
    </div>
  );
};

export default LicenseDisplay;
