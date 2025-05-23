// Define registry types locally
export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: Array<{
    path: string;
    type: string;
    target?: string;
  }>;
  cssVars?: Record<string, any>;
  meta?: Record<string, any>;
}

export type Registry = RegistryItem[];

const lib: Registry = [
  {
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description: "Utility functions for class name merging.",
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        target: "lib/utils.ts",
      },
    ],
  },
];

export { lib };
