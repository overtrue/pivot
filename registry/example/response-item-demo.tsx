import { ResponseItem } from "@/registry/pivot/response-item";

export default function ResponseItemDemo() {
  const successResponse = {
    description: "Successful response",
    headers: {
      "X-Rate-Limit": {
        description: "Number of requests allowed per hour",
        schema: { type: "integer" }
      },
      "X-Request-ID": {
        description: "Unique identifier for the request",
        schema: { type: "string", format: "uuid" }
      }
    },
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string", format: "email" }
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
          type: "object",
          properties: {
            error: { type: "string" },
            message: { type: "string" }
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
        <ResponseItem code="200" response={successResponse} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Error Response (400)</h4>
        <ResponseItem code="400" response={errorResponse} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Simple Response (204)</h4>
        <ResponseItem code="204" response={simpleResponse} />
      </div>
    </div>
  );
}
