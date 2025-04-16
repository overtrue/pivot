'use client';

import { useOpenApi } from '@/hooks/useOpenApi';
import {
  HttpMethod,
  OpenApiSpec as OpenApiObject,
  OperationObject,
} from '@/types/openapi';
import React, { useState } from 'react';
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

const OpenApiLayout: React.FC<OpenApiLayoutProps> = ({ spec, className }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<{ path: string; method: string; operation: OperationObject } | null>(null);

  // 使用自定义钩子处理OpenAPI规范
  const {
    getOperationsByTag,
    components,
    resolve
  } = useOpenApi(spec);

  // 按标签过滤的操作
  const taggedOperations = activeTag
    ? { [activeTag]: getOperationsByTag()[activeTag] || [] }
    : getOperationsByTag();

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
        {Object.keys(taggedOperations).length > 0 ? (
          <div className="mt-12">
            {/* Title reflects filtering */}
            <SectionTitle
              title={activeTag ? `Operations tagged "${activeTag}"` : "All Operations"}
              className="text-2xl mb-6" />

            <div className="space-y-8">
              {Object.entries(taggedOperations).map(([tag, operations]) => (
                <div key={tag} className="space-y-4">
                  {tag !== activeTag && (
                    <h3 className="text-xl font-medium text-gray-700">{tag}</h3>
                  )}

                  {operations.map(({ path, method, operation }) => {
                    const operationId = operation.operationId || `${method}-${path}`;
                    return (
                      <div key={`${method}-${path}`} id={`operation-${operationId}`}>
                        <OperationBox
                          onSelectOperation={() => handleSelectOperation(operationId, path, method, operation)}
                          path={path}
                          method={method.toUpperCase()}
                          operation={operation}
                          components={components}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          activeTag && (
            <div className="mt-12 text-gray-500 italic">没有找到标签为 "{activeTag}" 的操作。</div>
          )
        )}

        {/* 4. Components Section */}
        {components && Object.keys(components).length > 0 && (
          <ComponentsSection components={components} className="mt-12" />
        )}

        {/* 5. Security Section */}
        {(spec.security || components?.securitySchemes) && (
          <SecuritySection
            security={spec.security}
            securitySchemes={components?.securitySchemes}
            components={components}
            className="mt-12"
          />
        )}

        {/* 6. External Docs Section (Root Level) */}
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
              components={components}
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
