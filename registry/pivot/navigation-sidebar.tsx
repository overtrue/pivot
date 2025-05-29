"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MethodLabel } from "@/registry/pivot/method-label";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  Search,
} from "lucide-react";
import React, { useState } from "react";

// Import types from the centralized types file
import type {
  OpenApiSpec,
  PathItemObject
} from "@/types/openapi";

interface NavigationSidebarProps {
  openapi: OpenApiSpec;
  activePath?: string | null;
  activeMethod?: string | null;
  onSelectOperation?: (path: string, method: string, operation: any) => void;
  onSelectSchema?: (schemaName: string) => void;
  className?: string;
}

const NavigationSidebar = React.forwardRef<HTMLDivElement, NavigationSidebarProps>(
  ({
    openapi,
    activePath = null,
    activeMethod = null,
    onSelectOperation = () => { },
    onSelectSchema,
    className,
  }, ref) => {
    const { t } = useI18n();
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
      <div ref={ref} className={cn("flex flex-col h-full w-full bg-background", className)}>
        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-4 border-b bg-background">
          <h2 className="font-semibold text-sm">
            {openapi.info?.title || "API Documentation"}
          </h2>
          {openapi.info?.version && (
            <p className="text-xs text-muted-foreground mt-1">
              Version {openapi.info.version}
            </p>
          )}
        </div>

        {/* Search - Fixed */}
        <div className="flex-shrink-0 p-4 border-b bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("Search...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 shadow-none"
            />
          </div>
        </div>

        {/* Content with Sticky Tags */}
        <div className="flex-1 overflow-y-scroll">
          {hasCustomTags ? (
            // Render with tags
            tags.map((tag) => {
              const isCollapsed = collapsedTags[tag.name];
              return (
                <div key={tag.name} className="border-b border-border/50 last:border-b-0">
                  {/* Sticky Tag Header */}
                  <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
                    <Collapsible
                      open={!isCollapsed}
                      onOpenChange={() => toggleTagCollapse(tag.name)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-4 h-auto font-normal hover:bg-muted/50"
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
                    </Collapsible>
                  </div>

                  {/* Tag Content */}
                  <Collapsible
                    open={!isCollapsed}
                    onOpenChange={() => toggleTagCollapse(tag.name)}
                  >
                    <CollapsibleContent>
                      <div className="p-4 space-y-1">
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
                                        "w-full justify-between p-2 h-auto font-normal shadow-none",
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
                                        method={method.toUpperCase() as "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD"}
                                        className="ml-2 flex-shrink-0"
                                        variant="compact"
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
                </div>
              );
            })
          ) : (
            // No tags - directly display all paths
            <div className="p-4 space-y-1">
              {openapi.paths &&
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
                            method={method.toUpperCase() as "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD"}
                            className="ml-2 flex-shrink-0"
                            variant="compact"
                          />
                        </Button>
                      );
                    })
                    .filter(Boolean);
                })}
            </div>
          )}
        </div>
      </div>
    );
  },
);

NavigationSidebar.displayName = "NavigationSidebar";

export {
  NavigationSidebar,
  type NavigationSidebarProps
};

