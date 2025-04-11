'use client';

import CopyButton from '@/components/interactive/CopyButton';
import MockServer from '@/components/interactive/MockServer';
import SearchBar from '@/components/interactive/SearchBar';
import React, { useState } from 'react';

const PlaygroundPage: React.FC = () => {
  const [operations, setOperations] = useState([
    {
      method: 'GET',
      path: '/users',
      parameters: [
        { inType: 'query', name: 'page', required: false, type: 'integer' },
        { inType: 'query', name: 'limit', required: false, type: 'integer' },
      ],
      schemas: [
        {
          name: 'User',
          properties: [
            { name: 'id', type: 'integer', description: 'User ID' },
            { name: 'name', type: 'string', description: 'User name' },
          ],
        },
      ],
    },
    {
      method: 'POST',
      path: '/users',
      parameters: [
        { inType: 'body', name: 'user', required: true, type: 'object' },
      ],
      schemas: [
        {
          name: 'NewUser',
          properties: [
            { name: 'name', type: 'string', description: 'User name' },
            { name: 'email', type: 'string', description: 'User email' },
          ],
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeComponent, setActiveComponent] = useState('all');

  const filteredOperations = operations.filter((operation) =>
    operation.path.includes(searchQuery)
  );

  const addOperation = () => {
    setOperations((prev) => [
      ...prev,
      {
        method: 'PUT',
        path: '/users/{id}',
        parameters: [
          { inType: 'path', name: 'id', required: true, type: 'integer' },
        ],
        schemas: [
          {
            name: 'UpdateUser',
            properties: [
              { name: 'name', type: 'string', description: 'Updated user name' },
              { name: 'email', type: 'string', description: 'Updated user email' },
            ],
          },
        ],
      },
    ]);
  };

  // 组件演示区域
  const renderComponentDemo = () => {
    switch (activeComponent) {
      case 'searchBar':
        return (
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-bold mb-4">SearchBar 组件</h3>
            <p className="mb-2">SearchBar 组件用于搜索操作:</p>
            <SearchBar onSearch={(q) => console.log(`搜索: ${q}`)} />
          </div>
        );
      case 'copyButton':
        return (
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-bold mb-4">CopyButton 组件</h3>
            <p className="mb-2">CopyButton 组件用于复制文本:</p>
            <CopyButton text="这是要复制的示例文本" />
          </div>
        );
      case 'mockServer':
        return (
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-bold mb-4">MockServer 组件</h3>
            <p className="mb-2">MockServer 组件用于模拟API服务器:</p>
            <MockServer />
          </div>
        );
      case 'apiLayout':
        return (
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-bold mb-4">API 接口列表</h3>
            <p className="mb-2">当前共有 {filteredOperations.length} 个API端点:</p>
            <div className="mt-4">
              {filteredOperations.map((operation, idx) => (
                <div key={idx} className="mb-4 p-3 border rounded-md">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${operation.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                        operation.method === 'POST' ? 'bg-green-100 text-green-800' :
                          operation.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            operation.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                      }`}>
                      {operation.method}
                    </span>
                    <span className="ml-2 font-mono">{operation.path}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">参数:</p>
                    <ul className="ml-4 list-disc">
                      {operation.parameters.map((param, pIdx) => (
                        <li key={pIdx} className="text-sm">
                          {param.name} ({param.type}) - {param.required ? '必填' : '可选'} - 位于 {param.inType}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'all':
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">API 接口概览</h2>
            <p>以下是可用的 API 端点列表：</p>

            {filteredOperations.length > 0 ? (
              <div className="mt-4">
                {filteredOperations.map((operation, idx) => (
                  <div key={idx} className="mb-4 p-4 border rounded-md shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${operation.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                          operation.method === 'POST' ? 'bg-green-100 text-green-800' :
                            operation.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                              operation.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                        }`}>
                        {operation.method}
                      </span>
                      <span className="ml-2 font-mono font-medium">{operation.path}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold">参数:</p>
                        {operation.parameters.length > 0 ? (
                          <ul className="ml-4 list-disc">
                            {operation.parameters.map((param, pIdx) => (
                              <li key={pIdx} className="text-sm">
                                {param.name} ({param.type}) - {param.required ? '必填' : '可选'} - 位于 {param.inType}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">无参数</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">模型:</p>
                        {operation.schemas.length > 0 ? (
                          <ul className="ml-4 list-disc">
                            {operation.schemas.map((schema, sIdx) => (
                              <li key={sIdx} className="text-sm">
                                <span className="font-medium">{schema.name}</span>
                                <ul className="ml-4 list-disc">
                                  {schema.properties.map((prop, propIdx) => (
                                    <li key={propIdx} className="text-xs">
                                      {prop.name} ({prop.type}): {prop.description}
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">无模型定义</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">没有找到匹配的 API 端点。</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">OpenAPI Playground</h1>

      {/* 导航菜单 */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveComponent('all')}
          className={`px-4 py-2 rounded ${activeComponent === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          所有组件
        </button>
        <button
          onClick={() => setActiveComponent('searchBar')}
          className={`px-4 py-2 rounded ${activeComponent === 'searchBar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          SearchBar
        </button>
        <button
          onClick={() => setActiveComponent('copyButton')}
          className={`px-4 py-2 rounded ${activeComponent === 'copyButton' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          CopyButton
        </button>
        <button
          onClick={() => setActiveComponent('mockServer')}
          className={`px-4 py-2 rounded ${activeComponent === 'mockServer' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          MockServer
        </button>
        <button
          onClick={() => setActiveComponent('apiLayout')}
          className={`px-4 py-2 rounded ${activeComponent === 'apiLayout' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          ApiLayout
        </button>
      </div>

      {/* 搜索栏 - 只在需要时显示 */}
      {(activeComponent === 'all' || activeComponent === 'apiLayout' || activeComponent === 'searchBar') && (
        <SearchBar onSearch={setSearchQuery} />
      )}

      {/* 如果是所有组件视图，显示添加操作按钮 */}
      {activeComponent === 'all' && (
        <button
          onClick={addOperation}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          添加操作
        </button>
      )}

      {/* 组件演示区域 */}
      <div className="component-demo">
        {renderComponentDemo()}
      </div>
    </div>
  );
};

export default PlaygroundPage;
