import { useI18n } from '@/lib/i18n/i18n-provider';
import { SecuritySchemeType } from '@/types/openapi';
import { cn } from '@/utils/cn';
import React from 'react';

interface SchemeTypeProps {
  type: SecuritySchemeType;
  className?: string;
}

const schemeColors: Record<SecuritySchemeType, string> = {
  apiKey: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
  http: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
  oauth2: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
  openIdConnect: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300',
  mutualTLS: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
};

const SchemeType: React.FC<SchemeTypeProps> = ({ type, className }) => {
  const { t } = useI18n();

  return (
    <span
      className={cn(
        'px-2 py-1 text-xs font-semibold rounded',
        schemeColors[type],
        className
      )}
    >
      {t(type)}
    </span>
  );
};

export default SchemeType;
