import React from 'react';
import { Terminal } from 'lucide-react';
import { CodeGenerator, CodeGeneratorParams } from './types';

export class CurlGenerator implements CodeGenerator {
  id = 'curl';
  label = 'cURL';
  
  getIcon() {
    return <Terminal size={16} />;
  }
  
  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, parameters, requestBodyExample, requestBody } = params;
    let code = `curl -X ${method} "${endpoint}"`;

    // 添加请求头
    code += '\n  -H "Content-Type: application/json"';
    
    // 添加查询参数
    const queryParams = parameters.filter(p => p.in === 'query');
    if (queryParams.length > 0) {
      const queryString = queryParams
        .map(p => `${p.name}=value`)
        .join('&');
      code += `?${queryString}`;
    }
    
    // 添加请求体
    if (['POST', 'PUT', 'PATCH'].includes(method) && requestBody) {
      code += `\n  -d '${JSON.stringify(requestBodyExample, null, 2)}'`;
    }
    
    return code;
  }
}
