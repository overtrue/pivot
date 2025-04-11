import ExpandCollapse from '@/components/interactive/ExpandCollapse';
import React from 'react';

const ResponseGroup: React.FC<{ responses: { code: string; description: string }[] }> = ({ responses }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Responses</h3>
      <ExpandCollapse
        isExpanded={true}
        onToggle={() => { }}
        label="Toggle Responses"
      />
      <div className="space-y-2">
        {responses.map((response) => (
          <div key={response.code} className="border p-2 rounded">
            <span className="font-mono text-sm">{response.code}</span>
            <p className="text-gray-600 text-sm">{response.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponseGroup;
