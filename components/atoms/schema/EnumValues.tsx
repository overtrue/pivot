import React, { useState } from 'react';
import ExpandCollapse from '../../interactive/ExpandCollapse';

interface EnumValuesProps {
  values: any[];
  className?: string;
}

const EnumValues: React.FC<EnumValuesProps> = ({ values, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={className}>
      <ExpandCollapse
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        label="Enum Values"
      />

      {isExpanded && (
        <div className="mt-2 pl-4 border-l-2 border-gray-200">
          {values.map((value, index) => (
            <div key={index} className="font-mono text-sm py-1">
              {JSON.stringify(value)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnumValues;
