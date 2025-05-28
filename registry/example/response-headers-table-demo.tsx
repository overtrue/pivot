import { ResponseHeadersTable } from "@/registry/pivot/response-headers-table";

export default function ResponseHeadersTableDemo() {
  const headers = {
    "Content-Type": {
      description: "The MIME type of the response content",
      schema: { type: "string" },
      required: true
    },
    "X-Rate-Limit": {
      description: "Number of requests allowed per hour",
      schema: { type: "integer" },
      required: false
    },
    "X-Request-ID": {
      description: "Unique identifier for the request",
      schema: { type: "string", format: "uuid" },
      required: false
    },
    "Cache-Control": {
      description: "Caching directives for the response",
      schema: { type: "string" },
      required: false
    }
  };

  return (
    <div className="space-y-4 min-w-md">
      <ResponseHeadersTable headers={headers} />
    </div>
  );
}
