/**
 * Check if a schema is a reference object
 */
export function isReferenceObject(obj: any): obj is { $ref: string } {
  return obj && typeof obj === 'object' && '$ref' in obj;
}

/**
 * Check if a schema is a schema object
 */
export function isSchemaObjectNotRef(obj: any): boolean {
  return obj && typeof obj === 'object' && !('$ref' in obj);
}

/**
 * Get the type of a schema
 */
export function getSchemaType(schema: any): string {
  if (schema.type) {
    return schema.type;
  }
  if (schema.allOf) {
    return 'allOf';
  }
  if (schema.oneOf) {
    return 'oneOf';
  }
  if (schema.anyOf) {
    return 'anyOf';
  }
  return 'object';
}

/**
 * Check if a property is required in a schema
 */
export function isPropertyRequired(schema: any, propertyName: string): boolean {
  return schema.required?.includes(propertyName) || false;
}
