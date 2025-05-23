import { useI18n } from '@/lib/i18n/i18n-provider';
import {
  ComponentsObject,
  DataType,
  ReferenceObject,
  SchemaObject
} from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import { resolveRef } from '@/utils/resolveRef';
import { default as DefaultValueDisplay, default as DeprecatedBadge, default as DescriptionDisplay, default as EnumValuesDisplay, default as FormatBadge, default as RequiredBadge, default as SchemaConstraints, default as TypeIndicator } from './section-title';
import SchemaCompositionDisplay from './schema-composition-display'; // Import composition helper

interface SchemaDisplayProps {
  schema: SchemaObject | ReferenceObject;
  components?: ComponentsObject;
  // 为了支持嵌套显示时的深度控制
  currentDepth?: number;
  maxDepth?: number;
  className?: string;
}

const MAX_DEPTH = 10; // Simple depth limit to prevent infinite loops

// --- Collapsible Icon --- (Simple SVG Chevron)
const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
  <svg
    className={cn(`w-3 h-3 transition-transform duration-200 ease-in-out`, isExpanded ? 'rotate-90' : 'rotate-0')}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 5l7 7-7 7"></path>
  </svg>
);

// Helper function to get item type string
const getItemTypeString = (itemSchemaOrRef: SchemaObject | ReferenceObject | undefined, components: ComponentsObject | undefined): string => {
  if (!itemSchemaOrRef) return 'any';
  const resolvedItemSchema = resolveRef<SchemaObject>(itemSchemaOrRef, components, 'schemas');
  if (!resolvedItemSchema) return 'unresolved';

  if (resolvedItemSchema.type) return resolvedItemSchema.type;
  if (resolvedItemSchema.properties || typeof resolvedItemSchema.additionalProperties === 'object') return 'object'; // Infer object
  if (resolvedItemSchema.items) return 'array'; // Infer array
  if (resolvedItemSchema.allOf || resolvedItemSchema.anyOf || resolvedItemSchema.oneOf) return 'composition'; // Indicate composition

  return 'any'; // Default fallback
};

