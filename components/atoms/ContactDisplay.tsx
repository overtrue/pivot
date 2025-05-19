
import { useI18n } from '@/lib/i18n/I18nProvider';
import { ContactObject } from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import React from 'react';

interface ContactDisplayProps {
  contact: ContactObject;
  className?: string;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ contact, className }) => {
  const { t } = useI18n();

  return (
    <div className={cn('text-sm', className)}>
      {contact.name && <div className="font-semibold">{contact.name}</div>}
      {contact.email && (
        <div className="text-gray-700 dark:text-gray-300">
          {t('Email')}: <a href={`mailto:${contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{contact.email}</a>
        </div>
      )}
      {contact.url && (
        <div className="text-gray-700 dark:text-gray-300">
          {t('URL')}: <a href={contact.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline break-all">{contact.url}</a>
        </div>
      )}
    </div>
  );
};

export default ContactDisplay;
