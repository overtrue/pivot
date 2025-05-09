import OpenApiLayout from '@/components/layouts/OpenApiLayout';
import { useEffect, useRef, useState } from 'react';

// 预定义的API示例列表
interface ApiExample {
  name: string;
  url: string;
  format: 'json' | 'yaml';
}

const API_EXAMPLES: ApiExample[] = [
  { name: 'Swagger Petstore', url: 'https://petstore3.swagger.io/api/v3/openapi.json', format: 'json' },
  { name: 'DigitalOcean', url: 'https://raw.githubusercontent.com/digitalocean/openapi/main/specification/DigitalOcean-public.v2.yaml', format: 'yaml' },
  { name: 'Box', url: 'https://raw.githubusercontent.com/box/box-openapi/main/openapi.json', format: 'json' },
  { name: 'GitHub', url: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/ghes-3.0/ghes-3.0.json', format: 'json' },
  { name: 'Instagram', url: 'https://api.apis.guru/v2/specs/instagram.com/1.0.0/swagger.yaml', format: 'yaml' },
  { name: 'Netlify', url: 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/netlify/openapi.yaml', format: 'yaml' },
];

export default function App() {
  const [specUrl, setSpecUrl] = useState('https://petstore3.swagger.io/api/v3/openapi.json');
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const prevUrlRef = useRef<string>('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 组件加载时自动加载默认规范
  useEffect(() => {
    loadSpec();
  }, []);

  // 监听 URL 变化，自动加载
  useEffect(() => {
    // 跳过初始加载和相同 URL 的重复加载
    if (specUrl === prevUrlRef.current) {
      return;
    }

    prevUrlRef.current = specUrl;

    // 清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 设置防抖定时器，避免频繁请求
    debounceTimerRef.current = setTimeout(() => {
      loadSpec();
    }, 800);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [specUrl]);

  const loadSpec = async () => {
    if (!specUrl) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(specUrl);

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status} ${response.statusText}`);
      }

      // 获取响应文本，直接传递给OpenApiLayout组件处理
      const text = await response.text();
      setSpec(text);
    } catch (err) {
      setError(`加载OpenAPI规范失败: ${err instanceof Error ? err.message : '未知错误'}`);
      console.error('加载错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-slate-600 to-slate-800 text-white py-2 px-6 shadow-lg">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center">
            <svg
              className="w-7 h-7 mr-2 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
              <line x1="12" y1="22" x2="12" y2="15.5"></line>
              <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
            </svg>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide">Pivot</h1>
          </div>

          <div className="w-full sm:w-auto flex-1 max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* 示例选择器 */}
              <div className="sm:w-1/3">
                <select
                  onChange={(e) => {
                    const selectedExample = API_EXAMPLES.find(ex => ex.url === e.target.value);
                    if (selectedExample) {
                      setSpecUrl(selectedExample.url);
                    }
                  }}
                  className="w-full px-4 py-2 text-sm border border-slate-400 bg-slate-700 bg-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  value={API_EXAMPLES.find(ex => ex.url === specUrl)?.url || ''}
                >
                  <option value="" disabled>选择示例API</option>
                  {API_EXAMPLES.map((example) => (
                    <option key={example.url} value={example.url}>
                      {example.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* URL输入框 */}
              <div className="relative sm:w-2/3">
                <input
                  type="text"
                  value={specUrl}
                  onChange={(e) => setSpecUrl(e.target.value)}
                  placeholder="输入OpenAPI规范URL"
                  className="block w-full px-4 py-2 text-sm border border-slate-400 bg-slate-700 bg-opacity-20 rounded-md text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                {loading && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>
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
            <h2 className="text-xl font-medium text-gray-700 mb-4">输入OpenAPI规范URL</h2>
            <p className="text-gray-500">
              您可以使用上方的输入框输入任何有效的OpenAPI规范URL，系统会自动加载。
            </p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-500"></div>
          </div>
        ) : spec ? (
          <OpenApiLayout spec={spec} />
        ) : null}
      </main>
    </div>
  );
}
