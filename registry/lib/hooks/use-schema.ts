import { useMemo } from 'react';
import { resolveRef } from '../utils/resolve-ref';

/**
 * Hook for working with OpenAPI schemas
 * @param schema - The schema object or reference
 * @param components - The components object containing schemas
 * @returns Resolved schema and utility functions
 */
export function useSchema(
  schema: any,
  components: any
) {
  return useMemo(() => {
    const resolvedSchema = schema.$ref ? resolveRef(schema, components) : schema;

    const getType = () => {
      if (!resolvedSchema || typeof resolvedSchema !== 'object') return 'unknown';
      return resolvedSchema.type || 'object';
    };

    const isRequired = (propertyName: string) => {
      if (!resolvedSchema || typeof resolvedSchema !== 'object') return false;
      return resolvedSchema.required?.includes(propertyName) || false;
    };

    const getProperties = () => {
      if (!resolvedSchema || typeof resolvedSchema !== 'object') return {};
      return resolvedSchema.properties || {};
    };

    return {
      resolvedSchema,
      getType,
      isRequired,
      getProperties,
    };
  }, [schema, components]);
}
