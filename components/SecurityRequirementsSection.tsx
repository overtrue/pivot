import { useI18n } from "@/lib/i18n/I18nProvider";
import React from "react";
import SectionTitle from "./atoms/SectionTitle";
import SecurityRequirementItem from "./SecurityRequirementItem";
// Assuming SecurityRequirementObject is defined in shared types
// Typically: { [name: string]: string[]; }[]
import { SecurityRequirementObject } from "@/types/openapi";

// Main component
interface SecurityRequirementsSectionProps {
  security?: SecurityRequirementObject[];
  className?: string;
}

const SecurityRequirementsSection: React.FC<
  SecurityRequirementsSectionProps
> = ({ security, className }) => {
  const { t } = useI18n();

  if (!security || security.length === 0) {
    // Or display "None"?
    return null;
  }

  return (
    <div className={className || ""}>
      <SectionTitle
        title={t("Security Requirements")}
        className="dark:text-white"
      />
      <div className="space-y-2 mt-3">
        {security.map((requirement, index) => (
          <SecurityRequirementItem key={index} requirement={requirement} />
        ))}
        {security.length > 1 && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 italic">
            {t(
              "Note: Multiple security requirements represent OR logic. Multiple schemes within a requirement represent AND logic.",
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default SecurityRequirementsSection;
