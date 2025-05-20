import { useI18n } from '@/lib/i18n/I18nProvider';
import { OpenApiSpec, PathItemObject } from '@/types/openapi';
import { cn } from '@/utils/cn';
import { ChevronDown, ChevronRight, ChevronsDown, ChevronsUp, Github, Info, Search } from 'lucide-react';
import React, { useState } from 'react';
import MethodLabel from '../atoms/MethodLabel';
import { ThemeToggle } from '../ThemeToggle';

interface NavigationSidebarProps {
  openapi: OpenApiSpec;
  activePath?: string | null;
  activeMethod?: string | null;
  onSelectOperation?: (path: string, method: string, operation: any) => void;
  onSelectSchema?: (schemaName: string) => void;
  className?: string;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  openapi,
  activePath = null,
  activeMethod = null,
  onSelectOperation = () => { },
  onSelectSchema,
  className
}) => {
  const { t } = useI18n();
  const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isAllCollapsed, setIsAllCollapsed] = useState(false);

  const toggleTagCollapse = (tagName: string) => {
    setCollapsedTags(prev => ({
      ...prev,
      [tagName]: !prev[tagName],
    }));
  };

  const expandAll = () => {
    const tags = openapi.tags || [];
    const newCollapsedState: Record<string, boolean> = {};

    tags.forEach(tag => {
      newCollapsedState[tag.name] = false;
    });

    setCollapsedTags(newCollapsedState);
    setIsAllCollapsed(false);
  };

  const collapseAll = () => {
    const tags = openapi.tags || [];
    const newCollapsedState: Record<string, boolean> = {};

    tags.forEach(tag => {
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
  const scrollbarStyles = [
    '[&::-webkit-scrollbar]:w-0.5',
    '[&::-webkit-scrollbar-track]:rounded-full',
    '[&::-webkit-scrollbar-track]:bg-neutral-100',
    '[&::-webkit-scrollbar-thumb]:rounded-full',
    '[&::-webkit-scrollbar-thumb]:bg-neutral-300',
    'dark:[&::-webkit-scrollbar-track]:bg-neutral-700',
    'dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500',
  ];

  return (
    <nav className={cn('h-full flex flex-col bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700', scrollbarStyles, className)}>
      {/* 标题区域 */}
      <div className="sticky top-0 z-10 px-4 py-4 bg-neutral-50 dark:bg-neutral-800">
        <h2 className="text-base font-semibold truncate dark:text-white">{openapi.info?.title || t('API Documentation')}</h2>
        {/* <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-0.5 truncate">{openapi.info?.version || ''}</p> */}
      </div>

      {/* 搜索框 */}
      <div className="px-4 py-2 sticky top-[53px] bg-neutral-50 dark:bg-neutral-800 z-10">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search API...')}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 bg-white dark:bg-neutral-700 dark:text-white"
          />
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
        </div>
      </div>

      <div className={cn('p-4 flex-grow overflow-y-auto', scrollbarStyles)}>
        {/* 标签和路径 */}
        {hasCustomTags ? (
          // 有标签时的渲染
          <>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{t('Endpoints')}</h3>
              <button
                onClick={toggleAllTags}
                className="flex items-center text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 transition-colors"
                title={isAllCollapsed ? t("Expand All") : t("Collapse All")}
              >
                {isAllCollapsed ? (
                  <>
                    <ChevronsDown className="h-3.5 w-3.5 mr-1" />
                    <span>{t('Expand')}</span>
                  </>
                ) : (
                  <>
                    <ChevronsUp className="h-3.5 w-3.5 mr-1" />
                    <span>{t('Collapse')}</span>
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-3">
              {tags.map(tag => {
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
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">{tag.name}</span>
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
                        {openapi.paths && Object.entries(openapi.paths).map(([path, pathItem]) => { // Ensure openapi.paths exists
                          const operations = Object.entries(pathItem as PathItemObject)
                            .filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method));

                          return operations.map(([method, operation]) => {
                            // 过滤标签和搜索查询
                            if (!operation.tags?.includes(tag.name) || !filterPaths(path, method, operation)) {
                              return null;
                            }

                            const isActive = activePath === path && activeMethod && activeMethod.toUpperCase() === method.toUpperCase();
                            return (
                              <li key={`${method}-${path}`}>
                                <button
                                  onClick={() => onSelectOperation(path, method, operation)}
                                  className={`w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm transition-colors
                                    ${isActive
                                      ? 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-white'
                                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">{t('Endpoints')}</h3>
            <ul className="space-y-0.5">
              {openapi.paths && Object.entries(openapi.paths).map(([path, pathItem]) => {
                const operations = Object.entries(pathItem as PathItemObject)
                  .filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method));

                return operations.map(([method, operation]) => {
                  if (!filterPaths(path, method, operation)) return null;

                  const isActive = activePath === path && activeMethod && activeMethod.toUpperCase() === method.toUpperCase();
                  return (
                    <li key={`${method}-${path}`}>
                      <button
                        onClick={() => onSelectOperation(path, method, operation)}
                        className={`w-full text-left px-2.5 flex items-center gap-2 py-1 rounded-md text-sm
                          ${isActive
                            ? 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-white'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`}
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">{t('Data Models')}</h3>
            <ul className="space-y-0.5 pl-2">
              {openapi.components.schemas && Object.keys(openapi.components.schemas)
                .filter(name => !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(schemaName => (
                  <li key={schemaName} className="group">
                    <div
                      className="flex items-center py-0.5 px-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer text-neutral-700 dark:text-neutral-300"
                      onClick={() => onSelectSchema?.(schemaName)}
                    >
                      <span className="h-2 w-2 rounded-full bg-neutral-500 mr-2 flex-shrink-0"></span>
                      <span className="font-mono text-xs truncate">{schemaName}</span>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* GitHub 链接 - 固定在底部 */}
      <div className="mt-auto border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 flex items-center justify-between">
        <a
          href="https://github.com/overtrue/pivot"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white text-sm"
        >
          <Github className="h-4 w-4 mr-2" />
          <span>GitHub</span>
        </a>

        <ThemeToggle />
      </div>
    </nav >
  );
};

export default NavigationSidebar;
