import { HttpMethod, ParameterObject, RequestBodyObject } from '@/types/openapi';
import { ReactNode } from 'react';

export interface CodeGeneratorParams {
  endpoint: string;
  method: HttpMethod;
  parameters: ParameterObject[];
  requestBody?: RequestBodyObject;
  requestBodyExample: any;
}

export interface CodeGenerator {
  id: string;                // 唯一标识符，如 'curl', 'php'
  label: string;             // 显示名称，如 'cURL', 'PHP'
  getIcon(): ReactNode;      // 返回语言图标
  generateCode(params: CodeGeneratorParams): string;  // 生成代码
}
