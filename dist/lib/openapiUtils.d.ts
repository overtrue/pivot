import { ComponentsObject, ReferenceObject } from '../types/type-script-generator';

export declare function resolveRef<T = any>(refOrObj: T | ReferenceObject, components: ComponentsObject | undefined, visitedRefs?: Set<string>): T | null;
