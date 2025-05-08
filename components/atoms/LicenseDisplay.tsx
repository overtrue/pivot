
import { LicenseObject } from '@/types/openapi'; // Adjust path
import React from 'react';

interface LicenseDisplayProps {
  license: LicenseObject;
  className?: string;
}

const LicenseDisplay: React.FC<LicenseDisplayProps> = ({ license, className }) => {
  return (
    <div className={`text-sm ${className}`}>
      <div className="font-semibold">{license.name}</div>
      {license.identifier && <div className="text-xs text-gray-600">Identifier: {license.identifier}</div>}
      {license.url && (
        <div>
          <a href={license.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{license.url}</a>
        </div>
      )}
    </div>
  );
};

export default LicenseDisplay;
