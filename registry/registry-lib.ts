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
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        target: "lib/utils.ts",
      },
    ],
  },
  {
    name: "use-openapi",
    type: "registry:hook",
    title: "useOpenApi Hook",
    description: "React hook for processing OpenAPI specifications with utility functions.",
    dependencies: ["react"],
    registryDependencies: ["resolve-ref"],
    files: [
      {
        path: "registry/lib/use-openapi.ts",
        type: "registry:hook",
        target: "hooks/use-openapi.ts",
      },
    ],
  },
  {
    name: "use-mounted",
    type: "registry:hook",
    title: "useMounted Hook",
    description: "React hook for checking if component is mounted.",
    dependencies: ["react"],
    files: [
      {
        path: "registry/lib/use-mounted.ts",
        type: "registry:hook",
        target: "hooks/use-mounted.ts",
      },
    ],
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    title: "useIsMobile Hook",
    description: "React hook for detecting mobile breakpoint.",
    dependencies: ["react"],
    files: [
      {
        path: "registry/lib/use-mobile.ts",
        type: "registry:hook",
        target: "hooks/use-mobile.ts",
      },
    ],
  },
  {
    name: "resolve-ref",
    type: "registry:lib",
    title: "resolveRef",
    description: "Utility function for resolving OpenAPI reference objects.",
    files: [
      {
        path: "registry/lib/resolve-ref.ts",
        type: "registry:lib",
        target: "utils/resolve-ref.ts",
      },
    ],
  },
  {
    name: "generate-example",
    type: "registry:lib",
    title: "generateExample",
    description: "Utility function for generating examples from OpenAPI schemas.",
    registryDependencies: ["resolve-ref"],
    files: [
      {
        path: "registry/lib/generate-example.ts",
        type: "registry:lib",
        target: "utils/generate-example.ts",
      },
    ],
  },
];

export { lib };
