import { registry_examples } from "./registry-examples";
import { registry_hooks } from "./registry-hooks";
import { registry_lib } from "./registry-lib";
import { registry_ui } from "./registry-ui";

export const registry = [...registry_ui, ...registry_lib, ...registry_examples, ...registry_hooks];

export * from "./registry-examples";
export * from "./registry-hooks";
export * from "./registry-lib";
export * from "./registry-ui";

