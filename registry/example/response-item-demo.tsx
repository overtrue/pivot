import { ResponseItem } from "@/registry/pivot/response-item";

export default function ResponseItemDemo() {
  const successResponse = {
    description: "Successful response",
    headers: {
      "X-Rate-Limit": {
        description: "Number of requests allowed per hour",
        schema: { type: "integer" as const }
      },
      "X-Request-ID": {
        description: "Unique identifier for the request",
        schema: { type: "string" as const, format: "uuid" as const }
      }
    },
    content: {
      "application/json": {
        schema: {
          type: "object" as const,
          properties: {
            id: { type: "integer" as const },
            name: { type: "string" as const },
            email: { type: "string" as const, format: "email" as const }
          }
        }
      }
    },
    links: {
      "GetUserByUserId": {
        operationId: "getUser",
        parameters: {
          userId: "$response.body#/id"
        },
        description: "Get user details using the returned user ID"
      }
    }
  };

  const errorResponse = {
    description: "Error response",
    content: {
      "application/json": {
        schema: {
          type: "object" as const,
          properties: {
            error: { type: "string" as const },
            message: { type: "string" as const }
          }
        }
      }
    }
  };

  const simpleResponse = {
    description: "Simple response without additional details"
  };

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">Success Response (200)</h4>
        <ResponseItem code="200" response={successResponse as any} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Error Response (400)</h4>
        <ResponseItem code="400" response={errorResponse as any} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Simple Response (204)</h4>
        <ResponseItem code="204" response={simpleResponse as any} />
      </div>
    </div>
  );
}
