"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  Search,
} from "lucide-react";
import React, { useState } from "react";

// Type definitions
export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    [key: string]: any;
  };
  paths: {
    [path: string]: PathItemObject;
  };
  components?: {
    schemas?: {
      [name: string]: any;
    };
    [key: string]: any;
  };
  tags?: TagObject[];
  [key: string]: any;
}

export interface PathItemObject {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  [key: string]: any;
}

export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  [key: string]: any;
}

export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: any;
  [key: string]: any;
}

interface NavigationSidebarProps {
  openapi: OpenApiSpec;
  activePath?: string | null;
  activeMethod?: string | null;
  onSelectOperation?: (path: string, method: string, operation: any) => void;
  onSelectSchema?: (schemaName: string) => void;
  className?: string;
}

// Method Label Component
interface MethodLabelProps {
  method: string;
  className?: string;
}

const MethodLabel = React.forwardRef<HTMLSpanElement, MethodLabelProps>(
  ({ method, className }, ref) => {
    const getMethodStyle = (method: string) => {
      switch (method.toLowerCase()) {
        case "get":
          return "text-blue-600 bg-blue-50 border-blue-200";
        case "post":
          return "text-green-600 bg-green-50 border-green-200";
        case "put":
          return "text-orange-600 bg-orange-50 border-orange-200";
        case "delete":
          return "text-red-600 bg-red-50 border-red-200";
        case "patch":
          return "text-purple-600 bg-purple-50 border-purple-200";
        default:
          return "text-gray-600 bg-gray-50 border-gray-200";
      }
    };

    return (
      <Badge
        ref={ref}
        variant="outline"
        className={cn(
          "text-xs font-mono font-medium uppercase px-1.5 py-0.5 min-w-[40px] justify-center",
          getMethodStyle(method),
          className
        )}
      >
        {method}
      </Badge>
    );
  }
);

MethodLabel.displayName = "MethodLabel";

