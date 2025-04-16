'use client';

import { OpenApiSpec } from '@/types/openapi';
import { useEffect, useState } from 'react';
import OpenApiLayout from '../../components/layouts/OpenApiLayout';

// 默认的 Swagger Petstore URL
const DEFAULT_URL = 'https://petstore3.swagger.io/api/v3/openapi.json';

export default function TryPage() {
  const [url, setUrl] = useState<string>(DEFAULT_URL);
  const [openApiSpec, setOpenApiSpec] = useState<OpenApiSpec | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 当组件加载时，自动加载默认 URL
  useEffect(() => {
    loadOpenApiSpec(DEFAULT_URL);
  }, []);

  // 加载 OpenAPI 规范
  const loadOpenApiSpec = async (specUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(specUrl);
      if (!response.ok) {
        throw new Error(`HTTP 错误: ${response.status}`);
      }

      const data = await response.json();
      setOpenApiSpec(data);
    } catch (err) {
      setError(`加载失败: ${err instanceof Error ? err.message : '未知错误'}`);
      setOpenApiSpec(null);
    } finally {
      setLoading(false);
    }
  };

  // 处理 URL 输入变化
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadOpenApiSpec(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部栏 */}
      <div className="bg-gray-100 p-4 border-b">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="输入 OpenAPI JSON URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? '加载中...' : '加载'}
          </button>
        </form>
      </div>

      {/* 主体内容 */}
      <div className="flex-1">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="text-xl text-gray-500">加载中...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-full">
            <div className="text-xl text-red-500">{error}</div>
          </div>
        )}

        {!loading && !error && !openApiSpec && (
          <div className="flex justify-center items-center h-full">
            <div className="text-xl text-gray-500">请输入 OpenAPI 规范 URL 并加载</div>
          </div>
        )}

        {!loading && !error && openApiSpec && (
          <OpenApiLayout spec={openApiSpec} />
        )}
      </div>
    </div>
  );
}
