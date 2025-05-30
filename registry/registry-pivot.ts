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

const pivot: Registry = [
  {
    name: "status-code",
    type: "registry:ui",
    title: "Status Code",
    description: "Display HTTP status codes with appropriate styling",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/status-code.tsx",
        type: "registry:ui",
        target: "components/pivot/status-code.tsx",
      },
    ],
  },
  {
    name: "method-label",
    type: "registry:ui",
    title: "Method Label",
    description: "Display HTTP methods with color coding",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/method-label.tsx",
        type: "registry:ui",
        target: "components/pivot/method-label.tsx",
      },
    ],
  },
  {
    name: "type-indicator",
    type: "registry:ui",
    title: "Type Indicator",
    description: "Display data types with appropriate styling",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/type-indicator.tsx",
        type: "registry:ui",
        target: "components/pivot/type-indicator.tsx",
      },
    ],
  },
  {
    name: "required-badge",
    type: "registry:ui",
    title: "Required Badge",
    description: "Badge to indicate required fields",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/required-badge.tsx",
        type: "registry:ui",
        target: "components/pivot/required-badge.tsx",
      },
    ],
  },
  {
    name: "deprecated-badge",
    type: "registry:ui",
    title: "Deprecated Badge",
    description: "Badge to indicate deprecated fields or operations",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/deprecated-badge.tsx",
        type: "registry:ui",
        target: "components/pivot/deprecated-badge.tsx",
      },
    ],
  },
  {
    name: "version-badge",
    type: "registry:ui",
    title: "Version Badge",
    description: "Display version information",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/version-badge.tsx",
        type: "registry:ui",
        target: "components/pivot/version-badge.tsx",
      },
    ],
  },
  {
    name: "webhook-label",
    type: "registry:ui",
    title: "Webhook Label",
    description: "Label for webhook endpoints",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/webhook-label.tsx",
        type: "registry:ui",
        target: "components/pivot/webhook-label.tsx",
      },
    ],
  },
  {
    name: "format-badge",
    type: "registry:ui",
    title: "Format Badge",
    description: "Display format information for data types",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/format-badge.tsx",
        type: "registry:ui",
        target: "components/pivot/format-badge.tsx",
      },
    ],
  },
  {
    name: "style-badge",
    type: "registry:ui",
    title: "Style Badge",
    description: "Display style information for parameters",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/style-badge.tsx",
        type: "registry:ui",
        target: "components/pivot/style-badge.tsx",
      },
    ],
  },
  {
    name: "scheme-type",
    type: "registry:ui",
    title: "Scheme Type",
    description: "Display security scheme types",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/scheme-type.tsx",
        type: "registry:ui",
        target: "components/pivot/scheme-type.tsx",
      },
    ],
  },
  {
    name: "in-label",
    type: "registry:ui",
    title: "In Label",
    description: "Label for parameter location",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/in-label.tsx",
        type: "registry:ui",
        target: "components/pivot/in-label.tsx",
      },
    ],
  },
  {
    name: "parameter-name",
    type: "registry:ui",
    title: "Parameter Name",
    description: "Display parameter names with deprecation support",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/parameter-name.tsx",
        type: "registry:ui",
        target: "components/pivot/parameter-name.tsx",
      },
    ],
  },
  {
    name: "parameter-description",
    type: "registry:ui",
    title: "Parameter Description",
    description: "Display parameter descriptions",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/parameter-description.tsx",
        type: "registry:ui",
        target: "components/pivot/parameter-description.tsx",
      },
    ],
  },
  {
    name: "path-segment",
    type: "registry:ui",
    title: "Path Segment",
    description: "Display API path segments with parameter highlighting",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/path-segment.tsx",
        type: "registry:ui",
        target: "components/pivot/path-segment.tsx",
      },
    ],
  },
  {
    name: "operation-path",
    type: "registry:ui",
    title: "Operation Path",
    description: "Display operation paths with highlighting",
    registryDependencies: ["utils", "path-segment"],
    files: [
      {
        path: "registry/pivot/operation-path.tsx",
        type: "registry:ui",
        target: "components/pivot/operation-path.tsx",
      },
    ],
  },
  {
    name: "enum-values-display",
    type: "registry:ui",
    title: "Enum Values Display",
    description: "Display enumeration values",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/enum-values-display.tsx",
        type: "registry:ui",
        target: "components/pivot/enum-values-display.tsx",
      },
    ],
  },
  {
    name: "default-value-display",
    type: "registry:ui",
    title: "Default Value Display",
    description: "Display default values for parameters",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/default-value-display.tsx",
        type: "registry:ui",
        target: "components/pivot/default-value-display.tsx",
      },
    ],
  },
  {
    name: "constraint-display",
    type: "registry:ui",
    title: "Constraint Display",
    description: "Display schema constraints",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/constraint-display.tsx",
        type: "registry:ui",
        target: "components/pivot/constraint-display.tsx",
      },
    ],
  },
  {
    name: "expand-collapse",
    type: "registry:ui",
    title: "Expand Collapse",
    description: "Expandable/collapsible content component",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/expand-collapse.tsx",
        type: "registry:ui",
        target: "components/pivot/expand-collapse.tsx",
      },
    ],
  },
  {
    name: "description-display",
    type: "registry:ui",
    title: "Description Display",
    description: "Display markdown descriptions",
    dependencies: ["react-markdown"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/description-display.tsx",
        type: "registry:ui",
        target: "components/pivot/description-display.tsx",
      },
    ],
  },
  {
    name: "contact-display",
    type: "registry:ui",
    title: "Contact Display",
    description: "Display contact information",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/contact-display.tsx",
        type: "registry:ui",
        target: "components/pivot/contact-display.tsx",
      },
    ],
  },
  {
    name: "license-display",
    type: "registry:ui",
    title: "License Display",
    description: "Display license information",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/license-display.tsx",
        type: "registry:ui",
        target: "components/pivot/license-display.tsx",
      },
    ],
  },
  {
    name: "terms-of-service",
    type: "registry:ui",
    title: "Terms of Service",
    description: "Display terms of service",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/terms-of-service.tsx",
        type: "registry:ui",
        target: "components/pivot/terms-of-service.tsx",
      },
    ],
  },
  {
    name: "version-display",
    type: "registry:ui",
    title: "Version Display",
    description: "Display API version",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/version-display.tsx",
        type: "registry:ui",
        target: "components/pivot/version-display.tsx",
      },
    ],
  },
  {
    name: "section-title",
    type: "registry:ui",
    title: "Section Title",
    description: "Section title component",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/section-title.tsx",
        type: "registry:ui",
        target: "components/pivot/section-title.tsx",
      },
    ],
  },
  {
    name: "server-display",
    type: "registry:ui",
    title: "Server Display",
    description: "Display server information",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/server-display.tsx",
        type: "registry:ui",
        target: "components/pivot/server-display.tsx",
      },
    ],
  },
  {
    name: "external-docs-display",
    type: "registry:ui",
    title: "External Docs Display",
    description: "Display external documentation links",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/external-docs-display.tsx",
        type: "registry:ui",
        target: "components/pivot/external-docs-display.tsx",
      },
    ],
  },
  {
    name: "info-section",
    type: "registry:component",
    title: "Info Section",
    description: "Display API information section",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "contact-display", "description-display", "license-display"],
    files: [
      {
        path: "registry/pivot/info-section.tsx",
        type: "registry:component",
        target: "components/pivot/info-section.tsx",
      },
    ],
  },
  {
    name: "servers-section",
    type: "registry:component",
    title: "Servers Section",
    description: "Display servers section",
    registryDependencies: ["utils", "section-title", "server-display"],
    files: [
      {
        path: "registry/pivot/servers-section.tsx",
        type: "registry:component",
        target: "components/pivot/servers-section.tsx",
      },
    ],
  },
  {
    name: "server-variable",
    type: "registry:ui",
    title: "Server Variable",
    description: "Display server variable",
    registryDependencies: ["utils", "required-marker", "type-indicator", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/server-variable.tsx",
        type: "registry:ui",
        target: "components/pivot/server-variable.tsx",
      },
    ],
  },
  {
    name: "server",
    type: "registry:component",
    title: "Server",
    description: "Display server information with variables",
    registryDependencies: ["utils", "description-display", "server-display", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/server.tsx",
        type: "registry:component",
        target: "components/pivot/server.tsx",
      },
    ],
  },
  {
    name: "security-scheme-display",
    type: "registry:component",
    title: "Security Scheme Display",
    description: "Display security scheme details",
    registryDependencies: ["utils", "description-display", "scheme-type"],
    files: [
      {
        path: "registry/pivot/security-scheme-display.tsx",
        type: "registry:component",
        target: "components/pivot/security-scheme-display.tsx",
      },
    ],
  },
  {
    name: "security-scheme",
    type: "registry:component",
    title: "Security Scheme",
    description: "Display security scheme",
    registryDependencies: ["utils", "description-display"],
    files: [
      {
        path: "registry/pivot/security-scheme.tsx",
        type: "registry:component",
        target: "components/pivot/security-scheme.tsx",
      },
    ],
  },
  {
    name: "server-variables-section",
    type: "registry:component",
    title: "Server Variables Section",
    description: "Display server variables section",
    registryDependencies: ["utils", "description-display", "expand-collapse", "server-variable"],
    files: [
      {
        path: "registry/pivot/server-variables-section.tsx",
        type: "registry:component",
        target: "components/pivot/server-variables-section.tsx",
      },
    ],
  },
  {
    name: "required-marker",
    type: "registry:ui",
    title: "Required Marker",
    description: "Marker for required fields",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/required-marker.tsx",
        type: "registry:ui",
        target: "components/pivot/required-marker.tsx",
      },
    ],
  },
  {
    name: "value-display",
    type: "registry:ui",
    title: "Value Display",
    description: "Display values with syntax highlighting",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/value-display.tsx",
        type: "registry:ui",
        target: "components/pivot/value-display.tsx",
      },
    ],
  },
  {
    name: "example-display",
    type: "registry:component",
    title: "Example Display",
    description: "Display examples",
    registryDependencies: ["utils", "value-display"],
    files: [
      {
        path: "registry/pivot/example-display.tsx",
        type: "registry:component",
        target: "components/pivot/example-display.tsx",
      },
    ],
  },
  {
    name: "examples-display",
    type: "registry:component",
    title: "Examples Display",
    description: "Display multiple examples",
    registryDependencies: ["utils", "resolve-ref"],
    files: [
      {
        path: "registry/pivot/examples-display.tsx",
        type: "registry:component",
        target: "components/pivot/examples-display.tsx",
      },
    ],
  },
  {
    name: "links-section",
    type: "registry:component",
    title: "Links Section",
    description: "Display links section",
    registryDependencies: ["utils", "link-item"],
    files: [
      {
        path: "registry/pivot/links-section.tsx",
        type: "registry:component",
        target: "components/pivot/links-section.tsx",
      },
    ],
  },
  {
    name: "link-item",
    type: "registry:ui",
    title: "Link Item",
    description: "Display link item",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/link-item.tsx",
        type: "registry:ui",
        target: "components/pivot/link-item.tsx",
      },
    ],
  },
  {
    name: "security-schemes",
    type: "registry:component",
    title: "Security Schemes",
    description: "Display security schemes section",
    registryDependencies: ["utils", "section-title", "security-scheme"],
    files: [
      {
        path: "registry/pivot/security-schemes.tsx",
        type: "registry:component",
        target: "components/pivot/security-schemes.tsx",
      },
    ],
  },
  {
    name: "oauth-flow",
    type: "registry:ui",
    title: "OAuth Flow",
    description: "Display OAuth flow information",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/oauth-flow.tsx",
        type: "registry:ui",
        target: "components/pivot/oauth-flow.tsx",
      },
    ],
  },
  {
    name: "oauth-flow-details",
    type: "registry:component",
    title: "OAuth Flow Details",
    description: "Display detailed OAuth flow information",
    registryDependencies: ["utils", "oauth-flow"],
    files: [
      {
        path: "registry/pivot/oauth-flow-details.tsx",
        type: "registry:component",
        target: "components/pivot/oauth-flow-details.tsx",
      },
    ],
  },
  {
    name: "oauth-flows",
    type: "registry:component",
    title: "OAuth Flows",
    description: "Display OAuth flows",
    registryDependencies: ["utils", "oauth-flow-details"],
    files: [
      {
        path: "registry/pivot/oauth-flows.tsx",
        type: "registry:component",
        target: "components/pivot/oauth-flows.tsx",
      },
    ],
  },
  {
    name: "security-requirement-item",
    type: "registry:ui",
    title: "Security Requirement Item",
    description: "Display security requirement item",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/security-requirement-item.tsx",
        type: "registry:ui",
        target: "components/pivot/security-requirement-item.tsx",
      },
    ],
  },
  {
    name: "security-requirements-list",
    type: "registry:component",
    title: "Security Requirements List",
    description: "Display list of security requirements",
    registryDependencies: ["utils", "security-requirement-item"],
    files: [
      {
        path: "registry/pivot/security-requirements-list.tsx",
        type: "registry:component",
        target: "components/pivot/security-requirements-list.tsx",
      },
    ],
  },
  {
    name: "header-item",
    type: "registry:component",
    title: "Header Item",
    description: "Display header item with details",
    registryDependencies: ["utils", "deprecated-badge", "description-display", "enum-values-display", "format-badge", "required-badge", "type-indicator", "default-value-display", "examples-display", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/header-item.tsx",
        type: "registry:component",
        target: "components/pivot/header-item.tsx",
      },
    ],
  },
  {
    name: "status-code-display",
    type: "registry:ui",
    title: "Status Code Display",
    description: "Display HTTP status codes",
    registryDependencies: ["utils", "status-code", "description-display"],
    files: [
      {
        path: "registry/pivot/status-code-display.tsx",
        type: "registry:ui",
        target: "components/pivot/status-code-display.tsx",
      },
    ],
  },
  {
    name: "media-type-selector",
    type: "registry:component",
    title: "Media Type Selector",
    description: "Selector for media types",
    registryDependencies: ["utils", "description-display"],
    files: [
      {
        path: "registry/pivot/media-type-selector.tsx",
        type: "registry:component",
        target: "components/pivot/media-type-selector.tsx",
      },
    ],
  },
  {
    name: "operation-summary",
    type: "registry:ui",
    title: "Operation Summary",
    description: "Display operation summary",
    registryDependencies: ["utils", "method-label", "operation-path", "description-display"],
    files: [
      {
        path: "registry/pivot/operation-summary.tsx",
        type: "registry:ui",
        target: "components/pivot/operation-summary.tsx",
      },
    ],
  },
  {
    name: "response-group",
    type: "registry:component",
    title: "Response Group",
    description: "Group responses by status code",
    registryDependencies: ["utils", "response-item"],
    files: [
      {
        path: "registry/pivot/response-group.tsx",
        type: "registry:component",
        target: "components/pivot/response-group.tsx",
      },
    ],
  },
  {
    name: "parameters-section",
    type: "registry:component",
    title: "Parameters Section",
    description: "Display parameters section",
    registryDependencies: ["utils", "parameter-item"],
    files: [
      {
        path: "registry/pivot/parameters-section.tsx",
        type: "registry:component",
        target: "components/pivot/parameters-section.tsx",
      },
    ],
  },
  {
    name: "request-body-display",
    type: "registry:component",
    title: "Request Body Display",
    description: "Display request body",
    registryDependencies: ["utils", "media-type-selector"],
    files: [
      {
        path: "registry/pivot/request-body-display.tsx",
        type: "registry:component",
        target: "components/pivot/request-body-display.tsx",
      },
    ],
  },
  {
    name: "schema-composition-display",
    type: "registry:component",
    title: "Schema Composition Display",
    description: "Display schema composition (allOf, oneOf, anyOf)",
    registryDependencies: ["utils", "type-indicator", "constraint-display"],
    files: [
      {
        path: "registry/pivot/schema-composition-display.tsx",
        type: "registry:component",
        target: "components/pivot/schema-composition-display.tsx",
      },
    ],
  },
  {
    name: "component-tabs",
    type: "registry:component",
    title: "Component Tabs",
    description: "Tabs for different component types",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/component-tabs.tsx",
        type: "registry:component",
        target: "components/pivot/component-tabs.tsx",
      },
    ],
  },
  {
    name: "schema-with-example-viewer",
    type: "registry:component",
    title: "Schema with Example Viewer",
    description: "Display schema with example",
    registryDependencies: ["utils", "schema-display", "example-display", "generate-example", "resolve-ref"],
    files: [
      {
        path: "registry/pivot/schema-with-example-viewer.tsx",
        type: "registry:component",
        target: "components/pivot/schema-with-example-viewer.tsx",
      },
    ],
  },
  {
    name: "schema-display",
    type: "registry:component",
    title: "Schema Display",
    description: "Display OpenAPI schema",
    registryDependencies: ["utils", "schema-display"],
    files: [
      {
        path: "registry/pivot/schema-display.tsx",
        type: "registry:component",
        target: "components/pivot/schema-display.tsx",
      },
    ],
  },
  {
    name: "parameter-item",
    type: "registry:component",
    title: "Parameter Item",
    description: "Display parameter item",
    registryDependencies: ["utils", "example-display"],
    files: [
      {
        path: "registry/pivot/parameter-item.tsx",
        type: "registry:component",
        target: "components/pivot/parameter-item.tsx",
      },
    ],
  },
  {
    name: "operation-box",
    type: "registry:component",
    title: "Operation Box",
    description: "Display operation in a box layout",
    registryDependencies: ["utils", "deprecated-badge", "description-display", "expand-collapse", "external-docs-display", "method-label", "operation-path", "parameters-section", "request-body-section", "responses-section", "security-requirements-section"],
    files: [
      {
        path: "registry/pivot/operation-box.tsx",
        type: "registry:component",
        target: "components/pivot/operation-box.tsx",
      },
    ],
  },
  {
    name: "webhook-operation",
    type: "registry:component",
    title: "Webhook Operation",
    description: "Display webhook operation",
    registryDependencies: ["utils", "webhook-label", "operation-box"],
    files: [
      {
        path: "registry/pivot/webhook-operation.tsx",
        type: "registry:component",
        target: "components/pivot/webhook-operation.tsx",
      },
    ],
  },
  {
    name: "webhook-display",
    type: "registry:component",
    title: "Webhook Display",
    description: "Display webhook information",
    registryDependencies: ["utils", "operation-box"],
    files: [
      {
        path: "registry/pivot/webhook-display.tsx",
        type: "registry:component",
        target: "components/pivot/webhook-display.tsx",
      },
    ],
  },
  {
    name: "security-requirements-section",
    type: "registry:component",
    title: "Security Requirements Section",
    description: "Display security requirements section",
    registryDependencies: ["utils", "security-schemes", "security-requirements-section"],
    files: [
      {
        path: "registry/pivot/security-requirements-section.tsx",
        type: "registry:component",
        target: "components/pivot/security-requirements-section.tsx",
      },
    ],
  },
  {
    name: "request-body-section",
    type: "registry:component",
    title: "Request Body Section",
    description: "Display request body section",
    registryDependencies: ["utils", "schema-with-example-viewer", "section-title"],
    files: [
      {
        path: "registry/pivot/request-body-section.tsx",
        type: "registry:component",
        target: "components/pivot/request-body-section.tsx",
      },
    ],
  },
  {
    name: "responses-section",
    type: "registry:component",
    title: "Responses Section",
    description: "Display responses section",
    registryDependencies: ["utils", "response-group", "section-title", "status-code"],
    files: [
      {
        path: "registry/pivot/responses-section.tsx",
        type: "registry:component",
        target: "components/pivot/responses-section.tsx",
      },
    ],
  },
  {
    name: "response-item",
    type: "registry:component",
    title: "Response Item",
    description: "Display response item",
    registryDependencies: ["utils", "resolve-ref", "description-display", "headers-section", "links-section", "status-code"],
    files: [
      {
        path: "registry/pivot/response-item.tsx",
        type: "registry:component",
        target: "components/pivot/response-item.tsx",
      },
    ],
  },
  {
    name: "headers-section",
    type: "registry:component",
    title: "Headers Section",
    description: "Display headers section",
    registryDependencies: ["utils", "header-item"],
    files: [
      {
        path: "registry/pivot/headers-section.tsx",
        type: "registry:component",
        target: "components/pivot/headers-section.tsx",
      },
    ],
  },
  {
    name: "component-detail",
    type: "registry:component",
    title: "Component Detail",
    description: "Display component details",
    registryDependencies: ["utils", "callback-display", "examples-display", "header-item", "link-item", "parameter-item", "request-body-section", "response-item", "schema-display", "security-scheme-display", "webhook-display"],
    files: [
      {
        path: "registry/pivot/component-detail.tsx",
        type: "registry:component",
        target: "components/pivot/component-detail.tsx",
      },
    ],
  },
  {
    name: "callback-display",
    type: "registry:component",
    title: "Callback Display",
    description: "Display callback information",
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/callback-display.tsx",
        type: "registry:component",
        target: "components/pivot/callback-display.tsx",
      },
    ],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    title: "Copy Button",
    description: "Button for copying content to clipboard",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/copy-button.tsx",
        type: "registry:ui",
        target: "components/pivot/copy-button.tsx",
      },
    ],
  },
  {
    name: "code-markdown",
    type: "registry:ui",
    title: "Code Markdown",
    description: "Display code with syntax highlighting",
    dependencies: ["next-themes", "react-syntax-highlighter"],
    registryDependencies: ["utils", "copy-button"],
    files: [
      {
        path: "registry/pivot/code-markdown.tsx",
        type: "registry:ui",
        target: "components/pivot/code-markdown.tsx",
      },
    ],
  },
  {
    name: "curl-generator",
    type: "registry:ui",
    title: "cURL Generator",
    description: "Generate cURL commands",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/curl-generator.tsx",
        type: "registry:ui",
        target: "components/pivot/curl-generator.tsx",
      },
    ],
  },
  {
    name: "python-generator",
    type: "registry:ui",
    title: "Python Generator",
    description: "Generate Python code",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/python-generator.tsx",
        type: "registry:ui",
        target: "components/pivot/python-generator.tsx",
      },
    ],
  },
  {
    name: "typescript-generator",
    type: "registry:ui",
    title: "TypeScript Generator",
    description: "Generate TypeScript code",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/typescript-generator.tsx",
        type: "registry:ui",
        target: "components/pivot/typescript-generator.tsx",
      },
    ],
  },
  {
    name: "php-generator",
    type: "registry:ui",
    title: "PHP Generator",
    description: "Generate PHP code",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/php-generator.tsx",
        type: "registry:ui",
        target: "components/pivot/php-generator.tsx",
      },
    ],
  },
  {
    name: "laravel-generator",
    type: "registry:ui",
    title: "Laravel Generator",
    description: "Generate Laravel code",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/laravel-generator.tsx",
        type: "registry:ui",
        target: "components/pivot/laravel-generator.tsx",
      },
    ],
  },
  {
    name: "codegen",
    type: "registry:component",
    title: "Code Generator",
    description: "Multi-language code generator",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "curl-generator", "python-generator", "typescript-generator", "php-generator", "laravel-generator", "generate-example", "resolve-ref", "code-markdown"],
    files: [
      {
        path: "registry/pivot/codegen.tsx",
        type: "registry:component",
        target: "components/pivot/codegen.tsx",
      },
    ],
  },
  {
    name: "try-it-out-panel",
    type: "registry:component",
    title: "Try It Out Panel",
    description: "Interactive API testing panel",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "parameter-item", "copy-button", "codegen", "resolve-ref", "method-label"],
    files: [
      {
        path: "registry/pivot/try-it-out-panel.tsx",
        type: "registry:component",
        target: "components/pivot/try-it-out-panel.tsx",
      },
    ],
  },
  {
    name: "operation-list-item",
    type: "registry:component",
    title: "Operation List Item",
    description: "List item for operations",
    registryDependencies: ["utils", "method-label", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/operation-list-item.tsx",
        type: "registry:component",
        target: "components/pivot/operation-list-item.tsx",
      },
    ],
  },
  {
    name: "operation-list-layout",
    type: "registry:block",
    title: "Operation List Layout",
    description: "Layout for displaying list of operations",
    dependencies: ["js-yaml"],
    registryDependencies: ["utils", "use-openapi", "operation-box", "try-it-out-panel"],
    files: [
      {
        path: "registry/pivot/operation-list-layout.tsx",
        type: "registry:block",
        target: "components/pivot/operation-list-layout.tsx",
      },
    ],
  },
  {
    name: "operation-detailed-layout",
    type: "registry:block",
    title: "Operation Detailed Layout",
    description: "Detailed layout for displaying operations",
    dependencies: ["js-yaml"],
    registryDependencies: ["utils", "codegen", "operation-detail", "try-it-out-panel"],
    files: [
      {
        path: "registry/pivot/operation-detailed-layout.tsx",
        type: "registry:block",
        target: "components/pivot/operation-detailed-layout.tsx",
      },
    ],
  },
  {
    name: "operation-detail",
    type: "registry:component",
    title: "Operation Detail",
    description: "Detailed view of API operation",
    registryDependencies: ["utils", "deprecated-badge", "description-display", "external-docs-display", "method-label", "operation-path", "parameters-section", "request-body-section", "responses-section", "security-requirements-section"],
    files: [
      {
        path: "registry/pivot/operation-detail.tsx",
        type: "registry:component",
        target: "components/pivot/operation-detail.tsx",
      },
    ],
  },
  {
    name: "navigation-sidebar",
    type: "registry:component",
    title: "Navigation Sidebar",
    description: "Sidebar navigation for API documentation",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "method-label"],
    files: [
      {
        path: "registry/pivot/navigation-sidebar.tsx",
        type: "registry:component",
        target: "components/pivot/navigation-sidebar.tsx",
      },
    ],
  },
  {
    name: "accordion-components-section",
    type: "registry:component",
    title: "Accordion Components Section",
    description: "Accordion section for components",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/accordion-components-section.tsx",
        type: "registry:component",
        target: "components/pivot/accordion-components-section.tsx",
      },
    ],
  },
  {
    name: "theme-toggle",
    type: "registry:ui",
    title: "Theme Toggle",
    description: "Toggle between light and dark themes",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/theme-toggle.tsx",
        type: "registry:ui",
        target: "components/pivot/theme-toggle.tsx",
      },
    ],
  },
  {
    name: "language-switcher",
    type: "registry:ui",
    title: "Language Switcher",
    description: "Switch between different languages",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "registry/pivot/language-switcher.tsx",
        type: "registry:ui",
        target: "components/pivot/language-switcher.tsx",
      },
    ],
  },
];

export { pivot };
