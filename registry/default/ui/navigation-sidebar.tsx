"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useI18n } from "@/registry/default/lib/i18n";
import { MethodLabel } from "@/registry/default/ui/method-label";
import { ChevronRight } from "lucide-react";
import type { OpenAPIV3 } from "openapi-types";
import React, { useState } from "react";

// Import types from the centralized types file

interface NavigationSidebarProps {
  openapi: OpenAPIV3.Document;
  activePath?: string | null;
  activeMethod?: string | null;
  onSelectOperation?: (path: string, method: string, operation: any) => void;
  onSelectSchema?: (schemaName: string) => void;
  className?: string;
  collapsible?: "offcanvas" | "icon" | "none";
}

const NavigationSidebar = React.forwardRef<
  HTMLDivElement,
  NavigationSidebarProps
>(
  (
    {
      openapi,
      activePath = null,
      activeMethod = null,
      onSelectOperation = () => { },
      onSelectSchema,
      className,
      collapsible = "none",
    },
    ref,
  ) => {
    const { t } = useI18n();
    const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>(
      {},
    );
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

    // Render operation item using SidebarMenuItem
    const renderOperationItem = (path: string, method: string, operation: any) => {
      const isActive =
        activePath === path &&
        activeMethod !== null &&
        activeMethod.toUpperCase() === method.toUpperCase();

      return (
        <SidebarMenuItem key={`${method}-${path}`}>
          <SidebarMenuButton
            onClick={() => onSelectOperation(path, method, operation)}
            isActive={isActive}
            className="justify-between text-xs font-mono"
          >
            <span className="truncate">{path}</span>
            <MethodLabel
              method={
                method.toUpperCase() as
                | "GET"
                | "POST"
                | "PUT"
                | "DELETE"
                | "PATCH"
                | "OPTIONS"
                | "HEAD"
              }
              className="ml-2 flex-shrink-0"
              variant="compact"
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    };

    return (
      <Sidebar ref={ref} className={className} collapsible={collapsible}>
        {/* Header with search */}
        <SidebarHeader className="border-b p-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-medium truncate">
              {openapi.info?.title || "API Documentation"}
            </h2>
            {openapi.info?.version && (
              <p className="text-xs text-sidebar-foreground/70 mt-0.5">
                v{openapi.info.version}
              </p>
            )}
          </div>

          {/* Search */}
          <div className="mt-3">
            <Input
              placeholder={t("Search...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="py-2">
          {hasCustomTags ? (
            // Render with tags using SidebarGroup
            tags.map((tag) => {
              const isCollapsed = collapsedTags[tag.name];
              const tagOperations: React.ReactNode[] = [];

              // Collect operations for this tag
              if (openapi.paths) {
                Object.entries(openapi.paths).forEach(([path, pathItem]) => {
                  const operations = Object.entries(
                    pathItem as OpenAPIV3.PathItemObject,
                  ).filter(([method]) =>
                    ["get", "post", "put", "delete", "patch"].includes(method),
                  );

                  operations.forEach(([method, operation]) => {
                    if (
                      typeof operation === "object" &&
                      operation &&
                      !Array.isArray(operation) &&
                      "responses" in operation &&
                      (operation as any).tags?.includes(tag.name) &&
                      filterPaths(path, method, operation)
                    ) {
                      tagOperations.push(renderOperationItem(path, method, operation));
                    }
                  });
                });
              }

              if (tagOperations.length === 0) return null;

              return (
                <SidebarGroup key={tag.name} className="py-0">
                  <Collapsible
                    open={!isCollapsed}
                    onOpenChange={() => toggleTagCollapse(tag.name)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors">
                        <div className="flex items-center">
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 mr-2 transition-transform",
                              !isCollapsed && "rotate-90",
                            )}
                          />
                          <span className="text-xs font-medium">{tag.name}</span>
                        </div>
                      </SidebarGroupLabel>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {tagOperations}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroup>
              );
            })
          ) : (
            // No tags - directly display all paths
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {openapi.paths &&
                    Object.entries(openapi.paths).map(([path, pathItem]) => {
                      const operations = Object.entries(
                        pathItem as OpenAPIV3.PathItemObject,
                      ).filter(([method]) =>
                        ["get", "post", "put", "delete", "patch"].includes(method),
                      );

                      return operations
                        .map(([method, operation]) => {
                          if (
                            typeof operation !== "object" ||
                            !operation ||
                            Array.isArray(operation) ||
                            !("responses" in operation) ||
                            !filterPaths(path, method, operation)
                          ) {
                            return null;
                          }

                          return renderOperationItem(path, method, operation);
                        })
                        .filter(Boolean);
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>
    );
  },
);

NavigationSidebar.displayName = "NavigationSidebar";

export { NavigationSidebar, type NavigationSidebarProps };
