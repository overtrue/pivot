import { SecurityRequirementObject } from '@/types/openapi';
import React from 'react';

// 处理单个安全要求项
interface SecurityRequirementItemProps {
  requirement: SecurityRequirementObject;
}

const SecurityRequirementItem: React.FC<SecurityRequirementItemProps> = ({ requirement }) => {
  return (
    <div className="bg-gray-50 rounded p-2 text-xs">
      {/* A single requirement object can list multiple schemes required together (AND) */}
      {Object.entries(requirement).map(([schemeName, scopes]) => (
        <div key={schemeName} className="flex items-center space-x-1">
          <span className="font-semibold text-gray-700">{schemeName}:</span>
          {scopes.length > 0 ? (
            <span className="text-gray-600">[{scopes.join(', ')}]</span>
          ) : (
            <span className="text-gray-500 italic">(no specific scopes required)</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SecurityRequirementItem;
