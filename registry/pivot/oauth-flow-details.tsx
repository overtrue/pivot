import { cn } from "@/lib/utils";
import React from "react";

interface OAuthFlow {
  authorizationUrl?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
}

interface OAuthFlowDetailsProps {
  flowName: string;
  flow: OAuthFlow;
  className?: string;
}

const OAuthFlowDetails = React.forwardRef<
  HTMLDivElement,
  OAuthFlowDetailsProps
>(({ flowName, flow, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-neutral-50 dark:bg-neutral-800/70 p-3 rounded-md border dark:border-neutral-700",
        className,
      )}
    >
      <h5 className="font-medium text-sm mb-2 dark:text-neutral-200">
        {flowName} Flow
      </h5>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm mb-3">
        {flow.authorizationUrl && (
          <>
            <div className="font-semibold dark:text-neutral-300">
              Authorization URL:
            </div>
            <div className="font-mono break-all dark:text-neutral-300">
              <a
                href={flow.authorizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {flow.authorizationUrl}
              </a>
            </div>
          </>
        )}
        {flow.tokenUrl && (
          <>
            <div className="font-semibold dark:text-neutral-300">
              Token URL:
            </div>
            <div className="font-mono break-all dark:text-neutral-300">
              <a
                href={flow.tokenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {flow.tokenUrl}
              </a>
            </div>
          </>
        )}
        {flow.refreshUrl && (
          <>
            <div className="font-semibold dark:text-neutral-300">
              Refresh URL:
            </div>
            <div className="font-mono break-all dark:text-neutral-300">
              <a
                href={flow.refreshUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {flow.refreshUrl}
              </a>
            </div>
          </>
        )}
      </div>

      <div className="mt-2">
        <h6 className="text-xs font-semibold mb-1 dark:text-neutral-300">
          Scopes
        </h6>
        <div className="border dark:border-neutral-700 rounded overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
            <thead className="bg-neutral-100 dark:bg-neutral-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Scope
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
              {Object.entries(flow.scopes).map(([scope, description]) => (
                <tr key={scope}>
                  <td className="px-3 py-2 text-xs font-mono whitespace-nowrap dark:text-neutral-300">
                    {scope}
                  </td>
                  <td className="px-3 py-2 text-xs dark:text-neutral-300">
                    {description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

OAuthFlowDetails.displayName = "OAuthFlowDetails";

export { OAuthFlowDetails, type OAuthFlow };
