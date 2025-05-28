import { cn } from "@/lib/utils";
import React from "react";
import { DescriptionDisplay } from "../pivot/description-display";

interface SecuritySchemeObject {
  type: "apiKey" | "http" | "oauth2" | "openIdConnect" | "mutualTLS";
  description?: string;
  name?: string;
  in?: "query" | "header" | "cookie";
  scheme?: string;
  bearerFormat?: string;
  flows?: {
    [flowType: string]: {
      authorizationUrl?: string;
      tokenUrl?: string;
      refreshUrl?: string;
      scopes?: { [scope: string]: string };
    };
  };
  openIdConnectUrl?: string;
}

interface SecuritySchemeDisplayProps {
  name: string;
  scheme?: SecuritySchemeObject;
  className?: string;
}

const SecuritySchemeDisplay = React.forwardRef<
  HTMLDivElement,
  SecuritySchemeDisplayProps
>(({ name, scheme, className }, ref) => {
  if (!scheme) {
    return (
      <div
        ref={ref}
        className={cn("p-3 rounded dark:bg-neutral-800/30", className)}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono font-semibold dark:text-neutral-200">
            {name}
          </span>
          <span className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded dark:text-neutral-300">
            unknown
          </span>
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400 italic">
          No security scheme data available
        </div>
      </div>
    );
  }

  const renderDetails = () => {
    switch (scheme.type) {
      case "apiKey":
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-neutral-600 dark:text-neutral-400">In:</span>{" "}
            <span className="dark:text-neutral-300">{scheme.in}</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              Name:
            </span>{" "}
            <span className="dark:text-neutral-300">{scheme.name}</span>
          </div>
        );
      case "http":
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-neutral-600 dark:text-neutral-400">
              Scheme:
            </span>{" "}
            <span className="dark:text-neutral-300">{scheme.scheme}</span>
            {scheme.bearerFormat && (
              <>
                <span className="text-neutral-600 dark:text-neutral-400">
                  Bearer Format:
                </span>{" "}
                <span className="dark:text-neutral-300">
                  {scheme.bearerFormat}
                </span>
              </>
            )}
          </div>
        );
      case "oauth2":
        return (
          <div>
            <div className="space-y-2">
              {scheme.flows &&
                Object.entries(scheme.flows).map(([flowType, flow]) => (
                  <div
                    key={flowType}
                    className="p-2 rounded bg-neutral-100 dark:bg-neutral-800/70"
                  >
                    <h6 className="font-semibold capitalize mb-1 dark:text-neutral-200">
                      {flowType}
                    </h6>
                    <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1 text-xs dark:text-neutral-300">
                      {flow?.authorizationUrl && (
                        <>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Authorization URL:
                          </span>{" "}
                          <code className="break-all">
                            {flow.authorizationUrl}
                          </code>
                        </>
                      )}
                      {flow?.tokenUrl && (
                        <>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Token URL:
                          </span>{" "}
                          <code className="break-all">{flow.tokenUrl}</code>
                        </>
                      )}
                      {flow?.refreshUrl && (
                        <>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Refresh URL:
                          </span>{" "}
                          <code className="break-all">{flow.refreshUrl}</code>
                        </>
                      )}
                      {flow?.scopes && Object.keys(flow.scopes).length > 0 && (
                        <>
                          <span className="text-neutral-600 dark:text-neutral-400 self-start">
                            Scopes:
                          </span>
                          <div className="space-y-0.5">
                            {Object.entries(flow.scopes).map(
                              ([scope, description]) => (
                                <div key={scope}>
                                  <code className="font-mono px-1 rounded">
                                    {scope}:
                                  </code>{" "}
                                  <span className="dark:text-neutral-300">
                                    {description as string}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      case "openIdConnect":
        return (
          <div className="grid grid-cols-[max-content_1fr] gap-x-2 gap-y-1">
            <span className="text-neutral-600 dark:text-neutral-400">
              OpenID Connect URL:
            </span>
            <a
              href={scheme.openIdConnectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {scheme.openIdConnectUrl}
            </a>
          </div>
        );
      case "mutualTLS":
        return (
          <p className="text-neutral-600 dark:text-neutral-400 italic">
            Details for mutualTLS not specifically rendered.
          </p>
        );
      default:
        return (
          <p className="text-red-500 dark:text-red-400">
            Unknown security scheme type: {scheme.type}
          </p>
        );
    }
  };

  return (
    <div
      ref={ref}
      className={cn("p-3 rounded dark:bg-neutral-800/30", className)}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono font-semibold dark:text-neutral-200">
          {name}
        </span>
        <span className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded capitalize dark:text-neutral-300">
          {scheme.type}
        </span>
      </div>
      {scheme.description && (
        <DescriptionDisplay
          description={scheme.description}
          className="text-sm mb-3 dark:text-neutral-300"
        />
      )}
      <div className="text-sm">{renderDetails()}</div>
    </div>
  );
});

SecuritySchemeDisplay.displayName = "SecuritySchemeDisplay";

export { SecuritySchemeDisplay, type SecuritySchemeObject };
