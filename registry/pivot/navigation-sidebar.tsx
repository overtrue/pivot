import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Info,
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
  variant?: "default" | "compact";
  className?: string;
}

const MethodLabel = React.forwardRef<HTMLSpanElement, MethodLabelProps>(
  ({ method, variant = "default", className }, ref) => {
    const getMethodColor = (method: string) => {
      switch (method.toLowerCase()) {
        case "get":
          return "bg-blue-500 text-white";
        case "post":
          return "bg-green-500 text-white";
        case "put":
          return "bg-orange-500 text-white";
        case "delete":
          return "bg-red-500 text-white";
        case "patch":
          return "bg-purple-500 text-white";
        case "options":
          return "bg-gray-500 text-white";
        case "head":
          return "bg-cyan-500 text-white";
        default:
          return "bg-neutral-500 text-white";
      }
    };

    const isCompact = variant === "compact";

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium uppercase text-xs rounded",
          isCompact ? "px-1.5 py-0.5 min-w-[40px]" : "px-2 py-1 min-w-[50px]",
          getMethodColor(method),
          className
        )}
      >
        {method}
      </span>
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
    const [isAllCollapsed, setIsAllCollapsed] = useState(false);

    const toggleTagCollapse = (tagName: string) => {
      setCollapsedTags((prev) => ({
        ...prev,
        [tagName]: !prev[tagName],
      }));
    };

    const expandAll = () => {
      const tags = openapi.tags || [];
      const newCollapsedState: Record<string, boolean> = {};

      tags.forEach((tag) => {
        newCollapsedState[tag.name] = false;
      });

      setCollapsedTags(newCollapsedState);
      setIsAllCollapsed(false);
    };

    const collapseAll = () => {
      const tags = openapi.tags || [];
      const newCollapsedState: Record<string, boolean> = {};

      tags.forEach((tag) => {
        newCollapsedState[tag.name] = true;
      });

      setCollapsedTags(newCollapsedState);
      setIsAllCollapsed(true);
    };

    const toggleAllTags = () => {
      if (isAllCollapsed) {
        expandAll();
      } else {
        collapseAll();
      }
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
    const scrollbarStyles = [
      "[&::-webkit-scrollbar]:w-0.5",
      "[&::-webkit-scrollbar-track]:rounded-full",
      "[&::-webkit-scrollbar-track]:bg-neutral-50/50",
      "[&::-webkit-scrollbar-thumb]:rounded-full",
      "[&::-webkit-scrollbar-thumb]:bg-neutral-50/50",
      "dark:[&::-webkit-scrollbar-track]:bg-neutral-800",
      "dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800/50",
    ];

    return (
      <nav
        ref={ref}
        className={cn(
          "h-full flex flex-col bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700",
          scrollbarStyles,
          className,
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 py-4 bg-neutral-50 dark:bg-neutral-800">
          <h2 className="text-base font-semibold truncate dark:text-white">
            {openapi.info?.title || "API Documentation"}
          </h2>
        </div>

        {/* Search box */}
        <div className="px-4 py-2 sticky top-[53px] bg-neutral-50 dark:bg-neutral-800 z-10">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search API..."
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 dark:text-white"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
          </div>
        </div>

        <div className={cn("p-4 flex-grow overflow-y-auto", scrollbarStyles)}>
          {/* Tags and paths */}
          {hasCustomTags ? (
            // Render with tags
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Endpoints
                </h3>
                <button
                  onClick={toggleAllTags}
                  className="flex items-center text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors"
                  title={isAllCollapsed ? "Expand All" : "Collapse All"}
                >
                  {isAllCollapsed ? (
                    <>
                      <ChevronsDown className="h-3.5 w-3.5 mr-1" />
                      <span>Expand</span>
                    </>
                  ) : (
                    <>
                      <ChevronsUp className="h-3.5 w-3.5 mr-1" />
                      <span>Collapse</span>
                    </>
                  )}
                </button>
              </div>
              <ul className="space-y-3">
                {tags.map((tag) => {
                  const isCollapsed = collapsedTags[tag.name];
                  return (
                    <li key={tag.name} className="pb-2">
                      <div
                        className="flex items-center justify-between cursor-pointer py-1.5 group"
                        onClick={() => toggleTagCollapse(tag.name)}
                      >
                        <div className="flex items-center">
                          {isCollapsed ? (
                            <ChevronRight className="h-4 w-4 text-neutral-500 dark:text-neutral-400 mr-1.5" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-neutral-500 dark:text-neutral-400 mr-1.5" />
                          )}
                          <span className="font-medium text-neutral-700 dark:text-neutral-200">
                            {tag.name}
                          </span>
                        </div>
                        {tag.description && (
                          <span
                            className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors flex items-center"
                            title={tag.description}
                          >
                            <Info className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>

                      {!isCollapsed && (
                        <ul className="pl-0 mt-1.5 space-y-0.5">
                          {openapi.paths &&
                            Object.entries(openapi.paths).map(
                              ([path, pathItem]) => {
                                // Ensure openapi.paths exists
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
                                      activeMethod &&
                                      activeMethod.toUpperCase() ===
                                      method.toUpperCase();
                                    return (
                                      <li key={`${method}-${path}`}>
                                        <button
                                          onClick={() =>
                                            onSelectOperation(
                                              path,
                                              method,
                                              operation,
                                            )
                                          }
                                          className={cn(
                                            "w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm transition-colors",
                                            isActive
                                              ? "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-white"
                                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                          )}
                                          title={operation.summary || path}
                                        >
                                          <span className="font-mono text-xs truncate flex-1">
                                            {path}
                                          </span>
                                          <MethodLabel
                                            method={method.toUpperCase()}
                                            variant="compact"
                                            className="flex-shrink-0"
                                          />
                                        </button>
                                      </li>
                                    );
                                  })
                                  .filter(Boolean);
                              },
                            )}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            // No tags - directly display all paths
            <>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Endpoints
              </h3>
              <ul className="space-y-0.5">
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
                          activeMethod &&
                          activeMethod.toUpperCase() === method.toUpperCase();
                        return (
                          <li key={`${method}-${path}`}>
                            <button
                              onClick={() =>
                                onSelectOperation(path, method, operation)
                              }
                              className={cn(
                                "w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm",
                                isActive
                                  ? "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-white"
                                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                              )}
                              title={operation.summary || path}
                            >
                              <span className="font-mono text-xs truncate flex-1">
                                {path}
                              </span>
                              <MethodLabel
                                method={method.toUpperCase()}
                                variant="compact"
                                className="flex-shrink-0"
                              />
                            </button>
                          </li>
                        );
                      })
                      .filter(Boolean);
                  })}
              </ul>
            </>
          )}

          {/* Schemas */}
          {openapi.components?.schemas &&
            Object.keys(openapi.components.schemas).length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  Data Models
                </h3>
                <ul className="space-y-0.5 pl-2">
                  {openapi.components.schemas &&
                    Object.keys(openapi.components.schemas)
                      .filter(
                        (name) =>
                          !searchQuery ||
                          name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((schemaName) => (
                        <li key={schemaName} className="group">
                          <div
                            className="flex items-center py-0.5 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer text-neutral-700 dark:text-neutral-300"
                            onClick={() => onSelectSchema?.(schemaName)}
                          >
                            <span className="h-2 w-2 rounded-full bg-neutral-500 mr-2 flex-shrink-0"></span>
                            <span className="font-mono text-xs truncate">
                              {schemaName}
                            </span>
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            )}
        </div>
      </nav>
    );
  },
);

NavigationSidebar.displayName = "NavigationSidebar";

export {
  MethodLabel, NavigationSidebar, type MethodLabelProps, type NavigationSidebarProps, type OpenApiSpec, type OperationObject, type PathItemObject, type TagObject
};

