import OpenApiLayout from '@/components/layouts/OpenApiLayout';
import { useState } from 'react';

export default function App() {
  const [specUrl, setSpecUrl] = useState('https://raw.githubusercontent.com/box/box-openapi/main/openapi.json');
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSpec = async () => {
    if (!specUrl) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(specUrl);

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSpec(data);
    } catch (err) {
      setError(`加载OpenAPI规范失败: ${err instanceof Error ? err.message : '未知错误'}`);
      console.error('加载错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">OpenAPI UI</h1>

          <div className="w-full sm:w-auto flex-1 max-w-2xl flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={specUrl}
              onChange={(e) => setSpecUrl(e.target.value)}
              placeholder="输入OpenAPI规范URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={loadSpec}
              disabled={!specUrl || loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? '加载中...' : '加载'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {error && (
          <div className="max-w-3xl mx-auto mt-8 px-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
              <p className="font-medium">加载错误</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {!spec && !loading && !error ? (
          <div className="max-w-3xl mx-auto mt-12 text-center px-4">
            <h2 className="text-xl font-medium text-gray-700 mb-4">输入OpenAPI规范URL并点击加载按钮</h2>
            <p className="text-gray-500">
              您可以使用上方的输入框输入任何有效的OpenAPI规范URL，或者使用默认提供的示例。
            </p>
            <div className="mt-8">
              <button
                onClick={loadSpec}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                加载默认示例
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : spec ? (
          <OpenApiLayout spec={spec} />
        ) : null}
      </main>
    </div>
  );
}
