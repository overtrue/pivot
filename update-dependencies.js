const fs = require('fs')
const path = require('path')

const registryUiPath = path.join(__dirname, 'registry/registry-ui.ts')
const pivotPath = path.join(__dirname, 'registry/pivot')

// 1. Read registry/registry-ui.ts
// I will replace this with the actual file content later. For now, use a placeholder.
// The content is in the chat history. I'll read it and paste it here before running.
let registryUiContent = `
import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    "name": "accordion-components-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/accordion-components-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/accordion-components-section.tsx"
      }
    ]
  },
  {
    "name": "callback-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/callback-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/callback-display.tsx"
      }
    ]
  },
  {
    "name": "code-markdown",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/code-markdown.tsx",
        "type": "registry:component",
        "target": "components/pivot/code-markdown.tsx"
      }
    ]
  },
  {
    "name": "codegen",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/codegen.tsx",
        "type": "registry:component",
        "target": "components/pivot/codegen.tsx"
      }
    ]
  },
  {
    "name": "component-detail",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/component-detail.tsx",
        "type": "registry:component",
        "target": "components/pivot/component-detail.tsx"
      }
    ]
  },
  {
    "name": "component-items-list",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/component-items-list.tsx",
        "type": "registry:component",
        "target": "components/pivot/component-items-list.tsx"
      }
    ]
  },
  {
    "name": "component-tabs",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/component-tabs.tsx",
        "type": "registry:component",
        "target": "components/pivot/component-tabs.tsx"
      }
    ]
  },
  {
    "name": "components-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/components-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/components-section.tsx"
      }
    ]
  },
  {
    "name": "const-value",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/const-value.tsx",
        "type": "registry:component",
        "target": "components/pivot/const-value.tsx"
      }
    ]
  },
  {
    "name": "constraint-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/constraint-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/constraint-display.tsx"
      }
    ]
  },
  {
    "name": "contact-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/contact-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/contact-display.tsx"
      }
    ]
  },
  {
    "name": "copy-button",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/copy-button.tsx",
        "type": "registry:component",
        "target": "components/pivot/copy-button.tsx"
      }
    ]
  },
  {
    "name": "curl-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/curl-generator.tsx",
        "type": "registry:component",
        "target": "components/pivot/curl-generator.tsx"
      }
    ]
  },
  {
    "name": "default-value-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/default-value-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/default-value-display.tsx"
      }
    ]
  },
  {
    "name": "deprecated-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/deprecated-badge.tsx",
        "type": "registry:component",
        "target": "components/pivot/deprecated-badge.tsx"
      }
    ]
  },
  {
    "name": "description-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/description-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/description-display.tsx"
      }
    ]
  },
  {
    "name": "enum-values-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/enum-values-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/enum-values-display.tsx"
      }
    ]
  },
  {
    "name": "enum-values",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/enum-values.tsx",
        "type": "registry:component",
        "target": "components/pivot/enum-values.tsx"
      }
    ]
  },
  {
    "name": "example-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/example-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/example-display.tsx"
      }
    ]
  },
  {
    "name": "examples-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/examples-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/examples-display.tsx"
      }
    ]
  },
  {
    "name": "expand-collapse",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/expand-collapse.tsx",
        "type": "registry:component",
        "target": "components/pivot/expand-collapse.tsx"
      }
    ]
  },
  {
    "name": "external-docs-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/external-docs-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/external-docs-display.tsx"
      }
    ]
  },
  {
    "name": "external-docs",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/external-docs.tsx",
        "type": "registry:component",
        "target": "components/pivot/external-docs.tsx"
      }
    ]
  },
  {
    "name": "format-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/format-badge.tsx",
        "type": "registry:component",
        "target": "components/pivot/format-badge.tsx"
      }
    ]
  },
  {
    "name": "header-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/header-item.tsx",
        "type": "registry:component",
        "target": "components/pivot/header-item.tsx"
      }
    ]
  },
  {
    "name": "headers-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/headers-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/headers-section.tsx"
      }
    ]
  },
  {
    "name": "in-label",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/in-label.tsx",
        "type": "registry:component",
        "target": "components/pivot/in-label.tsx"
      }
    ]
  },
  {
    "name": "info-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/info-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/info-section.tsx"
      }
    ]
  },
  {
    "name": "language-switcher",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/language-switcher.tsx",
        "type": "registry:component",
        "target": "components/pivot/language-switcher.tsx"
      }
    ]
  },
  {
    "name": "laravel-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/laravel-generator.tsx",
        "type": "registry:component",
        "target": "components/pivot/laravel-generator.tsx"
      }
    ]
  },
  {
    "name": "license-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/license-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/license-display.tsx"
      }
    ]
  },
  {
    "name": "link-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/link-item.tsx",
        "type": "registry:component",
        "target": "components/pivot/link-item.tsx"
      }
    ]
  },
  {
    "name": "links-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/links-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/links-section.tsx"
      }
    ]
  },
  {
    "name": "media-type-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/media-type-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/media-type-display.tsx"
      }
    ]
  },
  {
    "name": "media-type-selector",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/media-type-selector.tsx",
        "type": "registry:component",
        "target": "components/pivot/media-type-selector.tsx"
      }
    ]
  },
  {
    "name": "method-label",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/method-label.tsx",
        "type": "registry:component",
        "target": "components/pivot/method-label.tsx"
      }
    ]
  },
  {
    "name": "navigation-sidebar",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/navigation-sidebar.tsx",
        "type": "registry:component",
        "target": "components/pivot/navigation-sidebar.tsx"
      }
    ]
  },
  {
    "name": "oauth-flow-details",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/oauth-flow-details.tsx",
        "type": "registry:component",
        "target": "components/pivot/oauth-flow-details.tsx"
      }
    ]
  },
  {
    "name": "oauth-flow",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/oauth-flow.tsx",
        "type": "registry:component",
        "target": "components/pivot/oauth-flow.tsx"
      }
    ]
  },
  {
    "name": "operation-box",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-box.tsx",
        "type": "registry:component",
        "target": "components/pivot/operation-box.tsx"
      }
    ]
  },
  {
    "name": "operation-detail",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-detail.tsx",
        "type": "registry:component",
        "target": "components/pivot/operation-detail.tsx"
      }
    ]
  },
  {
    "name": "operation-detailed-layout",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-detailed-layout.tsx",
        "type": "registry:component",
        "target": "components/pivot/operation-detailed-layout.tsx"
      }
    ]
  },
  {
    "name": "operation-list-layout",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-list-layout.tsx",
        "type": "registry:component",
        "target": "components/pivot/operation-list-layout.tsx"
      }
    ]
  },
  {
    "name": "operation-path",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/operation-path.tsx",
        "type": "registry:component",
        "target": "components/pivot/operation-path.tsx"
      }
    ]
  },
  {
    "name": "parameter-description",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-description.tsx",
        "type": "registry:component",
        "target": "components/pivot/parameter-description.tsx"
      }
    ]
  },
  {
    "name": "parameter-group",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-group.tsx",
        "type": "registry:component",
        "target": "components/pivot/parameter-group.tsx"
      }
    ]
  },
  {
    "name": "parameter-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-item.tsx",
        "type": "registry:component",
        "target": "components/pivot/parameter-item.tsx"
      }
    ]
  },
  {
    "name": "parameter-name",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameter-name.tsx",
        "type": "registry:component",
        "target": "components/pivot/parameter-name.tsx"
      }
    ]
  },
  {
    "name": "parameters-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/parameters-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/parameters-section.tsx"
      }
    ]
  },
  {
    "name": "path-item-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/path-item-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/path-item-display.tsx"
      }
    ]
  },
  {
    "name": "path-segment",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/path-segment.tsx",
        "type": "registry:component",
        "target": "components/pivot/path-segment.tsx"
      }
    ]
  },
  {
    "name": "php-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/php-generator.tsx",
        "type": "registry:component",
        "target": "components/pivot/php-generator.tsx"
      }
    ]
  },
  {
    "name": "python-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/python-generator.tsx",
        "type": "registry:component",
        "target": "components/pivot/python-generator.tsx"
      }
    ]
  },
  {
    "name": "request-body-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/request-body-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/request-body-section.tsx"
      }
    ]
  },
  {
    "name": "required-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/required-badge.tsx",
        "type": "registry:component",
        "target": "components/pivot/required-badge.tsx"
      }
    ]
  },
  {
    "name": "required-marker",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/required-marker.tsx",
        "type": "registry:component",
        "target": "components/pivot/required-marker.tsx"
      }
    ]
  },
  {
    "name": "resizable-sidebar",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/resizable-sidebar.tsx",
        "type": "registry:component",
        "target": "components/pivot/resizable-sidebar.tsx"
      }
    ]
  },
  {
    "name": "response-content-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-content-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/response-content-section.tsx"
      }
    ]
  },
  {
    "name": "response-group",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-group.tsx",
        "type": "registry:component",
        "target": "components/pivot/response-group.tsx"
      }
    ]
  },
  {
    "name": "response-headers-table",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-headers-table.tsx",
        "type": "registry:component",
        "target": "components/pivot/response-headers-table.tsx"
      }
    ]
  },
  {
    "name": "response-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/response-item.tsx",
        "type": "registry:component",
        "target": "components/pivot/response-item.tsx"
      }
    ]
  },
  {
    "name": "responses-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/responses-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/responses-section.tsx"
      }
    ]
  },
  {
    "name": "schema-composition-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/schema-composition-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/schema-composition-display.tsx"
      }
    ]
  },
  {
    "name": "schema-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/schema-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/schema-display.tsx"
      }
    ]
  },
  {
    "name": "schema-with-example-viewer",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/schema-with-example-viewer.tsx",
        "type": "registry:component",
        "target": "components/pivot/schema-with-example-viewer.tsx"
      }
    ]
  },
  {
    "name": "scheme-type",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/scheme-type.tsx",
        "type": "registry:component",
        "target": "components/pivot/scheme-type.tsx"
      }
    ]
  },
  {
    "name": "section-title",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/section-title.tsx",
        "type": "registry:component",
        "target": "components/pivot/section-title.tsx"
      }
    ]
  },
  {
    "name": "security-requirement-item",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-requirement-item.tsx",
        "type": "registry:component",
        "target": "components/pivot/security-requirement-item.tsx"
      }
    ]
  },
  {
    "name": "security-requirements-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-requirements-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/security-requirements-section.tsx"
      }
    ]
  },
  {
    "name": "security-scheme-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-scheme-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/security-scheme-display.tsx"
      }
    ]
  },
  {
    "name": "security-scheme",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-scheme.tsx",
        "type": "registry:component",
        "target": "components/pivot/security-scheme.tsx"
      }
    ]
  },
  {
    "name": "security-schemes",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-schemes.tsx",
        "type": "registry:component",
        "target": "components/pivot/security-schemes.tsx"
      }
    ]
  },
  {
    "name": "security-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/security-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/security-section.tsx"
      }
    ]
  },
  {
    "name": "server-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/server-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/server-display.tsx"
      }
    ]
  },
  {
    "name": "server-variable",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/server-variable.tsx",
        "type": "registry:component",
        "target": "components/pivot/server-variable.tsx"
      }
    ]
  },
  {
    "name": "server",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/server.tsx",
        "type": "registry:component",
        "target": "components/pivot/server.tsx"
      }
    ]
  },
  {
    "name": "servers-section",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/servers-section.tsx",
        "type": "registry:component",
        "target": "components/pivot/servers-section.tsx"
      }
    ]
  },
  {
    "name": "servers",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/servers.tsx",
        "type": "registry:component",
        "target": "components/pivot/servers.tsx"
      }
    ]
  },
  {
    "name": "status-code",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/status-code.tsx",
        "type": "registry:component",
        "target": "components/pivot/status-code.tsx"
      }
    ]
  },
  {
    "name": "style-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/style-badge.tsx",
        "type": "registry:component",
        "target": "components/pivot/style-badge.tsx"
      }
    ]
  },
  {
    "name": "terms-of-service",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/terms-of-service.tsx",
        "type": "registry:component",
        "target": "components/pivot/terms-of-service.tsx"
      }
    ]
  },
  {
    "name": "theme-toggle",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/theme-toggle.tsx",
        "type": "registry:component",
        "target": "components/pivot/theme-toggle.tsx"
      }
    ]
  },
  {
    "name": "try-it-out-panel",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/try-it-out-panel.tsx",
        "type": "registry:component",
        "target": "components/pivot/try-it-out-panel.tsx"
      }
    ]
  },
  {
    "name": "type-indicator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/type-indicator.tsx",
        "type": "registry:component",
        "target": "components/pivot/type-indicator.tsx"
      }
    ]
  },
  {
    "name": "typescript-generator",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/typescript-generator.tsx",
        "type": "registry:component",
        "target": "components/pivot/typescript-generator.tsx"
      }
    ]
  },
  {
    "name": "value-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/value-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/value-display.tsx"
      }
    ]
  },
  {
    "name": "version-badge",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/version-badge.tsx",
        "type": "registry:component",
        "target": "components/pivot/version-badge.tsx"
      }
    ]
  },
  {
    "name": "webhook-display",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/webhook-display.tsx",
        "type": "registry:component",
        "target": "components/pivot/webhook-display.tsx"
      }
    ]
  },
  {
    "name": "webhook-label",
    "type": "registry:ui",
    "files": [
      {
        "path": "registry/pivot/webhook-label.tsx",
        "type": "registry:component",
        "target": "components/pivot/webhook-label.tsx"
      }
    ]
  }
];
export default ui;
`

