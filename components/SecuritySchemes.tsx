import React from 'react';
import { SecuritySchemeObject } from '../types/openapi';
import SectionTitle from './atoms/SectionTitle';
import SecurityScheme from './SecurityScheme';

interface SecuritySchemesProps {
  schemes: Record<string, SecuritySchemeObject>;
  className?: string;
}

const SecuritySchemes: React.FC<SecuritySchemesProps> = ({ schemes, className }) => {
  if (!schemes || Object.keys(schemes).length === 0) {
    return null;
  }

  return (
    <div className={className || ''}>
      <SectionTitle title="安全方案" />
      <div className="space-y-6 mt-3">
        {Object.entries(schemes).map(([name, scheme]) => (
          <SecurityScheme key={name} name={name} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default SecuritySchemes;
