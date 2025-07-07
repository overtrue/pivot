import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";
import { SectionTitle } from "@/registry/default/ui/section-title";
import { Server } from "@/registry/default/ui/server";

// 类型别名，供其他组件使用
export type ServerObject = OpenAPIV3.ServerObject;

interface ServersProps {
  servers: OpenAPIV3.ServerObject[];
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
