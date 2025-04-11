import ExpandCollapse from '@/components/interactive/ExpandCollapse';
import React from 'react';

const SchemaViewer: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <h1>Schema Viewer</h1>
      <ExpandCollapse
        isExpanded={true}
        onToggle={() => { }}
        label="Expand Schema Details"
      />
      {/* ...existing code for schema rendering... */}
    </div>
  );
};

export default SchemaViewer;
