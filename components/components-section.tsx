import { useI18n } from '@/lib/i18n/i18n-provider';
import { ComponentsObject } from '@/types/openapi';
import React, { useMemo, useState } from 'react';
import { getAvailableComponents } from '@/utils/getAvailableComponents';
import SectionTitle from './section-title';
import ComponentDetail from './component-detail';
import ComponentItemsList from './component-items-list';
import ComponentTabs, { ComponentType } from './component-tabs';

interface ComponentsSectionProps {
  components: ComponentsObject;
  className?: string;
}

const ComponentsSection: React.FC<ComponentsSectionProps> = ({ components, className }) => {
  const { t } = useI18n();
  const availableComponents = useMemo(() => getAvailableComponents(components), [components]);
  const availableTypes = useMemo(() => Object.keys(availableComponents) as ComponentType[], [availableComponents]);

  const [activeType, setActiveType] = useState<ComponentType | null>(availableTypes[0] || null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  // Reset selected item when type changes
  React.useEffect(() => {
    setSelectedItemName(null);
  }, [activeType]);

  if (availableTypes.length === 0) {
    return null; // If no components are defined, don't render this section
  }

  return (
    <div className={`py-8 ${className}`}>
      <SectionTitle title={t("Components")} className="text-2xl mb-6" />
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Navigation panel */}
        <div className="md:w-1/2 flex-shrink-0 mb-6 md:mb-0">
          {/* Component type tabs */}
          <ComponentTabs
            availableTypes={availableTypes}
            activeType={activeType}
            onSelectType={setActiveType}
          />

          {/* List of items for the active type */}
          <ComponentItemsList
            items={activeType ? availableComponents[activeType] : undefined}
            selectedItem={selectedItemName}
            onSelectItem={setSelectedItemName}
          />
        </div>

        {/* Detail panel */}
        <div className="flex-grow md:w-1/2 border dark:border-neutral-700 rounded p-4 bg-white dark:bg-neutral-800 min-h-[200px]">
          <ComponentDetail
            activeType={activeType}
            selectedItemName={selectedItemName}
            components={components}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentsSection;
