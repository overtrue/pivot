import { type Registry } from "shadcn/registry";

export const lib: Registry["items"] = [
  {
    "name": "hooks",
    "type": "registry:lib",
    "files": [
      {
        "path": "registry/lib/hooks/index.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/hooks/use-openapi.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/hooks/use-operation.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/hooks/use-schema.ts",
        "type": "registry:lib"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/use-openapi",
      "https://pivotkit.vercel.app/r/use-operation",
      "https://pivotkit.vercel.app/r/use-schema",
      "https://pivotkit.vercel.app/r/resolve-ref"
    ]
  },
  {
    "name": "utils",
    "type": "registry:lib",
    "files": [
      {
        "path": "registry/lib/utils/generate-example.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/utils/index.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/utils/resolve-ref.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/utils/schema-utils.ts",
        "type": "registry:lib"
      },
      {
        "path": "registry/lib/utils/type-utils.ts",
        "type": "registry:lib"
      }
    ],
    "dependencies": [
      "@faker-js/faker",
      "openapi-types"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/schema-utils",
      "https://pivotkit.vercel.app/r/type-utils"
    ]
  }
];
