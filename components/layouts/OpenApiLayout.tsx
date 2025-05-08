
import { useOpenApi } from '@/hooks/useOpenApi';
import {
  HttpMethod,
  OpenApiSpec as OpenApiObject,
  OperationObject,
} from '@/types/openapi';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AccordionComponentsSection from '../AccordionComponentsSection';
import ExternalDocsDisplay from '../atoms/ExternalDocsDisplay';
import SectionTitle from '../atoms/SectionTitle';
import InfoSection from '../InfoSection';
import Codegen from '../interactive/Codegen';
import OperationBox from '../OperationBox';
import SecuritySection from '../SecuritySection';
import ServersSection from '../ServersSection';
import TryItOutPanel from '../TryItOutPanel';
import NavigationSidebar from './NavigationSidebar';

interface OpenApiLayoutProps {
  spec: OpenApiObject;
  className?: string;
}

const MIN_SIDEBAR_WIDTH = 280; // 最小宽度
const MAX_SIDEBAR_WIDTH = 350; // 最大宽度
const DEFAULT_SIDEBAR_WIDTH = 280; // 默认宽度

const OpenApiLayout: React.FC<OpenApiLayoutProps> = ({ spec, className }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedOperationId, setSelectedOperationId] = useState<string | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<{ path: string; method: string; operation: OperationObject } | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // 用于直接操作DOM的引用
  const rootRef = useRef<HTMLDivElement>(null);

  // 添加选中的schema状态
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const componentsRef = useRef<HTMLDivElement>(null);

  // 使用自定义钩子处理OpenAPI规范
  const {
    getOperationsByTag,
    components,
    resolve
  } = useOpenApi(spec);

  // 初始化CSS变量
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
    }
  }, [sidebarWidth]);

  // 开始拖动
  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // 处理拖动过程
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !rootRef.current) return;

      // 计算新宽度
      let newWidth = e.clientX;

      // 限制宽度范围
      if (newWidth < MIN_SIDEBAR_WIDTH) newWidth = MIN_SIDEBAR_WIDTH;
      if (newWidth > MAX_SIDEBAR_WIDTH) newWidth = MAX_SIDEBAR_WIDTH;

      // 直接更新CSS变量，避免React状态更新导致的重新渲染
      rootRef.current.style.setProperty('--sidebar-width', `${newWidth}px`);
    };

    const handleMouseUp = () => {
      if (isDragging && rootRef.current) {
        // 获取当前CSS变量值，更新React状态
        const currentWidth = rootRef.current.style.getPropertyValue('--sidebar-width');
        const numWidth = parseInt(currentWidth, 10);
        if (!isNaN(numWidth)) {
          setSidebarWidth(numWidth);
        }
      }
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // 按标签过滤的操作
  const taggedOperations = activeTag
    ? { [activeTag]: getOperationsByTag()[activeTag] || [] }
    : getOperationsByTag();

  // 更新选择的操作
  const handleSelectOperation = useCallback((operationId: string, path: string, method: string, operation: OperationObject) => {
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
  }, []);

  // 处理选择schema的事件
  const handleSelectSchema = (schemaName: string) => {
    setSelectedSchema(schemaName);

    // 先滚动到组件部分
    if (componentsRef.current) {
      componentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 通知AccordionComponentsSection展开对应的schema
    setTimeout(() => {
      // 使用自定义事件通知AccordionComponentsSection
      const event = new CustomEvent('openapi-select-schema', {
        detail: { name: schemaName, type: 'schemas' }
      });
      document.dispatchEvent(event);
    }, 300);
  };

  // 自动选择第一个操作，使页面加载时默认显示内容
  useEffect(() => {
    // 延迟执行，确保组件完全渲染和数据已加载
    const timer = setTimeout(() => {
      if (selectedOperation) return;

      try {
        const operationsByTag = getOperationsByTag();
        const tags = Object.keys(operationsByTag);

        if (tags.length > 0) {
          const firstTag = tags[0];
          const operations = operationsByTag[firstTag];

          if (operations && operations.length > 0) {
            const { path, method, operation } = operations[0];
            const operationId = operation.operationId || `${method}-${path}`;
            handleSelectOperation(operationId, path, method, operation);
            console.log('Auto-selected operation:', operationId);
          }
        }
      } catch (error) {
        console.error('Error auto-selecting operation:', error);
      }
    }, 300); // 给页面渲染预留时间

    return () => clearTimeout(timer);
  }, [spec, handleSelectOperation]); // 只依赖于spec和处理函数

  return (
    <div ref={rootRef} className={`flex min-h-screen ${className} ${isDragging ? 'select-none cursor-ew-resize' : ''}`}>
      {/* Left Sidebar (Navigation) */}
      <div
        ref={sidebarRef}
        className="flex-shrink-0 relative"
        style={{ width: 'var(--sidebar-width)' }}
      >
        <NavigationSidebar
          openapi={spec}
          onSelectOperation={(path, method, operation) => {
            const operationId = operation.operationId || `${method}-${path}`;
            handleSelectOperation(operationId, path, method, operation);
          }}
          onSelectSchema={handleSelectSchema}
        />

        {/* 拖动调整手柄 */}
        <div
          className="absolute top-0 right-0 bottom-0 w-1 bg-transparent hover:bg-slate-400 cursor-ew-resize z-10"
          onMouseDown={startDragging}
        />
      </div>

      {/* Center Content Area */}
      <main className="flex-grow p-8 overflow-y-auto">
        {/* 1. Info Section */}
        <div className="mb-10">
          <SectionTitle title="基本信息" className="text-2xl mb-6 pb-2 border-b" />
          {spec.info && <InfoSection info={spec.info} />}
        </div>

        {/* 2. Servers Section */}
        {spec.servers && spec.servers.length > 0 && (
          <div className="mb-10">
            <SectionTitle title="服务器" className="text-2xl mb-6 pb-2 border-b" />
            <ServersSection servers={spec.servers} />
          </div>
        )}

        {/* 3. Operations Section (Filtered) */}
        <div className="mb-10">
          <SectionTitle
            title={activeTag ? `接口 "${activeTag}"` : '所有接口'}
            className="text-2xl mb-6 pb-2 border-b"
          />

          {Object.keys(taggedOperations).length > 0 ? (
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
          ) : (
            activeTag && (
              <div className="text-gray-500 italic">没有找到标签为 "{activeTag}" 的操作。</div>
            )
          )}
        </div>

        {/* 4. Components Section */}
        {components && Object.keys(components).length > 0 && (
          <div ref={componentsRef} className="mb-10" id="components-section">
            <SectionTitle title="数据模型" className="text-2xl mb-6 pb-2 border-b" />
            <AccordionComponentsSection
              components={components}
              selectedSchema={selectedSchema}
            />
          </div>
        )}

        {/* 5. Security Section */}
        {(spec.security || components?.securitySchemes) && (
          <div className="mb-10">
            <SectionTitle title="安全设置" className="text-2xl mb-6 pb-2 border-b" />
            <SecuritySection
              security={spec.security}
              securitySchemes={components?.securitySchemes}
              components={components}
            />
          </div>
        )}

        {/* 6. External Docs Section (Root Level) */}
        {spec.externalDocs && (
          <div className="mb-10">
            <SectionTitle title="外部文档" className="text-2xl mb-6 pb-2 border-b" />
            <ExternalDocsDisplay externalDocs={spec.externalDocs} />
          </div>
        )}
      </main>

      {/* Right Sidebar (Code Samples Placeholder) */}
      {selectedOperation && (
        <aside className="w-1/3 max-w-screen-md flex-shrink-0 p-4 border-l bg-gray-50">
          <div className="sticky top-4">
            <Codegen
              endpoint={selectedOperation.path}
              method={selectedOperation.method as HttpMethod}
              components={components}
              requestBody={selectedOperation.operation.requestBody}
              parameters={selectedOperation.operation.parameters || []}
              collapsible={true}
              defaultCollapsed={false}
            />

            <div className="mt-6">
              <TryItOutPanel
                operation={selectedOperation.operation}
                method={selectedOperation.method}
                path={selectedOperation.path}
                baseUrl={spec.servers && spec.servers.length > 0 ? spec.servers[0].url : ''}
                components={components}
                collapsible={true}
                defaultCollapsed={true}
              />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default OpenApiLayout;
