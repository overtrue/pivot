import { cn } from "@/lib/utils";
import { DescriptionDisplay } from "@/registry/default/ui/description-display";
import { SchemeType } from "@/registry/default/ui/scheme-type";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";

// Import types from the centralized types file

interface SecuritySchemeProps {
  name: string;
  scheme: OpenAPIV3.SecuritySchemeObject;
  className?: string;
}

const SecurityScheme = React.forwardRef<HTMLDivElement, SecuritySchemeProps>(
  ({ name, scheme, className }, ref) => {
    const { type, description } = scheme;

    // Access type-specific properties safely
    const paramIn = "in" in scheme ? scheme.in : undefined;
    const apiKeyName = "name" in scheme ? scheme.name : undefined;
    const httpScheme = "scheme" in scheme ? scheme.scheme : undefined;
    const bearerFormat =
      "bearerFormat" in scheme ? scheme.bearerFormat : undefined;
    const flows = "flows" in scheme ? scheme.flows : undefined;
    const openIdConnectUrl =
      "openIdConnectUrl" in scheme ? scheme.openIdConnectUrl : undefined;

    // OAuth2流类型的渲染
    const renderOAuth2Flows = (flows?: any) => {
      if (!flows) return null;

      // 获取所有非空的flow
      const availableFlows = Object.entries(flows)
        .filter(([_, flow]) => flow !== undefined)
        .map(([name, flow]) => ({ name, flow: flow! }));

      if (availableFlows.length === 0) return null;

      return (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold dark:text-neutral-200">
            OAuth2 Flows
          </h4>
          {availableFlows.map(({ name, flow }) => (
            <div
              key={name}
              className="bg-neutral-50 dark:bg-neutral-800/70 p-3 rounded-md"
            >
              <h5 className="text-sm font-medium mb-2 capitalize">
                {name} Flow
              </h5>
              <div className="space-y-2 text-sm">
                {(flow as any).authorizationUrl && (
                  <div className="grid grid-cols-[max-content_1fr] gap-2">
                    <span className="font-semibold">Authorization URL:</span>
                    <a
                      href={(flow as any).authorizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {(flow as any).authorizationUrl}
                    </a>
                  </div>
                )}
                {(flow as any).tokenUrl && (
                  <div className="grid grid-cols-[max-content_1fr] gap-2">
                    <span className="font-semibold">Token URL:</span>
                    <a
                      href={(flow as any).tokenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {(flow as any).tokenUrl}
                    </a>
                  </div>
                )}
                {Object.keys((flow as any).scopes).length > 0 && (
                  <div>
                    <span className="font-semibold">Scopes:</span>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {(
                        Object.entries((flow as any).scopes) as [
                          string,
                          string,
                        ][]
                      ).map(([scope, description]) => (
                        <li key={scope} className="text-sm">
                          <code className="font-mono">{scope}</code>
                          {description && `: ${description}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-md overflow-hidden shadow-sm", className)}
      >
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-medium text-blue-800 dark:text-blue-300">
              {name}
            </span>
            <SchemeType type={type} />
          </div>
        </div>

        <div className="p-4 space-y-4 dark:text-neutral-200">
          {description && <DescriptionDisplay description={description} />}

          {/* ApiKey 类型 */}
          {type === "apiKey" && (
            <div className="bg-neutral-50 dark:bg-neutral-800/70 p-3 rounded-md">
              <h4 className="text-sm font-semibold mb-2">API Key</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">Name:</div>
                <div className="font-mono dark:text-neutral-300">
                  {apiKeyName}
                </div>
                <div className="font-semibold">In:</div>
                <div className="dark:text-neutral-300">{paramIn}</div>
              </div>
            </div>
          )}

          {/* HTTP 类型 */}
          {type === "http" && (
            <div className="bg-neutral-50 dark:bg-neutral-800/70 p-3 rounded-md">
              <h4 className="text-sm font-semibold mb-2">
                HTTP Authentication
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">Scheme:</div>
                <div className="font-mono dark:text-neutral-300">
                  {httpScheme}
                </div>
                {bearerFormat && (
                  <>
                    <div className="font-semibold">Bearer Format:</div>
                    <div className="dark:text-neutral-300">{bearerFormat}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* OAuth2 类型 */}
          {type === "oauth2" && renderOAuth2Flows(flows)}

          {/* OpenID Connect 类型 */}
          {type === "openIdConnect" && openIdConnectUrl && (
            <div className="bg-neutral-50 dark:bg-neutral-800/70 p-3 rounded-md">
              <h4 className="text-sm font-semibold mb-2">OpenID Connect</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">OpenID Connect URL:</div>
                <div className="font-mono break-all dark:text-neutral-300">
                  <a
                    href={openIdConnectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {openIdConnectUrl}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

SecurityScheme.displayName = "SecurityScheme";

export { SecurityScheme };
