import { useI18n } from '@/lib/i18n/I18nProvider';
import { SecurityRequirementObject } from '@/types/openapi';
import React from 'react';

// Process a single security requirement item
interface SecurityRequirementItemProps {
  requirement: SecurityRequirementObject;
}

const SecurityRequirementItem: React.FC<SecurityRequirementItemProps> = ({ requirement }) => {
  const { t } = useI18n();

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-xs dark:text-gray-200">
      {/* A single requirement object can list multiple schemes required together (AND) */}
      {Object.entries(requirement).map(([schemeName, scopes]) => (
        <div key={schemeName} className="flex items-center space-x-1">
          <span className="font-semibold text-gray-700 dark:text-gray-300">{schemeName}:</span>
          {scopes.length > 0 ? (
            <span className="text-gray-600 dark:text-gray-400">[{scopes.join(', ')}]</span>
          ) : (
            <span className="text-gray-500 dark:text-gray-500 italic">{t('(No specific scopes required)')}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SecurityRequirementItem;
