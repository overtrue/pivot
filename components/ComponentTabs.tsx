'use client';

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
  return (
    <div className="mb-4 border-b">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        {availableTypes.map(type => (
          <li key={type} className="mr-2">
            <button
              onClick={() => onSelectType(type)}
              className={`inline-block p-2 border-b-2 rounded-t-lg capitalize ${activeType === type
                ? 'text-blue-600 border-blue-600'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentTabs;
