import { ComponentsObject, HeaderObject, ReferenceObject, ResponseObject } from '@/types/openapi';
import React from 'react';
import { resolveRef } from '../utils/resolveRef';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import StatusCode from './atoms/StatusCode';
import ResponseContentSection from './ResponseContentSection';

interface ResponseGroupProps {
  status: string;
  response: ResponseObject;
  components?: ComponentsObject;
}

const ResponseGroup: React.FC<ResponseGroupProps> = ({ status, response, components }) => {
  // 预处理内容类型
  const contentTypes = response.content ? Object.keys(response.content) : [];
  const hasContent = contentTypes.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <StatusCode code={status} />
        {response.description && (
          <span className="text-gray-700 dark:text-gray-300 text-sm">{response.description}</span>
        )}
      </div>

      {/* 使用ResponseContentSection展示内容和示例 */}
      {hasContent && (
        <div className="space-y-3">
          <ResponseContentSection
            content={response.content!}
            components={components}
          />
        </div>
      )}

      {/* 头部信息 */}
      {response.headers && Object.keys(response.headers).length > 0 && (
        <div>
          <h4 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">响应头</h4>
          <div className="border rounded overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(response.headers).map(([name, header]) => {
                  const headerRef = header as HeaderObject | ReferenceObject;
                  const headerObj = '$ref' in headerRef
                    ? resolveRef<HeaderObject>(headerRef, components, 'headers') || { description: '引用对象' }
                    : headerRef as HeaderObject;

                  return (
                    <tr key={name}>
                      <td className="px-3 py-2 text-sm font-mono">{name}</td>
                      <td className="px-3 py-2 text-sm">
                        {headerObj.description && <DescriptionDisplay description={headerObj.description} />}
                      </td>
                      <td className="px-3 py-2 text-sm">
                        {headerObj.schema && 'type' in headerObj.schema ? headerObj.schema.type : '未知'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseGroup;
