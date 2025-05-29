import { cn } from "@/lib/utils";
import React from "react";

// Define license object type
interface LicenseObject {
  name: string;
  identifier?: string;
  url?: string;
}

interface LicenseDisplayProps {
  license: LicenseObject;
  className?: string;
}

const LicenseDisplay = React.forwardRef<HTMLDivElement, LicenseDisplayProps>(
  ({ license, className }, ref) => {
    return (
      <div ref={ref} className={cn("text-sm", className)}>
        <div className="font-semibold dark:text-neutral-200">
          {license.name}
        </div>
        {license.identifier && (
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            Identifier: {license.identifier}
          </div>
        )}
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

export { LicenseDisplay, type LicenseObject };
