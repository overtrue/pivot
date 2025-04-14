'use client';

import React, { useMemo, useState } from 'react';
import {
  OpenApiObject,
  OperationObject,
  ParameterObject,
  PathItemObject
} from '../types/openapi';
import OperationBox from './molecules/OperationBox';
import ComponentsSection from './organisms/ComponentsSection';
import InfoSection from './organisms/InfoSection';
import SecuritySection from './organisms/SecuritySection';
import ServersSection from './organisms/ServersSection';
// import TagsSection from './organisms/TagsSection'; // Remove this
import { resolveRef } from '../utils/resolveRef'; // Need resolveRef for PathItem
import ExternalDocsDisplay from './atoms/ExternalDocsDisplay';
import SectionTitle from './atoms/typography/SectionTitle';
import ParameterItem from './molecules/parameter/ParameterItem'; // For path parameters
import NavigationSidebar from './navigation/NavigationSidebar'; // Import Sidebar

interface OpenApiLayoutProps {
  spec: OpenApiObject;
  className?: string;
}

const OpenApiLayout: React.FC<OpenApiLayoutProps> = ({ spec, className }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);

  // Memoize filtered operations based on activeTag
  const filteredPaths = useMemo(() => {
    if (!spec.paths) return {};
    if (activeTag === null) return spec.paths; // Show all if null

    const filtered: typeof spec.paths = {};
    for (const path in spec.paths) {
      const pathItem = spec.paths[path];
      if (!pathItem) continue;

      // Resolve PathItem if it's a $ref
      const resolvedPathItem = resolveRef<PathItemObject>(pathItem, spec.components, 'pathItems');
      if (!resolvedPathItem) continue; // Skip if path item ref fails

      const operationsInPath = Object.entries(resolvedPathItem)
        .filter(([method]) => [
          'get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'
        ].includes(method.toLowerCase()))
        .map(([_, operation]) => resolveRef<OperationObject>(operation, spec.components, 'operations')) // Resolve operation refs
        .filter(op => op && op.tags && op.tags.includes(activeTag)); // Filter by tag

      if (operationsInPath.length > 0) {
        // Include the path if any of its operations match the active tag
        // We need to reconstruct the PathItemObject with only matching operations?
        // For simplicity now, just include the whole path if *any* operation matches.
        // A more sophisticated approach would filter the methods within the PathItem.
        filtered[path] = pathItem; // Keep original pathItem (or resolvedPathItem?)
      }
    }
    return filtered;
  }, [spec.paths, spec.components, activeTag]);

  return (
    <div className={`flex min-h-screen ${className}`}>
      {/* Left Sidebar (Navigation) */}
      <div className="w-64 flex-shrink-0">
        <NavigationSidebar
          tags={spec.tags}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      </div>

      {/* Center Content Area */}
      <main className="flex-grow p-8 overflow-y-auto">
        {/* 1. Info Section */}
        {spec.info && <InfoSection info={spec.info} />}

        {/* 2. Servers Section */}
        {spec.servers && spec.servers.length > 0 && (
          <ServersSection servers={spec.servers} className="mt-8" />
        )}

        {/* 3. Operations Section (Filtered) */}
        {Object.keys(filteredPaths).length > 0 && (
          <div className="mt-12">
            {/* Title reflects filtering */}
            <SectionTitle
              title={activeTag ? `Operations tagged "${activeTag}"` : "All Operations"}
              className="text-2xl mb-6" />
            <div className="space-y-8">
              {Object.entries(filteredPaths).map(([path, pathItemOrRef]) => {
                // Resolve PathItem ref again here for rendering path params
                const resolvedPathItem = resolveRef<PathItemObject>(pathItemOrRef, spec.components, 'pathItems');
                if (!resolvedPathItem) return null; // Skip if ref resolution fails

                const pathLevelParams = resolvedPathItem.parameters?.map(p => resolveRef<ParameterObject>(p, spec.components, 'parameters')).filter(Boolean) as ParameterObject[];

                return (
                  <div key={path}>
                    {/* Render Path Level Parameters if they exist */}
                    {pathLevelParams && pathLevelParams.length > 0 && (
                      <div className="mb-4 p-3 border rounded bg-gray-50">
                        <h4 className="text-sm font-semibold mb-2">Path Parameters</h4>
                        <div className="space-y-2">
                          {pathLevelParams.map((param, index) => (
                            <ParameterItem key={param.name + index} {...param} name={param.name} components={spec.components} />
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Render each operation within the resolved path item */}
                    {Object.entries(resolvedPathItem).map(([method, operationOrRef]) => {
                      if (['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].includes(method.toLowerCase())) {
                        // Resolve operation ref
                        const operation = resolveRef<OperationObject>(operationOrRef, spec.components, 'operations');
                        if (!operation) return null; // Skip if op ref fails

                        // Render only if 'All' is selected or operation has the active tag
                        if (activeTag === null || (operation.tags && operation.tags.includes(activeTag))) {
                          return (
                            <OperationBox
                              key={`${method}-${path}`}
                              onSelectOperation={() => setSelectedOperationId(operation.operationId || `${method}-${path}`)}
                              path={path}
                              method={method.toUpperCase()}
                              operation={operation}
                              components={spec.components}
                              className="mb-6"
                            />
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {Object.keys(filteredPaths).length === 0 && activeTag !== null && (
          <div className="mt-12 text-gray-500 italic">No operations found for tag "{activeTag}".</div>
        )}

        {/* 4. Components Section */}
        {spec.components && Object.keys(spec.components).length > 0 && (
          <ComponentsSection components={spec.components} className="mt-12" />
        )}

        {/* 5. Security Section */}
        {(spec.security || spec.components?.securitySchemes) && (
          <SecuritySection
            security={spec.security}
            securitySchemes={spec.components?.securitySchemes}
            components={spec.components}
            className="mt-12"
          />
        )}

        {/* 6. Tags Section - Removed, handled by Sidebar */}
        {/* {spec.tags && spec.tags.length > 0 && (
          <TagsSection tags={spec.tags} className="mt-12" />
        )} */}

        {/* 7. External Docs Section (Root Level) */}
        {spec.externalDocs && (
          <div className="mt-12 py-4 border-t">
            <ExternalDocsDisplay externalDocs={spec.externalDocs} />
          </div>
        )}
      </main>

      {/* Right Sidebar (Code Samples Placeholder) */}
      <aside className="w-80 flex-shrink-0 p-4 border-l bg-gray-50">
        <div className="sticky top-4">
          <h3 className="text-lg font-semibold mb-4">Code Samples</h3>
          {selectedOperationId ? (
            <div className="text-sm text-gray-700">
              <p>Code samples for:</p>
              <p className="font-mono font-medium break-all my-2">{selectedOperationId}</p>
              <div className="mt-4 p-4 bg-gray-800 rounded text-white text-xs font-mono">
                {`// Code generation for ${selectedOperationId} not implemented.
// Example:
fetch("${selectedOperationId.split('-')[1] || '/path'}", {
  method: "${selectedOperationId.split('-')[0] || 'GET'}",
  headers: {
    "Content-Type": "application/json",
    // Add authentication headers if needed
  },
  // Add body if needed
  // body: JSON.stringify({ key: "value" })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">
              Select an operation to view code samples.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default OpenApiLayout;
