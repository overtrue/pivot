import { useI18n } from "@/lib/i18n/I18nProvider";
import { LinkObject } from "@/types/openapi";
import React, { useState } from "react";
import DescriptionDisplay from "./atoms/DescriptionDisplay";
import ServerDisplay from "./atoms/ServerDisplay";
import ExpandCollapse from "./interactive/ExpandCollapse";

interface LinkItemProps extends LinkObject {
  name: string;
  className?: string;
}

const LinkItem: React.FC<LinkItemProps> = ({
  name,
  operationId,
  operationRef,
  parameters,
  requestBody,
  description,
  server,
  className,
}) => {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetails = description || parameters || requestBody || server;

  const primaryIdentifier = operationId
    ? { type: "operationId", value: operationId }
    : operationRef
      ? { type: "operationRef", value: operationRef }
      : null;

  return (
    <div className={`mb-2 p-3 rounded ${className || ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-mono font-medium">{name}</span>
          {primaryIdentifier && (
            <span
              className={`px-2 py-1 text-xs rounded ${
                primaryIdentifier.type === "operationId"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {t(primaryIdentifier.type)}: {primaryIdentifier.value}
            </span>
          )}
        </div>

        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? t("Hide Details") : t("Show Details")}
          />
        )}
      </div>

      {description && !isExpanded && (
        <div className="text-sm text-neutral-600 mt-1 truncate">
          <DescriptionDisplay description={description} />
        </div>
      )}

      {isExpanded && hasDetails && (
        <div className="mt-3 pl-2 border-l-2 border-neutral-200 space-y-4">
          {description && (
            <div>
              <h4 className="text-xs font-semibold mb-1">{t("Description")}</h4>
              <DescriptionDisplay
                description={description}
                className="text-sm"
              />
            </div>
          )}

          {parameters && Object.keys(parameters).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold mb-1">{t("Parameters")}</h4>
              <div className="bg-neutral-50 p-2 rounded text-xs space-y-1">
                {Object.entries(parameters).map(([paramName, paramValue]) => (
                  <div
                    key={paramName}
                    className="grid grid-cols-[max-content_1fr] gap-x-2"
                  >
                    <span className="font-mono font-medium text-neutral-700">
                      {paramName}:
                    </span>
                    <pre className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded overflow-x-auto break-all">
                      <code>
                        {typeof paramValue === "string"
                          ? paramValue
                          : JSON.stringify(paramValue)}
                      </code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {requestBody && (
            <div>
              <h4 className="text-xs font-semibold mb-1">
                {t("Request Body")}
              </h4>
              <div className="bg-neutral-50 p-2 rounded text-xs">
                <pre className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded overflow-x-auto break-all">
                  <code>
                    {typeof requestBody === "string"
                      ? requestBody
                      : JSON.stringify(requestBody, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {server && (
            <div>
              <h4 className="text-xs font-semibold mb-1">{t("Server")}</h4>
              <ServerDisplay server={server} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkItem;
