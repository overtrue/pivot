"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { RequiredMarker } from "@/registry/default/ui/required-marker";
import {
  TypeIndicator,
  type DataType,
} from "@/registry/default/ui/type-indicator";
import { ExpandCollapse } from "@/registry/default/ui/expand-collapse";

interface Parameter {
  name: string;
  required: boolean;
  type: DataType;
}

interface ParameterGroupProps {
  inType: "query" | "path" | "header" | "cookie";
  parameters: Parameter[];
  className?: string;
}

const ParameterGroup = React.forwardRef<HTMLDivElement, ParameterGroupProps>(
  ({ inType, parameters, className }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold capitalize">
            {inType} Parameters
          </h3>
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            expandedLabel="收起"
            collapsedLabel="展开"
          />
        </div>
        {isExpanded && (
          <div className="space-y-2">
            {parameters.length > 0 ? (
              parameters.map((param) => (
                <div key={param.name} className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{param.name}</span>
                  {param.required && <RequiredMarker />}
                  <TypeIndicator type={param.type} />
                </div>
              ))
            ) : (
              <div className="text-neutral-500">No parameters</div>
            )}
          </div>
        )}
      </div>
    );
  },
);

ParameterGroup.displayName = "ParameterGroup";

export { ParameterGroup, type Parameter, type ParameterGroupProps };
