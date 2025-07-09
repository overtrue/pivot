import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "文档",
      href: "/docs",
    },
    {
      title: "组件",
      href: "/docs/components",
    },
    {
      title: "查看器",
      href: "/viewer",
    },
    {
      title: "演示",
      href: "/showcase",
    },
  ],
  sidebarNav: [
    {
      title: "开始使用",
      items: [
        {
          title: "介绍",
          href: "/docs",
          items: [],
        },
        {
          title: "快速开始",
          href: "/docs/quick-start",
          items: [],
        },
        {
          title: "OpenAPI 查看器",
          href: "/docs/viewer",
          items: [],
        },
        {
          title: "安装",
          href: "/docs/installation",
          items: [
            {
              title: "Next.js",
              href: "/docs/installation/next",
              items: [],
            },
            {
              title: "Vite",
              href: "/docs/installation/vite",
              items: [],
            },
            {
              title: "手动安装",
              href: "/docs/installation/manual",
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: "基础组件",
      items: [
        {
          title: "Status Code",
          href: `/docs/components/status-code`,
          items: [],
        },
        {
          title: "Method Label",
          href: `/docs/components/method-label`,
          items: [],
        },
        {
          title: "Type Indicator",
          href: `/docs/components/type-indicator`,
          items: [],
        },
        {
          title: "Copy Button",
          href: `/docs/components/copy-button`,
          items: [],
        },
        {
          title: "Required Badge",
          href: `/docs/components/required-badge`,
          items: [],
        },
        {
          title: "Format Badge",
          href: `/docs/components/format-badge`,
          items: [],
        },
        {
          title: "In Label",
          href: `/docs/components/in-label`,
          items: [],
        },
        {
          title: "Version Badge",
          href: `/docs/components/version-badge`,
          items: [],
        },
        {
          title: "Deprecated Badge",
          href: `/docs/components/deprecated-badge`,
          items: [],
        },
        {
          title: "Webhook Label",
          href: `/docs/components/webhook-label`,
          items: [],
        },
        {
          title: "Value Display",
          href: `/docs/components/value-display`,
          items: [],
        },
        {
          title: "Enum Values",
          href: `/docs/components/enum-values`,
          items: [],
        },
        {
          title: "Required Marker",
          href: `/docs/components/required-marker`,
          items: [],
        },
        {
          title: "Style Badge",
          href: `/docs/components/style-badge`,
          items: [],
        },
      ],
    },
    {
      title: "显示组件",
      items: [
        {
          title: "Const Value",
          href: `/docs/components/const-value`,
          items: [],
        },
        {
          title: "Constraint Display",
          href: `/docs/components/constraint-display`,
          items: [],
        },
        {
          title: "Contact Display",
          href: `/docs/components/contact-display`,
          items: [],
        },
        {
          title: "Default Value Display",
          href: `/docs/components/default-value-display`,
          items: [],
        },
        {
          title: "Description Display",
          href: `/docs/components/description-display`,
          items: [],
        },
        {
          title: "Example Display",
          href: `/docs/components/example-display`,
          items: [],
        },
        {
          title: "Examples Display",
          href: `/docs/components/examples-display`,
          items: [],
        },
        {
          title: "External Docs",
          href: `/docs/components/external-docs`,
          items: [],
        },
        {
          title: "External Docs Display",
          href: `/docs/components/external-docs-display`,
          items: [],
        },
        {
          title: "License Display",
          href: `/docs/components/license-display`,
          items: [],
        },
        {
          title: "Media Type Display",
          href: `/docs/components/media-type-display`,
          items: [],
        },
        {
          title: "Server Display",
          href: `/docs/components/server-display`,
          items: [],
        },
        {
          title: "Terms Of Service",
          href: `/docs/components/terms-of-service`,
          items: [],
        },
        {
          title: "Webhook Display",
          href: `/docs/components/webhook-display`,
          items: [],
        },
      ],
    },
    {
      title: "布局组件",
      items: [
        {
          title: "Operation Box",
          href: `/docs/components/operation-box`,
          items: [],
        },
        {
          title: "Schema Display",
          href: `/docs/components/schema-display`,
          items: [],
        },
        {
          title: "Parameter Item",
          href: `/docs/components/parameter-item`,
          items: [],
        },
        {
          title: "Response Item",
          href: `/docs/components/response-item`,
          items: [],
        },
        {
          title: "Operation Detailed Layout",
          href: `/docs/components/operation-detailed-layout`,
          items: [],
        },
        {
          title: "Operation List Layout",
          href: `/docs/components/operation-list-layout`,
          items: [],
        },
        {
          title: "Navigation Sidebar",
          href: `/docs/components/navigation-sidebar`,
          items: [],
        },
        {
          title: "Resizable Sidebar",
          href: `/docs/components/resizable-sidebar`,
          items: [],
        },
      ],
    },
    {
      title: "章节组件",
      items: [
        {
          title: "Parameters Section",
          href: `/docs/components/parameters-section`,
          items: [],
        },
        {
          title: "Responses Section",
          href: `/docs/components/responses-section`,
          items: [],
        },
        {
          title: "Request Body Section",
          href: `/docs/components/request-body-section`,
          items: [],
        },
        {
          title: "Headers Section",
          href: `/docs/components/headers-section`,
          items: [],
        },
        {
          title: "Security Section",
          href: `/docs/components/security-section`,
          items: [],
        },
        {
          title: "Servers Section",
          href: `/docs/components/servers-section`,
          items: [],
        },
        {
          title: "Info Section",
          href: `/docs/components/info-section`,
          items: [],
        },
        {
          title: "Components Section",
          href: `/docs/components/components-section`,
          items: [],
        },
        {
          title: "Section Title",
          href: `/docs/components/section-title`,
          items: [],
        },
      ],
    },
    {
      title: "代码生成",
      items: [
        {
          title: "Codegen",
          href: `/docs/components/codegen`,
          items: [],
        },
        {
          title: "Curl Generator",
          href: `/docs/components/curl-generator`,
          items: [],
        },
        {
          title: "TypeScript Generator",
          href: `/docs/components/typescript-generator`,
          items: [],
        },
        {
          title: "Python Generator",
          href: `/docs/components/python-generator`,
          items: [],
        },
        {
          title: "PHP Generator",
          href: `/docs/components/php-generator`,
          items: [],
        },
        {
          title: "Laravel Generator",
          href: `/docs/components/laravel-generator`,
          items: [],
        },
      ],
    },
    {
      title: "模板",
      items: [
        {
          title: "API 文档模板",
          href: `/docs/templates/api-docs`,
          items: [],
        },
      ],
    },
  ],
};
