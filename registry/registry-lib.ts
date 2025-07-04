import { type Registry } from "shadcn/registry";

export const lib: Registry["items"] = [
  {
    "name": "hooks",
    "type": "registry:hook",
    "files": [
      {
        "path": "registry/lib/hooks/use-openapi.ts",
        "type": "registry:hook",
        "target": "registry/lib/hooks/use-openapi.ts"
      },
      {
        "path": "registry/lib/hooks/use-operation.ts",
        "type": "registry:hook",
        "target": "registry/lib/hooks/use-operation.ts"
      },
      {
        "path": "registry/lib/hooks/use-schema.ts",
        "type": "registry:hook",
        "target": "registry/lib/hooks/use-schema.ts"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "i18n",
    "type": "registry:lib",
    "files": [
      {
        "path": "registry/lib/i18n/I18nProvider.tsx",
        "type": "registry:lib",
        "target": "registry/lib/i18n/I18nProvider.tsx"
      },
      {
        "path": "registry/lib/i18n/index.ts",
        "type": "registry:lib",
        "target": "registry/lib/i18n/index.ts"
      },
      {
        "path": "registry/lib/i18n/locales/en.ts",
        "type": "registry:lib",
        "target": "registry/lib/i18n/locales/en.ts"
      },
      {
        "path": "registry/lib/i18n/locales/zh.ts",
        "type": "registry:lib",
        "target": "registry/lib/i18n/locales/zh.ts"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "utils",
    "type": "registry:lib",
    "files": [
      {
        "path": "registry/lib/utils/generate-example.ts",
        "type": "registry:lib",
        "target": "registry/lib/utils/generate-example.ts"
      },
      {
        "path": "registry/lib/utils/resolve-ref.ts",
        "type": "registry:lib",
        "target": "registry/lib/utils/resolve-ref.ts"
      },
      {
        "path": "registry/lib/utils/schema-utils.ts",
        "type": "registry:lib",
        "target": "registry/lib/utils/schema-utils.ts"
      },
      {
        "path": "registry/lib/utils/type-utils.ts",
        "type": "registry:lib",
        "target": "registry/lib/utils/type-utils.ts"
      }
    ],
    "dependencies": [
      "@faker-js/faker",
      "openapi-types"
    ]
  }
];
