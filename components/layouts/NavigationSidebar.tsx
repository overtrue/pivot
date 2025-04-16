'use client';

import { OpenApiSpec, PathItemObject } from '@/types/openapi'; // Adjust path
import React, { useState } from 'react';
import MethodLabel from '../atoms/MethodLabel';

interface NavigationSidebarProps {
  openapi: OpenApiSpec;
  activePath?: string | null; // null indicates no path selected, optional
  onSelectOperation?: (path: string, method: string, operation: any) => void; // 新增属性，用于选择操作
  className?: string;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ openapi, activePath = null, onSelectOperation = () => { }, className }) => {
  const [collapsedTags, setCollapsedTags] = useState<Record<string, boolean>>({});

  const toggleTagCollapse = (tagName: string) => {
    setCollapsedTags(prev => ({
      ...prev,
      [tagName]: !prev[tagName],
    }));
  };

  return (
    <nav className={`sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto p-4 border-r ${className}`}>
      {/* Title */}
      <h2 className="text-lg font-bold mb-4">{openapi.info.title}</h2>

      {/* Tags and Paths */}
      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Tags</h3>
      <ul className="space-y-2">
        {openapi.tags?.map(tag => (
          <li key={tag.name}>
            <div
              className="font-mono font-medium text-gray-700 mb-1 cursor-pointer"
              onClick={() => toggleTagCollapse(tag.name)}
            >
              {tag.name}
              <span className="ml-2 text-sm text-gray-500">{collapsedTags[tag.name] ? '(+)' : '(-)'}</span>
            </div>
            {!collapsedTags[tag.name] && (
              <ul className="pl-4 space-y-1">
                {Object.entries(openapi.paths).map(([path, pathItem]) => {
                  const operations = Object.entries(pathItem as PathItemObject).filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method));
                  return operations.map(([method, operation]) => (
                    operation.tags?.includes(tag.name) && (
                      <li key={`${method}-${path}`}>
                        <button
                          onClick={() => {
                            onSelectOperation(path, method, operation);
                          }}
                          className={`w-full text-left px-3 flex items-center justify-between gap-2 py-1.5 rounded text-sm ${activePath === path ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          <span className="font-mono truncate">{path}</span>
                          <div className='flex-shrink-0'>
                            <MethodLabel method={method.toUpperCase() as any} className="inline-block mr-2" />
                          </div>
                        </button>
                      </li>
                    )
                  ));
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Schemas */}
      <h3 className="text-sm font-semibold uppercase text-gray-500 mt-6 mb-3">Schemas</h3>
      <ul className="space-y-1">
        {openapi.components?.schemas && Object.keys(openapi.components.schemas).map(schemaName => (
          <li key={schemaName}>
            <div className="font-mono text-sm text-gray-700 truncate">{schemaName}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationSidebar;
