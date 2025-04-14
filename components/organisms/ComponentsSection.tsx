'use client';

import React, { useMemo, useState } from 'react';
import {
  CallbackObject,
  ComponentType,
  ExampleObject,
  HeaderObject,
  LinkObject,
  OpenApiComponents,
  ParameterObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  SecuritySchemeObject,
} from '../../types/openapi';
import SectionTitle from '../atoms/typography/SectionTitle';
import ExamplesDisplay from '../molecules/ExamplesDisplay'; // Use for single example too?
import RequestBodySection from '../molecules/RequestBodySection'; // Or a simpler display?
import CallbackDisplay from '../molecules/callback/CallbackDisplay';
import HeaderItem from '../molecules/header/HeaderItem';
import LinkItem from '../molecules/link/LinkItem';
import ParameterItem from '../molecules/parameter/ParameterItem';
import ResponseItem from '../molecules/response/ResponseItem';
import SchemaDisplay from '../molecules/schema/SchemaDisplay';
import SecuritySchemeDisplay from '../molecules/security/SecuritySchemeDisplay';

interface ComponentsSectionProps {
  components: OpenApiComponents;
  className?: string;
}

// Helper to get available component types and their items
const getAvailableComponents = (components: OpenApiComponents) => {
  const available: Partial<Record<ComponentType, string[]>> = {};
  for (const key in components) {
    const componentType = key as ComponentType;
    const items = components[componentType];
    if (items && Object.keys(items).length > 0) {
      available[componentType] = Object.keys(items);
    }
  }
  return available;
};

const ComponentsSection: React.FC<ComponentsSectionProps> = ({ components, className }) => {
  const availableComponents = useMemo(() => getAvailableComponents(components), [components]);
  const availableTypes = useMemo(() => Object.keys(availableComponents) as ComponentType[], [availableComponents]);

  const [activeType, setActiveType] = useState<ComponentType | null>(availableTypes[0] || null);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  // Reset selected item when type changes
  React.useEffect(() => {
    setSelectedItemName(null);
  }, [activeType]);

  const renderSelectedItem = () => {
    if (!activeType || !selectedItemName || !components[activeType] || !components[activeType]?.[selectedItemName]) {
      return <div className="text-gray-500 italic p-4">Select an item from the list.</div>;
    }

    const item = components[activeType]?.[selectedItemName];
    if (!item) return <div className="text-red-500 p-4">Error: Selected item not found.</div>;

    switch (activeType) {
      case 'schemas':
        return <SchemaDisplay schema={item as SchemaObject | ReferenceObject} components={components} />;
      case 'responses':
        // ResponseItem expects code, provide a generic one or modify ResponseItem?
        // For now, maybe just show its content?
        // Or create a dedicated ResponseComponentDisplay
        return <ResponseItem code="Component" {...(item as ResponseObject)} components={components} />;
      case 'parameters':
        return <ParameterItem name={selectedItemName} {...(item as ParameterObject)} components={components} />;
      case 'examples':
        // ExamplesDisplay expects a record, wrap the single example
        const example = item as ExampleObject;
        return <ExamplesDisplay examples={{ [selectedItemName]: example }} components={components} />;
      case 'requestBodies':
        // RequestBodySection expects RequestBodyObject | ReferenceObject
        // It handles ref resolution internally
        return <RequestBodySection requestBody={item as RequestBodyObject | ReferenceObject} components={components} />;
      case 'headers':
        return <HeaderItem name={selectedItemName} {...(item as HeaderObject)} components={components} />;
      case 'securitySchemes':
        const scheme = resolveRef<SecuritySchemeObject>(item as SecuritySchemeObject | ReferenceObject, components, 'securitySchemes');
        if (!scheme) return <div className="text-red-500 p-4">Failed to resolve security scheme ref.</div>;
        return <SecuritySchemeDisplay name={selectedItemName} scheme={scheme} />;
      case 'links':
        return <LinkItem name={selectedItemName} {...(item as LinkObject)} />; // Assumes LinkItem takes resolved props
      case 'callbacks':
        return <CallbackDisplay name={selectedItemName} callback={item as CallbackObject | ReferenceObject} components={components} />;
      default:
        return <div className="text-red-500 p-4">Error: Unknown component type '{activeType}'.</div>;
    }
  };

  if (availableTypes.length === 0) {
    return null; // Don't render section if no components are defined
  }

  return (
    <div className={`py-8 ${className}`}>
      <SectionTitle title="Components" className="text-2xl mb-6" />
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Navigation Pane */}
        <div className="md:w-1/4 flex-shrink-0 mb-6 md:mb-0">
          {/* Tabs for Component Types */}
          <div className="mb-4 border-b">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              {availableTypes.map(type => (
                <li key={type} className="mr-2">
                  <button
                    onClick={() => setActiveType(type)}
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

          {/* List of Items for Active Type */}
          {activeType && availableComponents[activeType] && (
            <ul className="space-y-1 text-sm">
              {availableComponents[activeType]?.map(itemName => (
                <li key={itemName}>
                  <button
                    onClick={() => setSelectedItemName(itemName)}
                    className={`w-full text-left px-3 py-1.5 rounded hover:bg-gray-100 ${selectedItemName === itemName ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                  >
                    {itemName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail Pane */}
        <div className="flex-grow md:w-3/4 border rounded p-4 bg-white min-h-[200px]">
          {renderSelectedItem()}
        </div>
      </div>
    </div>
  );
};

export default ComponentsSection;
