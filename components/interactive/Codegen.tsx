import React, { useState } from 'react';

interface CodegenProps {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  parameters?: { name: string; in: string; required: boolean; type: string }[];
  requestBody?: { type: string; properties: { name: string; type: string }[] };
}

const Codegen: React.FC<CodegenProps> = ({ endpoint, method, parameters = [], requestBody }) => {
  const [language, setLanguage] = useState<'typescript' | 'python' | 'curl'>('curl');

  const generateCurlCode = () => {
    let code = `curl -X ${method} "${endpoint}"`;

    // Add headers
    code += ' -H "Content-Type: application/json"';

    // Add query parameters
    const queryParams = parameters.filter(p => p.in === 'query');
    if (queryParams.length > 0) {
      const queryString = queryParams
        .map(p => `${p.name}=value`)
        .join('&');
      code += `?${queryString}`;
    }

    // Add request body
    if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
      code += ` -d '${JSON.stringify({ example: "data" }, null, 2)}'`;
    }

    return code;
  };

  const generateTypeScriptCode = () => {
    return `// Using fetch API
async function call${method}() {
  const response = await fetch("${endpoint}", {
    method: "${method}",
    headers: {
      "Content-Type": "application/json"
    }${['POST', 'PUT', 'PATCH'].includes(method) && requestBody ? `,
    body: JSON.stringify({
      example: "data"
    })` : ''}
  });

  const data = await response.json();
  return data;
}`;
  };

  const generatePythonCode = () => {
    return `# Using requests library
import requests

def call_${method.toLowerCase()}():
    url = "${endpoint}"
    headers = {
        "Content-Type": "application/json"
    }
    ${['POST', 'PUT', 'PATCH'].includes(method) && requestBody ? `
    payload = {
        "example": "data"
    }
    response = requests.${method.toLowerCase()}(url, json=payload, headers=headers)
    ` : `
    response = requests.${method.toLowerCase()}(url, headers=headers)
    `}
    return response.json()`;
  };

  const getCode = () => {
    switch (language) {
      case 'curl':
        return generateCurlCode();
      case 'typescript':
        return generateTypeScriptCode();
      case 'python':
        return generatePythonCode();
      default:
        return '';
    }
  };

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Code Samples</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('curl')}
            className={`px-3 py-1 rounded ${language === 'curl' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            cURL
          </button>
          <button
            onClick={() => setLanguage('typescript')}
            className={`px-3 py-1 rounded ${language === 'typescript' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            TypeScript
          </button>
          <button
            onClick={() => setLanguage('python')}
            className={`px-3 py-1 rounded ${language === 'python' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Python
          </button>
        </div>
      </div>
      <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
        <code>{getCode()}</code>
      </pre>
    </div>
  );
};

export default Codegen;
