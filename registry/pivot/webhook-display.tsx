import { cn } from "@/lib/utils";
import React from "react";
import { DescriptionDisplay } from "../pivot/description-display";
import { WebhookLabel } from "../pivot/webhook-label";
import { OperationBox } from "./operation-box";

// Import types from the centralized types file
import type {
  ComponentsObject,
  PathItemObject
} from "@/types/openapi";

interface WebhookDisplayProps {
  name: string;
  pathItem: PathItemObject;
  components?: ComponentsObject;
  className?: string;
}

const WebhookDisplay = React.forwardRef<HTMLDivElement, WebhookDisplayProps>(
  ({ name, pathItem, components, className }, ref) => {
    if (!pathItem) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700",
            className,
          )}
        >
          <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
            No webhook data available
          </div>
        </div>
      );
    }

    const operations = [
      { method: "get", operation: pathItem.get },
      { method: "post", operation: pathItem.post },
      { method: "put", operation: pathItem.put },
      { method: "delete", operation: pathItem.delete },
      { method: "options", operation: pathItem.options },
      { method: "head", operation: pathItem.head },
      { method: "patch", operation: pathItem.patch },
      { method: "trace", operation: pathItem.trace },
    ].filter(({ operation }) => operation !== undefined);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700",
          className,
        )}
      >
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Webhook:
          </h2>
          <WebhookLabel />
          <span className="text-blue-600 dark:text-blue-400 font-mono">
            {name}
          </span>
        </div>

        {pathItem.description && (
          <div className="mb-4">
            <DescriptionDisplay description={pathItem.description} />
          </div>
        )}

        <div className="space-y-4">
          {operations.map(({ method, operation }) => (
            <OperationBox
              key={method}
              path={`webhook:${name}`}
              method={method.toUpperCase()}
              operation={operation!}
              components={components}
            />
          ))}
        </div>

        {operations.length === 0 && (
          <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
            No operations defined for this webhook
          </div>
        )}
      </div>
    );
  },
);

WebhookDisplay.displayName = "WebhookDisplay";

export {
  WebhookDisplay,
  type WebhookDisplayProps
};

