import EnumValuesDisplay from '@/components/atoms/openapi';
import { useI18n } from '@/lib/i18n/i18n-provider';
import { ComponentsObject, ExampleObject, ParameterObject, ReferenceObject, SchemaObject, StyleType } from '@/types/openapi';
import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import DefaultValueDisplay from './atoms/section-title';
import DeprecatedBadge from './atoms/section-title';
import FormatBadge from './atoms/section-title';
import InLabel from './atoms/section-title';
import ParameterDescription from './atoms/section-title';
import ParameterName from './atoms/section-title';
import SchemaConstraints from './atoms/section-title';
import StyleBadge from './atoms/section-title';
import TypeIndicator from './atoms/section-title';
import ExamplesDisplay from '.';
import ExpandCollapse from './interactive';

// 类型守卫函数，检查是否为SchemaObject
function isSchemaObject(obj: SchemaObject | ReferenceObject | undefined): obj is SchemaObject {
  return !!obj && !('$ref' in obj);
}

interface ParameterItemProps extends Omit<ParameterObject, 'schema' | 'examples' | 'style'> {
  schema: SchemaObject; // 要求传入的是SchemaObject而不是引用
  style?: StyleType; // 明确StyleType类型
  examples?: Record<string, ExampleObject | ReferenceObject>;
  components?: ComponentsObject; // 用于解析引用
  className?: string;
  expanded?: boolean; // 控制是否默认展开参数详情
}

const ParameterItem: React.FC<ParameterItemProps> = ({
  name,
  in: paramIn,
  required,
  description,
  deprecated,
  schema,
  style,
  explode,
  examples,
  components,
  className,
  expanded
}) => {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(expanded ?? false);
  const hasDetails = schema.default !== undefined || schema.enum || examples || description ||
    schema.minimum !== undefined || schema.maximum !== undefined ||
    schema.minLength !== undefined || schema.maxLength !== undefined ||
    schema.pattern;

  return (
    <div className={cn('bg-neutral-50 dark:bg-neutral-800 rounded-md overflow-hidden', className)}>
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-2 dark:bg-neutral-800" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex flex-wrap items-center gap-2">
          <ParameterName name={name} deprecated={deprecated} />

          {deprecated && <DeprecatedBadge />}

          {required && (
            <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-0.5 text-xs rounded font-semibold">
              {t('required')}
            </span>
          )}

          {explode && (
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 text-xs rounded">
              {t('explode')}
            </span>
          )}
        </div>

        {hasDetails && (
          <ExpandCollapse
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />
        )}
      </div>

      {isExpanded && hasDetails && (
        <div className="p-4 pt-0 flex flex-col gap-3 dark:bg-neutral-800">
          {description && <ParameterDescription description={description} />}

          <DefaultValueDisplay value={schema.default} />

          <EnumValuesDisplay values={schema.enum || []} />

          <SchemaConstraints schema={schema} />

          {examples && Object.keys(examples).length > 0 && (
            <ExamplesDisplay examples={examples} components={components} />
          )}
          <div className='flex items-center gap-2'>
            <InLabel type={paramIn} />

            {schema.type && (
              <TypeIndicator type={schema.type} />
            )}

            {schema.format && (
              <FormatBadge format={schema.format} />
            )}

            {style && (
              <StyleBadge style={style} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParameterItem;
