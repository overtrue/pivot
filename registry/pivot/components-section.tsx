"use client";

import { cn } from "@/lib/utils";
import type { ComponentsObject } from "@/types/openapi";
import React, { useMemo, useState } from "react";
import { SectionTitle } from "../pivot/section-title";
import { ComponentItemsList } from "./component-items-list";
import { ComponentTabs } from "./component-tabs";

interface ComponentsSectionProps {
  components: ComponentsObject;
  className?: string;
}

type ComponentType =
  | "schemas"
  | "responses"
  | "parameters"
  | "examples"
  | "requestBodies"
  | "headers"
  | "securitySchemes"
  | "links"
  | "callbacks";

// Helper function to get available components
const getAvailableComponents = (
  components: ComponentsObject,
): Record<ComponentType, string[]> => {
  const availableComponents: Record<ComponentType, string[]> = {
    schemas: [],
    responses: [],
    parameters: [],
    examples: [],
    requestBodies: [],
    headers: [],
    securitySchemes: [],
    links: [],
    callbacks: [],
  };

  if (components) {
    Object.keys(components).forEach((componentType) => {
      if (componentType in availableComponents) {
        const typedKey = componentType as ComponentType;
        availableComponents[typedKey] = Object.keys(
          components[componentType] || {},
        );
      }
    });
  }

  return availableComponents;
};

const ComponentsSection = React.forwardRef<
  HTMLDivElement,
  ComponentsSectionProps
>(({ components, className }, ref) => {
  const availableComponents = useMemo(
    () => getAvailableComponents(components),
    [components],
  );
  const availableTypes = useMemo(
    () =>
      Object.keys(availableComponents).filter(
        (type) => availableComponents[type as ComponentType].length > 0,
      ) as ComponentType[],
    [availableComponents],
  );

  const [activeType, setActiveType] = useState<ComponentType | null>(
    availableTypes[0] || null,
  );
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  // Reset selected item when type changes
  React.useEffect(() => {
    setSelectedItemName(null);
  }, [activeType]);

  if (availableTypes.length === 0) {
    return null; // If no components are defined, don't render this section
  }

  // Simple component detail display
  const ComponentDetail = ({
    activeType,
    selectedItemName,
    components,
  }: {
    activeType: ComponentType | null;
    selectedItemName: string | null;
    components: ComponentsObject;
  }) => {
    if (!activeType || !selectedItemName) {
      return (
        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
          Select a component from the list to view details
        </div>
      );
    }

    const componentData = components[activeType]?.[selectedItemName];
    if (!componentData) {
      return (
        <div className="text-red-500 dark:text-red-400 text-sm">
          Component not found: {activeType}/{selectedItemName}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {selectedItemName}
        </h3>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          Type: {activeType}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-300 p-3 bg-neutral-50 dark:bg-neutral-700 rounded">
          Component definition would be displayed here
          {/* Note: In real implementation, this would use SchemaDisplay or other specific component displays */}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className={cn("py-8", className)}>
      <SectionTitle title="Components" className="text-2xl mb-6" />
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
});

ComponentsSection.displayName = "ComponentsSection";

export {
  ComponentsSection,
  type ComponentsSectionProps,
  type ComponentType
};

