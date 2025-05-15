
import {
  ComponentsObject,
  HeaderObject,
  ReferenceObject,
} from '@/types/openapi'; // Adjust path
import React from 'react';
import { resolveRef } from '../utils/resolveRef'; // Import generic resolver
import HeaderItem from './HeaderItem'; // New path relative to HeadersSection

interface HeadersSectionProps {
  headers: Record<string, HeaderObject | ReferenceObject>;
  components?: ComponentsObject;
}

const HeadersSection: React.FC<HeadersSectionProps> = ({ headers, components }) => {
  const headerEntries = Object.entries(headers);

  if (headerEntries.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 dark:text-gray-200">
      {/* <SectionTitle title="Headers" /> */}
      <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Headers</h4>
      <div className="space-y-3">
        {headerEntries.map(([name, headerOrRef]) => {
          // Resolve header ref
          const header = resolveRef<HeaderObject>(headerOrRef, components, 'headers');

          if (!header) {
            const refString = (headerOrRef && typeof headerOrRef === 'object' && '$ref' in headerOrRef)
              ? (headerOrRef as ReferenceObject).$ref
              : '[unknown reference]';
            console.warn(`[HeadersSection] Failed to resolve header ref: ${refString} for key ${name}`);
            // Optionally render an error state for this header
            return (
              <div key={name} className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded">
                Failed to resolve header: {name} ({refString})
              </div>
            );
          }

          return (
            <HeaderItem
              key={name}
              name={name}
              description={header.description}
              required={header.required}
              deprecated={header.deprecated}
              schema={header.schema}
              style={header.style}
              explode={header.explode}
              examples={header.examples}
              components={components}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeadersSection;
