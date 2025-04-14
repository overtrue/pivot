'use client'; // Keep client directive if utils might be used in client components

import { OpenApiComponents, ReferenceObject } from '../types/openapi'; // Adjust path as needed

// Defines the possible keys within the OpenApiComponents object
export type ComponentType = keyof OpenApiComponents;

/**
 * Resolves a potential ReferenceObject ($ref) within the OpenAPI components object.
 * Currently supports local references like '#/components/schemas/MySchema'.
 *
 * @template T The expected type of the resolved object (e.g., SchemaObject, ResponseObject).
 * @param {T | ReferenceObject | undefined | null} objOrRef The object that might be a reference.
 * @param {OpenApiComponents | undefined} components The OpenAPI components object containing definitions.
 * @param {ComponentType} expectedComponentType The expected key within components (e.g., 'schemas', 'responses') for type checking.
 * @returns {T | null} The resolved object of type T, or null if resolution fails or input is null/undefined.
 */
export function resolveRef<T>(
  objOrRef: T | ReferenceObject | undefined | null,
  components: OpenApiComponents | undefined,
  expectedComponentType: ComponentType
): T | null {
  // If input is null, undefined, or falsy, return null
  if (!objOrRef) {
    return null;
  }

  // Check if the object has a $ref property
  if (typeof objOrRef === 'object' && objOrRef !== null && '$ref' in objOrRef) {
    const ref = (objOrRef as ReferenceObject).$ref;

    // Validate the $ref format (basic check for local components)
    if (!ref || typeof ref !== 'string' || !ref.startsWith('#/components/')) {
      console.warn(`[resolveRef] Invalid or unsupported $ref format: ${ref}`);
      return null;
    }

    const parts = ref.split('/');
    // Expected format: #/components/componentType/componentName
    if (parts.length !== 4 || parts[0] !== '#' || parts[1] !== 'components') {
      console.warn(`[resolveRef] Invalid components $ref format: ${ref}`);
      return null;
    }

    const componentType = parts[2] as ComponentType;
    const componentName = parts[3];

    // Check if the component type matches the expected type
    if (componentType !== expectedComponentType) {
      console.warn(`[resolveRef] Expected $ref to point to '${expectedComponentType}', but found '${componentType}': ${ref}`);
      // Depending on strictness, you might return null here.
      // For robustness, we'll proceed but log the warning.
    }

    // Check if components object and the specific component type collection exist
    if (!components || !(componentType in components) || !components[componentType]) {
      console.warn(`[resolveRef] Component type '${componentType}' not found in provided components for $ref: ${ref}`);
      return null;
    }

    // Access the collection (e.g., components.schemas)
    const componentCollection = components[componentType] as Record<string, T | ReferenceObject>;

    // Check if the specific component name exists in the collection
    if (!componentCollection || !(componentName in componentCollection)) {
      console.warn(`[resolveRef] Component name '${componentName}' not found in components.${componentType} for $ref: ${ref}`);
      return null;
    }

    const resolved = componentCollection[componentName];

    // Handle nested/circular references: If the resolved object is itself a $ref, stop here.
    // Deeper resolution could be implemented if needed, but requires cycle detection.
    if (resolved && typeof resolved === 'object' && resolved !== null && '$ref' in resolved) {
      console.warn(`[resolveRef] Resolved object is another $ref (stopping resolution): ${ref} -> ${(resolved as ReferenceObject).$ref}`);
      return null;
    }

    // Return the resolved object, cast to the expected type T
    return resolved as T | null;

  } else {
    // It's not a reference object, so return it directly (cast required for type safety)
    return objOrRef as T;
  }
}
