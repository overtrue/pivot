import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  ComponentsObject
} from '@/types/openapi';
import React from 'react';

export type ComponentType = keyof ComponentsObject;

interface ComponentTabsProps {
  availableTypes: ComponentType[];
  activeType: ComponentType | null;
  onSelectType: (type: ComponentType) => void;
}

const ComponentTabs: React.FC<ComponentTabsProps> = ({ availableTypes, activeType, onSelectType }) => {
  const { t } = useI18n();

  return (
    <div className="mb-4 border-b">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        {availableTypes.map(type => (
          <li key={type} className="mr-2">
            <button
              onClick={() => onSelectType(type)}
              className={`inline-block p-2 border-b-2 rounded-t-lg capitalize ${activeType === type
                ? 'text-blue-600 border-blue-600'
                : 'border-transparent hover:text-neutral-600 hover:border-neutral-300'
                }`}
            >
              {t(type)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentTabs;