// Evil eval to parse the object
let registryObject
try {
  const jsonString = registryUiContent.substring(registryUiContent.indexOf('[')).replace(/;/g, '')
  registryObject = JSON.parse(jsonString)
} catch (e) {
  // A more robust way would be to transpile TS to JS and then require it.
  // For this script, a regex based replacement is probably safer.
  // Let's stick to text manipulation instead of parsing.
  console.error("Could not parse registry-ui.ts. Trying another method.")
}


async function main() {
  const registryFileContent = fs.readFileSync(registryUiPath, 'utf8')

  // This is a simple regex, might not cover all cases but should work for this structure.
  const componentRegex = /\{\s*"name":\s*"([^"]+)",\s*"type":\s*"registry:ui",\s*"files":\s*\[\s*\{\s*"path":\s*"([^"]+)"/g
  let match
  const components = []
  while ((match = componentRegex.exec(registryFileContent)) !== null) {
    components.push({
      name: match[1],
      path: match[2],
      fullMatch: match[0]
    })
  }

  let updatedRegistryFileContent = registryFileContent

  for (const component of components) {
    const filePath = path.join(__dirname, component.path)
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found, skipping: ${filePath}`)
      continue
    }

    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\\n')

    const dependencies = new Set()
    const registryDependencies = new Set()

    const importRegex = /import(?:["'\s]*(?:[\w*{}\n\r\t, ]+)from\s*)?["'\s]+([^"']+)["'\s]*/g
    let importMatch
    while ((importMatch = importRegex.exec(content)) !== null) {
      const importPath = importMatch[1]
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // local import
        if (importPath.includes('lib/')) continue

        const depName = path.basename(importPath, '.tsx')
        registryDependencies.add(depName)
      } else if (!importPath.startsWith('@/')) {
        // npm import
        if (importPath === 'react') continue // skip react
        dependencies.add(importPath)
      }
    }

    let newComponentDefinition = component.fullMatch
    if (dependencies.size > 0) {
      const depsString = JSON.stringify([...dependencies])
      newComponentDefinition += `,\n    "dependencies": ${depsString}`
    }
    if (registryDependencies.size > 0) {
      const registryDepsNames = [...registryDependencies]
      // As per user request, format as URL.
      // const registryDepsUrls = registryDepsNames.map(name => `https://pivotkit.vercel.app/r/${name}`);
      const registryDepsString = JSON.stringify(registryDepsNames)
      newComponentDefinition += `,\n    "registryDependencies": ${registryDepsString}`
    }

    updatedRegistryFileContent = updatedRegistryFileContent.replace(component.fullMatch, newComponentDefinition)
  }

  fs.writeFileSync(registryUiPath, updatedRegistryFileContent)
  console.log('registry/registry-ui.ts has been updated with dependencies.')
}

main().catch(console.error)
