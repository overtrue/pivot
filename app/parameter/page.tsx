import ParameterGroup from '@/components/molecules/ParameterGroup';
import React from 'react';

const ParameterPage: React.FC = () => {
  const parameters = [
    { name: 'id', required: true, type: 'integer' },
    { name: 'name', required: false, type: 'string' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Parameter Viewer</h1>
      <ParameterGroup inType="query" parameters={parameters} />
    </div>
  );
};

export default ParameterPage;
