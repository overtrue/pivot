import { useI18n } from '@/lib/i18n/I18nProvider';
import { cn } from '@/utils/cn';
import React from 'react';

const ExternalDocs: React.FC<{ url: string; description?: string; className?: string }> = ({ url, description, className }) => {
  const { t } = useI18n();

  return (
    <div className={cn("p-4 border rounded bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700", className)}>
      <h2 className="text-lg font-bold mb-2 dark:text-white">{t('External Documentation')}</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{description || t('Additional information can be found here:')}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {url}
      </a>
    </div>
  );
};

export default ExternalDocs;

export default ExternalDocs;
