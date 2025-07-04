import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    "name": "accordion-components-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/accordion-components-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/accordion-components-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "lucide-react",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/component-detail"
    ]
  },
  {
    "name": "callback-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/callback-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/callback-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/operation-box"
    ]
  },
  {
    "name": "code-markdown",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/code-markdown.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/code-markdown.tsx"
      }
    ],
    "dependencies": [
      "next-themes",
      "react",
      "react-syntax-highlighter"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/copy-button"
    ]
  },
  {
    "name": "codegen",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/codegen.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/codegen.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "lucide-react",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/code-markdown"
    ]
  },
  {
    "name": "component-detail",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/component-detail.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/component-detail.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/callback-display",
      "https://pivotkit.vercel.app/r/examples-display",
      "https://pivotkit.vercel.app/r/header-item",
      "https://pivotkit.vercel.app/r/link-item",
      "https://pivotkit.vercel.app/r/parameter-item",
      "https://pivotkit.vercel.app/r/request-body-section",
      "https://pivotkit.vercel.app/r/response-item",
      "https://pivotkit.vercel.app/r/schema-display",
      "https://pivotkit.vercel.app/r/security-scheme-display",
      "https://pivotkit.vercel.app/r/webhook-display"
    ]
  },
  {
    "name": "component-items-list",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/component-items-list.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/component-items-list.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "component-tabs",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/component-tabs.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/component-tabs.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "components-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/components-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/components-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/component-items-list",
      "https://pivotkit.vercel.app/r/component-tabs",
      "https://pivotkit.vercel.app/r/section-title"
    ]
  },
  {
    "name": "const-value",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/const-value.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/const-value.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/copy-button"
    ]
  },
  {
    "name": "constraint-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/constraint-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/constraint-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "contact-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/contact-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/contact-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "copy-button",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/copy-button.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/copy-button.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "curl-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/curl-generator.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/curl-generator.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "default-value-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/default-value-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/default-value-display.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/value-display"
    ]
  },
  {
    "name": "deprecated-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/deprecated-badge.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/deprecated-badge.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "description-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/description-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/description-display.tsx"
      }
    ],
    "dependencies": [
      "react",
      "react-markdown"
    ]
  },
  {
    "name": "enum-values-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/enum-values-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/enum-values-display.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/enum-values"
    ]
  },
  {
    "name": "enum-values",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/enum-values.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/enum-values.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/value-display"
    ]
  },
  {
    "name": "example-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/example-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/example-display.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/code-markdown"
    ]
  },
  {
    "name": "examples-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/examples-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/examples-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display"
    ]
  },
  {
    "name": "expand-collapse",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/expand-collapse.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/expand-collapse.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "external-docs-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/external-docs-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/external-docs-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "external-docs",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/external-docs.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/external-docs.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "format-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/format-badge.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/format-badge.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "header-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/header-item.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/header-item.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/deprecated-badge",
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/enum-values-display",
      "https://pivotkit.vercel.app/r/format-badge",
      "https://pivotkit.vercel.app/r/required-badge",
      "https://pivotkit.vercel.app/r/type-indicator",
      "https://pivotkit.vercel.app/r/default-value-display",
      "https://pivotkit.vercel.app/r/examples-display",
      "https://pivotkit.vercel.app/r/expand-collapse"
    ]
  },
  {
    "name": "headers-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/headers-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/headers-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/header-item",
      "https://pivotkit.vercel.app/r/style-badge"
    ]
  },
  {
    "name": "in-label",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/in-label.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/in-label.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "info-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/info-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/info-section.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/contact-display",
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/license-display"
    ]
  },
  {
    "name": "language-switcher",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/language-switcher.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/language-switcher.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "laravel-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/laravel-generator.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/laravel-generator.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "license-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/license-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/license-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "link-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/link-item.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/link-item.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/expand-collapse",
      "https://pivotkit.vercel.app/r/server-display"
    ]
  },
  {
    "name": "links-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/links-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/links-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/link-item"
    ]
  },
  {
    "name": "media-type-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/media-type-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/media-type-display.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "media-type-selector",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/media-type-selector.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/media-type-selector.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "method-label",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/method-label.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/method-label.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "navigation-sidebar",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/navigation-sidebar.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/navigation-sidebar.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "button",
      "collapsible",
      "input",
      "https://pivotkit.vercel.app/r/method-label"
    ]
  },
  {
    "name": "oauth-flow-details",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/oauth-flow-details.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/oauth-flow-details.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "oauth-flow",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/oauth-flow.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/oauth-flow.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "operation-box",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-box.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/operation-box.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/deprecated-badge",
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/expand-collapse",
      "https://pivotkit.vercel.app/r/external-docs-display",
      "https://pivotkit.vercel.app/r/method-label",
      "https://pivotkit.vercel.app/r/operation-path",
      "https://pivotkit.vercel.app/r/parameters-section",
      "https://pivotkit.vercel.app/r/request-body-section",
      "https://pivotkit.vercel.app/r/responses-section",
      "https://pivotkit.vercel.app/r/security-requirements-section"
    ]
  },
  {
    "name": "operation-detail",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-detail.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/operation-detail.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "badge",
      "label",
      "https://pivotkit.vercel.app/r/deprecated-badge",
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/external-docs-display",
      "https://pivotkit.vercel.app/r/method-label",
      "https://pivotkit.vercel.app/r/operation-path",
      "https://pivotkit.vercel.app/r/parameters-section",
      "https://pivotkit.vercel.app/r/request-body-section",
      "https://pivotkit.vercel.app/r/responses-section",
      "https://pivotkit.vercel.app/r/security-requirements-section"
    ]
  },
  {
    "name": "operation-detailed-layout",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-detailed-layout.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/operation-detailed-layout.tsx"
      }
    ],
    "dependencies": [
      "js-yaml",
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/codegen",
      "https://pivotkit.vercel.app/r/operation-detail",
      "https://pivotkit.vercel.app/r/try-it-out-panel"
    ]
  },
  {
    "name": "operation-list-layout",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-list-layout.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/operation-list-layout.tsx"
      }
    ],
    "dependencies": [
      "js-yaml",
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/operation-box",
      "https://pivotkit.vercel.app/r/try-it-out-panel"
    ]
  },
  {
    "name": "operation-path",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-path.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/operation-path.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/path-segment"
    ]
  },
  {
    "name": "parameter-description",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-description.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/parameter-description.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "parameter-group",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-group.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/parameter-group.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/required-marker",
      "https://pivotkit.vercel.app/r/type-indicator",
      "https://pivotkit.vercel.app/r/expand-collapse"
    ]
  },
  {
    "name": "parameter-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-item.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/parameter-item.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/constraint-display",
      "https://pivotkit.vercel.app/r/default-value-display",
      "https://pivotkit.vercel.app/r/deprecated-badge",
      "https://pivotkit.vercel.app/r/enum-values-display",
      "https://pivotkit.vercel.app/r/format-badge",
      "https://pivotkit.vercel.app/r/in-label",
      "https://pivotkit.vercel.app/r/parameter-description",
      "https://pivotkit.vercel.app/r/parameter-name",
      "https://pivotkit.vercel.app/r/style-badge",
      "https://pivotkit.vercel.app/r/type-indicator",
      "https://pivotkit.vercel.app/r/example-display",
      "https://pivotkit.vercel.app/r/expand-collapse"
    ]
  },
  {
    "name": "parameter-name",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-name.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/parameter-name.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "parameters-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameters-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/parameters-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/parameter-item",
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/style-badge"
    ]
  },
  {
    "name": "path-item-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/path-item-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/path-item-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/operation-box"
    ]
  },
  {
    "name": "path-segment",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/path-segment.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/path-segment.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "php-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/php-generator.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/php-generator.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "python-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/python-generator.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/python-generator.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "request-body-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/request-body-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/request-body-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/schema-with-example-viewer",
      "https://pivotkit.vercel.app/r/section-title"
    ]
  },
  {
    "name": "required-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/required-badge.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/required-badge.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "required-marker",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/required-marker.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/required-marker.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "resizable-sidebar",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/resizable-sidebar.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/resizable-sidebar.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "response-content-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-content-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/response-content-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/schema-with-example-viewer"
    ]
  },
  {
    "name": "response-group",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-group.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/response-group.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/response-content-section",
      "https://pivotkit.vercel.app/r/response-headers-table"
    ]
  },
  {
    "name": "response-headers-table",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-headers-table.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/response-headers-table.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/header-item",
      "https://pivotkit.vercel.app/r/style-badge"
    ]
  },
  {
    "name": "response-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-item.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/response-item.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/headers-section",
      "https://pivotkit.vercel.app/r/links-section",
      "https://pivotkit.vercel.app/r/status-code"
    ]
  },
  {
    "name": "responses-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/responses-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/responses-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/response-group",
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/status-code"
    ]
  },
  {
    "name": "schema-composition-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/schema-composition-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/schema-composition-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "schema-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/schema-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/schema-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/constraint-display",
      "https://pivotkit.vercel.app/r/default-value-display",
      "https://pivotkit.vercel.app/r/deprecated-badge",
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/enum-values-display",
      "https://pivotkit.vercel.app/r/format-badge",
      "https://pivotkit.vercel.app/r/required-badge",
      "https://pivotkit.vercel.app/r/schema-composition-display",
      "https://pivotkit.vercel.app/r/type-indicator"
    ]
  },
  {
    "name": "schema-with-example-viewer",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/schema-with-example-viewer.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/schema-with-example-viewer.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/example-display",
      "https://pivotkit.vercel.app/r/media-type-selector",
      "https://pivotkit.vercel.app/r/schema-display"
    ]
  },
  {
    "name": "scheme-type",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/scheme-type.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/scheme-type.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "section-title",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/section-title.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/section-title.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "security-requirement-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-requirement-item.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/security-requirement-item.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ]
  },
  {
    "name": "security-requirements-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-requirements-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/security-requirements-section.tsx"
      }
    ],
    "dependencies": [
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/security-requirement-item"
    ]
  },
  {
    "name": "security-scheme-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-scheme-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/security-scheme-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display"
    ]
  },
  {
    "name": "security-scheme",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-scheme.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/security-scheme.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/scheme-type"
    ]
  },
  {
    "name": "security-schemes",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-schemes.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/security-schemes.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/security-scheme"
    ]
  },
  {
    "name": "security-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/security-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/security-scheme-display"
    ]
  },
  {
    "name": "server-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/server-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/server-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display"
    ]
  },
  {
    "name": "server-variable",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/server-variable.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/server-variable.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display"
    ]
  },
  {
    "name": "server",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/server.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/server.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/expand-collapse",
      "https://pivotkit.vercel.app/r/server-variable"
    ]
  },
  {
    "name": "servers-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/servers-section.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/servers-section.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/server-display"
    ]
  },
  {
    "name": "servers",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/servers.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/servers.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/section-title",
      "https://pivotkit.vercel.app/r/server"
    ]
  },
  {
    "name": "status-code",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/status-code.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/status-code.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "style-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/style-badge.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/style-badge.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "terms-of-service",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/terms-of-service.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/terms-of-service.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "theme-toggle",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/theme-toggle.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/theme-toggle.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "try-it-out-panel",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/try-it-out-panel.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/try-it-out-panel.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/method-label"
    ]
  },
  {
    "name": "type-indicator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/type-indicator.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/type-indicator.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "typescript-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/typescript-generator.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/typescript-generator.tsx"
      }
    ],
    "dependencies": [
      "lucide-react",
      "react"
    ]
  },
  {
    "name": "value-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/value-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/value-display.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "version-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/version-badge.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/version-badge.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  },
  {
    "name": "webhook-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/webhook-display.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/webhook-display.tsx"
      }
    ],
    "dependencies": [
      "openapi-types",
      "react"
    ],
    "registryDependencies": [
      "https://pivotkit.vercel.app/r/description-display",
      "https://pivotkit.vercel.app/r/webhook-label",
      "https://pivotkit.vercel.app/r/operation-box"
    ]
  },
  {
    "name": "webhook-label",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/webhook-label.tsx",
        "type": "registry:ui",
        "target": "registry/pivot/webhook-label.tsx"
      }
    ],
    "dependencies": [
      "react"
    ]
  }
];
export default ui;
