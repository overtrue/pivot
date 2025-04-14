'use client';

import ExpandCollapse from '@/components/interactive/ExpandCollapse';
import React, { useState } from 'react';
import ObjectProperties from './ObjectProperties';

interface AllOfContainerProps {
  schemas: { name: string; properties: { name: string; type: string; description?: string }[] }[];
}

const AllOfContainer: React.FC<AllOfContainerProps> = ({ schemas }) => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {schemas.map((schema, index) => (
        <div key={index} className="border rounded p-4">
          <ExpandCollapse
            isExpanded={expandedIndexes.includes(index)}
            onToggle={() => toggleExpand(index)}
            label={schema.name}
          />
          {expandedIndexes.includes(index) && (
            <div className="mt-4">
              <ObjectProperties properties={schema.properties} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllOfContainer;
