
import { OpenApiSpec, PathItemObject } from '@/types/openapi';
import { ChevronDown, ChevronRight, Info, Search } from 'lucide-react';
import React, { useState } from 'react';
import MethodLabel from '../atoms/MethodLabel';

interface NavigationSidebarProps {
  openapi: OpenApiSpec;
  activePath?: string | null;
  onSelectOperation?: (path: string, method: string, operation: any) => void;
  onSelectSchema?: (schemaName: string) => void;
  className?: string;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  openapi,
  activePath = null,
  onSelectOperation = () => { },
  onSelectSchema,
  className
}) => {
  const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTagCollapse = (tagName: string) => {
    setCollapsedTags(prev => ({
      ...prev,
      [tagName]: !prev[tagName],
    }));
  };

  // 过滤路径
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
    <nav className={`sticky top-0 h-screen overflow-y-auto bg-gray-50 border-r border-gray-200 ${className}`}>
      {/* 标题区域 */}
      <div className="sticky top-0 z-10 bg-slate-700 text-white px-4 py-2 shadow-md">
        <h2 className="text-base font-semibold truncate">{openapi.info.title}</h2>
        <p className="text-xs text-slate-300 mt-0.5 truncate">{openapi.info.version}</p>
      </div>

      {/* 搜索框 */}
      <div className="px-4 py-2 border-b border-gray-200 sticky top-[53px] bg-gray-50 z-10">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索API..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          />
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      <div className="p-4">
        {/* 标签和路径 */}
        {hasCustomTags ? (
          // 有标签时的渲染
          <>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">接口</h3>
            <ul className="space-y-3">
              {tags.map(tag => {
                const isCollapsed = collapsedTags[tag.name];
                return (
                  <li key={tag.name} className="border-b border-gray-100 pb-2 last:border-0">
                    <div
                      className="flex items-center justify-between cursor-pointer py-1.5 group"
                      onClick={() => toggleTagCollapse(tag.name)}
                    >
                      <div className="flex items-center">
                        {isCollapsed ? (
                          <ChevronRight className="h-4 w-4 text-gray-500 mr-1.5" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500 mr-1.5" />
                        )}
                        <span className="font-medium text-gray-700">{tag.name}</span>
                      </div>
                      {tag.description && (
                        <span
                          className="text-xs text-gray-400 group-hover:text-slate-600 transition-colors flex items-center"
                          title={tag.description}
                        >
                          <Info className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>

                    {!isCollapsed && (
                      <ul className="pl-0 mt-1.5 space-y-0.5">
                        {Object.entries(openapi.paths).map(([path, pathItem]) => {
                          const operations = Object.entries(pathItem as PathItemObject)
                            .filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method));

                          return operations.map(([method, operation]) => {
                            // 过滤标签和搜索查询
                            if (!operation.tags?.includes(tag.name) || !filterPaths(path, method, operation)) {
                              return null;
                            }

                            const isActive = activePath === path;
                            return (
                              <li key={`${method}-${path}`}>
                                <button
                                  onClick={() => onSelectOperation(path, method, operation)}
                                  className={`w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm transition-colors
                                    ${isActive
                                      ? 'bg-slate-200 text-slate-800'
                                      : 'text-gray-700 hover:bg-gray-100'}`}
                                  title={operation.summary || path}
                                >
                                  <span className="font-mono text-xs truncate flex-1">{path}</span>
                                  <MethodLabel method={method.toUpperCase() as any} variant="compact" className="flex-shrink-0" />
                                </button>
                              </li>
                            );
                          }).filter(Boolean);
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          // 无标签时直接显示所有路径
          <>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">接口</h3>
            <ul className="space-y-0.5">
              {Object.entries(openapi.paths).map(([path, pathItem]) => {
                const operations = Object.entries(pathItem as PathItemObject)
                  .filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method));

                return operations.map(([method, operation]) => {
                  if (!filterPaths(path, method, operation)) return null;

                  const isActive = activePath === path;
                  return (
                    <li key={`${method}-${path}`}>
                      <button
                        onClick={() => onSelectOperation(path, method, operation)}
                        className={`w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm
                          ${isActive
                            ? 'bg-slate-200 text-slate-800'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        title={operation.summary || path}
                      >
                        <span className="font-mono text-xs truncate flex-1">{path}</span>
                        <MethodLabel method={method.toUpperCase() as any} variant="compact" className="flex-shrink-0" />
                      </button>
                    </li>
                  );
                }).filter(Boolean);
              })}
            </ul>
          </>
        )}

        {/* 模式 */}
        {openapi.components?.schemas && Object.keys(openapi.components.schemas).length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">数据模型</h3>
            <ul className="space-y-0.5 pl-2">
              {Object.keys(openapi.components.schemas)
                .filter(name => !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(schemaName => (
                  <li key={schemaName} className="group">
                    <div
                      className="flex items-center py-0.5 px-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => onSelectSchema?.(schemaName)}
                    >
                      <span className="h-2 w-2 rounded-full bg-slate-500 mr-2 flex-shrink-0"></span>
                      <span className="font-mono text-xs truncate">{schemaName}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationSidebar;
