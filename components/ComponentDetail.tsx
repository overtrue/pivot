'use client';

import {
  CallbackObject,
  ComponentsObject,
  ExampleObject,
  HeaderObject,
  LinkObject,
  ParameterObject,
  PathItemObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
  SchemaObject,
  SecuritySchemeObject
} from '@/types/openapi';
import React from 'react';
import { resolveRef } from '../utils/resolveRef';
import { ComponentType } from './/ComponentTabs';
import ParameterItem from './/ParameterItem';
import CallbackDisplay from './CallbackDisplay';
import ExamplesDisplay from './ExamplesDisplay';
import HeaderItem from './HeaderItem';
import LinkItem from './LinkItem';
import RequestBodySection from './RequestBodySection';
import ResponseItem from './ResponseItem';
import SchemaDisplay from './SchemaDisplay';
import SecuritySchemeDisplay from './SecuritySchemeDisplay';
import { WebhookDisplay } from './WebhookDisplay';

interface ComponentDetailProps {
  activeType: ComponentType | null;
  selectedItemName: string | null;
  components: ComponentsObject;
}

const ComponentDetail: React.FC<ComponentDetailProps> = ({ activeType, selectedItemName, components }) => {
  if (!activeType || !selectedItemName || !components[activeType] || !components[activeType]?.[selectedItemName]) {
    return <div className="text-gray-500 italic p-4">请从列表中选择一项。</div>;
  }

  const item = components[activeType]?.[selectedItemName];
  if (!item) return <div className="text-red-500 p-4">错误：未找到所选项目。</div>;

  switch (activeType) {
    case 'schemas':
      return <SchemaDisplay schema={item as SchemaObject | ReferenceObject} components={components} />;

    case 'responses':
      return <ResponseItem
        code="Component"
        response={item as ResponseObject | ReferenceObject}
        components={components}
      />;

    case 'parameters': {
      const paramItem = item as ParameterObject;
      const schema = paramItem.schema && !('$ref' in paramItem.schema)
        ? paramItem.schema
        : {} as SchemaObject;

      return <ParameterItem
        {...paramItem}
        schema={schema}
        components={components}
      />;
    }

    case 'examples':
      const example = item as ExampleObject;
      return <ExamplesDisplay examples={{ [selectedItemName]: example }} components={components} />;

    case 'requestBodies':
      return <RequestBodySection requestBody={item as RequestBodyObject | ReferenceObject} components={components} />;

    case 'headers':
      return <HeaderItem name={selectedItemName} {...(item as HeaderObject)} components={components} />;

    case 'securitySchemes':
      const scheme = resolveRef<SecuritySchemeObject>(item as SecuritySchemeObject | ReferenceObject, components, 'securitySchemes');
      if (!scheme) return <div className="text-red-500 p-4">无法解析安全方案引用。</div>;
      return <SecuritySchemeDisplay name={selectedItemName} scheme={scheme} />;

    case 'links':
      return <LinkItem name={selectedItemName} {...(item as LinkObject)} />;

    case 'callbacks':
      return <CallbackDisplay name={selectedItemName} callback={item as CallbackObject | ReferenceObject} components={components} />;

    case 'webhooks':
      return <WebhookDisplay
        name={selectedItemName}
        pathItem={item as PathItemObject}
        components={components}
      />;

    default:
      return <div className="text-red-500 p-4">错误：未知组件类型 '{activeType}'。</div>;
  }
};

export default ComponentDetail;
