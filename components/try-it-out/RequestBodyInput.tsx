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

  return (
    <div className="mt-4">
      <h3 className="text-base font-medium mb-2">请求体</h3>
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
