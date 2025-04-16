'use client';

import {
  ComponentsObject,
  HttpMethod,
  OpenApiSpec as OpenApiObject,
  OperationObject,
  PathItemObject,
  ReferenceObject,
  RequestBodyObject
} from '@/types/openapi';
import React, { useMemo, useState } from 'react';
import { resolveRef } from '../../utils/resolveRef'; // Need resolveRef for PathItem
import ExternalDocsDisplay from '../atoms/ExternalDocsDisplay';
import SectionTitle from '../atoms/SectionTitle';
import ComponentsSection from '../ComponentsSection';
import InfoSection from '../InfoSection';
import Codegen from '../interactive/Codegen'; // 引入 Codegen 组件
import OperationBox from '../OperationBox';
import SecuritySection from '../SecuritySection';
import ServersSection from '../ServersSection';
import NavigationSidebar from './NavigationSidebar'; // Import Sidebar

interface OpenApiLayoutProps {
  spec: OpenApiObject;
  className?: string;
}

// Codegen组件支持的方法类型（从CodegenProps中提取）
type CodegenMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 辅助函数：转换requestBody为Codegen组件需要的格式
const transformRequestBody = (
  requestBody: ReferenceObject | RequestBodyObject | undefined,
  components?: ComponentsObject
) => {
  if (!requestBody) return undefined;

  // 解析引用
  const resolvedRequestBody = resolveRef<RequestBodyObject>(requestBody, components, 'requestBodies');
  if (!resolvedRequestBody || !resolvedRequestBody.content) return undefined;

  // 获取content类型，优先使用application/json
  const contentType =
    resolvedRequestBody.content['application/json'] ?
      'application/json' :
      Object.keys(resolvedRequestBody.content)[0];

  if (!contentType || !resolvedRequestBody.content[contentType].schema) return undefined;

  const schema = resolvedRequestBody.content[contentType].schema;
  // 解析可能存在的schema引用
  const resolvedSchema = resolveRef(schema, components, 'schemas');
  if (!resolvedSchema) return undefined;

  // 提取类型信息
  const type = typeof resolvedSchema === 'object' && 'type' in resolvedSchema ? resolvedSchema.type : 'object';

  // 提取属性
  const properties: { name: string; type: string }[] = [];
  if (typeof resolvedSchema === 'object' && 'properties' in resolvedSchema && resolvedSchema.properties) {
    Object.entries(resolvedSchema.properties).forEach(([propName, propSchema]) => {
      const propType = typeof propSchema === 'object' && 'type' in propSchema ?
        propSchema.type as string : 'object';
      properties.push({ name: propName, type: propType });
    });
  }

  return {
    type: type as string,
    properties
  };
};

const OpenApiLayout: React.FC<OpenApiLayoutProps> = ({ spec, className }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<{ path: string; method: string; operation: OperationObject } | null>(null);

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
        filtered[path] = pathItem; // Keep original pathItem
      }
    }
    return filtered;
  }, [spec.paths, spec.components, activeTag]);

  // 更新选择的操作
  const handleSelectOperation = (operationId: string, path: string, method: string, operation: OperationObject) => {
    setSelectedOperationId(operationId);
    setSelectedOperation({
      path,
      method: method.toUpperCase(),
      operation
    });

    // 滚动到选中的操作
    setTimeout(() => {
      const element = document.getElementById(`operation-${operationId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className={`flex min-h-screen ${className}`}>
      {/* Left Sidebar (Navigation) */}
      <div className="w-72 flex-shrink-0">
        <NavigationSidebar
          openapi={spec}
          onSelectOperation={(path, method, operation) => {
            const operationId = operation.operationId || `${method}-${path}`;
            handleSelectOperation(operationId, path, method, operation);
          }}
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
          <div className="">
            {/* Title reflects filtering */}
            <SectionTitle
              title={activeTag ? `Operations tagged "${activeTag}"` : "All Operations"}
              className="text-2xl mb-6" />
            <div className="space-y-4">
              {Object.entries(filteredPaths).map(([path, pathItemOrRef]) => {
                // Resolve PathItem ref again here for rendering path params
                const resolvedPathItem = resolveRef<PathItemObject>(pathItemOrRef, spec.components, 'pathItems');
                if (!resolvedPathItem) return null; // Skip if ref resolution fails

                return (
                  <div key={path} className="space-y-4">
                    {/* Render each operation within the resolved path item */}
                    {Object.entries(resolvedPathItem).map(([method, operationOrRef]) => {
                      // Resolve operation ref
                      const operation = resolveRef<OperationObject>(operationOrRef, spec.components, 'operations');
                      if (!operation) return null; // Skip if op ref fails

                      // Render only if 'All' is selected or operation has the active tag
                      if (activeTag === null || (operation.tags && operation.tags.includes(activeTag))) {
                        const operationId = operation.operationId || `${method}-${path}`;
                        return (
                          <div key={`${method}-${path}`} id={`operation-${operationId}`}>
                            <OperationBox
                              onSelectOperation={() => handleSelectOperation(operationId, path, method, operation)}
                              path={path}
                              method={method.toUpperCase()}
                              operation={operation}
                              components={spec.components}
                            />
                          </div>
                        );
                      }
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
          <ComponentsSection components={spec.components as any} className="mt-12" />
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
      {selectedOperation && (
        <aside className="w-1/3 flex-shrink-0 p-4 border-l bg-gray-50">
          <div className="sticky top-4">
            <Codegen
              endpoint={selectedOperation.path}
              method={selectedOperation.method as HttpMethod}
              components={spec.components}
              requestBody={selectedOperation.operation.requestBody}
              parameters={selectedOperation.operation.parameters || []}
            />
          </div>
        </aside>
      )}
    </div>
  );
};

export default OpenApiLayout;
