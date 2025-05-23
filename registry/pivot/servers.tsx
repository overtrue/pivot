import { cn } from "@/lib/utils";
import React from "react";
import { SectionTitle } from "../pivot/section-title";
import { Server, type ServerObject } from "./server";

interface ServersProps {
  servers: ServerObject[];
  className?: string;
}

const Servers = React.forwardRef<HTMLDivElement, ServersProps>(
  ({ servers, className }, ref) => {
    if (!servers || servers.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn("dark:text-neutral-200", className)}>
        <SectionTitle title="Servers" />
        <div className="mt-3">
          {servers.map((server, index) => (
            <Server key={index} server={server} />
          ))}
        </div>
      </div>
    );
  },
);

Servers.displayName = "Servers";

export { Servers };
