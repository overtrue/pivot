'use client';

import Layout from '@/components/layout/Layout';
import ApiInfo from '@/components/molecules/info/ApiInfo'; // 确认路径
import SecuritySchemes from '@/components/molecules/SecuritySchemes';
import Servers from '@/components/molecules/Servers';
import React, { useEffect, useState } from 'react';
// 假设用于渲染其他部分的组件
import ExternalDocs from '@/components/docs/ExternalDocs'; // 使用正确的组件和路径
// import TagsDisplay from '@/components/molecules/TagsDisplay'; // 假设存在 - 暂时注释
// import PathsRenderer from '@/components/organisms/PathsRenderer'; // 不再需要假设的渲染器
import OperationBox from '@/components/molecules/OperationBox'; // 导入 OperationBox
import SchemaDocs from '@/docs/pages/SchemaDocs'; // 尝试使用这个组件

// 导入共享类型
import { OpenApiSpec } from '../types/openapi'; // Adjust path

const DemoPage: React.FC = () => {
  const [url, setUrl] = useState<string>('https://petstore3.swagger.io/api/v3/openapi.json');
  const [openapiData, setOpenapiData] = useState<OpenApiSpec | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!url) {
      setError('请输入 OpenAPI JSON 的 URL');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOpenapiData(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`获取失败: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (typeof data === 'object' && data !== null && data.openapi && data.info) {
        setOpenapiData(data as OpenApiSpec);
      } else {
        throw new Error('获取的数据似乎不是有效的 OpenAPI 3.0 JSON');
      }
    } catch (err: any) {
      setError(`加载 OpenAPI spec 出错: ${err.message}. 请检查 URL 和网络连接，并确保目标服务器允许跨域请求 (CORS)。`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">OpenAPI URL 加载器 (Demo)</h1>
        <p className="text-gray-700 mb-4">
          在此处输入指向 OpenAPI 3.0 JSON 文件的 URL，然后点击加载按钮以渲染文档。
          注意：目标服务器需要配置正确的 CORS 策略以允许浏览器直接获取。
        </p>
        <div className="flex space-x-2 mb-6">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="例如: https://petstore3.swagger.io/api/v3/openapi.json"
            className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFetch}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '加载中...' : '加载/刷新文档'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">错误:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {openapiData && (
          <div className="space-y-8 mt-8 border-t pt-8">
            {openapiData.info && <ApiInfo info={openapiData.info} />}
            {openapiData.externalDocs && (
              <div className="border-t pt-6">
                <ExternalDocs {...openapiData.externalDocs} />
              </div>
            )}
            {openapiData.servers && openapiData.servers.length > 0 && (
              <div className="border-t pt-6">
                <Servers servers={openapiData.servers} />
              </div>
            )}
            {/* {openapiData.tags && openapiData.tags.length > 0 && ( ... )} */}

            {/* 渲染 Paths (API Operations) */}
            {openapiData.paths && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
                <div className="space-y-6">
                  {Object.entries(openapiData.paths).map(([path, pathItem]) => (
                    typeof pathItem === 'object' && pathItem !== null && Object.entries(pathItem).map(([method, operation]) => {
                      if (typeof operation !== 'object' || operation === null || typeof method !== 'string') {
                        return <div key={`${method}-${path}`} className="text-red-500">错误：无效的操作定义</div>;
                      }
                      const validMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];
                      if (!validMethods.includes(method.toLowerCase())) {
                        return null;
                      }

                      return (
                        <OperationBox
                          key={`${method}-${path}`}
                          method={method.toUpperCase() as any}
                          path={path}
                          operation={operation as any}
                          components={openapiData.components}
                        />
                      );
                    })
                  ))}
                </div>
              </div>
            )}

            {/* 渲染 Components (Schemas, SecuritySchemes) */}
            {openapiData.components && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">组件定义</h2>
                {openapiData.components.schemas && (
                  <div className="mb-6">
                    <SchemaDocs schemas={openapiData.components.schemas} />
                  </div>
                )}
                {openapiData.components.securitySchemes && (
                  <SecuritySchemes
                    schemes={Object.entries(openapiData.components.securitySchemes).map(([name, scheme]) => ({ name, ...(scheme as object) }))}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DemoPage;
