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
    files: [
      {
        path: "registry/pivot/path-segment.tsx",
        type: "registry:ui",
        target: "components/pivot/path-segment.tsx",
      },
    ],
  },
  {
    name: "required-marker",
    type: "registry:ui",
    title: "Required Marker",
    description: "Visual marker for required fields",
    files: [
      {
        path: "registry/pivot/required-marker.tsx",
        type: "registry:ui",
        target: "components/pivot/required-marker.tsx",
      },
    ],
  },
  {
    name: "section-title",
    type: "registry:ui",
    title: "Section Title",
    description: "Styled section titles for documentation",
    files: [
      {
        path: "registry/pivot/section-title.tsx",
        type: "registry:ui",
        target: "components/pivot/section-title.tsx",
      },
    ],
  },
  {
    name: "description-display",
    type: "registry:ui",
    title: "Description Display",
    description: "Display descriptions with markdown support",
    files: [
      {
        path: "registry/pivot/description-display.tsx",
        type: "registry:ui",
        target: "components/pivot/description-display.tsx",
      },
    ],
    dependencies: ["react-markdown"],
  },
  {
    name: "value-display",
    type: "registry:ui",
    title: "Value Display",
    description: "Display values with proper formatting",
    files: [
      {
        path: "registry/pivot/value-display.tsx",
        type: "registry:ui",
        target: "components/pivot/value-display.tsx",
      },
    ],
  },
  {
    name: "default-value-display",
    type: "registry:ui",
    title: "Default Value Display",
    description: "Display default values with proper formatting",
    files: [
      {
        path: "registry/pivot/default-value-display.tsx",
        type: "registry:ui",
        target: "components/pivot/default-value-display.tsx",
      },
    ],
    registryDependencies: ["value-display"],
  },
  {
    name: "const-value",
    type: "registry:ui",
    title: "Const Value",
    description: "Display constant values",
    files: [
      {
        path: "registry/pivot/const-value.tsx",
        type: "registry:ui",
        target: "components/pivot/const-value.tsx",
      },
    ],
  },
  {
    name: "enum-values",
    type: "registry:ui",
    title: "Enum Values",
    description: "Display enumerated values",
    files: [
      {
        path: "registry/pivot/enum-values.tsx",
        type: "registry:ui",
        target: "components/pivot/enum-values.tsx",
      },
    ],
  },
  {
    name: "external-docs",
    type: "registry:ui",
    title: "External Docs",
    description: "Link to external documentation",
    files: [
      {
        path: "registry/pivot/external-docs.tsx",
        type: "registry:ui",
        target: "components/pivot/external-docs.tsx",
      },
    ],
  },
  {
    name: "oauth-flow",
    type: "registry:ui",
    title: "OAuth Flow",
    description: "Display OAuth flow types",
    files: [
      {
        path: "registry/pivot/oauth-flow.tsx",
        type: "registry:ui",
        target: "components/pivot/oauth-flow.tsx",
      },
    ],
  },
  {
    name: "contact-display",
    type: "registry:ui",
    title: "Contact Display",
    description: "Display contact information",
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
    description: "Link to terms of service",
    files: [
      {
        path: "registry/pivot/terms-of-service.tsx",
        type: "registry:ui",
        target: "components/pivot/terms-of-service.tsx",
      },
    ],
  },
  {
    name: "server-display",
    type: "registry:ui",
    title: "Server Display",
    description: "Display server information",
    files: [
      {
        path: "registry/pivot/server-display.tsx",
        type: "registry:ui",
        target: "components/pivot/server-display.tsx",
      },
    ],
  },
  {
    name: "operation-path",
    type: "registry:ui",
    title: "Operation Path",
    description: "Display API operation paths with parameter highlighting",
    dependencies: ["path-segment"],
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
    description: "Display enumerated values with title",
    dependencies: ["enum-values"],
    files: [
      {
        path: "registry/pivot/enum-values-display.tsx",
        type: "registry:ui",
        target: "components/pivot/enum-values-display.tsx",
      },
    ],
  },
  {
    name: "external-docs-display",
    type: "registry:ui",
    title: "External Docs Display",
    description: "Display external documentation links",
    files: [
      {
        path: "registry/pivot/external-docs-display.tsx",
        type: "registry:ui",
        target: "components/pivot/external-docs-display.tsx",
      },
    ],
  },
  {
    name: "constraint-display",
    type: "registry:ui",
    title: "Constraint Display",
    description: "Display JSON Schema constraints and validation rules",
    files: [
      {
        path: "registry/pivot/constraint-display.tsx",
        type: "registry:ui",
        target: "components/pivot/constraint-display.tsx",
      },
    ],
  },
  {
    name: "media-type-display",
    type: "registry:ui",
    title: "Media Type Display",
    description: "Display media types with appropriate color coding",
    files: [
      {
        path: "registry/pivot/media-type-display.tsx",
        type: "registry:ui",
        target: "components/pivot/media-type-display.tsx",
      },
    ],
  },
  {
    name: "response-headers-table",
    type: "registry:ui",
    title: "Response Headers Table",
    description: "Display response headers in a table format",
    dependencies: ["description-display"],
    files: [
      {
        path: "registry/pivot/response-headers-table.tsx",
        type: "registry:ui",
        target: "components/pivot/response-headers-table.tsx",
      },
    ],
  },
  {
    name: "info-section",
    type: "registry:ui",
    title: "Info Section",
    description: "A comprehensive section component for displaying API information including title, version, description, contact, and license details.",
    dependencies: ["contact-display", "description-display", "license-display"],
    files: [
      {
        path: "registry/pivot/info-section.tsx",
        type: "registry:ui",
        target: "components/pivot/info-section.tsx",
      },
    ],
  },
  {
    name: "servers-section",
    type: "registry:ui",
    title: "Servers Section",
    description: "A section component for displaying server information.",
    dependencies: ["section-title", "server-display"],
    files: [
      {
        path: "registry/pivot/servers-section.tsx",
        type: "registry:ui",
        target: "components/pivot/servers-section.tsx",
      },
    ],
  },
  {
    name: "copy-button",
    type: "registry:ui",
    title: "Copy Button",
    description: "An interactive button component for copying text to clipboard with visual feedback.",
    files: [
      {
        path: "registry/pivot/copy-button.tsx",
        type: "registry:ui",
        target: "components/pivot/copy-button.tsx",
      },
    ],
  },
  {
    name: "expand-collapse",
    type: "registry:ui",
    title: "Expand Collapse",
    description: "A toggle button component for expanding and collapsing content sections.",
    files: [
      {
        path: "registry/pivot/expand-collapse.tsx",
        type: "registry:ui",
        target: "components/pivot/expand-collapse.tsx",
      },
    ],
  },
  {
    name: "media-type-selector",
    type: "registry:ui",
    title: "Media Type Selector",
    description: "A tab-style selector component for choosing between different media types.",
    files: [
      {
        path: "registry/pivot/media-type-selector.tsx",
        type: "registry:ui",
        target: "components/pivot/media-type-selector.tsx",
      },
    ],
  },
  {
    name: "component-tabs",
    type: "registry:ui",
    title: "Component Tabs",
    description: "A tab navigation component for switching between different component types.",
    files: [
      {
        path: "registry/pivot/component-tabs.tsx",
        type: "registry:ui",
        target: "components/pivot/component-tabs.tsx",
      },
    ],
  },
  {
    name: "parameter-group",
    type: "registry:ui",
    title: "Parameter Group",
    description: "A collapsible group component for displaying parameters by location type.",
    dependencies: ["required-marker", "type-indicator", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/parameter-group.tsx",
        type: "registry:ui",
        target: "components/pivot/parameter-group.tsx",
      },
    ],
  },
  {
    name: "link-item",
    type: "registry:ui",
    title: "Link Item",
    description: "A component for displaying OpenAPI link objects with parameters and request body details.",
    dependencies: ["description-display", "server-display", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/link-item.tsx",
        type: "registry:ui",
        target: "components/pivot/link-item.tsx",
      },
    ],
  },
  {
    name: "security-scheme",
    type: "registry:ui",
    title: "Security Scheme",
    description: "A component for displaying OpenAPI security scheme configurations with OAuth2 flow support.",
    dependencies: ["description-display", "scheme-type"],
    files: [
      {
        path: "registry/pivot/security-scheme.tsx",
        type: "registry:ui",
        target: "components/pivot/security-scheme.tsx",
      },
    ],
  },
  {
    name: "server-variable",
    type: "registry:ui",
    title: "Server Variable",
    description: "A component for displaying server variable information with default values and enum options.",
    dependencies: ["description-display"],
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
    type: "registry:ui",
    title: "Server",
    description: "A component for displaying server information with URL interpolation and variable expansion.",
    dependencies: ["description-display", "expand-collapse", "server-variable"],
    files: [
      {
        path: "registry/pivot/server.tsx",
        type: "registry:ui",
        target: "components/pivot/server.tsx",
      },
    ],
  },
  {
    name: "servers",
    type: "registry:ui",
    title: "Servers",
    description: "A component for displaying a list of servers with section title.",
    dependencies: ["section-title", "server"],
    files: [
      {
        path: "registry/pivot/servers.tsx",
        type: "registry:ui",
        target: "components/pivot/servers.tsx",
      },
    ],
  },
  {
    name: "links-section",
    type: "registry:ui",
    title: "Links Section",
    description: "A section component for displaying OpenAPI links with reference resolution.",
    dependencies: ["link-item"],
    files: [
      {
        path: "registry/pivot/links-section.tsx",
        type: "registry:ui",
        target: "components/pivot/links-section.tsx",
      },
    ],
  },
  {
    name: "security-schemes",
    type: "registry:ui",
    title: "Security Schemes",
    description: "A section component for displaying multiple security schemes.",
    dependencies: ["section-title", "security-scheme"],
    files: [
      {
        path: "registry/pivot/security-schemes.tsx",
        type: "registry:ui",
        target: "components/pivot/security-schemes.tsx",
      },
    ],
  },
  {
    name: "oauth-flow-details",
    type: "registry:ui",
    title: "OAuth Flow Details",
    description: "A component for displaying detailed OAuth flow information including URLs and scopes.",
    files: [
      {
        path: "registry/pivot/oauth-flow-details.tsx",
        type: "registry:ui",
        target: "components/pivot/oauth-flow-details.tsx",
      },
    ],
  },
  {
    name: "security-requirement-item",
    type: "registry:ui",
    title: "Security Requirement Item",
    description: "A component for displaying a single security requirement with schemes and scopes.",
    files: [
      {
        path: "registry/pivot/security-requirement-item.tsx",
        type: "registry:ui",
        target: "components/pivot/security-requirement-item.tsx",
      },
    ],
  },
  {
    name: "security-requirements-section",
    type: "registry:ui",
    title: "Security Requirements Section",
    description: "A section component for displaying security requirements.",
    dependencies: ["security-requirement-item"],
    files: [
      {
        path: "registry/pivot/security-requirements-section.tsx",
        type: "registry:ui",
        target: "components/pivot/security-requirements-section.tsx",
      },
    ],
  },
  {
    name: "example-display",
    type: "registry:ui",
    title: "Example Display",
    description: "A component for displaying examples with proper formatting and syntax highlighting.",
    files: [
      {
        path: "registry/pivot/example-display.tsx",
        type: "registry:ui",
        target: "components/pivot/example-display.tsx",
      },
    ],
  },
  {
    name: "language-switcher",
    type: "registry:ui",
    title: "Language Switcher",
    description: "A component for switching between different programming languages in code examples.",
    files: [
      {
        path: "registry/pivot/language-switcher.tsx",
        type: "registry:ui",
        target: "components/pivot/language-switcher.tsx",
      },
    ],
  },
  {
    name: "security-scheme-display",
    type: "registry:ui",
    title: "Security Scheme Display",
    description: "A component for displaying security scheme information with OAuth flow details.",
    dependencies: ["oauth-flow-details"],
    files: [
      {
        path: "registry/pivot/security-scheme-display.tsx",
        type: "registry:ui",
        target: "components/pivot/security-scheme-display.tsx",
      },
    ],
  },
  {
    name: "component-items-list",
    type: "registry:ui",
    title: "Component Items List",
    description: "A list component for displaying component items with filtering.",
    files: [
      {
        path: "registry/pivot/component-items-list.tsx",
        type: "registry:ui",
        target: "components/pivot/component-items-list.tsx",
      },
    ],
  },
  {
    name: "theme-toggle",
    type: "registry:ui",
    title: "Theme Toggle",
    description: "A toggle button for switching between light and dark themes.",
    files: [
      {
        path: "registry/pivot/theme-toggle.tsx",
        type: "registry:ui",
        target: "components/pivot/theme-toggle.tsx",
      },
    ],
  },
  {
    name: "parameter-item",
    type: "registry:ui",
    title: "Parameter Item",
    description: "A component for displaying parameter information with schema details.",
    dependencies: ["type-indicator", "required-badge", "deprecated-badge"],
    files: [
      {
        path: "registry/pivot/parameter-item.tsx",
        type: "registry:ui",
        target: "components/pivot/parameter-item.tsx",
      },
    ],
  },
  {
    name: "response-item",
    type: "registry:ui",
    title: "Response Item",
    description: "A component for displaying response information with content details.",
    dependencies: ["status-code", "description-display"],
    files: [
      {
        path: "registry/pivot/response-item.tsx",
        type: "registry:ui",
        target: "components/pivot/response-item.tsx",
      },
    ],
  },
  {
    name: "request-body-section",
    type: "registry:ui",
    title: "Request Body Section",
    description: "A section component for displaying request body information.",
    dependencies: ["media-type-selector", "description-display"],
    files: [
      {
        path: "registry/pivot/request-body-section.tsx",
        type: "registry:ui",
        target: "components/pivot/request-body-section.tsx",
      },
    ],
  },
  {
    name: "operation-box",
    type: "registry:ui",
    title: "Operation Box",
    description: "A comprehensive component for displaying API operation information.",
    dependencies: ["method-label", "operation-path", "description-display"],
    files: [
      {
        path: "registry/pivot/operation-box.tsx",
        type: "registry:ui",
        target: "components/pivot/operation-box.tsx",
      },
    ],
  },
  {
    name: "responses-section",
    type: "registry:ui",
    title: "Responses Section",
    description: "A section component for displaying API responses.",
    dependencies: ["response-item"],
    files: [
      {
        path: "registry/pivot/responses-section.tsx",
        type: "registry:ui",
        target: "components/pivot/responses-section.tsx",
      },
    ],
  },
  {
    name: "parameters-section",
    type: "registry:ui",
    title: "Parameters Section",
    description: "A section component for displaying API parameters.",
    dependencies: ["parameter-item"],
    files: [
      {
        path: "registry/pivot/parameters-section.tsx",
        type: "registry:ui",
        target: "components/pivot/parameters-section.tsx",
      },
    ],
  },
  {
    name: "response-content-section",
    type: "registry:ui",
    title: "Response Content Section",
    description: "A section component for displaying response content with media types.",
    dependencies: ["media-type-selector"],
    files: [
      {
        path: "registry/pivot/response-content-section.tsx",
        type: "registry:ui",
        target: "components/pivot/response-content-section.tsx",
      },
    ],
  },
  {
    name: "schema-composition-display",
    type: "registry:ui",
    title: "Schema Composition Display",
    description: "A component for displaying schema composition (allOf, oneOf, anyOf).",
    files: [
      {
        path: "registry/pivot/schema-composition-display.tsx",
        type: "registry:ui",
        target: "components/pivot/schema-composition-display.tsx",
      },
    ],
  },
  {
    name: "schema-display",
    type: "registry:ui",
    title: "Schema Display",
    description: "A comprehensive component for displaying OpenAPI schemas with recursive support.",
    dependencies: ["type-indicator", "constraint-display", "schema-composition-display"],
    files: [
      {
        path: "registry/pivot/schema-display.tsx",
        type: "registry:ui",
        target: "components/pivot/schema-display.tsx",
      },
    ],
  },
  {
    name: "components-section",
    type: "registry:ui",
    title: "Components Section",
    description: "A section component for displaying OpenAPI components.",
    dependencies: ["component-tabs"],
    files: [
      {
        path: "registry/pivot/components-section.tsx",
        type: "registry:ui",
        target: "components/pivot/components-section.tsx",
      },
    ],
  },
  {
    name: "schema-with-example-viewer",
    type: "registry:ui",
    title: "Schema with Example Viewer",
    description: "A component for displaying schemas alongside examples.",
    dependencies: ["schema-display", "example-display"],
    files: [
      {
        path: "registry/pivot/schema-with-example-viewer.tsx",
        type: "registry:ui",
        target: "components/pivot/schema-with-example-viewer.tsx",
      },
    ],
  },
  {
    name: "header-item",
    type: "registry:ui",
    title: "Header Item",
    description: "A component for displaying header information with schema details.",
    dependencies: ["schema-display"],
    files: [
      {
        path: "registry/pivot/header-item.tsx",
        type: "registry:ui",
        target: "components/pivot/header-item.tsx",
      },
    ],
  },
  {
    name: "examples-display",
    type: "registry:ui",
    title: "Examples Display",
    description: "A component for displaying multiple examples with selection.",
    dependencies: ["example-display"],
    files: [
      {
        path: "registry/pivot/examples-display.tsx",
        type: "registry:ui",
        target: "components/pivot/examples-display.tsx",
      },
    ],
  },
  {
    name: "callback-display",
    type: "registry:ui",
    title: "Callback Display",
    description: "A component for displaying OpenAPI callback objects with operation details.",
    dependencies: ["operation-box"],
    files: [
      {
        path: "registry/pivot/callback-display.tsx",
        type: "registry:ui",
        target: "components/pivot/callback-display.tsx",
      },
    ],
  },
  {
    name: "webhook-display",
    type: "registry:ui",
    title: "Webhook Display",
    description: "A component for displaying webhook information.",
    dependencies: ["webhook-label", "operation-box"],
    files: [
      {
        path: "registry/pivot/webhook-display.tsx",
        type: "registry:ui",
        target: "components/pivot/webhook-display.tsx",
      },
    ],
  },
  {
    name: "path-item-display",
    type: "registry:ui",
    title: "Path Item Display",
    description: "A component for displaying path item information with operations.",
    dependencies: ["operation-box"],
    files: [
      {
        path: "registry/pivot/path-item-display.tsx",
        type: "registry:ui",
        target: "components/pivot/path-item-display.tsx",
      },
    ],
  },
  {
    name: "security-section",
    type: "registry:ui",
    title: "Security Section",
    description: "A comprehensive security section with schemes and requirements.",
    dependencies: ["security-schemes", "security-requirements-section"],
    files: [
      {
        path: "registry/pivot/security-section.tsx",
        type: "registry:ui",
        target: "components/pivot/security-section.tsx",
      },
    ],
  },
  {
    name: "component-detail",
    type: "registry:ui",
    title: "Component Detail",
    description: "A detailed view component for displaying component information.",
    dependencies: ["schema-display", "example-display"],
    files: [
      {
        path: "registry/pivot/component-detail.tsx",
        type: "registry:ui",
        target: "components/pivot/component-detail.tsx",
      },
    ],
  },
  {
    name: "headers-section",
    type: "registry:ui",
    title: "Headers Section",
    description: "A section component for displaying HTTP headers.",
    dependencies: ["header-item"],
    files: [
      {
        path: "registry/pivot/headers-section.tsx",
        type: "registry:ui",
        target: "components/pivot/headers-section.tsx",
      },
    ],
  },
  {
    name: "accordion-components-section",
    type: "registry:ui",
    title: "Accordion Components Section",
    description: "An accordion-style section for displaying components with expandable details.",
    dependencies: ["component-detail"],
    files: [
      {
        path: "registry/pivot/accordion-components-section.tsx",
        type: "registry:ui",
        target: "components/pivot/accordion-components-section.tsx",
      },
    ],
  },
  {
    name: "resizable-sidebar",
    type: "registry:ui",
    title: "Resizable Sidebar",
    description: "A resizable sidebar component for navigation and content organization.",
    files: [
      {
        path: "registry/pivot/resizable-sidebar.tsx",
        type: "registry:ui",
        target: "components/pivot/resizable-sidebar.tsx",
      },
    ],
  },
  {
    name: "curl-generator",
    type: "registry:ui",
    title: "cURL Generator",
    description: "Generate cURL commands from OpenAPI operations.",
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
    description: "Generate Python code from OpenAPI operations.",
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
    description: "Generate TypeScript code from OpenAPI operations.",
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
    description: "Generate PHP code from OpenAPI operations.",
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
    description: "Generate Laravel code from OpenAPI operations.",
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
    type: "registry:ui",
    title: "Code Generator",
    description: "A comprehensive code generator supporting multiple programming languages.",
    dependencies: ["curl-generator", "python-generator", "typescript-generator", "php-generator", "laravel-generator"],
    files: [
      {
        path: "registry/pivot/codegen.tsx",
        type: "registry:ui",
        target: "components/pivot/codegen.tsx",
      },
    ],
  },
  {
    name: "try-it-out-panel",
    type: "registry:ui",
    title: "Try It Out Panel",
    description: "An interactive panel for testing API operations with parameter input and response display.",
    dependencies: ["parameter-item", "copy-button", "codegen"],
    files: [
      {
        path: "registry/pivot/try-it-out-panel.tsx",
        type: "registry:ui",
        target: "components/pivot/try-it-out-panel.tsx",
      },
    ],
  },
  {
    name: "navigation-sidebar",
    type: "registry:ui",
    title: "Navigation Sidebar",
    description: "A comprehensive navigation sidebar with search, filtering, and operation grouping.",
    dependencies: ["method-label", "expand-collapse"],
    files: [
      {
        path: "registry/pivot/navigation-sidebar.tsx",
        type: "registry:ui",
        target: "components/pivot/navigation-sidebar.tsx",
      },
    ],
  },
  {
    name: "all-in-one-layout",
    type: "registry:ui",
    title: "All-in-One Layout",
    description: "A comprehensive layout combining navigation, operation details, and interactive elements.",
    dependencies: ["navigation-sidebar", "operation-box", "try-it-out-panel", "resizable-sidebar"],
    files: [
      {
        path: "registry/pivot/all-in-one-layout.tsx",
        type: "registry:ui",
        target: "components/pivot/all-in-one-layout.tsx",
      },
    ],
  },
];

export { pivot };
