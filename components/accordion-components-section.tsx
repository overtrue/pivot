import { useI18n } from '@/lib/i18n/i18n-provider';
import { ComponentsObject } from '@/types/openapi';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { getAvailableComponents } from '../utils/getAvailableComponents';
import ComponentDetail from './component-detail';
import { ComponentType } from './component-tabs';

interface AccordionComponentsSectionProps {
  components: ComponentsObject;
  selectedSchema?: string | null;
  className?: string;
}

const AccordionComponentsSection: React.FC<AccordionComponentsSectionProps> = ({ components, selectedSchema, className }) => {
  const { t } = useI18n();
  const availableComponents = useMemo(() => getAvailableComponents(components), [components]);
  const availableTypes = useMemo(() => Object.keys(availableComponents) as ComponentType[], [availableComponents]);

  // Currently expanded component
  const [expandedComponent, setExpandedComponent] = useState<{ type: ComponentType, name: string } | null>(null);

  // Currently active type tab
  const [activeType, setActiveType] = useState<ComponentType | null>(
    availableTypes.includes('schemas' as ComponentType) ? 'schemas' as ComponentType :
      availableTypes[0] || null
  );

  // Toggle expanded component
  const toggleExpandComponent = (type: ComponentType, name: string) => {
    if (expandedComponent?.type === type && expandedComponent?.name === name) {
      // If clicking on an already expanded component, collapse it
      setExpandedComponent(null);
    } else {
      // Otherwise expand this component and collapse others
      setExpandedComponent({ type, name });
    }
  };

  // Listen for custom events to handle external schema selection requests
  useEffect(() => {
    const handleSelectSchema = (event: CustomEvent) => {
      const { name, type } = event.detail;
      if (type === 'schemas') {
        // Activate schemas tab
        setActiveType('schemas' as ComponentType);

        // Expand the corresponding schema
        toggleExpandComponent('schemas' as ComponentType, name);

        // Scroll to the schema
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

  // Handle selectedSchema prop changes
  useEffect(() => {
    if (selectedSchema) {
      // Activate schemas tab
      setActiveType('schemas' as ComponentType);

      // Expand the corresponding schema
      toggleExpandComponent('schemas' as ComponentType, selectedSchema);
    }
  }, [selectedSchema]);

  if (availableTypes.length === 0) {
    return null;
  }

  return (
    <div className={`py-4 ${className}`}>
      {/* Type tabs */}
      <div className="flex border-b dark:border-neutral-700 mb-4 overflow-x-auto hide-scrollbar">
        {availableTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 capitalize whitespace-nowrap ${activeType === type
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            onClick={() => setActiveType(type)}
          >
            {type}
            <span className="ml-1 text-xs text-neutral-500 dark:text-neutral-500">
              ({availableComponents[type]?.length || 0})
            </span>
          </button>
        ))}
      </div>

      {/* Display components for current type */}
      {activeType && availableComponents[activeType] && (
        <div className="space-y-2">
          {availableComponents[activeType].map((name) => (
            <div key={name} id={`schema-${name}`} className="rounded-md overflow-hidden bg-white dark:bg-neutral-800">
              {/* Component name header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700/60"
                onClick={() => toggleExpandComponent(activeType, name)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {expandedComponent?.type === activeType && expandedComponent?.name === name ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </span>
                  <h3 className="font-mono text-sm dark:text-neutral-200">
                    {name}
                  </h3>
                </div>
              </div>

              {/* Expanded component details */}
              {expandedComponent?.type === activeType && expandedComponent?.name === name && (
                <div className="p-4">
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
