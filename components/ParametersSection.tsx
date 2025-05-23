import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  ComponentsObject,
  ParameterObject,
  ReferenceObject,
} from "@/types/openapi"; // Adjust path
import { cn } from "@/utils/cn";
import React from "react";
import { resolveRef } from "../utils/resolveRef";
import ParameterItem from "./ParameterItem"; // Import ParameterItem and StyleType
import SectionTitle from "./atoms/SectionTitle";

interface ParametersSectionProps {
  parameters: (ParameterObject | ReferenceObject)[];
  components?: ComponentsObject;
  className?: string;
  expanded?: boolean; // 添加这个属性用于控制所有参数是否默认展开
}

const ParametersSection: React.FC<ParametersSectionProps> = ({
  parameters,
  components,
  className,
  expanded,
}) => {
  const { t } = useI18n();

  if (!parameters || parameters.length === 0) {
    return null;
  }

  return (
    <div className={cn(className, "dark:text-neutral-200")}>
      {/* Optionally add a title, or assume OperationBox provides context */}
      <SectionTitle
        title={t("Parameters")}
        className="text-lg font-medium mb-3"
      />
      <div className="space-y-3">
        {parameters.map((paramOrRef, index) => {
          // Resolve parameter ref
          const parameter = resolveRef<ParameterObject>(
            paramOrRef,
            components,
            "parameters",
          );

          if (!parameter) {
            const refString =
              paramOrRef &&
              typeof paramOrRef === "object" &&
              "$ref" in paramOrRef
                ? (paramOrRef as ReferenceObject).$ref
                : `[invalid parameter at index ${index}]`;
            return (
              <div
                key={index}
                className="text-xs text-red-500 dark:text-red-400 p-1 border border-dashed dark:border-red-700 rounded"
              >
                {t("Failed to resolve parameter:")} {refString}
              </div>
            );
          }

          return (
            <ParameterItem
              // Use unique key combining name and location or index
              key={`${parameter.name} -${parameter.in} -${index} `}
              {...parameter} // Spread resolved properties, but override required and schema below
              name={parameter.name}
              required={parameter.required ?? false} // Provide default value for required
              // Ensure schema is SchemaObject type and provide a default empty object
              schema={
                parameter.schema && "type" in parameter.schema
                  ? parameter.schema
                  : {}
              }
              // Handle style type issues
              style={parameter.style}
              expanded={expanded}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ParametersSection;
