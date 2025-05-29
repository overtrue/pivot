"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import React, { useState } from "react";
import { resolveRef } from "../lib/resolve-ref";
import { MethodLabel } from "./method-label";

// Import types from the centralized types file
import type {
  ComponentsObject,
  OperationObject,
  ParameterObject,
  ResponseData,
  SecurityRequirementObject,
  SecuritySchemeObject
} from "@/types/openapi";

// Local interface definitions that are specific to this component
interface AuthState {
  apiKey?: { [name: string]: string };
  http?: { [scheme: string]: string };
  oauth2?: { [flow: string]: { token: string; scopes: string[] } };
  openIdConnect?: { token: string };
}

interface TryItOutPanelProps {
  operation: OperationObject; // 必需的，不是可选的
  method: string;
  path: string;
  baseUrl?: string;
  components?: ComponentsObject;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

const TryItOutPanel = React.forwardRef<HTMLDivElement, TryItOutPanelProps>(
  ({
    operation,
    method,
    path,
    baseUrl = '',
    components,
    collapsible = false,
    defaultCollapsed = false,
    className,
  }, ref) => {
    const { t } = useI18n();

    // State
    const [paramValues, setParamValues] = useState<Record<string, string>>({});
    const [requestBodyValue, setRequestBodyValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<ResponseData | null>(null);
    const [headers, setHeaders] = useState<Record<string, string>>({
      'Content-Type': 'application/json',
    });
    const [error, setError] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
    const [authState, setAuthState] = useState<AuthState>({});
    const [activeSecurityScheme, setActiveSecurityScheme] = useState<string | null>(null);

    // Helper functions
    const toggleCollapse = () => {
      if (collapsible) {
        setCollapsed(!collapsed);
      }
    };

    const resolveParameters = () => {
      const resolvedParams: ParameterObject[] = [];

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

    const resolveRequestBody = () => {
      if (!operation.requestBody) return null;
      return operation.requestBody;
    };

    const resolveSecuritySchemes = () => {
      const securityRequirements: SecurityRequirementObject[] = operation.security ||
        (components?.securitySchemes ? [Object.keys(components.securitySchemes).reduce((obj: SecurityRequirementObject, key) => {
          obj[key] = [];
          return obj;
        }, {})] : []);

      if (!securityRequirements.length || !components?.securitySchemes) return [];

      const resolvedSchemes: { name: string; scheme: SecuritySchemeObject; scopes: string[] }[] = [];

      securityRequirements.forEach(requirement => {
        Object.entries(requirement).forEach(([schemeName, scopes]) => {
          const schemeOrRef = components.securitySchemes?.[schemeName];
          if (schemeOrRef) {
            const scheme = resolveRef<SecuritySchemeObject>(schemeOrRef, components, 'securitySchemes');
            if (scheme) {
              resolvedSchemes.push({
                name: schemeName,
                scheme,
                scopes
              });
            }
          }
        });
      });

      return resolvedSchemes;
    };

    const handleParamChange = (name: string, value: string) => {
      setParamValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleRequestBodyChange = (value: string) => {
      setRequestBodyValue(value);
    };

    const handleHeaderChange = (name: string, value: string) => {
      setHeaders((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleAuthChange = (scheme: { name: string; scheme: SecuritySchemeObject; scopes: string[] }, value: string) => {
      const { name, scheme: schemeObj } = scheme;

      setAuthState(prev => {
        const newState = { ...prev };

        switch (schemeObj.type) {
          case 'apiKey':
            if (!newState.apiKey) newState.apiKey = {};
            newState.apiKey[name] = value;
            break;
          case 'http':
            if (!newState.http) newState.http = {};
            newState.http[schemeObj.scheme || ''] = value;
            break;
          case 'oauth2':
            if (!newState.oauth2) newState.oauth2 = {};
            if (!newState.oauth2[name]) {
              newState.oauth2[name] = { token: value, scopes: scheme.scopes };
            } else {
              newState.oauth2[name].token = value;
              newState.oauth2[name].scopes = scheme.scopes;
            }
            break;
          case 'openIdConnect':
            newState.openIdConnect = { token: value };
            break;
        }

        return newState;
      });
    };

    const buildRequestUrl = () => {
      let url = baseUrl + path;
      const parameters = resolveParameters();

      // Replace path parameters
      parameters
        .filter((param) => param.in === 'path')
        .forEach((param) => {
          const value = paramValues[param.name] || '';
          url = url.replace(`{${param.name}}`, encodeURIComponent(value));
        });

      // Add query parameters
      const queryParams = parameters
        .filter((param) => param.in === 'query' && paramValues[param.name])
        .map((param) => `${param.name}=${encodeURIComponent(paramValues[param.name] || '')}`);

      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      return url;
    };

    const buildRequestHeaders = () => {
      const requestHeaders: Record<string, string> = { ...headers };
      const parameters = resolveParameters();
      const securitySchemes = resolveSecuritySchemes();

      // Add header parameters
      parameters
        .filter((param) => param.in === 'header' && paramValues[param.name])
        .forEach((param) => {
          requestHeaders[param.name] = paramValues[param.name] || '';
        });

      // Add auth headers
      if (securitySchemes.length > 0) {
        securitySchemes.forEach(({ name, scheme }) => {
          switch (scheme.type) {
            case 'apiKey':
              if (scheme.in === 'header' && authState.apiKey?.[name]) {
                requestHeaders[scheme.name || ''] = authState.apiKey[name];
              }
              break;
            case 'http':
              if (scheme.scheme === 'basic' && authState.http?.['basic']) {
                requestHeaders['Authorization'] = `Basic ${authState.http['basic']}`;
              } else if (scheme.scheme === 'bearer' && authState.http?.['bearer']) {
                requestHeaders['Authorization'] = `Bearer ${authState.http['bearer']}`;
              }
              break;
            case 'oauth2':
              if (authState.oauth2?.[name]?.token) {
                requestHeaders['Authorization'] = `Bearer ${authState.oauth2[name].token}`;
              }
              break;
            case 'openIdConnect':
              if (authState.openIdConnect?.token) {
                requestHeaders['Authorization'] = `Bearer ${authState.openIdConnect.token}`;
              }
              break;
          }
        });
      }

      return requestHeaders;
    };

    const addAuthQueryParams = (url: string) => {
      const securitySchemes = resolveSecuritySchemes();
      let updatedUrl = url;
      const urlObj = new URL(updatedUrl, window.location.origin);

      securitySchemes.forEach(({ name, scheme }) => {
        if (scheme.type === 'apiKey' && scheme.in === 'query' && authState.apiKey?.[name]) {
          urlObj.searchParams.set(scheme.name || '', authState.apiKey[name]);
        }
      });

      return urlObj.pathname + urlObj.search;
    };

    const sendRequest = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        let url = buildRequestUrl();
        url = addAuthQueryParams(url);

        const requestHeaders = buildRequestHeaders();
        const requestBody = resolveRequestBody();
        let body: string | undefined = undefined;

        if (requestBody && requestBodyValue) {
          try {
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

        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

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
        console.error(t('Request error') + ':', err);
        setError(err instanceof Error ? err.message : t('Error sending request'));
      } finally {
        setIsLoading(false);
      }
    };

    const getStatusStyle = (status: number) => {
      if (status >= 200 && status < 300) {
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      } else if (status >= 400 && status < 500) {
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      } else if (status >= 500) {
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      }
      return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-300';
    };

    const renderAuthInputs = () => {
      const securitySchemes = resolveSecuritySchemes();

      if (!securitySchemes.length) return null;

      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('Authentication')}</h3>
          </div>
          <div className="space-y-3">
            {securitySchemes.length > 1 && (
              <div className="mb-2">
                <label className="text-xs text-neutral-600 dark:text-neutral-400 block mb-1">{t('Select authentication method')}</label>
                <select
                  className="w-full px-2 py-2 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                  value={activeSecurityScheme || ''}
                  onChange={(e) => setActiveSecurityScheme(e.target.value || null)}
                >
                  <option value="">{t('No authentication')}</option>
                  {securitySchemes.map((scheme, index) => (
                    <option key={index} value={scheme.name}>
                      {scheme.name} ({scheme.scheme.type})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {securitySchemes
              .filter(scheme => !activeSecurityScheme || scheme.name === activeSecurityScheme)
              .map((scheme, index) => {
                const { name, scheme: schemeObj } = scheme;

                switch (schemeObj.type) {
                  case 'apiKey':
                    return (
                      <div key={index} className="p-3 border dark:border-neutral-700 rounded bg-blue-50 dark:bg-blue-900/30">
                        <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-2">{t('API Key')} ({schemeObj.in})</div>
                        <label className="text-xs text-neutral-600 dark:text-neutral-400 block mb-1">
                          {schemeObj.name} {schemeObj.description && `- ${schemeObj.description}`}
                        </label>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                          placeholder={`输入 ${schemeObj.name} 值`}
                          value={authState.apiKey?.[name] || ''}
                          onChange={(e) => handleAuthChange(scheme, e.target.value)}
                        />
                      </div>
                    );

                  case 'http':
                    if (schemeObj.scheme === 'basic') {
                      return (
                        <div key={index} className="p-3 border dark:border-neutral-700 rounded bg-green-50 dark:bg-green-900/30">
                          <div className="text-xs font-semibold text-green-800 dark:text-green-300 mb-2">{t('HTTP Basic')}</div>
                          <label className="text-xs text-neutral-600 dark:text-neutral-400 block mb-1">
                            Base64 编码的用户名:密码
                            {schemeObj.description && ` - ${schemeObj.description}`}
                          </label>
                          <input
                            type="text"
                            className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                            placeholder="输入 Base64 编码的认证信息"
                            value={authState.http?.['basic'] || ''}
                            onChange={(e) => handleAuthChange(scheme, e.target.value)}
                          />
                        </div>
                      );
                    } else if (schemeObj.scheme === 'bearer') {
                      return (
                        <div key={index} className="p-3 border dark:border-neutral-700 rounded bg-purple-50 dark:bg-purple-900/30">
                          <div className="text-xs font-semibold text-purple-800 dark:text-purple-300 mb-2">
                            Bearer Token {schemeObj.bearerFormat && `(${schemeObj.bearerFormat})`}
                          </div>
                          <label className="text-xs text-neutral-600 dark:text-neutral-400 block mb-1">
                            Token {schemeObj.description && ` - ${schemeObj.description}`}
                          </label>
                          <input
                            type="text"
                            className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                            placeholder="输入 Bearer Token"
                            value={authState.http?.['bearer'] || ''}
                            onChange={(e) => handleAuthChange(scheme, e.target.value)}
                          />
                        </div>
                      );
                    }
                    break;

                  case 'oauth2':
                    return (
                      <div key={index} className="p-3 border dark:border-neutral-700 rounded bg-orange-50 dark:bg-orange-900/30">
                        <div className="text-xs font-semibold text-orange-800 dark:text-orange-300 mb-2">OAuth 2.0</div>
                        {scheme.scopes.length > 0 && (
                          <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
                            <div className="font-medium mb-1">{t('Required Permissions')}:</div>
                            <ul className="list-disc list-inside space-y-0.5">
                              {scheme.scopes.map((scope, i) => (
                                <li key={i} className="text-neutral-600 dark:text-neutral-400">{scope}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <label className="text-xs text-neutral-600 dark:text-neutral-400 block mb-1">
                          Access Token
                        </label>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                          placeholder="输入 OAuth2 Access Token"
                          value={authState.oauth2?.[name]?.token || ''}
                          onChange={(e) => handleAuthChange(scheme, e.target.value)}
                        />
                      </div>
                    );

                  case 'openIdConnect':
                    return (
                      <div key={index} className="p-3 border dark:border-neutral-700 rounded bg-indigo-50 dark:bg-indigo-900/30">
                        <div className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                          OpenID Connect ({schemeObj.openIdConnectUrl})
                        </div>
                        <label className="text-xs text-neutral-600 dark:text-neutral-400 block mb-1">
                          ID Token
                          {schemeObj.description && ` - ${schemeObj.description}`}
                        </label>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                          placeholder="输入 OpenID Token"
                          value={authState.openIdConnect?.token || ''}
                          onChange={(e) => handleAuthChange(scheme, e.target.value)}
                        />
                      </div>
                    );
                }

                return null;
              })}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn("border dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-800 transition-all", className)}>
        <div
          className={`bg-neutral-50 dark:bg-neutral-800/70 px-4 py-3 flex items-center justify-between ${collapsible ? 'cursor-pointer' : ''}`}
          onClick={collapsible ? toggleCollapse : undefined}
        >
          <div className="flex items-center min-w-0">
            <MethodLabel method={method.toUpperCase() as any} className="mr-2 flex-shrink-0" />
            <div className="text-sm text-neutral-800 dark:text-neutral-200 font-mono truncate overflow-hidden">
              {path}
            </div>
          </div>
          {collapsible && (
            <div className="text-neutral-500 dark:text-neutral-400 flex-shrink-0 ml-2">
              {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="p-4 space-y-4">
            {/* Parameter inputs */}
            {resolveParameters().length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('Request Parameters')}</h3>
                </div>
                <div className="space-y-3">
                  {resolveParameters().map(param => (
                    <div key={param.name} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-7">
                        <div className="flex items-center gap-1">
                          <span className={`text-sm ${param.required ? 'font-semibold' : ''} dark:text-neutral-300`}>
                            {param.name} {param.required && <span className="text-red-500 dark:text-red-400">*</span>}
                          </span>
                          <span className="text-xs bg-neutral-100 dark:bg-neutral-700 px-1 py-0.5 rounded dark:text-neutral-300">{param.in}</span>
                        </div>
                      </div>
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={paramValues[param.name] || ''}
                          onChange={(e) => handleParamChange(param.name, e.target.value)}
                          className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                          placeholder={`Enter ${param.name} value`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Authentication section */}
            {renderAuthInputs()}

            {/* Request body input */}
            {resolveRequestBody() && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('Request Body')}</h3>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  {(() => {
                    const requestBody = resolveRequestBody();
                    if (requestBody && 'description' in requestBody) {
                      return requestBody.description || 'Please enter request body data';
                    }
                    return 'Please enter request body data';
                  })()}
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700 p-1 rounded-md border dark:border-neutral-600">
                  <textarea
                    className="w-full bg-transparent p-2 font-mono text-sm resize-y dark:text-neutral-200"
                    value={requestBodyValue}
                    onChange={(e) => handleRequestBodyChange(e.target.value)}
                    rows={5}
                    placeholder="{ /* Request body data */ }"
                  />
                </div>
              </div>
            )}

            {/* Custom request headers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('Request Headers')}</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(headers).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => {
                          const newHeaders = { ...headers };
                          const oldValue = newHeaders[key];
                          delete newHeaders[key];
                          const newKey = e.target.value;
                          if (newKey && newKey.trim()) {
                            newHeaders[newKey] = oldValue || '';
                          }
                          setHeaders(newHeaders);
                        }}
                        className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                        placeholder="Header name"
                      />
                    </div>
                    <div className="col-span-6">
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleHeaderChange(key, e.target.value)}
                        className="w-full px-2 py-1 border dark:border-neutral-700 rounded text-sm dark:bg-neutral-700 dark:text-neutral-200"
                        placeholder="Value"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => {
                          const newHeaders = { ...headers };
                          delete newHeaders[key];
                          setHeaders(newHeaders);
                        }}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded text-sm transition-colors"
                      >
                        {t('Remove')}
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setHeaders((prev) => ({
                      ...prev,
                      [`Header-${Object.keys(headers).length}`]: '',
                    }));
                  }}
                  className="text-xs px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 transition-colors inline-flex items-center"
                >
                  {t('Add Header')}
                </button>
              </div>
            </div>

            {/* Send request button */}
            <div className="pt-2">
              <button
                onClick={sendRequest}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-md text-white text-sm font-medium inline-flex items-center ${isLoading
                  ? 'bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
                  } transition-colors`}
              >
                <Send size={14} className="mr-1.5" />
                {isLoading ? t("Sending...") : t("Send Request")}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md border border-red-100 dark:border-red-800">
                <p className="text-sm font-medium">{t('Request error')}</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Response results */}
            {response && (
              <div className="mt-4 border dark:border-neutral-700 rounded-md overflow-hidden">
                <div className="bg-neutral-50 dark:bg-neutral-800/70 p-3 border-b dark:border-neutral-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(response.status)}`}>
                      {response.status} {response.statusText}
                    </span>
                    <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {response.time}ms
                    </span>
                  </div>
                </div>
                <div className="divide-y dark:divide-neutral-700">
                  {/* Response headers */}
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{t('Response Headers')}</h4>
                    <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-md border dark:border-neutral-600 overflow-x-auto">
                      <pre className="text-xs font-mono dark:text-neutral-300">
                        {Object.entries(response.headers).map(([key, value]) => (
                          `${key}: ${value}\n`
                        ))}
                      </pre>
                    </div>
                  </div>

                  {/* Response body */}
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{t('Response')}</h4>
                    <div className="bg-neutral-900 text-neutral-100 p-3 rounded-md overflow-x-auto">
                      <pre className="text-xs font-mono whitespace-pre-wrap">
                        {response.body}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

TryItOutPanel.displayName = "TryItOutPanel";

export { TryItOutPanel, type TryItOutPanelProps };

