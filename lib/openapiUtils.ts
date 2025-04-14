import { OpenApiComponents, ReferenceObject } from '../types/openapi'; // Adjust path if needed

// Function to resolve a JSON Pointer $ref within the OpenAPI document
// Handles basic cycle detection for the CURRENT ref being resolved.
// Does NOT recursively resolve refs within the target object.
export function resolveRef<T = any>(
  refOrObj: T | ReferenceObject,
  components: OpenApiComponents | undefined,
  visitedRefs: Set<string> = new Set() // Still useful for immediate cycle detection
): T | null {
  if (typeof refOrObj !== 'object' || refOrObj === null) {
    return refOrObj;
  }

  if (!('$ref' in refOrObj)) {
    return refOrObj as T;
  }

  const ref = refOrObj.$ref;
  console.log(`[resolveRef] Attempting to resolve: ${ref}`); // Log ref

  if (visitedRefs.has(ref)) {
    console.warn(`[resolveRef] Cycle detected: ${ref}`);
    // Return a special object or null to indicate a cycle was detected at this level
    return { type: 'object', properties: {}, description: `Circular reference detected for ${ref}` } as T;
    // return null;
  }

  visitedRefs.add(ref); // Mark as visited for this specific call path

  const refPath = ref.split('/');
  let result: any = null;

  if (refPath[0] === '#' && refPath[1] === 'components' && components) {
    const componentType = refPath[2] as keyof OpenApiComponents;
    const componentName = refPath[3];
    console.log(`[resolveRef] Parsed path: type=${componentType}, name=${componentName}`); // Log parsed path

    if (componentType && componentName && components[componentType]) {
      const componentMap = components[componentType] as Record<string, any>;
      const target = componentMap?.[componentName];

      if (target) {
        console.log(`[resolveRef] Found target for ${ref}:`, target); // Log found target
        // --- REMOVED RECURSIVE CALL ---
        // Simply return the direct target. Nested refs within target
        // will be resolved by subsequent calls to resolveRef via SchemaRenderer.
        result = target;
      } else {
        console.warn(`[resolveRef] Target not found for ${ref} in components.${componentType}`); // Log not found
        // Log available keys for debugging
        if (componentMap) {
          console.log(`[resolveRef] Available keys in components.${componentType}:`, Object.keys(componentMap));
        }
        result = null; // Ensure null is returned if target not found
      }
    } else {
      console.warn(`[resolveRef] Invalid component type or missing map: ${ref}`);
      console.log(`[resolveRef] components object keys:`, components ? Object.keys(components) : 'undefined'); // Log component keys
      result = null;
    }
  } else {
    console.warn(`[resolveRef] Unsupported $ref format: ${ref}`);
    result = null;
  }

  visitedRefs.delete(ref); // Unmark as visited for this specific call path

  return result as T | null;
}
