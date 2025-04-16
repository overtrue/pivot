'use client';

import {
  ComponentsObject,
  ParameterObject,
  ReferenceObject,
  SchemaObject
} from '@/types/openapi';
import React from 'react';
import { resolveRef } from '../../../utils/resolveRef';

interface ParameterInputListProps {
  parameters?: (ParameterObject | ReferenceObject)[];
  components?: ComponentsObject;
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const ParameterInputList: React.FC<ParameterInputListProps> = ({
  parameters,
  components,
  values,
  onChange,
}) => {
  if (!parameters || parameters.length === 0) {
    return <div className="text-gray-500 italic">无参数</div>;
  }

  // 解析参数引用并按照位置排序
  const resolvedParameters = parameters
    .map((param) => {
      if ('$ref' in param) {
        return resolveRef<ParameterObject>(param, components, 'parameters');
      }
      return param as ParameterObject;
    })
    .filter(Boolean) as ParameterObject[];

  // 按required和名称排序
  resolvedParameters.sort((a, b) => {
    // 首先按照required排序（必填在前）
    if (a.required && !b.required) return -1;
    if (!a.required && b.required) return 1;

    // 然后按照参数名称字母顺序排序
    return a.name.localeCompare(b.name);
  });

  // 渲染表单控件
  const renderInput = (param: ParameterObject) => {
    const { name, schema, required } = param;
    const value = values[name] || '';

    let inputType = 'text';
    let options: string[] = [];

    if (schema) {
      const resolvedSchema = '$ref' in schema
        ? resolveRef<SchemaObject>(schema, components, 'schemas')
        : schema;

      if (resolvedSchema) {
        // 根据模式类型确定输入类型
        if (resolvedSchema.type === 'integer' || resolvedSchema.type === 'number') {
          inputType = 'number';
        } else if (resolvedSchema.type === 'boolean') {
          inputType = 'select';
          options = ['true', 'false'];
        } else if (resolvedSchema.enum) {
          inputType = 'select';
          options = resolvedSchema.enum.map(String);
        }
      }
    }

    return (
      <div key={name} className="flex flex-col space-y-1">
        <label className="flex items-center space-x-1 text-sm font-medium text-gray-700">
          <span>{name}</span>
          {required && <span className="text-red-500">*</span>}
          {param.description && (
            <span
              className="ml-1 text-gray-400 cursor-help"
              title={param.description}
            >
              ℹ️
            </span>
          )}
        </label>

        {inputType === 'select' ? (
          <select
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required={required}
          >
            <option value="">选择一个值</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={param.example ? `例如: ${param.example}` : ''}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required={required}
          />
        )}

        {param.schema && 'default' in param.schema && param.schema.default !== undefined && (
          <p className="text-xs text-gray-500">
            默认值: {String(param.schema.default)}
          </p>
        )}
      </div>
    );
  };

  // 按参数位置分组
  const pathParams = resolvedParameters.filter((p) => p.in === 'path');
  const queryParams = resolvedParameters.filter((p) => p.in === 'query');
  const headerParams = resolvedParameters.filter((p) => p.in === 'header');
  const cookieParams = resolvedParameters.filter((p) => p.in === 'cookie');

  return (
    <div className="space-y-6">
      {pathParams.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">路径参数</h3>
          <div className="space-y-4">
            {pathParams.map(renderInput)}
          </div>
        </div>
      )}

      {queryParams.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">查询参数</h3>
          <div className="space-y-4">
            {queryParams.map(renderInput)}
          </div>
        </div>
      )}

      {headerParams.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">头部参数</h3>
          <div className="space-y-4">
            {headerParams.map(renderInput)}
          </div>
        </div>
      )}

      {cookieParams.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Cookie参数</h3>
          <div className="space-y-4">
            {cookieParams.map(renderInput)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterInputList;
