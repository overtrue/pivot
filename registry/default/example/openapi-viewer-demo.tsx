import { OpenAPIViewer, ResponseViewer, OperationViewer } from "@/registry/default/ui/openapi-viewer";
import type { OpenAPIV3 } from "openapi-types";

/**
 * Basic usage - Zero configuration
 */
export function BasicExample() {
  return (
    <OpenAPIViewer 
      url="https://petstore3.swagger.io/api/v3/openapi.json" 
    />
  );
}

/**
 * With configuration
 */
export function ConfiguredExample() {
  return (
    <OpenAPIViewer
      url="https://petstore3.swagger.io/api/v3/openapi.json"
      config={{
        theme: { mode: 'dark' },
        features: {
          tryItOut: true,
          codeGeneration: true,
          search: true,
        },
        locale: 'en',
      }}
      layout="detail"
      onOperationSelect={(path, method, operation) => {
        console.log('Selected:', path, method, operation.summary);
      }}
    />
  );
}

/**
 * With inline OpenAPI specification
 */
export function InlineSpecExample() {
  const spec: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
    paths: {
      "/users": {
        get: {
          summary: "List users",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return <OpenAPIViewer spec={spec} />;
}

/**
 * Embedded layout for documentation sites
 */
export function EmbeddedExample() {
  return (
    <div style={{ height: '600px', border: '1px solid #e5e5e5' }}>
      <OpenAPIViewer
        url="https://petstore3.swagger.io/api/v3/openapi.json"
        config={{
          layout: {
            type: 'embedded',
            sidebar: false,
            header: false,
          },
          features: {
            tryItOut: false,
            codeGeneration: true,
          },
        }}
      />
    </div>
  );
}

/**
 * Response viewer only
 */
export function ResponseViewerExample() {
  const responses: OpenAPIV3.ResponsesObject = {
    "200": {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    "404": {
      description: "Not found",
    },
  };

  return (
    <ResponseViewer 
      responses={responses}
      config={{
        theme: { mode: 'light' },
      }}
    />
  );
}

/**
 * Operation viewer only
 */
export function OperationViewerExample() {
  const operation: OpenAPIV3.OperationObject = {
    summary: "Create user",
    description: "Creates a new user in the system",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "email"],
            properties: {
              name: { type: "string" },
              email: { type: "string", format: "email" },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: "User created successfully",
      },
    },
  };

  return (
    <OperationViewer
      operation={operation}
      path="/users"
      method="POST"
      config={{
        features: {
          tryItOut: true,
        },
      }}
    />
  );
}

/**
 * With event callbacks
 */
export function CallbacksExample() {
  return (
    <OpenAPIViewer
      url="https://petstore3.swagger.io/api/v3/openapi.json"
      onReady={(spec) => {
        console.log('Specification loaded:', spec.info.title);
      }}
      onError={(error) => {
        console.error('Failed to load specification:', error);
      }}
      onOperationSelect={(path, method, operation) => {
        // Track analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'api_operation_view', {
            path,
            method,
            operation_id: operation.operationId,
          });
        }
      }}
    />
  );
}

/**
 * Custom styling
 */
export function CustomStyleExample() {
  return (
    <OpenAPIViewer
      url="https://petstore3.swagger.io/api/v3/openapi.json"
      className="custom-viewer"
      style={{
        fontFamily: 'Monaco, monospace',
        backgroundColor: '#f5f5f5',
      }}
      config={{
        styling: {
          cssVariables: {
            '--pivot-primary': '#ff6b6b',
            '--pivot-primary-bg': '#ffe0e0',
          },
        },
      }}
    />
  );
}