const NavigationSidebar = React.forwardRef<HTMLDivElement, NavigationSidebarProps>(
  ({
    openapi,
    activePath = null,
    activeMethod = null,
    onSelectOperation = () => { },
    onSelectSchema,
    className,
  }, ref) => {
    const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>({});
    const [searchQuery, setSearchQuery] = useState("");

    const toggleTagCollapse = (tagName: string) => {
      setCollapsedTags((prev) => ({
        ...prev,
        [tagName]: !prev[tagName],
      }));
    };

    // Filter paths based on search query
    const filterPaths = (path: string, method: string, operation: any) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      return (
        path.toLowerCase().includes(query) ||
        method.toLowerCase().includes(query) ||
        operation.summary?.toLowerCase().includes(query) ||
        operation.description?.toLowerCase().includes(query) ||
        operation.operationId?.toLowerCase().includes(query)
      );
    };

    const tags = openapi.tags || [];
    const hasCustomTags = tags.length > 0;

    return (
      <div ref={ref} className={cn("flex flex-col h-full w-80 bg-background border-r", className)}>
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="font-semibold text-sm">
            {openapi.info?.title || "API Documentation"}
          </h2>
          {openapi.info?.version && (
            <p className="text-xs text-muted-foreground mt-1">
              Version {openapi.info.version}
            </p>
          )}
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            {hasCustomTags ? (
              // Render with tags
              tags.map((tag) => {
                const isCollapsed = collapsedTags[tag.name];
                return (
                  <Collapsible
                    key={tag.name}
                    open={!isCollapsed}
                    onOpenChange={() => toggleTagCollapse(tag.name)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-2 h-auto font-normal"
                      >
                        <div className="flex items-center gap-2">
                          {isCollapsed ? (
                            <Folder className="h-4 w-4" />
                          ) : (
                            <FolderOpen className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">{tag.name}</span>
                        </div>
                        <ChevronRight className={cn(
                          "h-4 w-4 transition-transform",
                          !isCollapsed && "rotate-90"
                        )} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-6 mt-1 space-y-1">
                        {openapi.paths &&
                          Object.entries(openapi.paths).map(
                            ([path, pathItem]) => {
                              const operations = Object.entries(
                                pathItem as PathItemObject,
                              ).filter(([method]) =>
                                [
                                  "get",
                                  "post",
                                  "put",
                                  "delete",
                                  "patch",
                                ].includes(method),
                              );

                              return operations
                                .map(([method, operation]) => {
                                  // Filter tags and search query
                                  if (
                                    !operation.tags?.includes(tag.name) ||
                                    !filterPaths(path, method, operation)
                                  ) {
                                    return null;
                                  }

                                  const isActive =
                                    activePath === path &&
                                    activeMethod !== null &&
                                    activeMethod.toUpperCase() ===
                                    method.toUpperCase();

                                  return (
                                    <Button
                                      key={`${method}-${path}`}
                                      variant={isActive ? "secondary" : "ghost"}
                                      onClick={() =>
                                        onSelectOperation(
                                          path,
                                          method,
                                          operation,
                                        )
                                      }
                                      className={cn(
                                        "w-full justify-between p-2 h-auto font-normal",
                                        isActive && "bg-muted"
                                      )}
                                    >
                                      <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
                                        <span className="font-mono text-xs truncate w-full text-left">
                                          {path}
                                        </span>
                                        {operation.summary && (
                                          <span className="text-xs text-muted-foreground truncate w-full text-left">
                                            {operation.summary}
                                          </span>
                                        )}
                                      </div>
                                      <MethodLabel
                                        method={method.toUpperCase()}
                                        className="ml-2 flex-shrink-0"
                                      />
                                    </Button>
                                  );
                                })
                                .filter(Boolean);
                            },
                          )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })
            ) : (
              // No tags - directly display all paths
              openapi.paths &&
              Object.entries(openapi.paths).map(([path, pathItem]) => {
                const operations = Object.entries(
                  pathItem as PathItemObject,
                ).filter(([method]) =>
                  ["get", "post", "put", "delete", "patch"].includes(method),
                );

                return operations
                  .map(([method, operation]) => {
                    if (!filterPaths(path, method, operation)) return null;

                    const isActive =
                      activePath === path &&
                      activeMethod !== null &&
                      activeMethod.toUpperCase() === method.toUpperCase();

                    return (
                      <Button
                        key={`${method}-${path}`}
                        variant={isActive ? "secondary" : "ghost"}
                        onClick={() =>
                          onSelectOperation(path, method, operation)
                        }
                        className={cn(
                          "w-full justify-between p-2 h-auto font-normal",
                          isActive && "bg-muted"
                        )}
                      >
                        <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
                          <span className="font-mono text-xs truncate w-full text-left">
                            {path}
                          </span>
                          {operation.summary && (
                            <span className="text-xs text-muted-foreground truncate w-full text-left">
                              {operation.summary}
                            </span>
                          )}
                        </div>
                        <MethodLabel
                          method={method.toUpperCase()}
                          className="ml-2 flex-shrink-0"
                        />
                      </Button>
                    );
                  })
                  .filter(Boolean);
              })
            )}
          </div>

          {/* Schemas */}
          {openapi.components?.schemas &&
            Object.keys(openapi.components.schemas).length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">数据模型</h3>
                <div className="space-y-1">
                  {openapi.components.schemas &&
                    Object.keys(openapi.components.schemas)
                      .filter(
                        (name) =>
                          !searchQuery ||
                          name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((schemaName) => (
                        <Button
                          key={schemaName}
                          variant="ghost"
                          onClick={() => onSelectSchema?.(schemaName)}
                          className="w-full justify-start p-2 h-auto font-normal"
                        >
                          <div className="h-2 w-2 rounded-full bg-muted-foreground mr-2 flex-shrink-0"></div>
                          <span className="font-mono text-xs truncate">
                            {schemaName}
                          </span>
                        </Button>
                      ))}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  },
);

NavigationSidebar.displayName = "NavigationSidebar";

export {
  MethodLabel,
  NavigationSidebar,
  type MethodLabelProps,
  type NavigationSidebarProps
};

