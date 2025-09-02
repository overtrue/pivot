import type { OpenAPIV3 } from "openapi-types";

// Configuration for resolver behavior
export interface RefResolverConfig {
  maxDepth?: number;
  enableDeepResolve?: boolean;
  enableLogging?: boolean;
  cacheKeyPrefix?: string;
}

/**
 * Enhanced OpenAPI reference resolver with intelligent caching
 * Handles circular references, performance optimization, and error recovery
 */
export class RefResolver {
  private cache = new Map<string, any>();
  private resolving = new Set<string>();
  private config: RefResolverConfig;
  private resolveDepth = 0;
  private maxDepth = 10;

  constructor(config: RefResolverConfig = {}) {
    this.config = {
      maxDepth: 10,
      enableDeepResolve: false, // Disabled by default for performance
      enableLogging: process.env.NODE_ENV === 'development',
      cacheKeyPrefix: '',
      ...config
    };
    this.maxDepth = this.config.maxDepth || 10;
  }

  /**
   * Resolve references with intelligent caching and circular reference detection
   * @param obj - Object that might contain references
   * @param components - OpenAPI components for resolution
   * @param category - Optional component category for validation
   * @returns Resolved object or null
   */
  resolve<T>(
    obj: T | OpenAPIV3.ReferenceObject | undefined,
    components?: OpenAPIV3.ComponentsObject,
    category?: string
  ): T | null {
    if (!obj) return null;

    // Primitive types pass through
    if (typeof obj !== "object" || obj === null) {
      return obj as T;
    }

    // Check if it's a reference object
    if (this.isReference(obj)) {
      return this.resolveReference(obj as OpenAPIV3.ReferenceObject, components, category) as T | null;
    }

    // Deep resolution is optional for performance
    if (!this.config.enableDeepResolve) {
      return obj as T;
    }

    // Prevent infinite recursion
    if (this.resolveDepth >= this.maxDepth) {
      if (this.config.enableLogging) {
        console.warn(`Max resolve depth ${this.maxDepth} reached`);
      }
      return obj as T;
    }

    this.resolveDepth++;
    try {
      // Handle arrays
      if (Array.isArray(obj)) {
        return obj.map(item => this.resolve(item, components, category)) as T;
      }

      // Handle objects - selective property resolution
      const resolved: any = {};
      for (const [key, value] of Object.entries(obj)) {
        // Only resolve if value might contain references
        if (this.mightContainReference(value)) {
          resolved[key] = this.resolve(value, components, category);
        } else {
          resolved[key] = value;
        }
      }
      return resolved as T;
    } finally {
      this.resolveDepth--;
    }
  }

  /**
   * Check if an object is a reference
   */
  private isReference(obj: any): obj is OpenAPIV3.ReferenceObject {
    return obj && typeof obj === 'object' && '$ref' in obj && typeof obj.$ref === 'string';
  }

  /**
   * Quick check if value might contain references
   */
  private mightContainReference(value: any): boolean {
    if (!value || typeof value !== 'object') return false;
    if (this.isReference(value)) return true;
    if (Array.isArray(value)) return value.some(item => this.mightContainReference(item));
    return Object.values(value).some(v => this.isReference(v));
  }

  /**
   * Resolve a reference object
   */
  private resolveReference(
    refObj: OpenAPIV3.ReferenceObject,
    components?: OpenAPIV3.ComponentsObject,
    expectedCategory?: string
  ): any {
    const refPath = refObj.$ref;

    // Generate cache key with context
    const cacheKey = this.config.cacheKeyPrefix + refPath;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Detect circular references
    if (this.resolving.has(refPath)) {
      if (this.config.enableLogging) {
        console.warn(`Circular reference detected: ${refPath}`);
      }
      return null;
    }

    // Mark as resolving
    this.resolving.add(refPath);

    try {
      // Parse reference path
      const resolved = this.parseAndResolveReference(refPath, components, expectedCategory);

      if (resolved !== null) {
        // Cache successful resolution
        this.cache.set(cacheKey, resolved);
      }

      return resolved;
    } finally {
      // Always clean up
      this.resolving.delete(refPath);
    }
  }

