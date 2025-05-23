import { cn } from "@/lib/utils";
import React from "react";
import { SectionTitle } from "../pivot/section-title";
import { ServerDisplay, type ServerObject } from "../pivot/server-display";

interface ServersSectionProps {
  servers: ServerObject[];
  className?: string;
}

const ServersSection = React.forwardRef<HTMLDivElement, ServersSectionProps>(
  ({ servers, className }, ref) => {
    if (!servers || servers.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("py-4 dark:text-neutral-200", className)}>
        <SectionTitle title="Servers" className="text-xl mb-3" />
        <div className="space-y-4">
          {servers.map((server, index) => (
            <ServerDisplay key={index} server={server} className="rounded" />
          ))}
        </div>
      </div>
    );
  },
);

ServersSection.displayName = "ServersSection";

export { ServersSection };
