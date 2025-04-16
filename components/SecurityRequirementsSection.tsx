import React from 'react';
import SectionTitle from './atoms/SectionTitle';
import SecurityRequirementItem from './SecurityRequirementItem';
// Assuming SecurityRequirementObject is defined in shared types
// Typically: { [name: string]: string[]; }[]
import { SecurityRequirementObject } from '@/types/openapi';

// 主组件
interface SecurityRequirementsSectionProps {
  security?: SecurityRequirementObject[];
  className?: string;
}

const SecurityRequirementsSection: React.FC<SecurityRequirementsSectionProps> = ({ security, className }) => {
  if (!security || security.length === 0) {
    // Or display "None"?
    return null;
  }

  return (
    <div className={className || ''}>
      <SectionTitle title="Security Requirements" />
      <div className="space-y-2 mt-3">
        {security.map((requirement, index) => (
          <SecurityRequirementItem key={index} requirement={requirement} />
        ))}
        {security.length > 1 && (
          <p className="text-xs text-gray-500 mt-2 italic">
            注意：多个安全要求项表示可选择其中之一（OR 逻辑）。每个安全要求项内的多个方案表示需要全部满足（AND 逻辑）。
          </p>
        )}
      </div>
    </div>
  );
};

export default SecurityRequirementsSection;
