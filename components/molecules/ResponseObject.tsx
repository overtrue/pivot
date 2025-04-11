import React, { useState } from 'react';
import StatusCode from '../atoms/http/StatusCode';
import HeaderItem from '../atoms/response/HeaderItem';
import LinkItem from '../atoms/response/LinkItem';
import ExpandCollapse from '../interactive/ExpandCollapse';

interface ResponseObjectProps {
  code: string;
  description: string;
  content?: Record<string, {
    schema?: any;
    examples?: Record<string, {
      value: any;
      summary?: string;
      description?: string;
    }>;
    example?: any;
    encoding?: Record<string, {
      contentType?: string;
      headers?: Record<string, any>;
      style?: string;
      explode?: boolean;
      allowReserved?: boolean;
    }>;
  }>;
  headers?: Record<string, {
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    schema?: any;
    style?: 'simple' | 'matrix' | 'label' | 'form';
    explode?: boolean;
    example?: any;
    examples?: Record<string, {
      value: any;
      summary?: string;
      description?: string;
    }>;
  }>;
  links?: Record<string, {
    operationId?: string;
    operationRef?: string;
    parameters?: Record<string, any>;
    requestBody?: any;
    description?: string;
    server?: {
      url: string;
      description?: string;
      variables?: Record<string, {
        default: string;
        enum?: string[];
        description?: string;
      }>;
    };
  }>;
}

const ResponseObject: React.FC<ResponseObjectProps> = ({
  code,
  description,
  content = {},
  headers = {},
  links = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const mediaTypes = Object.keys(content);
  const hasContent = mediaTypes.length > 0;
  const hasHeaders = Object.keys(headers).length > 0;
  const hasLinks = Object.keys(links).length > 0;
  const hasDetails = hasContent || hasHeaders || hasLinks;

  const [activeTab, setActiveTab] = useState<string>(mediaTypes[0] || '');

  return (
    <div className="border rounded mb-4 overflow-hidden">
      <div className="p-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StatusCode code={code} />
          <span className="text-sm">{description}</span>
        </div>
        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            label={isExpanded ? "隐藏详情" : "显示详情"}
          />
        )}
      </div>

      {isExpanded && hasDetails && (
        <div className="p-4 border-t">
          {/* Headers */}
          {hasHeaders && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">响应头</h4>
              {Object.entries(headers).map(([name, header]) => (
                <HeaderItem
                  key={name}
                  name={name}
                  required={header.required || false}
                  schema={header.schema || { type: 'string' }}
                  description={header.description}
                  deprecated={header.deprecated}
                  style={header.style}
                  explode={header.explode}
                  example={header.example}
                  examples={header.examples}
                />
              ))}
            </div>
          )}

          {/* Content Types */}
          {hasContent && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">内容格式</h4>

              {/* Tabs for media types */}
              <div className="mb-4 border-b">
                <ul className="flex flex-wrap -mb-px">
                  {mediaTypes.map(mediaType => (
                    <li key={mediaType} className="mr-2">
                      <button
                        onClick={() => setActiveTab(mediaType)}
                        className={`inline-block p-2 rounded-t-lg text-sm ${activeTab === mediaType
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                          }`}
                      >
                        {mediaType}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Media type content */}
              {mediaTypes.map(mediaType => (
                <div key={mediaType} className={activeTab === mediaType ? '' : 'hidden'}>
                  <div className="space-y-4">
                    {/* Schema */}
                    {content[mediaType].schema && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">模式</h5>
                        <div className="bg-gray-100 p-3 rounded">
                          <pre className="text-xs overflow-auto">
                            {JSON.stringify(content[mediaType].schema, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Single Example */}
                    {content[mediaType].example !== undefined && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">示例</h5>
                        <div className="bg-gray-100 p-3 rounded">
                          <pre className="text-xs overflow-auto">
                            {JSON.stringify(content[mediaType].example, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Multiple Examples */}
                    {content[mediaType].examples && Object.keys(content[mediaType].examples).length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">示例</h5>
                        <div className="space-y-3">
                          {Object.entries(content[mediaType].examples).map(([name, example]) => (
                            <div key={name} className="border rounded p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-sm">{name}</span>
                                {example.summary && (
                                  <span className="text-xs text-gray-600">{example.summary}</span>
                                )}
                              </div>
                              {example.description && (
                                <p className="text-xs text-gray-700 mb-2">{example.description}</p>
                              )}
                              <div className="bg-gray-100 p-2 rounded">
                                <pre className="text-xs overflow-auto">
                                  {JSON.stringify(example.value, null, 2)}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Encoding */}
                    {content[mediaType].encoding && Object.keys(content[mediaType].encoding).length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">编码属性</h5>
                        <div className="space-y-2">
                          {Object.entries(content[mediaType].encoding).map(([property, encoding]) => (
                            <div key={property} className="border rounded p-2">
                              <div className="font-medium text-sm mb-1">{property}</div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                {encoding.contentType && (
                                  <>
                                    <div className="text-gray-600">Content Type:</div>
                                    <div>{encoding.contentType}</div>
                                  </>
                                )}
                                {encoding.style && (
                                  <>
                                    <div className="text-gray-600">Style:</div>
                                    <div>{encoding.style}</div>
                                  </>
                                )}
                                {encoding.explode !== undefined && (
                                  <>
                                    <div className="text-gray-600">Explode:</div>
                                    <div>{encoding.explode.toString()}</div>
                                  </>
                                )}
                                {encoding.allowReserved !== undefined && (
                                  <>
                                    <div className="text-gray-600">Allow Reserved:</div>
                                    <div>{encoding.allowReserved.toString()}</div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          {hasLinks && (
            <div>
              <h4 className="font-semibold mb-3">链接</h4>
              {Object.entries(links).map(([name, link]) => (
                <LinkItem
                  key={name}
                  name={name}
                  operationId={link.operationId}
                  operationRef={link.operationRef}
                  description={link.description}
                  className="mb-2"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseObject;
