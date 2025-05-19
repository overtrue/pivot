import { useI18n } from '@/lib/i18n/I18nProvider';
import { SchemaObject } from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import React from 'react';

interface SchemaConstraintsProps {
  schema: SchemaObject;
  className?: string;
}

const SchemaConstraints: React.FC<SchemaConstraintsProps> = ({ schema, className }) => {
  const { t } = useI18n();

  // Collect constraints that are present
  const constraints: { label: string; value: React.ReactNode }[] = [];

  if (schema.minimum !== undefined) {
    constraints.push({ label: t('Minimum'), value: <>{schema.minimum}{schema.exclusiveMinimum && ` ${t('(exclusive)')}`}</> });
  }
  if (schema.maximum !== undefined) {
    constraints.push({ label: t('Maximum'), value: <>{schema.maximum}{schema.exclusiveMaximum && ` ${t('(exclusive)')}`}</> });
  }
  if (schema.minLength !== undefined) {
    constraints.push({ label: t('Min Length'), value: schema.minLength });
  }
  if (schema.maxLength !== undefined) {
    constraints.push({ label: t('Max Length'), value: schema.maxLength });
  }
  if (schema.pattern) {
    constraints.push({ label: t('Pattern'), value: <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">{schema.pattern}</code> });
  }
  if (schema.minItems !== undefined) {
    constraints.push({ label: t('Min Items'), value: schema.minItems });
  }
  if (schema.maxItems !== undefined) {
    constraints.push({ label: t('Max Items'), value: schema.maxItems });
  }
  if (schema.uniqueItems) {
    constraints.push({ label: t('Unique Items'), value: 'true' });
  }
  if (schema.minProperties !== undefined) {
    constraints.push({ label: t('Min Properties'), value: schema.minProperties });
  }
  if (schema.maxProperties !== undefined) {
    constraints.push({ label: t('Max Properties'), value: schema.maxProperties });
  }

  if (constraints.length === 0) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <h4 className="text-xs font-semibold mb-1">{t('Constraints')}</h4>
      <ul className="text-xs text-gray-600 dark:text-gray-400 pl-4 list-disc space-y-0.5">
        {constraints.map((constraint) => (
          <li key={constraint.label}>
            <span className="font-medium">{constraint.label}:</span> {constraint.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemaConstraints;
