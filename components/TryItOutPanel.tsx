'use client';

import {
  ComponentsObject,
  OperationObject,
  ParameterObject,
  RequestBodyObject
} from '@/types/openapi';
import React, { useState } from 'react';
import { resolveRef } from '../utils/resolveRef';
import OperationPath from './atoms/OperationPath';

// 因为模块可能不存在，我们在这里定义接口
interface ParameterInputListProps {
  parameters: ParameterObject[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  components?: ComponentsObject;
}

interface RequestBodyInputProps {
  requestBody: RequestBodyObject;
  components?: ComponentsObject;
  value: string;
  onChange: (value: string) => void;
}

interface TryItOutPanelProps {
  operation: OperationObject;
  method: string;
  path: string;
  baseUrl?: string;
  components?: ComponentsObject;
}

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}

// 因为导入路径有问题，这些类型可能需要直接用于组件
interface ParameterInputProps {
  parameters: ParameterObject[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  components?: ComponentsObject;
}

interface RequestBodyProps {
  requestBody: RequestBodyObject;
  components?: ComponentsObject;
  value: string;
  onChange: (value: string) => void;
}

const TryItOutPanel: React.FC<TryItOutPanelProps> = ({
  operation,
  method,
  path,
  baseUrl = '',
  components,
}) => {
  // 参数输入值状态
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  // 请求体状态
  const [requestBodyValue, setRequestBodyValue] = useState<string>('');
  // 是否正在发送请求
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 响应数据
  const [response, setResponse] = useState<ResponseData | null>(null);
  // 请求头状态
  const [headers, setHeaders] = useState<Record<string, string>>({
    'Content-Type': 'application/json',
  });
  // 错误信息
  const [error, setError] = useState<string | null>(null);

  // 解析并组合请求参数
  const resolveParameters = () => {
    const resolvedParams: ParameterObject[] = [];

    // 处理参数，包括解析引用
    if (operation.parameters) {
      operation.parameters.forEach((param) => {
        if ('$ref' in param) {
          const resolvedParam = resolveRef<ParameterObject>(param, components, 'parameters');
          if (resolvedParam) {
            resolvedParams.push(resolvedParam);
          }
        } else {
          resolvedParams.push(param);
        }
      });
    }

    return resolvedParams;
  };

  // 解析请求体
  const resolveRequestBody = () => {
    if (!operation.requestBody) return null;

    return operation.requestBody;
  };

  // 处理参数变化
  const handleParamChange = (name: string, value: string) => {
    setParamValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 处理请求体变化
  const handleRequestBodyChange = (value: string) => {
    setRequestBodyValue(value);
  };

  // 处理请求头变化
  const handleHeaderChange = (name: string, value: string) => {
    setHeaders((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 构建请求URL
  const buildRequestUrl = () => {
    let url = baseUrl + path;
    const parameters = resolveParameters();

    // 替换路径参数
    parameters
      .filter((param) => param.in === 'path')
      .forEach((param) => {
        const value = paramValues[param.name] || '';
        url = url.replace(`{${param.name}}`, encodeURIComponent(value));
      });

    // 添加查询参数
    const queryParams = parameters
      .filter((param) => param.in === 'query' && paramValues[param.name])
      .map((param) => `${param.name}=${encodeURIComponent(paramValues[param.name] || '')}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    return url;
  };

  // 设置请求头
  const buildRequestHeaders = () => {
    const requestHeaders: Record<string, string> = { ...headers };
    const parameters = resolveParameters();

    // 添加头部参数
    parameters
      .filter((param) => param.in === 'header' && paramValues[param.name])
      .forEach((param) => {
        requestHeaders[param.name] = paramValues[param.name] || '';
      });

    return requestHeaders;
  };

  // 发送请求
  const sendRequest = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);

      const url = buildRequestUrl();
      const requestHeaders = buildRequestHeaders();

      // 获取解析后的请求体
      const requestBody = resolveRequestBody();
      let body: string | undefined = undefined;

      if (requestBody && requestBodyValue) {
        try {
          // 解析JSON字符串检查是否有效
          JSON.parse(requestBodyValue);
          body = requestBodyValue;
        } catch (e) {
          setError('请求体不是有效的JSON');
          setIsLoading(false);
          return;
        }
      }

      const startTime = Date.now();

      const response = await fetch(url, {
        method: method.toUpperCase(),
        headers: requestHeaders,
        body: ['GET', 'HEAD'].includes(method.toUpperCase()) ? undefined : body,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // 读取响应头
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // 读取响应体
      let responseBody = '';
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const jsonBody = await response.json();
        responseBody = JSON.stringify(jsonBody, null, 2);
      } else if (
        contentType.includes('text/') ||
        contentType.includes('application/xml') ||
        contentType.includes('application/javascript')
      ) {
        responseBody = await response.text();
      } else {
        responseBody = '无法显示二进制响应内容';
      }

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseBody,
        time: duration,
      });

    } catch (err) {
      console.error('请求错误:', err);
      setError(err instanceof Error ? err.message : '发送请求时出错');
    } finally {
      setIsLoading(false);
    }
  };

  // 获取响应状态的样式
  const getStatusStyle = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'bg-green-100 text-green-800';
    } else if (status >= 400 && status < 500) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status >= 500) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  // 渲染响应部分
  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-6 border rounded-md overflow-hidden">
        <div className="bg-gray-50 p-3 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(response.status)}`}>
                {response.status} {response.statusText}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                {response.time}ms
              </span>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">响应头</h4>
            <div className="bg-gray-50 p-2 rounded overflow-x-auto">
              <pre className="text-xs">
                {Object.entries(response.headers).map(([key, value]) => (
                  `${key}: ${value}\n`
                ))}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">响应体</h4>
            <div className="bg-gray-50 p-2 rounded overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {response.body}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 渲染错误信息
  const renderError = () => {
    if (!error) return null;

    return (
      <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
        <p className="text-sm font-medium">请求错误</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  };

  // 渲染请求体部分
  const renderRequestBody = () => {
    const requestBody = resolveRequestBody();
    if (!requestBody) return null;

    // 由于组件可能不存在，返回一个提示信息
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h3 className="text-base font-medium mb-2">请求体</h3>
        <div className="text-sm text-gray-500">
          {('description' in requestBody && requestBody.description) || '请输入请求体数据'}
        </div>
        <textarea
          className="w-full border rounded-md p-2 mt-2 font-mono text-sm"
          value={requestBodyValue}
          onChange={(e) => handleRequestBodyChange(e.target.value)}
          rows={6}
          placeholder="{ /* 请求体数据 */ }"
        />
      </div>
    );
  };

  // 渲染自定义请求头
  const renderCustomHeaders = () => {
    return (
      <div className="mt-4">
        <h3 className="text-base font-medium text-gray-800 mb-2">自定义请求头</h3>
        <div className="space-y-2">
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} className="flex space-x-2">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newHeaders = { ...headers };
                  const oldValue = newHeaders[key];
                  delete newHeaders[key];
                  newHeaders[e.target.value] = oldValue;
                  setHeaders(newHeaders);
                }}
                className="px-3 border rounded-md text-sm"
                placeholder="请求头名称"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleHeaderChange(key, e.target.value)}
                className="px-3 border rounded-md text-sm"
                placeholder="值"
              />
              <button
                onClick={() => {
                  const newHeaders = { ...headers };
                  delete newHeaders[key];
                  setHeaders(newHeaders);
                }}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
              >
                删除
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setHeaders((prev) => ({
                ...prev,
                [`Header-${Object.keys(headers).length}`]: '',
              }));
            }}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm"
          >
            添加请求头
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 border rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">试一试</h2>

      {/* 显示路径 */}
      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">{method.toUpperCase()}</span>
          <OperationPath path={path} />
        </div>
        <div className="text-sm text-gray-500">Base URL: {baseUrl || '/'}</div>
      </div>

      <div className="space-y-4">
        {/* 参数输入 - 简化版 */}
        <div className="mt-4">
          <h3 className="text-base font-medium mb-2">参数</h3>
          <div className="space-y-2">
            {resolveParameters().map(param => (
              <div key={param.name} className="flex items-center gap-2">
                <span className={`text-sm ${param.required ? 'font-semibold' : ''}`}>
                  {param.name} {param.required && <span className="text-red-500">*</span>}
                </span>
                <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">{param.in}</span>
                <input
                  type="text"
                  value={paramValues[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  className="flex-1 px-2 py-1 border rounded text-sm"
                  placeholder={param.description || ''}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 请求体输入 */}
        {renderRequestBody()}

        {/* 自定义请求头 */}
        {renderCustomHeaders()}

        {/* 发送请求按钮 */}
        <div className="mt-6">
          <button
            onClick={sendRequest}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium ${isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isLoading ? '发送中...' : '发送请求'}
          </button>
        </div>

        {/* 错误信息 */}
        {renderError()}

        {/* 响应结果 */}
        {renderResponse()}
      </div>
    </div>
  );
};

export default TryItOutPanel;
