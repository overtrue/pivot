import { cn } from "@/lib/utils";
import type { ComponentType } from "@/types/project";
import type { OpenAPIV3 } from 'openapi-types';

import React from "react";
import { resolveRef } from "@/registry/lib/utils/resolve-ref";
import { CallbackDisplay } from "@/registry/pivot/callback-display";
import { ExamplesDisplay } from "@/registry/pivot/examples-display";
import { HeaderItem } from "@/registry/pivot/header-item";
import { LinkItem } from "@/registry/pivot/link-item";
import { ParameterItem } from "@/registry/pivot/parameter-item";
import { RequestBodySection } from "@/registry/pivot/request-body-section";
import { ResponseItem } from "@/registry/pivot/response-item";
import { SchemaDisplay } from "@/registry/pivot/schema-display";
import { SecuritySchemeDisplay } from "@/registry/pivot/security-scheme-display";
import { WebhookDisplay } from "@/registry/pivot/webhook-display";

interface ComponentDetailProps {
  activeType: ComponentType | null;
  selectedItemName: string | null;
  components: OpenAPIV3.ComponentsObject;
  className?: string;
}

const ComponentDetail = React.forwardRef<HTMLDivElement, ComponentDetailProps>(
  ({ activeType, selectedItemName, components, className }, ref) => {
    if (
      !activeType ||
      !selectedItemName ||
      !components[activeType] ||
      !components[activeType]?.[selectedItemName]
    ) {
      return (
        <div
          ref={ref}
          className={cn("text-neutral-500 italic p-4", className)}
        >
          Please select an item from the list.
        </div>
      );
    }

    const item = components[activeType]?.[selectedItemName];
    if (!item)
      return (
        <div ref={ref} className={cn("text-red-500 p-4", className)}>
          Error: Selected item not found.
        </div>
      );

    const content = (() => {
      switch (activeType) {
        case "schemas":
          return (
            <SchemaDisplay schema={item} components={components} />
          );

        case "responses":
          return (
            <ResponseItem
              code="Component"
              response={item}
              components={components}
            />
          );

        case "parameters": {
          const paramItem = item;
          const schema =
            paramItem.schema && !("$ref" in paramItem.schema)
              ? paramItem.schema
              : {};

          return (
            <ParameterItem
              {...paramItem}
              schema={schema}
              components={components}
            />
          );
        }

        case "examples":
          return (
            <ExamplesDisplay
              examples={{ [selectedItemName]: item }}
              components={components}
            />
          );

        case "requestBodies":
          return (
            <RequestBodySection requestBody={item} components={components} />
          );

        case "headers":
          return (
            <HeaderItem
              name={selectedItemName}
              {...item}
              components={components}
            />
          );

        case "securitySchemes":
          const scheme = resolveRef(item, components, "securitySchemes");
          if (!scheme)
            return (
              <div className="text-red-500 p-4">
                Cannot resolve security scheme reference.
              </div>
            );
          return (
            <SecuritySchemeDisplay name={selectedItemName} scheme={scheme} />
          );

        case "links":
          return <LinkItem name={selectedItemName} {...item} />;

        case "callbacks":
          return (
            <CallbackDisplay
              name={selectedItemName}
              callback={item}
              components={components}
            />
          );

        case "webhooks":
          return (
            <WebhookDisplay
              name={selectedItemName}
              pathItem={item}
              components={components}
            />
          );

        default:
          return (
            <div className="text-red-500 p-4">
              Error: Unknown component type '{activeType}'.
            </div>
          );
      }
    })();

    return (
      <div ref={ref} className={cn("p-4", className)}>
        <div className="mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {selectedItemName}
          </h3>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            Type: {activeType}
          </div>
        </div>
        {content}
      </div>
    );
  },
);

ComponentDetail.displayName = "ComponentDetail";

export {
  ComponentDetail,
  type ComponentDetailProps
};

