import React from 'react';
import ObjectProperties from './ObjectProperties';

interface ArrayItemsProps {
  items: { type: string; description?: string }[];
}

const ArrayItems: React.FC<ArrayItemsProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Array Items</h3>
      <ObjectProperties
        properties={items.map((item, index) => ({
          name: `Item ${index + 1}`,
          type: item.type,
          description: item.description,
        }))}
      />
    </div>
  );
};

export default ArrayItems;
