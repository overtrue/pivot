import React from 'react';

// Assuming SecurityRequirementObject is defined in shared types
// Typically: { [name: string]: string[]; }[]
import { SecurityRequirementObject } from '../../types/openapi';

interface SecurityRequirementsSectionProps {
  security?: SecurityRequirementObject[];
}

const SecurityRequirementsSection: React.FC<SecurityRequirementsSectionProps> = ({ security }) => {
  if (!security || security.length === 0) {
    // Or display "None"?
    return null;
  }

  return (
    <div className="border-t pt-4 p-3">
      <h4 className="font-semibold text-sm mb-2">安全要求</h4>
      <div className="space-y-2">
        {security.map((requirement, index) => (
          <div key={index} className="bg-gray-50 rounded p-2 text-xs">
            {/* A single requirement object can list multiple schemes required together (AND) */}
            {/* But often, it lists alternatives (OR), represented by multiple objects in the array */}
            {/* Here we just display the content of one requirement object */}
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
            {/* Add visual separator or logic if multiple schemes in one requirement object need specific handling */}
          </div>
        ))}
        {/* TODO: Add explanation on how multiple requirement objects (OR logic) work if needed */}
      </div>
    </div>
  );
};

export default SecurityRequirementsSection;
