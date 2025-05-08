'use client';

import { RequestBodyObject } from '@/types/openapi';
import React from 'react';
import { CodeMirrorEditor } from '../atoms/CodeMirrorEditor';

export interface RequestBodyInputProps {
  requestBody: RequestBodyObject | null;
  value: string;
  onChange: (value: string) => void;
}

export const RequestBodyInput: React.FC<RequestBodyInputProps> = ({
  requestBody,
  value,
  onChange,
}) => {
  if (!requestBody) return null;

  // 获取请求体类型
  const contentTypes = requestBody?.content ? Object.keys(requestBody.content) : [];
  const contentType = contentTypes.find(type => type.includes('json')) || contentTypes[0] || 'application/json';

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-medium">请求体</h3>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{contentType}</span>
      </div>
      <div className="border rounded-md p-3 bg-gray-50">
        <CodeMirrorEditor
          value={value}
          onChange={onChange}
          language="json"
          height="200px"
          placeholder="输入JSON请求体..."
        />
      </div>
    </div>
  );
};
