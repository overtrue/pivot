import { ParameterObject, RequestBodyObject } from '@/types/openapi';
import React from 'react';

export interface CodeGeneratorParams {
  endpoint: string;
  method: string;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  requestBodyExample?: any;
}

export interface CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.ReactElement;
  generateCode(params: CodeGeneratorParams): string;
}
