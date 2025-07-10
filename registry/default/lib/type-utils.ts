/**
 * Type guards and utility functions for OpenAPI types
 */

export function isParameterObject(obj: unknown): boolean {
  return obj && typeof obj === "object" && "name" in obj && "in" in obj;
}

export function isRequestBodyObject(obj: unknown): boolean {
  return obj && typeof obj === "object" && "content" in obj;
}

export function isResponseObject(obj: unknown): boolean {
  return obj && typeof obj === "object" && "description" in obj;
}

export function isHeaderObject(obj: unknown): boolean {
  return obj && typeof obj === "object" && !("name" in obj) && !("in" in obj);
}

export function isSchemaObject(obj: unknown): boolean {
  return obj && typeof obj === "object" && "type" in obj;
}

export function isComponentObject(obj: unknown): boolean {
  return obj && typeof obj === "object" && !("$ref" in obj) && !("type" in obj);
}

export function isLinkObject(obj: unknown): boolean {
  return (
    obj &&
    typeof obj === "object" &&
    ("operationRef" in obj || "operationId" in obj)
  );
}

export function isExampleObject(obj: unknown): boolean {
  return (
    obj && typeof obj === "object" && ("value" in obj || "externalValue" in obj)
  );
}
