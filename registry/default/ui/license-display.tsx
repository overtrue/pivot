import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from "openapi-types";
import React from "react";

interface LicenseDisplayProps {
  license: OpenAPIV3.LicenseObject;
  className?: string;
}

const LicenseDisplay = React.forwardRef<HTMLDivElement, LicenseDisplayProps>(
  ({ license, className }, ref) => {
    return (
      <div ref={ref} className={cn("text-sm", className)}>
        <div className="font-semibold dark:text-neutral-200">
          {license.name}
        </div>
        {license.url && (
          <div>
            <a
              href={license.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {license.url}
            </a>
          </div>
        )}
      </div>
    );
  },
);

LicenseDisplay.displayName = "LicenseDisplay";

export { LicenseDisplay, type LicenseDisplayProps };
