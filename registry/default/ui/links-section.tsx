"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/default/lib/i18n";
import type { OpenAPIV3 } from 'openapi-types';

import { resolveRef } from "@/registry/default/lib/utils/resolve-ref";
import { LinkItem } from "@/registry/default/ui/link-item";
import React from "react";

interface LinksSectionProps {
  links: Record<string, OpenAPIV3.LinkObject | OpenAPIV3.ReferenceObject>;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const LinksSection = React.forwardRef<HTMLDivElement, LinksSectionProps>(
  ({ links, components, className }, ref) => {
    const { t } = useI18n();

    if (!links) {
      return null;
    }

    const linkEntries = Object.entries(links);

    if (linkEntries.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("mb-4", className)}>
        <h4 className="text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
          {t('Links')}
        </h4>
        <div className="space-y-3">
          {linkEntries.map(([name, linkOrRef]) => {
            // Resolve link ref
            const link = resolveRef<OpenAPIV3.LinkObject>(linkOrRef, components, "links");

            if (!link) {
              const refString =
                linkOrRef &&
                  typeof linkOrRef === "object" &&
                  "$ref" in linkOrRef
                  ? (linkOrRef as OpenAPIV3.ReferenceObject).$ref
                  : t("[unknown reference]");
              console.warn(
                `[LinksSection] Failed to resolve link ref: ${refString} for key ${name}`,
              );
              // Optionally render an error state for this link
              return (
                <div
                  key={name}
                  className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed rounded"
                >
                  {t('Failed to resolve link:') + ' ' + name} ({refString})
                </div>
              );
            }

            return <LinkItem key={name} name={name} {...link} />;
          })}
        </div>
      </div>
    );
  },
);

LinksSection.displayName = "LinksSection";

export { LinksSection };
