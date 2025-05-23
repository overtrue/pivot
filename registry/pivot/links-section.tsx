import { cn } from "@/lib/utils";
import React from "react";
import { LinkItem, type LinkObject } from "./link-item";

interface ReferenceObject {
  $ref: string;
}

interface ComponentsObject {
  links?: Record<string, LinkObject | ReferenceObject>;
}

interface LinksSectionProps {
  links: Record<string, LinkObject | ReferenceObject>;
  components?: ComponentsObject;
  className?: string;
}

// Simple ref resolver for links
const resolveRef = <T,>(
  obj: T | ReferenceObject,
  components?: ComponentsObject,
  type?: string,
): T | null => {
  if (obj && typeof obj === "object" && "$ref" in obj) {
    // Simple ref resolution - in a real implementation this would be more sophisticated
    const refPath = obj.$ref.split("/").pop();
    if (refPath && components?.links?.[refPath]) {
      return components.links[refPath] as T;
    }
    return null;
  }
  return obj as T;
};

const LinksSection = React.forwardRef<HTMLDivElement, LinksSectionProps>(
  ({ links, components, className }, ref) => {
    const linkEntries = Object.entries(links);

    if (linkEntries.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("mb-4", className)}>
        <h4 className="text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400 mb-2">
          Links
        </h4>
        <div className="space-y-3">
          {linkEntries.map(([name, linkOrRef]) => {
            // Resolve link ref
            const link = resolveRef<LinkObject>(linkOrRef, components, "links");

            if (!link) {
              const refString =
                linkOrRef &&
                typeof linkOrRef === "object" &&
                "$ref" in linkOrRef
                  ? (linkOrRef as ReferenceObject).$ref
                  : "[unknown reference]";
              console.warn(
                `[LinksSection] Failed to resolve link ref: ${refString} for key ${name}`,
              );
              // Optionally render an error state for this link
              return (
                <div
                  key={name}
                  className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed rounded"
                >
                  Failed to resolve link: {name} ({refString})
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
