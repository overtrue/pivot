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
import React, { useMemo, useState } from "react";

interface NavigationSidebarProps {
  spec: OpenAPIV3.Document;
  activePath?: string | null;
  activeMethod?: string | null;
  onSelectOperation?: (path: string, method: string, operation: OpenAPIV3.OperationObject) => void;
  className?: string;
  collapsible?: "offcanvas" | "icon" | "none";
  groupByTags?: boolean; // 新增：控制是否按标签分组
}

const NavigationSidebar = React.forwardRef<
  HTMLDivElement,
  NavigationSidebarProps
>(
  (
    {
      spec,
      activePath = null,
      activeMethod = null,
      onSelectOperation = () => { },
      className,
      collapsible = "offcanvas",
      groupByTags = true, // 默认按标签分组
    },
    ref,
  ) => {
    const { t } = useI18n();
    const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>({});
    const [searchQuery, setSearchQuery] = useState("");

    // 获取所有可用的操作
    const allOperations = useMemo(() => {
      const operations: Array<{
        path: string;
        method: string;
        operation: OpenAPIV3.OperationObject;
        tags: string[];
      }> = [];

      if (spec.paths) {
        Object.entries(spec.paths).forEach(([path, pathItem]) => {
          const methods = ["get", "post", "put", "delete", "patch", "options", "head"];

          methods.forEach((method) => {
            const operation = (pathItem as OpenAPIV3.PathItemObject)?.[method as keyof OpenAPIV3.PathItemObject];
            if (
              operation &&
              typeof operation === "object" &&
              "responses" in operation
            ) {
              operations.push({
                path,
                method,
                operation,
                tags: operation.tags || [],
              });
            }
          });
        });
      }

      return operations;
    }, [spec.paths]);

    // 获取所有唯一的标签
    const allTags = useMemo(() => {
      const tagSet = new Set<string>();

      // 从根级别的 tags 获取
      if (spec.tags) {
        spec.tags.forEach(tag => tagSet.add(tag.name));
      }

      // 从操作中获取 tags
      allOperations.forEach(({ tags }) => {
        tags.forEach(tag => tagSet.add(tag));
      });

      return Array.from(tagSet).sort();
    }, [spec.tags, allOperations]);

    // 过滤操作
    const filteredOperations = useMemo(() => {
      if (!searchQuery) return allOperations;

      const query = searchQuery.toLowerCase();
      return allOperations.filter(({ path, method, operation }) => {
        return (
          path.toLowerCase().includes(query) ||
          method.toLowerCase().includes(query) ||
          operation.summary?.toLowerCase().includes(query) ||
          operation.description?.toLowerCase().includes(query) ||
          operation.operationId?.toLowerCase().includes(query)
        );
      });
    }, [allOperations, searchQuery]);

    // 按标签分组的操作
    const operationsByTag = useMemo(() => {
      const grouped: Record<string, typeof filteredOperations> = {};

      // 初始化所有标签
      allTags.forEach(tag => {
        grouped[tag] = [];
      });

      // 分组操作
      filteredOperations.forEach(operation => {
        if (operation.tags && operation.tags.length > 0) {
          operation.tags.forEach(tag => {
            if (grouped[tag]) {
              grouped[tag].push(operation);
            }
          });
        } else {
          // 没有标签的操作放入 "Other" 组
          if (!grouped["Other"]) {
            grouped["Other"] = [];
          }
          grouped["Other"].push(operation);
        }
      });

      return grouped;
    }, [filteredOperations, allTags]);

    const toggleTagCollapse = (tagName: string) => {
      setCollapsedTags((prev) => ({
        ...prev,
        [tagName]: !prev[tagName],
      }));
    };

    // 渲染操作项
    const renderOperationItem = (path: string, method: string, operation: OpenAPIV3.OperationObject) => {
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

    // 渲染按标签分组的内容
    const renderGroupedContent = () => {
      const validTags = Object.entries(operationsByTag)
        .filter(([, operations]) => operations.length > 0)
        .sort(([a], [b]) => {
          // "Other" 组放在最后
          if (a === "Other") return 1;
          if (b === "Other") return -1;
          return a.localeCompare(b);
        });

      return validTags.map(([tagName, operations]) => {
        const isCollapsed = collapsedTags[tagName];

        return (
          <SidebarGroup key={tagName} className="py-0">
            <Collapsible
              open={!isCollapsed}
              onOpenChange={() => toggleTagCollapse(tagName)}
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
                    <span className="text-xs font-medium">{tagName}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({operations.length})
                    </span>
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {operations.map(({ path, method, operation }) =>
                      renderOperationItem(path, method, operation)
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        );
      });
    };

    // 渲染平铺的内容
    const renderFlatContent = () => (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {filteredOperations.map(({ path, method, operation }) =>
              renderOperationItem(path, method, operation)
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );

    return (
      <Sidebar ref={ref} className={className} collapsible={collapsible}>
        {/* Header with search */}
        <SidebarHeader className="border-b p-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-medium truncate">
              {spec.info?.title || "API Documentation"}
            </h2>
            {spec.info?.version && (
              <p className="text-xs text-sidebar-foreground/70 mt-0.5">
                v{spec.info.version}
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
          {groupByTags && allTags.length > 0 ? renderGroupedContent() : renderFlatContent()}
        </SidebarContent>
      </Sidebar>
    );
  },
);

NavigationSidebar.displayName = "NavigationSidebar";

export { NavigationSidebar, type NavigationSidebarProps };
