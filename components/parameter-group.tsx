import ExpandCollapse from '@/components/interactive/openapi';
import React from 'react';
import RequiredMarker from './atoms/section-title';
import TypeIndicator from './atoms/section-title';

interface ParameterGroupProps {
  inType: 'query' | 'path' | 'header' | 'cookie';
  parameters: { name: string; required: boolean; type: string }[];
}

const ParameterGroup: React.FC<ParameterGroupProps> = ({ inType, parameters }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold capitalize">{inType} Parameters</h3>
      <ExpandCollapse
        isExpanded={true}
        onToggle={() => { }}
        label="Toggle Parameters"
      />
      <div className="space-y-2">
        {parameters.map((param) => (
          <div key={param.name} className="flex items-center space-x-2">
            <span className="font-mono text-sm">{param.name}</span>
            {param.required && <RequiredMarker />}
            <TypeIndicator type={param.type as any} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParameterGroup;
