'use client';

import React from 'react';
import { TagObject } from '../../types/openapi'; // Adjust path

interface NavigationSidebarProps {
  tags?: TagObject[];
  activeTag: string | null; // null indicates 'All'
  setActiveTag: (tag: string | null) => void;
  className?: string;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ tags, activeTag, setActiveTag, className }) => {
  return (
    <nav className={`sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto p-4 border-r ${className}`}>
      <h3 className="text-sm font-semibold uppercase text-gray-500 mb-3">Tags</h3>
      <ul className="space-y-1">
        {/* All Operations Link */}
        <li>
          <button
            onClick={() => setActiveTag(null)}
            className={`w-full text-left px-3 py-1.5 rounded text-sm ${activeTag === null ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            All Operations
          </button>
        </li>

        {/* Tag Links */}
        {tags && tags.map(tag => (
          <li key={tag.name}>
            <button
              onClick={() => setActiveTag(tag.name)}
              className={`w-full text-left px-3 py-1.5 rounded text-sm ${activeTag === tag.name ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <div className="font-mono font-medium">{tag.name}</div>
              {tag.description && (
                <div className="text-xs text-gray-500 mt-0.5 truncate">{tag.description}</div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationSidebar;
