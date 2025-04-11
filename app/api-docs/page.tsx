'use client';

import SearchBar from '@/components/interactive/SearchBar';
import React, { useState } from 'react';
import Link from 'next/link';

const ApiDocsPage: React.FC = () => {
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
      description: '获取用户列表'
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
      description: '创建新用户'
    },
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
      description: '更新指定用户'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredOperations = operations.filter((operation) =>
    operation.path.includes(searchQuery)
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">OpenAPI 文档</h1>
        <Link href="/playground" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          前往 Playground
        </Link>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <div className="space-y-6">
        <h2 className="text-xl font-bold">API 端点列表</h2>

        {filteredOperations.length > 0 ? (
          <div className="space-y-4">
            {filteredOperations.map((operation, idx) => (
              <div key={idx} className="p-4 border rounded-md shadow-sm">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${
                    operation.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                    operation.method === 'POST' ? 'bg-green-100 text-green-800' :
                    operation.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                    operation.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-gray-100'
                  }`}>
                    {operation.method}
                  </span>
                  <span className="ml-2 font-mono font-medium">{operation.path}</span>
                </div>

                <p className="mb-3 text-gray-700">{operation.description}</p>

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
                    <p className="text-sm font-semibold">响应模型:</p>
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
    </div>
  );
};

export default ApiDocsPage;
