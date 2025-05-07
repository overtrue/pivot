'use client';

import { ComponentsObject } from '@/types/openapi';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { getAvailableComponents } from '../utils/getAvailableComponents';
import ComponentDetail from './ComponentDetail';
import { ComponentType } from './ComponentTabs';

interface AccordionComponentsSectionProps {
  components: ComponentsObject;
  selectedSchema?: string | null;
  className?: string;
}

const AccordionComponentsSection: React.FC<AccordionComponentsSectionProps> = ({ components, selectedSchema, className }) => {
  const availableComponents = useMemo(() => getAvailableComponents(components), [components]);
  const availableTypes = useMemo(() => Object.keys(availableComponents) as ComponentType[], [availableComponents]);

  // 当前展开的组件
  const [expandedComponent, setExpandedComponent] = useState<{ type: ComponentType, name: string } | null>(null);

  // 当前激活的类型标签
  const [activeType, setActiveType] = useState<ComponentType | null>(
    availableTypes.includes('schemas' as ComponentType) ? 'schemas' as ComponentType :
      availableTypes[0] || null
  );

  // 切换展开组件
  const toggleExpandComponent = (type: ComponentType, name: string) => {
    if (expandedComponent?.type === type && expandedComponent?.name === name) {
      // 点击已展开的组件，则折叠它
      setExpandedComponent(null);
    } else {
      // 否则展开这个组件，折叠其他组件
      setExpandedComponent({ type, name });
    }
  };

  // 监听自定义事件，处理外部选择schema的请求
  useEffect(() => {
    const handleSelectSchema = (event: CustomEvent) => {
      const { name, type } = event.detail;
      if (type === 'schemas') {
        // 激活schemas标签
        setActiveType('schemas' as ComponentType);

        // 展开对应的schema
        toggleExpandComponent('schemas' as ComponentType, name);

        // 滚动到该schema
        setTimeout(() => {
          const element = document.getElementById(`schema-${name}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    document.addEventListener('openapi-select-schema', handleSelectSchema as EventListener);

    return () => {
      document.removeEventListener('openapi-select-schema', handleSelectSchema as EventListener);
    };
  }, []);

  // 处理selectedSchema属性变化
  useEffect(() => {
    if (selectedSchema) {
      // 激活schemas标签
      setActiveType('schemas' as ComponentType);

      // 展开对应的schema
      toggleExpandComponent('schemas' as ComponentType, selectedSchema);
    }
  }, [selectedSchema]);

  if (availableTypes.length === 0) {
    return null;
  }

  return (
    <div className={`py-4 ${className}`}>
      {/* 类型标签 */}
      <div className="flex border-b mb-4 overflow-x-auto hide-scrollbar">
        {availableTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 capitalize whitespace-nowrap ${activeType === type
              ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
              : 'text-gray-600 hover:text-blue-500'
              }`}
            onClick={() => setActiveType(type)}
          >
            {type}
            <span className="ml-1 text-xs text-gray-500">
              ({availableComponents[type]?.length || 0})
            </span>
          </button>
        ))}
      </div>

      {/* 显示当前类型的组件 */}
      {activeType && availableComponents[activeType] && (
        <div className="space-y-2">
          {availableComponents[activeType].map((name) => (
            <div key={name} id={`schema-${name}`} className="border rounded-md overflow-hidden bg-white">
              {/* 组件名称标题栏 */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleExpandComponent(activeType, name)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">
                    {expandedComponent?.type === activeType && expandedComponent?.name === name ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </span>
                  <h3 className="font-mono text-sm">
                    {name}
                  </h3>
                </div>
              </div>

              {/* 展开的组件详情 */}
              {expandedComponent?.type === activeType && expandedComponent?.name === name && (
                <div className="p-4 border-t">
                  <ComponentDetail
                    activeType={activeType}
                    selectedItemName={name}
                    components={components}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionComponentsSection;
