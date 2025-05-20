
import { useI18n } from '@/lib/i18n/I18nProvider';
import {
  ComponentsObject,
  ReferenceObject,
  SchemaCompositionKeyword,
  SchemaObject
} from '@/types/openapi'; // 导入SchemaCompositionKeyword
import React from 'react';
import SchemaDisplay from './SchemaDisplay'; // Import the main display component

interface SchemaCompositionDisplayProps {
  keyword: SchemaCompositionKeyword;
  subschemas: (SchemaObject | ReferenceObject)[];
  components?: ComponentsObject;
  currentDepth: number; // Receive depth from parent
  className?: string;
}

// 辅助函数：从引用路径中提取引用名称
const extractRefName = (ref: string): string | null => {
  const refMatch = ref.match(/^#\/components\/([^/]+)\/(.+)$/);
  if (refMatch) {
    return refMatch[2]; // 返回引用名称
  }
  return null;
};

const SchemaCompositionDisplay: React.FC<SchemaCompositionDisplayProps> = ({
  keyword,
  subschemas,
  components,
  currentDepth,
  className,
}) => {
  const { t } = useI18n();

  if (!subschemas || subschemas.length === 0) {
    return null;
  }

  const keywordTitles = {
    allOf: t('All Of'),
    anyOf: t('Any Of'),
    oneOf: t('One Of'),
    not: t('Not'),
  };

  const title = keywordTitles[keyword];
  const borderColor = {
    allOf: 'border-blue-300',
    anyOf: 'border-green-300',
    oneOf: 'border-purple-300',
    not: 'border-red-300',
  }[keyword];

  return (
    <div className={`mt-3 p-3 border rounded ${borderColor} ${className}`}>
      <h4 className="text-sm font-semibold mb-2 text-neutral-700">{title}</h4>
      <div className="space-y-3">
        {subschemas.map((subschema, index) => {
          // 检查是否是引用对象并提取引用名称
          const isRef = typeof subschema === 'object' && subschema !== null && '$ref' in subschema;
          const refName = isRef ? extractRefName((subschema as ReferenceObject).$ref) : null;

          return (
            <div key={index}>
              {refName && (
                <div className="text-xs font-medium text-neutral-500 mb-1">{t('Reference:')} {refName}</div>
              )}
              <SchemaDisplay
                schema={subschema}
                components={components}
                currentDepth={currentDepth + 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchemaCompositionDisplay;