  /**
   * Parse and resolve reference path
   */
  private parseAndResolveReference(
    refPath: string,
    components?: OpenAPIV3.ComponentsObject,
    expectedCategory?: string
  ): any {
    // Support standard OpenAPI reference format: #/components/{category}/{name}
    const refMatch = refPath.match(/^#\/components\/([^/]+)\/(.+)$/);

    if (!refMatch || !components) {
      if (this.config.enableLogging) {
        console.warn(`Unable to resolve reference: ${refPath}`);
      }
      return null;
    }

    const [, refCategory, refName] = refMatch;

    if (!refName) {
      if (this.config.enableLogging) {
        console.warn(`Empty reference name: ${refPath}`);
      }
      return null;
    }

    // Validate category if specified
    if (expectedCategory && refCategory !== expectedCategory) {
      if (this.config.enableLogging) {
        console.warn(
          `Reference category mismatch: expected ${expectedCategory}, got ${refCategory}`
        );
      }
    }

    // Get component collection by category
    const componentCollection =
      components[refCategory as keyof OpenAPIV3.ComponentsObject];

    if (!componentCollection || typeof componentCollection !== "object") {
      if (this.config.enableLogging) {
        console.warn(`Component collection not found: ${refCategory}`);
      }
      return null;
    }

    // Get the referenced object
    const resolved = componentCollection[refName];

    if (!resolved) {
      if (this.config.enableLogging) {
        console.warn(`Reference not found: ${refPath}`);
      }
      return null;
    }

    // Handle nested references
    if (this.isReference(resolved)) {
      return this.resolve(resolved as OpenAPIV3.ReferenceObject, components, expectedCategory);
    }

    return resolved;
  }

  /**
   * Clear all cache entries
   */
  clearCache(): void {
    this.cache.clear();
    this.resolving.clear();
    this.resolveDepth = 0;
  }

  /**
   * Clear cache entries matching a pattern
   */
  invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.clearCache();
      return;
    }

    const keysToDelete: string[] = [];
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheStats(): {
    size: number;
    keys: string[];
    resolving: string[];
    config: RefResolverConfig;
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      resolving: Array.from(this.resolving),
      config: this.config
    };
  }

  /**
   * Preload references for better performance
   */
  preloadReferences(
    refs: string[],
    components?: OpenAPIV3.ComponentsObject
  ): void {
    refs.forEach(ref => {
      const refObj: OpenAPIV3.ReferenceObject = { $ref: ref };
      this.resolve(refObj, components);
    });
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<RefResolverConfig>): void {
    this.config = { ...this.config, ...config };
    if (config.maxDepth !== undefined) {
      this.maxDepth = config.maxDepth;
    }
  }
}

// Global resolver instance management
let globalResolver: RefResolver | null = null;

/**
 * Get global resolver instance with optional configuration
 */
export function getGlobalResolver(config?: RefResolverConfig): RefResolver {
  if (!globalResolver) {
    globalResolver = new RefResolver(config);
  } else if (config) {
    globalResolver.updateConfig(config);
  }
  return globalResolver;
}

/**
 * Reset global resolver
 */
export function resetGlobalResolver(): void {
  if (globalResolver) {
    globalResolver.clearCache();
  }
  globalResolver = null;
}

/**
 * Convenient resolve function using global resolver
 */
export function resolveRefWithCache<T>(
  obj: T | OpenAPIV3.ReferenceObject | undefined,
  components?: OpenAPIV3.ComponentsObject,
  category?: string
): T | null {
  return getGlobalResolver().resolve(obj, components, category);
}

/**
 * Debug function to inspect resolver state
 */
export function getResolverDebugInfo(): any {
  if (!globalResolver) {
    return { message: 'No global resolver initialized' };
  }
  return globalResolver.getCacheStats();
}
