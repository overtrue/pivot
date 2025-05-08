
import { ComponentsObject } from '@/types/openapi';
import React, { useMemo, useState } from 'react';
import { getAvailableComponents } from '../utils/getAvailableComponents';
import ComponentTabs, { ComponentType } from './/ComponentTabs';
import SectionTitle from './atoms/SectionTitle';
import ComponentDetail from './ComponentDetail';
import ComponentItemsList from './ComponentItemsList';

interface ComponentsSectionProps {
  components: ComponentsObject;
  className?: string;
}

const ComponentsSection: React.FC<ComponentsSectionProps> = ({ components, className }) => {
  const availableComponents = useMemo(() => getAvailableComponents(components), [components]);
  const availableTypes = useMemo(() => Object.keys(availableComponents) as ComponentType[], [availableComponents]);

  const [activeType, setActiveType] = useState<ComponentType | null>(availableTypes[0] || null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  // 当类型变更时重置选中的项目
  React.useEffect(() => {
    setSelectedItemName(null);
  }, [activeType]);

  if (availableTypes.length === 0) {
    return null; // 如果没有定义组件，则不渲染此部分
  }

  return (
    <div className={`py-8 ${className}`}>
      <SectionTitle title="Components" className="text-2xl mb-6" />
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* 导航面板 */}
        <div className="md:w-1/2 flex-shrink-0 mb-6 md:mb-0">
          {/* 组件类型标签 */}
          <ComponentTabs
            availableTypes={availableTypes}
            activeType={activeType}
            onSelectType={setActiveType}
          />

          {/* 活动类型的项目列表 */}
          <ComponentItemsList
            items={activeType ? availableComponents[activeType] : undefined}
            selectedItem={selectedItemName}
            onSelectItem={setSelectedItemName}
          />
        </div>

        {/* 详情面板 */}
        <div className="flex-grow md:w-1/2 border rounded p-4 bg-white min-h-[200px]">
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
