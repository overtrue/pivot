import { ComponentsObject, ReferenceObject } from '../types/openapi';

export declare function resolveRef<T = any>(refOrObj: T | ReferenceObject, components: ComponentsObject | undefined, visitedRefs?: Set<string>): T | null;
