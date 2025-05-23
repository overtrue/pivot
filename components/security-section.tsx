import { useI18n } from '@/lib/i18n/i18n-provider';
import {
  ComponentsObject,
  ReferenceObject,
  SecurityRequirementObject,
  SecuritySchemeObject
} from '@/types/openapi';
import React from 'react';
import { resolveRef } from '../utils/resolveRef';
import SectionTitle from './atoms/section-title';
import SecuritySchemeDisplay from './security-scheme-display';

interface SecuritySectionProps {
  security?: SecurityRequirementObject[];
  securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
  components?: ComponentsObject; // Pass down if resolving refs
  className?: string;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  security,
  securitySchemes,
  components,
  className,
}) => {
  const { t } = useI18n();
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
      <div key={index} className="rounded p-2 text-sm bg-neutral-50 dark:bg-neutral-800/70">
        {schemes.map(([schemeName, scopes], idx) => (
          <div key={schemeName} className={`flex items-center gap-2 ${idx > 0 ? 'mt-1' : ''}`}>
            <span className="font-mono font-semibold dark:text-neutral-200">{schemeName}</span>
            {scopes.length > 0 && (
              <span className="text-xs text-neutral-600 dark:text-neutral-400">{t('Scopes:')} {scopes.join(', ')}</span>
            )}
            {scopes.length === 0 && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400 italic">{t('(No specific scopes required)')}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`py-6 ${className} dark:text-neutral-200`}>
      <SectionTitle title={t('Security')} className="text-2xl mb-4" />

      {/* Global Security Requirements */}
      {hasGlobalRequirements && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 dark:text-neutral-200">{t('Global Requirements')}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
            {t('API calls must satisfy ONE of the following security requirement sets:')}
          </p>
          <div className="space-y-2">
            {security?.map(renderRequirement)}
          </div>
        </div>
      )}

      {/* Security Schemes Definitions */}
      {hasSchemes && (
        <div className={hasGlobalRequirements ? 'mt-8' : ''}>
          <SectionTitle title={t('Security Schemes')} className='text-lg' />
          <div className="space-y-4">
            {Object.entries(securitySchemes || {}).map(([name, schemeOrRef]) => {
              // Resolve refs if security schemes can be defined with $ref
              const scheme = resolveRef<SecuritySchemeObject>(schemeOrRef, components, 'securitySchemes');
              if (!scheme) {
                const refString = (schemeOrRef && typeof schemeOrRef === 'object' && '$ref' in schemeOrRef)
                  ? (schemeOrRef as ReferenceObject).$ref
                  : '[unknown reference]';
                return <div key={name} className="text-xs text-red-500 dark:text-red-400">{t('Failed to resolve scheme:')} {refString}</div>;
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
