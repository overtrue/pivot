import { useI18n } from '@/lib/i18n/i18n-provider';
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
import CallbackDisplay from './callback-display';
import { ComponentType } from './component-tabs';
import ExamplesDisplay from './examples-display';
import HeaderItem from './header-item';
import LinkItem from './link-item';
import ParameterItem from './parameter-item';
import RequestBodySection from './request-body-section';
import ResponseItem from './response-item';
import SchemaDisplay from './schema-display';
import SecuritySchemeDisplay from './security-scheme-display';
import WebhookDisplay from './webhook-display';

interface ComponentDetailProps {
  activeType: ComponentType | null;
  selectedItemName: string | null;
  components: ComponentsObject;
}

const ComponentDetail: React.FC<ComponentDetailProps> = ({ activeType, selectedItemName, components }) => {
  const { t } = useI18n();

  if (!activeType || !selectedItemName || !components[activeType] || !components[activeType]?.[selectedItemName]) {
    return <div className="text-neutral-500 italic p-4">{t('Please select an item from the list.')}</div>;
  }

  const item = components[activeType]?.[selectedItemName];
  if (!item) return <div className="text-red-500 p-4">{t('Error: Selected item not found.')}</div>;

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
      if (!scheme) return <div className="text-red-500 p-4">{t('Cannot resolve security scheme reference.')}</div>;
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
      return <div className="text-red-500 p-4">{t('Error: Unknown component type')} '{activeType}'.</div>;
  }
};

export default ComponentDetail;
