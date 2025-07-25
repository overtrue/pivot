/**
 * Check if a schema is a reference object
 */
export function isReferenceObject(obj: unknown): obj is { $ref: string } {
  return obj !== null && typeof obj === "object" && "$ref" in obj;
}

/**
 * Check if a schema is a schema object
 */
export function isSchemaObjectNotRef(obj: unknown): boolean {
  return obj !== null && typeof obj === "object" && !("$ref" in obj);
}

/**
 * Get the type of a schema
 */
export function getSchemaType(schema: Record<string, unknown>): string {
  if (schema.type && typeof schema.type === "string") {
    return schema.type;
  }
  if (schema.allOf) {
    return "allOf";
  }
  if (schema.oneOf) {
    return "oneOf";
  }
  if (schema.anyOf) {
    return "anyOf";
  }
  return "object";
}

/**
 * Check if a property is required in a schema
 */
export function isPropertyRequired(schema: Record<string, unknown>, propertyName: string): boolean {
  if (Array.isArray(schema.required)) {
    return schema.required.includes(propertyName);
  }
  return false;
}
