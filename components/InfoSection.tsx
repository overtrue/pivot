import { useI18n } from '@/lib/i18n/I18nProvider';
import { InfoObject } from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import { Book, FileText, Info, Users } from 'lucide-react';
import React from 'react';
import ContactDisplay from './atoms/ContactDisplay';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import LicenseDisplay from './atoms/LicenseDisplay';

interface InfoSectionProps {
  info: InfoObject;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ info, className }) => {
  const { t } = useI18n();

  return (
    <div className={cn('py-8', className)}>
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-3xl font-bold mb-3 text-neutral-800 dark:text-neutral-100">{info.title}</h1>
        <div className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
          {t('Version')} {info.version}
        </div>
      </div>

      {info.description && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <FileText className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('API Description')}</h2>
          </div>
          <DescriptionDisplay description={info.description} className="prose max-w-none text-gray-600 dark:text-gray-300" />
        </div>
      )}

      {info.termsOfService && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Book className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('Terms of Service')}</h2>
          </div>
          <a href={info.termsOfService} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-all flex items-center">
            <span>{info.termsOfService}</span>
          </a>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {info.contact && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Users className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('Contact')}</h2>
            </div>
            <ContactDisplay contact={info.contact} />
          </div>
        )}

        {info.license && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Info className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{t('License')}</h2>
            </div>
            <LicenseDisplay license={info.license} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