// New Component to render individual properties in the desired format
const PropertyDisplay: React.FC<{
  propName: string;
  propSchemaOrRef: SchemaObject | ReferenceObject;
  isRequired: boolean;
  components?: ComponentsObject;
  currentDepth: number;
  className?: string | string[];
}> = ({ propName, propSchemaOrRef, isRequired, components, currentDepth, className }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const resolvedPropSchema = resolveRef<SchemaObject>(propSchemaOrRef, components, 'schemas');

  if (!resolvedPropSchema) {
    const refString = (propSchemaOrRef && typeof propSchemaOrRef === 'object' && '$ref' in propSchemaOrRef)
      ? (propSchemaOrRef as ReferenceObject).$ref
      : '[invalid schema]';
    return (
      <div className="pl-3 my-2 border-l-2 border-neutral-200 dark:border-neutral-700">
        <div className="font-mono font-medium text-sm mb-1 text-black dark:text-neutral-200">{propName} <span className="text-red-500 dark:text-red-400 text-xs">Error resolving {refString}</span></div>
      </div>
    )
  }

  const {
    type,
    format,
    description,
    default: defaultValue,
    enum: enumValues,
    deprecated,
    items, // For potential inline array display
    properties, // To decide if recursive call is needed
    ...otherConstraints
  } = resolvedPropSchema;

  // Determine display type and collapsibility
  let displayTypeString = type || 'any';
  let isCollapsible = false;
  const isActuallyObject = type === 'object' || properties || typeof otherConstraints.additionalProperties === 'object';
  const isActuallyArray = type === 'array' || items;
  let itemTypeForArray = '';

  if (isActuallyObject) {
    displayTypeString = 'object';
    isCollapsible = true;
  }
  if (isActuallyArray) {
    itemTypeForArray = getItemTypeString(items, components);
    displayTypeString = `array[${itemTypeForArray}]`;
    // Array is collapsible only if its items are objects
    if (itemTypeForArray === 'object') {
      isCollapsible = true;
    }
  }

  // Recursive call is needed only if the property itself is collapsible (i.e., object or array of objects)
  const shouldRecurse = isCollapsible;

  // Define connector width based on collapsibility to ensure text alignment
  const connectorWidthClass = isCollapsible ? 'w-3' : 'w-7'; // Dynamic width
  const iconSpanWidthClass = isCollapsible ? 'w-4' : 'w-0'; // Fixed width for the icon span when it exists

  return (
    <div className={cn('py-1', className)} role='property-item'>
      {/* Property Name Row */}
      <div
        className={cn('group flex items-center flex-wrap gap-x-1 mb-0.5', isCollapsible && 'cursor-pointer')}
        onClick={isCollapsible ? toggleExpansion : undefined}
        role='property-item-header'
      >
        {/* Prefix Connector Line - Conditional width */}
        <div className={cn(connectorWidthClass, 'border-t border-neutral-200 dark:border-neutral-700 group-hover:border-neutral-300 dark:group-hover:border-neutral-600 flex-shrink-0')}></div>

        {/* Icon Span - RENDERED ONLY IF COLLAPSIBLE */}
        {/* This span provides the space and contains the centered icon */}
        <span className={cn(iconSpanWidthClass, 'inline-flex items-center justify-center h-5')}>
          {isCollapsible && (
            <span className="text-neutral-400 dark:text-neutral-500"><ChevronIcon isExpanded={isExpanded} /></span>
          )}
        </span>
        <div className="flex-1 gap-1 flex items-center justify-between">
          {/* Text content follows. Starts at same effective indent */}
          <span className="font-mono text-sm text-black dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white">{propName}</span>

          {/* hover line */}
          <div className="h-px self-center ml-1 flex-grow border-t border-transparent group-hover:border-neutral-300 dark:group-hover:border-neutral-600 transition-colors duration-150"></div>

          {/* Type and other badges */}
          {/* This div is flex-1 to take up remaining space */}
          <div className="flex gap-1 items-center">
            {/* ... rest of header ... */}
            <TypeIndicator type={displayTypeString as DataType}>{displayTypeString}</TypeIndicator>
            {/* {format && <FormatBadge format={format as FormatType} className='text-neutral-400' />} */}
            {deprecated && <DeprecatedBadge />}
            {/* Hover Trailing Line */}
            {isRequired && (
              <>
                {/* required badge */}
                <div className="flex-shrink-0 flex items-center">
                  <RequiredBadge />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Collapsible Section */}
      {/* Adjusted pl based on consistent total indent (w-8) */}    <div className={`pl-10 transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`} role='property-item-content'>
        {/* ... description, default, enum, constraints ... */}
        {description && (
          <DescriptionDisplay description={description as string} className="text-sm text-neutral-500 dark:text-neutral-400 mb-1 pt-0.5" />
        )}

        {defaultValue && (
          <DefaultValueDisplay value={defaultValue} className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5" />
        )}

        {enumValues && (
          <EnumValuesDisplay values={enumValues || []} className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5" />
        )}

        {Object.keys(otherConstraints).length > 0 && (
          <SchemaConstraints schema={{ ...resolvedPropSchema, default: undefined, enum: undefined }} className="text-xs text-neutral-500 dark:text-neutral-400" />
        )}

        {/* Recursive call */}
        {shouldRecurse && (
          <div className="mt-1 pb-0.5" role='property-item-content-children'>
            <SchemaDisplay
              schema={resolvedPropSchema}
              components={components}
              _currentDepth={currentDepth + 1}
              className="border-none p-0"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SchemaDisplay: React.FC<SchemaDisplayProps & { _currentDepth?: number }> = ({
  schema: schemaOrRef,
  components,
  _currentDepth = 0,
  className,
}) => {
  const { t } = useI18n();
  const isRef = typeof schemaOrRef === 'object' && '$ref' in schemaOrRef;
  const refName = isRef ? (schemaOrRef as ReferenceObject).$ref : null;

  const resolvedSchema = resolveRef<SchemaObject>(schemaOrRef, components, 'schemas');

  if (!resolvedSchema) {
    const refString = (schemaOrRef && typeof schemaOrRef === 'object' && '$ref' in schemaOrRef)
      ? (schemaOrRef as ReferenceObject).$ref
      : '[invalid schema object]';
    return (
      <div className={`text-xs text-red-500 dark:text-red-400 p-1 border border-dashed rounded dark:border-red-800 ${className}`}>
        {t("Failed to resolve reference")}: {refString}
      </div>
    );
  }

  if (_currentDepth > MAX_DEPTH) {
    return (
      <div className={`text-xs text-orange-500 dark:text-orange-400 p-1 border border-dashed rounded dark:border-orange-800 ${className}`}>
        Max schema depth reached. Possible circular reference.
      </div>
    );
  }

  const {
    type,
    format,
    description,
    default: defaultValue,
    enum: enumValues,
    deprecated,
    properties,
    required,
    items,
    additionalProperties,
    allOf,
    anyOf,
    oneOf,
    not,
    ...otherConstraints
  } = resolvedSchema;

  const renderComposition = () => (
    <>
      {allOf && <SchemaCompositionDisplay keyword="allOf" subschemas={allOf} components={components} currentDepth={_currentDepth} />}
      {anyOf && <SchemaCompositionDisplay keyword="anyOf" subschemas={anyOf} components={components} currentDepth={_currentDepth} />}
      {oneOf && <SchemaCompositionDisplay keyword="oneOf" subschemas={oneOf} components={components} currentDepth={_currentDepth} />}
      {not && <SchemaCompositionDisplay keyword="not" subschemas={[not]} components={components} currentDepth={_currentDepth} />}
    </>
  );

  const renderBasicInfo = (includeConstraints = true) => (
    <div className="space-y-2">
      {deprecated && <DeprecatedBadge />}
      {description && <DescriptionDisplay description={description} className="text-sm mt-1" />}
      <DefaultValueDisplay value={defaultValue} />
      <EnumValuesDisplay values={enumValues || []} />
      {includeConstraints && <SchemaConstraints schema={resolvedSchema} />}
    </div>
  );

  switch (type) {
    case 'string':
    case 'number':
    case 'integer':
    case 'boolean':
    case 'null':
      return (
        <div className={`p-2 rounded bg-neutral-50/50 dark:bg-neutral-800/50 ${className}`}>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {type && <TypeIndicator type={type as any} />}
            {format && <FormatBadge format={format as any} />}
            {deprecated && <DeprecatedBadge />}
          </div>
          {description && <DescriptionDisplay description={description} className="text-sm mt-1 mb-1 dark:text-neutral-300" />}
          <DefaultValueDisplay value={defaultValue} className="text-xs mb-1" />
          <EnumValuesDisplay values={enumValues || []} className="text-xs mb-1" />
          <SchemaConstraints schema={{ ...resolvedSchema, default: undefined, enum: undefined, description: undefined, deprecated: undefined }} className="text-xs" />
          {renderComposition()}
        </div>
      );

    case 'object':
      return (
        <div className={`${className}`}>
          {_currentDepth === 0 && (
            <>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <TypeIndicator type="object" />
                {deprecated && <DeprecatedBadge />}
              </div>
              {description && <DescriptionDisplay description={description} className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 mb-2" />}
            </>
          )}
          {renderComposition()}
          {properties && Object.keys(properties).length > 0 && (
            <div className="mt-1 border-l border-neutral-200 dark:border-neutral-700">
              {Object.entries(properties).map(([propName, propSchema]) => (
                <PropertyDisplay
                  key={propName}
                  propName={propName}
                  propSchemaOrRef={propSchema}
                  isRequired={(required || []).includes(propName)}
                  components={components}
                  currentDepth={_currentDepth}
                />
              ))}
            </div>
          )}
          {additionalProperties !== undefined && additionalProperties !== false && (
            <div className="mt-2 pl-4 py-2 border-l border-dashed border-neutral-300 dark:border-neutral-600">
              <h4 className="text-xs font-semibold italic text-neutral-500 dark:text-neutral-400 mb-1">Additional Properties</h4>
              {additionalProperties === true ? (
                <span className="text-sm text-neutral-600 dark:text-neutral-300">Allowed: Yes (any type)</span>
              ) : (
                <SchemaDisplay
                  schema={additionalProperties as SchemaObject | ReferenceObject}
                  components={components}
                  _currentDepth={_currentDepth + 1}
                  className="border-none p-0 mt-1"
                />
              )}
            </div>
          )}
        </div>
      );

    case 'array':
      return (
        <div className={`${className}`}>
          {_currentDepth === 0 && (
            <>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {isRef && refName && (
                  <span className="text-xs text-neutral-500 italic">{refName}</span>
                )}
                <TypeIndicator type="array" />
                {deprecated && <DeprecatedBadge />}
              </div>
              {description && <DescriptionDisplay description={description} className="text-sm text-neutral-600 dark:text-neutral-300 mt-1 mb-2" />}
            </>
          )}
          {renderComposition()}
          {items ? (
            <div className="mt-1">
              <SchemaDisplay
                schema={items}
                components={components}
                _currentDepth={_currentDepth + 1}
                className="border-none p-0"
              />
            </div>
          ) : (
            <div className="mt-1 text-xs text-orange-500 dark:text-orange-400 ml-1">{t('Array \'items\' definition is missing.')}</div>
          )}
        </div>
      );

    default:
      if (allOf || anyOf || oneOf || not) {
        return (
          <div className={`p-2 border rounded border-dashed border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800/30 ${className}`}>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 italic">{t('Composition Schema')}</span>
            {deprecated && <DeprecatedBadge />}
            {description && <DescriptionDisplay description={description} className="text-sm mt-1 mb-1 dark:text-neutral-300" />}
            {renderBasicInfo()}
            {renderComposition()}
          </div>
        );
      }
      if (properties || typeof additionalProperties === 'object') {
        console.warn(`[SchemaDisplay] Schema treated as 'object' due to presence of 'properties' or 'additionalProperties':`, resolvedSchema);
        const inferredObjectSchema = { ...resolvedSchema, type: 'object' as const };
        return <SchemaDisplay schema={inferredObjectSchema} components={components} _currentDepth={_currentDepth} className={className} />;
      }
      if (items) {
        console.warn(`[SchemaDisplay] Schema treated as 'array' due to presence of 'items':`, resolvedSchema);
        const inferredArraySchema = { ...resolvedSchema, type: 'array' as const };
        return <SchemaDisplay schema={inferredArraySchema} components={components} _currentDepth={_currentDepth} className={className} />;
      }
      return (
        <div className={`text-xs text-neutral-500 dark:text-neutral-400 p-1 border border-dashed rounded dark:border-neutral-600 ${className}`}>
          {t('Unknown or underspecified schema type.')}
          {description && <DescriptionDisplay description={description} className="block mt-1 dark:text-neutral-300" />}
          {renderComposition()}
        </div>
      );
  }
};

const ExportedSchemaDisplay: React.FC<SchemaDisplayProps> = (props) => {
  return <SchemaDisplay {...props} _currentDepth={props.currentDepth || 0} />;
};

export default ExportedSchemaDisplay;
