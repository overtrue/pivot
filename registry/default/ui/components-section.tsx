"use client";

import { cn } from "@/lib/utils";
import { ComponentItemsList } from "@/registry/default/ui/component-items-list";
import {
  ComponentTabs,
  type OpenApiComponentType,
} from "@/registry/default/ui/component-tabs";
import { SectionTitle } from "@/registry/default/ui/section-title";
import type { OpenAPIV3 } from "openapi-types";
import React, { useMemo, useState } from "react";

interface ComponentsSectionProps {
  components: OpenAPIV3.ComponentsObject;
  className?: string;
}

// Helper function to get available components
const getAvailableComponents = (
  components: OpenAPIV3.ComponentsObject,
): Record<keyof OpenAPIV3.ComponentsObject | "webhooks", string[]> => {
  const availableComponents: Record<keyof OpenAPIV3.ComponentsObject | "webhooks", string[]> = {
    schemas: [],
    responses: [],
    parameters: [],
    examples: [],
    requestBodies: [],
    headers: [],
    securitySchemes: [],
    links: [],
    callbacks: [],
    webhooks: [], // Note: webhooks aren't part of OpenAPI 3.0 components but included for completeness
  };

  if (components) {
    Object.keys(components).forEach((componentType) => {
      if (componentType in availableComponents) {
        const typedKey = componentType as keyof OpenAPIV3.ComponentsObject | "webhooks";
        availableComponents[typedKey] = Object.keys(
          (components as any)[componentType] || {},
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
        (type) =>
          availableComponents[type as keyof OpenAPIV3.ComponentsObject | "webhooks"].length > 0 &&
          type !== "webhooks", // Filter out webhooks as it's not part of standard OpenAPI 3.0 components
      ) as OpenApiComponentType[],
    [availableComponents],
  );

  const [activeType, setActiveType] = useState<OpenApiComponentType | null>(
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
    activeType: OpenApiComponentType | null;
    selectedItemName: string | null;
    components: OpenAPIV3.ComponentsObject;
  }) => {
    if (!activeType || !selectedItemName) {
      return (
        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
          Select a component from the list to view details
        </div>
      );
    }

    const componentData = (components as any)[activeType]?.[selectedItemName];
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
            items={
              activeType
                ? availableComponents[activeType as keyof OpenAPIV3.ComponentsObject | "webhooks"]
                : undefined
            }
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

export { ComponentsSection, type ComponentsSectionProps };
