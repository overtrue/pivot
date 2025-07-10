import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";

import { resolveRef } from "@/registry/default/lib/resolve-ref";
import { CallbackDisplay } from "@/registry/default/ui/callback-display";
import { ExamplesDisplay } from "@/registry/default/ui/examples-display";
import { HeaderItem } from "@/registry/default/ui/header-item";
import { LinkItem } from "@/registry/default/ui/link-item";
import { ParameterItem } from "@/registry/default/ui/parameter-item";
import { RequestBodySection } from "@/registry/default/ui/request-body-section";
import { ResponseItem } from "@/registry/default/ui/response-item";
import { SchemaDisplay } from "@/registry/default/ui/schema-display";
import { SecuritySchemeDisplay } from "@/registry/default/ui/security-scheme-display";
import { WebhookDisplay } from "@/registry/default/ui/webhook-display";
import React from "react";

interface ComponentDetailProps {
  activeType: keyof OpenAPIV3.ComponentsObject | "webhooks" | null;
  selectedItemName: string | null;
  components: OpenAPIV3.ComponentsObject;
  className?: string;
}

const ComponentDetail = React.forwardRef<HTMLDivElement, ComponentDetailProps>(
  ({ activeType, selectedItemName, components, className }, ref) => {
    if (
      !activeType ||
      !selectedItemName ||
      !(components as any)[activeType] ||
      !(components as any)[activeType]?.[selectedItemName]
    ) {
      return (
        <div ref={ref} className={cn("text-neutral-500 italic p-4", className)}>
          Please select an item from the list.
        </div>
      );
    }

    const item = (components as any)[activeType]?.[selectedItemName];
    if (!item)
      return (
        <div ref={ref} className={cn("text-red-500 p-4", className)}>
          Error: Selected item not found.
        </div>
      );

    const content = (() => {
      switch (activeType) {
        case "schemas":
          return <SchemaDisplay schema={item} components={components} />;

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

export { ComponentDetail, type ComponentDetailProps };
