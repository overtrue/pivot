import { useI18n } from '@/lib/i18n/i18n-provider';
import {
  ComponentsObject,
  LinkObject,
  ReferenceObject,
} from '@/types/openapi'; // Adjust path
import React from 'react';
import { resolveRef } from '@/utils/resolveRef'; // Import generic resolver
import LinkItem from './link-item'; // New path relative to LinksSection

interface LinksSectionProps {
  links: Record<string, LinkObject | ReferenceObject>;
  components?: ComponentsObject;
}

const LinksSection: React.FC<LinksSectionProps> = ({ links, components }) => {
  const { t } = useI18n();
  const linkEntries = Object.entries(links);

  if (linkEntries.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {/* <SectionTitle title="Links" /> */}
      <h4 className="text-sm font-semibold uppercase text-neutral-500 mb-2">{t('Links')}</h4>
      <div className="space-y-3">
        {linkEntries.map(([name, linkOrRef]) => {
          // Resolve link ref
          const link = resolveRef<LinkObject>(linkOrRef, components, 'links');

          if (!link) {
            const refString = (linkOrRef && typeof linkOrRef === 'object' && '$ref' in linkOrRef)
              ? (linkOrRef as ReferenceObject).$ref
              : '[unknown reference]';
            console.warn(`[LinksSection] Failed to resolve link ref: ${refString} for key ${name}`);
            // Optionally render an error state for this link
            return (
              <div key={name} className="text-xs text-red-500 p-1 border border-dashed rounded">
                {t('Failed to resolve link:')} {name} ({refString})
              </div>
            );
          }

          return (
            <LinkItem
              key={name}
              name={name}
              {...link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LinksSection;
