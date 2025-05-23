import { useI18n } from '@/lib/i18n/i18n-provider';
import { cn } from '@/utils/cn';
import React from 'react';
import ValueDisplay from './value-display';

interface DefaultValueDisplayProps {
  value: any;
  className?: string;
}

const DefaultValueDisplay: React.FC<DefaultValueDisplayProps> = ({ value, className }) => {
  const { t } = useI18n();

  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <h4 className="text-xs font-semibold mb-1 text-neutral-500 dark:text-neutral-400">{t('Default')}</h4>
      <ValueDisplay value={value} />
    </div>
  );
};

export default DefaultValueDisplay;
