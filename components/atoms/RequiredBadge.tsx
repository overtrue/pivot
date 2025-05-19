import { useI18n } from '@/lib/i18n/I18nProvider';
import React from 'react';

const RequiredBadge: React.FC = () => {
  const { t } = useI18n();

  return (
    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 text-xs rounded font-semibold">
      {t("Required")}
    </span>
  );
};

export default RequiredBadge;
