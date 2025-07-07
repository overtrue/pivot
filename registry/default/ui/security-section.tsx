import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";
import { resolveRef } from "@/registry/default/lib/utils/resolve-ref";
import { SectionTitle } from "@/registry/default/ui/section-title";
import { SecuritySchemeDisplay } from "@/registry/default/ui/security-scheme-display";

// Import types from the centralized types file

interface SecuritySectionProps {
  security?: OpenAPIV3.SecurityRequirementObject[];
  securitySchemes?: Record<
    string,
    OpenAPIV3.SecuritySchemeObject | OpenAPIV3.ReferenceObject
  >;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}

const SecuritySection = React.forwardRef<HTMLDivElement, SecuritySectionProps>(
  ({ security, securitySchemes, components, className }, ref) => {
    const hasGlobalRequirements = security && security.length > 0;
    const hasSchemes =
      securitySchemes && Object.keys(securitySchemes).length > 0;

    if (!hasGlobalRequirements && !hasSchemes) {
      return null;
    }

    // Helper to render a single requirement (which might be an AND of ORs)
    const renderRequirement = (
      req: OpenAPIV3.SecurityRequirementObject,
      index: number,
    ) => {
      const schemes = Object.entries(req);
      if (schemes.length === 0) return null;

      return (
        <div
          key={index}
          className="rounded p-2 text-sm bg-neutral-50 dark:bg-neutral-800/70 border dark:border-neutral-700"
        >
          {schemes.map(([schemeName, scopes], idx) => (
            <div
              key={schemeName}
              className={cn("flex items-center gap-2", idx > 0 && "mt-1")}
            >
              <span className="font-mono font-semibold dark:text-neutral-200">
                {schemeName}
              </span>
              {scopes.length > 0 && (
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  Scopes: {scopes.join(", ")}
                </span>
              )}
              {scopes.length === 0 && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400 italic">
                  (No specific scopes required)
                </span>
              )}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div ref={ref} className={cn("py-6", className, "dark:text-neutral-200")}>
        <SectionTitle title="Security" className="text-2xl mb-4" />

        {/* Global Security Requirements */}
        {hasGlobalRequirements && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 dark:text-neutral-200">
              Global Requirements
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              API calls must satisfy ONE of the following security requirement
              sets:
            </p>
            <div className="space-y-2">{security.map(renderRequirement)}</div>
          </div>
        )}

        {/* Security Schemes Definitions */}
        {hasSchemes && (
          <div className={hasGlobalRequirements ? "mt-8" : ""}>
            <SectionTitle title="Security Schemes" className="text-lg mb-4" />
            <div className="space-y-4">
              {Object.entries(securitySchemes).map(([name, schemeOrRef]) => {
                // Resolve refs if security schemes can be defined with $ref
                const scheme = resolveRef<OpenAPIV3.SecuritySchemeObject>(
                  schemeOrRef,
                  components,
                  "securitySchemes",
                );
                if (!scheme) {
                  const refString =
                    schemeOrRef &&
                    typeof schemeOrRef === "object" &&
                    "$ref" in schemeOrRef
                      ? (schemeOrRef as OpenAPIV3.ReferenceObject).$ref
                      : "[unknown reference]";
                  return (
                    <div
                      key={name}
                      className="text-xs text-red-500 dark:text-red-400"
                    >
                      Failed to resolve scheme: {refString}
                    </div>
                  );
                }
                return (
                  <SecuritySchemeDisplay
                    key={name}
                    name={name}
                    scheme={scheme}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);

SecuritySection.displayName = "SecuritySection";

export { SecuritySection, type SecuritySectionProps };
