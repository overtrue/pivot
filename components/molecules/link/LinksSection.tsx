'use client';

import React from 'react';
import {
  LinkObject,
  OpenApiComponents,
  ReferenceObject,
} from '../../../types/openapi'; // Adjust path
// import LinkItem from '../../atoms/response/LinkItem'; // Old path
import LinkItem from './LinkItem'; // New path relative to LinksSection
// import SectionTitle from '../../atoms/typography/SectionTitle'; // Optional title
import { resolveRef } from '../../../utils/resolveRef'; // Import generic resolver

interface LinksSectionProps {
  links: Record<string, LinkObject | ReferenceObject>;
  components?: OpenApiComponents;
}

// TODO: Add ref resolver for Links if needed

const LinksSection: React.FC<LinksSectionProps> = ({ links, components }) => {
  const linkEntries = Object.entries(links);

  if (linkEntries.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {/* <SectionTitle title="Links" /> */}
      <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Links</h4>
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
                Failed to resolve link: {name} ({refString})
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
