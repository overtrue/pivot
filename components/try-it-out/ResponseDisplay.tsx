import { ResponseData } from '@/types/openapi';
import { Check, Clipboard } from 'lucide-react';
import React, { useState } from 'react';
import { CodeMirrorEditor } from '../atoms/CodeMirrorEditor';

export interface ResponseDisplayProps {
  response: ResponseData;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  const getStatusStyle = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800';
    if (status >= 400 && status < 500) return 'bg-yellow-100 text-yellow-800';
    if (status >= 500) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFormat = () => setFormatted(!formatted);

  const displayBody = formatted && response.headers?.['content-type']?.includes('json')
    ? tryFormatJson(response.body)
    : response.body;

  return (
    <div className="mt-6 border rounded-md overflow-hidden">
      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(response.status)}`}>
            {response.status} {response.statusText}
          </span>
          <span className="ml-2 text-sm text-gray-600">
            {response.time}ms
          </span>
        </div>
        <div className="flex space-x-2">
          {response.headers?.['content-type']?.includes('json') && (
            <button
              onClick={toggleFormat}
              className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {formatted ? '原始' : '格式化'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            {copied ? <Check size={14} className="mr-1" /> : <Clipboard size={14} className="mr-1" />}
            复制
          </button>
        </div>
      </div>
      <div className="p-4">
        <CodeMirrorEditor
          value={displayBody}
          onChange={() => { }}
          language={response.headers?.['content-type']?.includes('json') ? 'json' : 'text'}
          height="300px"
          readOnly
        />
      </div>
    </div>
  );
};

function tryFormatJson(jsonString: string) {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch {
    return jsonString;
  }
}
