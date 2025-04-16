'use client';

import {
  OpenApiComponents // Needed for resolving scheme refs?
  ,





  ReferenceObject,
  SecurityRequirementObject,
  SecuritySchemeObject
} from '@/types/openapi';
import React from 'react';
import { resolveRef } from '../utils/resolveRef'; // If schemes can be refs
import SectionTitle from './atoms/SectionTitle';
import SecuritySchemeDisplay from './SecuritySchemeDisplay';

interface SecuritySectionProps {
  security?: SecurityRequirementObject[];
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  components?: OpenApiComponents; // Pass down if resolving refs
  className?: string;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  security,
  securitySchemes,
  components,
  className,
}) => {
  const hasGlobalRequirements = security && security.length > 0;
  const hasSchemes = securitySchemes && Object.keys(securitySchemes).length > 0;

  if (!hasGlobalRequirements && !hasSchemes) {
    return null;
  }

  // Helper to render a single requirement (which might be an AND of ORs)
  const renderRequirement = (req: SecurityRequirementObject, index: number) => {
    const schemes = Object.entries(req);
    if (schemes.length === 0) return null;

    return (
      <div key={index} className="border rounded p-2 text-sm bg-gray-50">
        {schemes.map(([schemeName, scopes], idx) => (
          <div key={schemeName} className={`flex items-center gap-2 ${idx > 0 ? 'mt-1' : ''}`}>
            <span className="font-mono font-semibold">{schemeName}</span>
            {scopes.length > 0 && (
              <span className="text-xs text-gray-600">Scopes: {scopes.join(', ')}</span>
            )}
            {scopes.length === 0 && (
              <span className="text-xs text-gray-500 italic">(No specific scopes required)</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`py-6 ${className}`}>
      <SectionTitle title="Security" className="text-2xl mb-4" />

      {/* Global Security Requirements */}
      {hasGlobalRequirements && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Global Requirements</h3>
          <p className="text-sm text-gray-600 mb-3">
            API calls must satisfy ONE of the following security requirement sets:
          </p>
          <div className="space-y-2">
            {security?.map(renderRequirement)}
          </div>
        </div>
      )}

      {/* Security Schemes Definitions */}
      {hasSchemes && (
        <div className={hasGlobalRequirements ? 'mt-8' : ''}>
          <h3 className="text-lg font-semibold mb-3">Security Schemes</h3>
          <div className="space-y-4">
            {Object.entries(securitySchemes || {}).map(([name, schemeOrRef]) => {
              // Resolve refs if security schemes can be defined with $ref
              const scheme = resolveRef<SecuritySchemeObject>(schemeOrRef, components, 'securitySchemes');
              if (!scheme) {
                const refString = (schemeOrRef && typeof schemeOrRef === 'object' && '$ref' in schemeOrRef)
                  ? (schemeOrRef as ReferenceObject).$ref
                  : '[unknown reference]';
                return <div key={name} className="text-xs text-red-500">Failed to resolve scheme: {refString}</div>;
              }
              return (
                <SecuritySchemeDisplay key={name} name={name} scheme={scheme} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;
