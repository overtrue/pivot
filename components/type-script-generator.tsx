import React from 'react';
import { Braces } from 'lucide-react';
import { CodeGenerator, CodeGeneratorParams } from './types';

export class TypeScriptGenerator implements CodeGenerator {
  id = 'typescript';
  label = 'TypeScript';
  
  getIcon() {
    return <Braces size={16} />;
  }
  
  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;
    
    return `// Using fetch API
async function call${method}() {
  const response = await fetch("${endpoint}", {
    method: "${method}",
    headers: {
      "Content-Type": "application/json"
    }${(['POST', 'PUT', 'PATCH'].includes(method) && requestBody) ? `,
    body: JSON.stringify(
${JSON.stringify(requestBodyExample, null, 4).split('\n').map(line => '      ' + line).join('\n')}
    )` : ''}
  });

  const data = await response.json();
  return data;
}`;
  }
}
