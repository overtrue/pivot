"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import React from "react";
import { SectionTitle } from "@/registry/pivot/section-title";
import {
  SecurityRequirementItem,
  type SecurityRequirementObject,
} from "@/registry/pivot/security-requirement-item";

interface SecurityRequirementsSectionProps {
  security?: SecurityRequirementObject[];
  className?: string;
}

const SecurityRequirementsSection = React.forwardRef<
  HTMLDivElement,
  SecurityRequirementsSectionProps
>(({ security, className }, ref) => {
  const { t } = useI18n();

  if (!security || security.length === 0) {
    // Or display "None"?
    return null;
  }

  return (
    <div ref={ref} className={cn(className)}>
      <SectionTitle title={t('Security Requirements')} className="dark:text-white" />
      <div className="space-y-2 mt-3">
        {security.map((requirement, index) => (
          <SecurityRequirementItem key={index} requirement={requirement} />
        ))}
        {security.length > 1 && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 italic">
            {t('Note: Multiple security requirements represent OR logic. Multiple schemes within a requirement represent AND logic.')}
          </p>
        )}
      </div>
    </div>
  );
});

SecurityRequirementsSection.displayName = "SecurityRequirementsSection";

export { SecurityRequirementsSection };
