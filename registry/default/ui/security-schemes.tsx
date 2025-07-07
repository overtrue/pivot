import type { OpenAPIV3 } from "openapi-types";
import { cn } from "@/lib/utils";

import React from "react";
import { SectionTitle } from "@/registry/default/ui/section-title";
import { SecurityScheme } from "@/registry/default/ui/security-scheme";

interface SecuritySchemesProps {
  schemes: Record<string, OpenAPIV3.SecuritySchemeObject>;
  className?: string;
}

const SecuritySchemes = React.forwardRef<HTMLDivElement, SecuritySchemesProps>(
  ({ schemes, className }, ref) => {
    if (!schemes || Object.keys(schemes).length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("dark:text-neutral-200", className)}>
        <SectionTitle title="Security Schemes" />
        <div className="space-y-6 mt-3">
          {Object.entries(schemes).map(([name, scheme]) => (
            <SecurityScheme key={name} name={name} scheme={scheme} />
          ))}
        </div>
      </div>
    );
  },
);

SecuritySchemes.displayName = "SecuritySchemes";

export { SecuritySchemes };
