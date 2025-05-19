import { useI18n } from '@/lib/i18n/I18nProvider';
import React from 'react';

interface ComponentItemsListProps {
  items: string[] | undefined;
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
}

const ComponentItemsList: React.FC<ComponentItemsListProps> = ({ items, selectedItem, onSelectItem }) => {
  const { t } = useI18n();

  if (!items || items.length === 0) {
    return <div className="text-gray-500 italic">{t('No items available')}</div>;
  }

  return (
    <ul className="space-y-1 text-sm">
      {items.map(itemName => (
        <li key={itemName}>
          <button
            onClick={() => onSelectItem(itemName)}
            className={`w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 ${selectedItem === itemName ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'
              }`}
          >
            {itemName}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ComponentItemsList;
